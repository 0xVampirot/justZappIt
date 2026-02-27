// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState, useRef } from "react";
import {
  MapPin, Globe, Clock, Phone, Mail, CheckCircle, AlertTriangle,
  Navigation, Share2, MessageCircle, ChevronDown,
} from "lucide-react";
import type { Store } from "@/lib/database.types";
import { STATUS_CONFIG, DEFAULT_STATUS, type VerificationStatus } from "@/lib/statusColors";
import type HCaptchaType from "@hcaptcha/react-hcaptcha";
import dynamic from "next/dynamic";

const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), { ssr: false });
const ChatModal = dynamic(() => import("@/components/ChatModal"), { ssr: false });

const FLAG_OPTIONS = [
  { value: "flag_closed", label: "Store is closed" },
  { value: "flag_wrong", label: "Wrong address" },
  { value: "flag_no_crypto", label: "No longer accepts crypto" },
];

export default function StorePageClient({ store }: { store: Store }) {
  const [voting, setVoting] = useState(false);
  const [voteMsg, setVoteMsg] = useState<string | null>(null);
  const [showFlagMenu, setShowFlagMenu] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";  // HCaptcha will fail gracefully if empty
  const captchaRef = useRef<HCaptchaType>(null);
  const [pendingAction, setPendingAction] = useState<{ type: "vote", payload: { type: string } } | null>(null);

  const statusInfo = STATUS_CONFIG[store.verification_status as VerificationStatus] ?? DEFAULT_STATUS;

  async function vote(type: string, token?: string) {
    const captchaToken = token ?? hcaptchaToken;
    if (!captchaToken) {
      setPendingAction({ type: "vote", payload: { type } });
      captchaRef.current?.execute();
      return;
    }

    setVoting(true);
    setVoteMsg(null);
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store_id: store.id, type, hcaptchaToken: captchaToken }),
      });
      const data = await res.json();
      setVoteMsg(res.ok ? "Thanks for your feedback!" : (data.error ?? "Something went wrong."));
    } catch {
      setVoteMsg("Network error. Please try again.");
    } finally {
      setVoting(false);
      setShowFlagMenu(false);
      setHcaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  }

  function getDirectionsUrl() {
    const addr = store.street_address
      ? `${store.street_address}, ${store.city}, ${store.country}`
      : `${store.city}, ${store.country}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;
  }

  function share() {
    const url = `${window.location.origin}/store/${store.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-xl flex flex-col gap-5">
        {/* Header */}
        <div>
          <h1 className="text-title font-bold text-[var(--color-text-primary)]">{store.operator_name}</h1>
          <span className={`text-caption font-semibold ${statusInfo.textColor}`}>{statusInfo.label}</span>
          {store.is_approximate && (
            <span className="ml-2 text-caption text-[var(--color-text-secondary)] bg-[var(--color-bg)] px-2 py-0.5 rounded-sm">
              Approximate location
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              {store.street_address && <p className="text-body text-[var(--color-text-primary)]">{store.street_address}</p>}
              <p className="text-body text-[var(--color-text-secondary)]">{store.city}, {store.country}</p>
            </div>
          </div>
          {store.website && (
            <div className="flex gap-3">
              <Globe size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a href={store.website.startsWith("http") ? store.website : `https://${store.website}`}
                target="_blank" rel="noopener noreferrer"
                className="text-body text-primary underline break-all">{store.website}</a>
            </div>
          )}
          {store.opening_hours && (
            <div className="flex gap-3">
              <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-body text-[var(--color-text-primary)]">{store.opening_hours}</p>
            </div>
          )}
          {store.phone && (
            <div className="flex gap-3">
              <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="text-body text-[var(--color-text-primary)] hover:underline">{store.phone}</a>
            </div>
          )}
          {store.email && (
            <div className="flex gap-3">
              <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a href={`mailto:${store.email}`} className="text-body text-primary underline break-all">{store.email}</a>
            </div>
          )}
        </div>

        {/* Crypto badges */}
        {store.accepts_crypto && store.accepts_crypto.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {store.accepts_crypto.map((c) => (
              <span key={c} className="px-2 py-1 bg-primary/10 text-primary text-caption font-semibold rounded-sm border border-primary/20">{c}</span>
            ))}
          </div>
        )}

        {/* Tally */}
        <div className="flex gap-4 text-caption text-[var(--color-text-secondary)]">
          <span>✅ {store.confirm_count} confirmations</span>
          <span>⚠️ {store.flag_count} reports</span>
        </div>

        {voteMsg && (
          <p className="text-caption text-[var(--color-text-secondary)] bg-[var(--color-bg)] px-3 py-2 rounded-md border border-[var(--color-border)]">{voteMsg}</p>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => vote("confirm")} disabled={voting}
            className="flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-3 rounded-md font-semibold text-button disabled:opacity-50">
            <CheckCircle size={16} /> I&apos;ve been here
          </button>
          <div className="relative">
            <button onClick={() => setShowFlagMenu((o) => !o)} disabled={voting}
              className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button disabled:opacity-50">
              <AlertTriangle size={16} className="text-orange-500" /> Report <ChevronDown size={14} />
            </button>
            {showFlagMenu && (
              <div className="absolute bottom-full mb-1 left-0 right-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                {FLAG_OPTIONS.map((opt) => (
                  <button key={opt.value} onClick={() => vote(opt.value)}
                    className="w-full text-left px-3 py-2 text-body text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]">
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button">
            <Navigation size={16} className="text-primary" /> Directions
          </a>
          <button onClick={share}
            className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button">
            <Share2 size={16} className="text-primary" /> {copied ? "Copied!" : "Share"}
          </button>
        </div>

        <button onClick={() => setShowChatModal(true)}
          className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-2.5 px-3 rounded-md font-semibold text-button hover:bg-primary hover:text-white transition-colors">
          <MessageCircle size={16} /> Join Community
        </button>
      </div>

      {showChatModal && <ChatModal store={store} onClose={() => setShowChatModal(false)} />}

      <HCaptcha
        ref={captchaRef}
        sitekey={siteKey}
        size="invisible"
        onVerify={(token: string) => {
          setHcaptchaToken(token);
          if (pendingAction?.type === "vote" && pendingAction.payload?.type) {
            vote(pendingAction.payload.type, token);
          }
          setPendingAction(null);
        }}
        onError={() => {
          setPendingAction(null);
          setVoteMsg("Captcha error. Please try again.");
        }}
        onExpire={() => {
          setHcaptchaToken(null);
        }}
      />
    </>
  );
}
