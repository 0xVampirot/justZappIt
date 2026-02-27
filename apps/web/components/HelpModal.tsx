// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useEffect, useRef } from "react";
import { X, MapPin, Plus, ThumbsUp, Flag, Edit3, MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";

interface HelpModalProps {
  onClose: () => void;
}

const steps = [
  {
    icon: MapPin,
    title: "Explore the map",
    description: "Browse stores that accept crypto. Tap any pin or list item to see details.",
  },
  {
    icon: Plus,
    title: "Add a missing store",
    description: 'Know a store that accepts crypto but isn\'t listed? Hit "Add Store" and submit it. It goes live immediately as unverified.',
  },
  {
    icon: ThumbsUp,
    title: "Confirm a store",
    description: 'Visited a store and it checks out? Press "Confirm" on its panel. After 3 community confirmations it becomes verified.',
  },
  {
    icon: Edit3,
    title: "Suggest an edit",
    description: "If a store's hours, website, or contact info is wrong, use \"Suggest Edit\". Edits are applied after 2 confirmations.",
  },
  {
    icon: Flag,
    title: "Flag bad data",
    description: 'If a store is closed, has wrong info, or no longer accepts crypto, flag it so the community can review.',
  },
  {
    icon: MessageCircle,
    title: "Coming soon: Zapp",
    description: "We're building Zapp — a peer-to-peer messaging app where community chat rooms for each store will live. It's a work in progress. Follow us on X to stay posted on the latest news and launch updates.",
  },
];

export default function HelpModal({ onClose }: HelpModalProps) {
  const xUrl = process.env.NEXT_PUBLIC_X_URL ?? "https://x.com";
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="How to contribute"
    >
      {/* Backdrop — light tint so the map shows through */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog — translucent, 80 % of viewport */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex flex-col w-full max-w-[50vw] h-[80vh] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-md outline-none"
      >
        {/* ── Header (never scrolls) ── */}
        <div className="flex items-start justify-between px-8 pt-6 pb-4 flex-shrink-0 border-b border-white/10">
          <div className="flex flex-col gap-1 pr-4">
            <h2 className="text-xl font-bold text-white">How to contribute</h2>
            <p className="text-sm text-white/60">
              JustZappIt is community-driven. Here&apos;s how you can help.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide">
          <div className="flex flex-col gap-5">
            {steps.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/60 mt-0.5 leading-relaxed">{description}</p>
                  {title === "Coming soon: Zapp" && (
                    <a
                      href={xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 mt-3 w-full bg-primary text-white py-2.5 rounded-md font-semibold text-sm"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      Follow us
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-6 pt-4">
            <p className="text-xs text-white/40 text-center">
              All contributions are anonymous and community-reviewed. <br />
              Thank you for helping the ecosystem grow.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-3 text-[11px] text-white/30">
              <a href="/legal/disclaimer" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Disclaimer</a>
              <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Terms</a>
              <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="/legal/content-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Content Policy</a>
            </div>
          </div>
        </div>

        {/* ── Footer (never scrolls) ── */}
        <div className="px-8 pb-6 pt-4 flex-shrink-0 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
