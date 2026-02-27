"use client";

import { useEffect } from "react";
import { X, MapPin, Plus, ThumbsUp, Flag, Edit3, MessageCircle } from "lucide-react";

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--color-bg)] rounded-lg shadow-2xl w-full max-w-md p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-[var(--color-surface)] transition-colors"
        >
          <X size={20} className="text-[var(--color-text-secondary)]" />
        </button>

        <div className="flex flex-col gap-1 pr-6">
          <h2 className="text-title font-bold text-[var(--color-text-primary)]">How to contribute</h2>
          <p className="text-body text-[var(--color-text-secondary)]">
            JustZappIt is community-driven. Here&apos;s how you can help keep the directory accurate and growing.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-body font-semibold text-[var(--color-text-primary)]">{title}</p>
                <p className="text-caption text-[var(--color-text-secondary)] mt-0.5">{description}</p>
                {title === "Coming soon: Zapp" && (
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-3 w-full bg-primary text-white py-2.5 rounded-md font-semibold text-button"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Follow us on X
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)] pt-4">
          <p className="text-caption text-[var(--color-text-secondary)] text-center">
            All contributions are anonymous and community-reviewed. <br />
            Thank you for helping the ecosystem grow.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-3 text-[11px] text-[var(--color-text-secondary)]">
            <a href="/legal/disclaimer" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">Disclaimer</a>
            <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</a>
            <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</a>
            <a href="/legal/content-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">Content Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
