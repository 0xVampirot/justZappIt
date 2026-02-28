// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  return (
    <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-[var(--color-text-primary)] font-bold text-xl">
              {/* Logo intentionally left blank - sidebar contains logo */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {resourcesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg py-2 mt-1"
                >
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/legal/privacy"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Legal
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] py-4">
            <nav className="flex flex-col space-y-4">
              <div>
                <div className="text-[var(--color-text-primary)] font-semibold mb-2">Resources</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/faq"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/about"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <Link
                href="/legal/privacy"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Legal
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
