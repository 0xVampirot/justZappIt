// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import QRCode from "react-qr-code";
import type { Store } from "@/lib/database.types";

interface ChatModalProps {
  store: Store;
  onClose: () => void;
}

export default function ChatModal({ store, onClose }: ChatModalProps) {
  const deepLink = `zapp://chat/store/${store.id}`;
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
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[var(--color-bg)] rounded-lg shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-5">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-[var(--color-surface)] transition-colors"
        >
          <X size={20} className="text-[var(--color-text-secondary)]" />
        </button>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <MessageCircle size={24} className="text-primary" />
          </div>
          <h2 className="text-title font-bold text-[var(--color-text-primary)]">
            Community Chat Room
          </h2>
          <p className="text-body text-[var(--color-text-secondary)]">
            A community space for people who visit{" "}
            <span className="font-semibold text-[var(--color-text-primary)]">
              {store.operator_name}
            </span>
            . Share tips, ask questions, and connect with fellow users.
          </p>
        </div>

        {/* Coming Soon badge */}
        <div className="bg-primary/10 border border-primary/20 rounded-md px-4 py-2 text-center">
          <p className="text-caption font-bold text-primary uppercase tracking-wide">
            Coming Soon in the Zapp App
          </p>
          <p className="text-caption text-[var(--color-text-secondary)] mt-0.5">
            In-app community chat rooms are launching with Zapp.
          </p>
        </div>

        {/* QR Code — blurred until app launches */}
        <div className="relative">
          <div className="bg-white p-3 rounded-md border border-[var(--color-border)] select-none pointer-events-none">
            <QRCode
              value={deepLink}
              size={160}
              fgColor="#0A0A0A"
              bgColor="#FFFFFF"
            />
          </div>
          <div className="absolute inset-0 rounded-md backdrop-blur-md bg-[var(--color-bg)]/60 flex flex-col items-center justify-center gap-1">
            <span className="text-caption font-bold text-[var(--color-text-primary)] uppercase tracking-wide">Not yet available</span>
            <span className="text-caption text-[var(--color-text-secondary)]">Available at launch</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-2">
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md font-semibold text-button"
          >
            Follow us
          </a>
          <p className="text-caption text-[var(--color-text-secondary)] text-center">
            Stay up to date with the latest Zapp news and launch updates.
          </p>
        </div>
      </div>
    </div>
  );
}
