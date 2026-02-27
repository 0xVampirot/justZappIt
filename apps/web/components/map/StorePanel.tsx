"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  MapPin,
  Globe,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  Edit3,
  Navigation,
  Share2,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import type { Store } from "@/lib/database.types";
import dynamic from "next/dynamic";
const ChatModal = dynamic(() => import("@/components/ChatModal"), { ssr: false });

interface StorePanelProps {
  store: Store;
  onClose: () => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  seed_confirmed:     { label: "Verified", color: "text-green-600" },
  community_verified: { label: "Community Verified", color: "text-blue-600" },
  seed_partial:       { label: "Partial Info", color: "text-yellow-600" },
  unverified:         { label: "Unverified", color: "text-yellow-500" },
  flagged:            { label: "Flagged", color: "text-orange-500" },
  closed:             { label: "Closed", color: "text-gray-400" },
};

const FLAG_OPTIONS = [
  { value: "flag_closed", label: "Store is closed" },
  { value: "flag_wrong", label: "Wrong address" },
  { value: "flag_no_crypto", label: "No longer accepts crypto" },
];

const URL_PATTERN = /https?:\/\/[^\s]+|(?<=[Ss]ee\s)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/g;

function AddressText({ address }: { address: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(URL_PATTERN.source, URL_PATTERN.flags);

  while ((match = re.exec(address)) !== null) {
    if (match.index > last) {
      parts.push(address.slice(last, match.index));
    }
    const raw = match[0];
    let href: string;
    if (raw.startsWith("http")) {
      href = raw;
    } else {
      const domain = raw.split("/")[0];
      const hasSubdomain = domain.split(".").length > 2;
      href = hasSubdomain ? `https://${raw}` : `https://www.${raw}`;
    }
    parts.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline break-all"
      >
        {raw}
      </a>
    );
    last = match.index + raw.length;
  }

  if (last < address.length) {
    parts.push(address.slice(last));
  }

  return (
    <p className="text-body text-[var(--color-text-primary)] break-words">
      {parts}
    </p>
  );
}

export default function StorePanel({ store, onClose }: StorePanelProps) {
  const [voting, setVoting] = useState(false);
  const [voteMsg, setVoteMsg] = useState<string | null>(null);
  const [showFlagMenu, setShowFlagMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [editFields, setEditFields] = useState({
    website: store.website ?? "",
    opening_hours: store.opening_hours ?? "",
    phone: store.phone ?? "",
    email: store.email ?? "",
  });
  const [editMsg, setEditMsg] = useState<string | null>(null);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";  // HCaptcha will fail gracefully if empty
  const captchaRef = useRef<HCaptcha>(null);
  const [pendingAction, setPendingAction] = useState<{ type: "vote" | "edit", payload?: Record<string, string | undefined> } | null>(null);
  const [copied, setCopied] = useState(false);
  const flagMenuRef = useRef<HTMLDivElement>(null);

  // Close flag menu on Escape or click outside
  useEffect(() => {
    if (!showFlagMenu) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFlagMenu(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (flagMenuRef.current && !flagMenuRef.current.contains(e.target as Node)) {
        setShowFlagMenu(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFlagMenu]);

  const statusInfo = STATUS_LABELS[store.verification_status] ?? STATUS_LABELS.unverified;

  async function vote(type: string, note?: string, token?: string) {
    const captchaToken = token ?? hcaptchaToken;
    if (!captchaToken) {
      setPendingAction({ type: "vote", payload: { type, note } });
      captchaRef.current?.execute();
      return;
    }

    setVoting(true);
    setVoteMsg(null);
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store_id: store.id, type, note, hcaptchaToken: captchaToken }),
      });
      const data = await res.json();
      if (res.ok) {
        setVoteMsg("Thanks for your feedback!");
      } else {
        setVoteMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setVoteMsg("Network error. Please try again.");
    } finally {
      setVoting(false);
      setShowFlagMenu(false);
      setHcaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  }

  async function submitEdit(token?: string) {
    const captchaToken = token ?? hcaptchaToken;
    if (!captchaToken) {
      setPendingAction({ type: "edit" });
      captchaRef.current?.execute();
      return;
    }

    setVoting(true);
    setEditMsg(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "edit",
          store_id: store.id,
          hcaptchaToken: captchaToken,
          payload: {
            website: editFields.website,
            opening_hours: editFields.opening_hours,
            phone: editFields.phone.trim() || null,
            email: editFields.email.trim() || null,
          },
          loadedAt: Date.now() - 5000,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditMsg("Edit submitted! It will be applied after 2 community confirmations.");
        setShowEditForm(false);
      } else {
        setEditMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setEditMsg("Network error. Please try again.");
    } finally {
      setVoting(false);
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

  function shareStore() {
    const url = `${window.location.origin}/store/${store.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <div className="flex flex-col h-full bg-[var(--color-bg)]">
        {/* Header */}
        <div className="flex items-start justify-between p-xl border-b border-[var(--color-border)]">
          <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 rounded-md bg-[var(--color-bg)] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <span className="text-2xl text-[var(--color-text-secondary)]">🏪</span>
            </div>
            <div>
              <h2 className="text-title font-bold text-[var(--color-text-primary)] leading-tight">
                {store.operator_name}
              </h2>
              <span className={`text-caption font-semibold ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              {store.is_approximate && (
                <span className="ml-2 text-caption text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-2 py-0.5 rounded-sm">
                  Approximate location
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[var(--color-surface)] transition-colors flex-shrink-0"
          >
            <X size={20} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-xl space-y-4">
          {/* Address */}
          <div className="flex gap-3 min-w-0">
            <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              {store.street_address && (
                <AddressText address={store.street_address} />
              )}
              <p className="text-body text-[var(--color-text-secondary)]">
                {store.city}, {store.country}
              </p>
            </div>
          </div>

          {/* Website */}
          {store.website && (
            <div className="flex gap-3">
              <Globe size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a
                href={store.website.startsWith("http") ? store.website : `https://${store.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-primary underline break-all"
              >
                {store.website}
              </a>
            </div>
          )}

          {/* Hours */}
          {store.opening_hours && (
            <div className="flex gap-3">
              <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-body text-[var(--color-text-primary)]">{store.opening_hours}</p>
            </div>
          )}

          {/* Phone */}
          {store.phone && (
            <div className="flex gap-3">
              <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="text-body text-[var(--color-text-primary)] hover:underline">{store.phone}</a>
            </div>
          )}
          {/* Email */}
          {store.email && (
            <div className="flex gap-3">
              <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a href={`mailto:${store.email}`} className="text-body text-primary underline break-all">{store.email}</a>
            </div>
          )}

          {/* Crypto types */}
          {store.accepts_crypto && store.accepts_crypto.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {store.accepts_crypto.map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 bg-primary/10 text-primary text-caption font-semibold rounded-sm border border-primary/20"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Vote tally */}
          <div className="flex gap-4 text-caption text-[var(--color-text-secondary)]">
            <span>✅ {store.confirm_count} confirmations</span>
            <span>⚠️ {store.flag_count} reports</span>
          </div>

          {/* Vote feedback */}
          <div aria-live="polite" aria-atomic="true">
            {voteMsg && (
              <p className="text-caption text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-3 py-2 rounded-md">
                {voteMsg}
              </p>
            )}
            {editMsg && (
              <p className="text-caption text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-3 py-2 rounded-md">
                {editMsg}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => vote("confirm")}
              disabled={voting}
              className="flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-3 rounded-md font-semibold text-button disabled:opacity-50"
            >
              <CheckCircle size={16} />
              I&apos;ve been here
            </button>

            <div className="relative" ref={flagMenuRef}>
              <button
                onClick={() => setShowFlagMenu((o) => !o)}
                disabled={voting}
                className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button disabled:opacity-50"
              >
                <AlertTriangle size={16} className="text-orange-500" />
                Report Issue
                <ChevronDown size={14} />
              </button>
              {showFlagMenu && (
                <div className="absolute bottom-full mb-1 left-0 right-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg z-10">
                  {FLAG_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => vote(opt.value)}
                      className="w-full text-left px-3 py-2 text-body text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button"
            >
              <Navigation size={16} className="text-primary" />
              Directions
            </a>

            <button
              onClick={shareStore}
              className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-primary)] py-2.5 px-3 rounded-md font-semibold text-button"
            >
              <Share2 size={16} className="text-primary" />
              <span aria-live="polite">{copied ? "Copied!" : "Share"}</span>
            </button>
          </div>

          {/* Join Community */}
          <button
            onClick={() => setShowChatModal(true)}
            className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-2.5 px-3 rounded-md font-semibold text-button hover:bg-primary hover:text-white transition-colors"
          >
            <MessageCircle size={16} />
            Join Community
          </button>

          {/* Suggest Edit */}
          <button
            onClick={() => setShowEditForm((o) => !o)}
            className="w-full flex items-center justify-center gap-2 text-[var(--color-text-secondary)] py-2 text-button underline"
          >
            <Edit3 size={14} />
            Suggest an Edit
          </button>

          {/* Edit form */}
          {showEditForm && (
            <div className="border border-[var(--color-border)] rounded-md p-4 space-y-3">
              <p className="text-caption text-[var(--color-text-secondary)]">
                Edits are applied automatically after 2 community confirmations.
              </p>
              {([
                { key: "website", label: "Website", type: "url" },
                { key: "opening_hours", label: "Opening Hours", type: "text" },
                { key: "phone", label: "Phone", type: "tel" },
                { key: "email", label: "Email", type: "email" },
              ] as { key: keyof typeof editFields; label: string; type: string }[]).map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-caption font-semibold text-[var(--color-text-secondary)] mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={editFields[key]}
                    onChange={(e) =>
                      setEditFields((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-body bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <button
                onClick={() => submitEdit()}
                className="w-full bg-primary text-white py-2 rounded-md font-semibold text-button"
              >
                Submit Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {showChatModal && (
        <ChatModal store={store} onClose={() => setShowChatModal(false)} />
      )}

      {/* Hidden hCaptcha for actions */}
      <HCaptcha
        ref={captchaRef}
        sitekey={siteKey}
        size="invisible"
        onVerify={(token) => {
          setHcaptchaToken(token);
          if (pendingAction?.type === "vote" && pendingAction.payload?.type) {
            vote(pendingAction.payload.type, pendingAction.payload.note, token);
          } else if (pendingAction?.type === "edit") {
            submitEdit(token);
          }
          setPendingAction(null);
        }}
        onError={() => {
          setPendingAction(null);
          setVoteMsg("Captcha error. Please try again.");
          setEditMsg("Captcha error. Please try again.");
        }}
        onExpire={() => {
          setHcaptchaToken(null);
        }}
      />
    </>
  );
}
