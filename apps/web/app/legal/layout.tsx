import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 rounded-md hover:bg-[var(--color-border)] transition-colors">
              <ArrowLeft size={20} className="text-[var(--color-text-secondary)]" />
            </Link>
            <Link href="/" className="text-title font-bold text-[var(--color-text-primary)]">
              Just<span className="text-primary">Zapp</span>It
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 prose prose-neutral dark:prose-invert">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-auto">
        <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between text-caption text-[var(--color-text-secondary)]">
          <p>© 2026 JustZappIt</p>
          <div className="flex gap-4">
            <Link href="/legal/disclaimer" className="hover:text-[var(--color-text-primary)] transition-colors">Disclaimer</Link>
            <Link href="/legal/terms" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</Link>
            <Link href="/legal/content-policy" className="hover:text-[var(--color-text-primary)] transition-colors">Content Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
