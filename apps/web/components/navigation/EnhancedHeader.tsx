// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [educationDropdownOpen, setEducationDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  return (
    <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-[var(--color-text-primary)] font-bold text-xl">
              JustZappIt ⚡️
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Education Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setEducationDropdownOpen(true)}
                onMouseLeave={() => setEducationDropdownOpen(false)}
                className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
              >
                Education
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {educationDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg py-2 mt-1"
                  onMouseEnter={() => setEducationDropdownOpen(true)}
                  onMouseLeave={() => setEducationDropdownOpen(false)}
                >
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/guides"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Country Guides
                  </Link>
                  <Link
                    href="/verification"
                    className="block px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Safety Guide
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setResourcesDropdownOpen(true)}
                onMouseLeave={() => setResourcesDropdownOpen(false)}
                className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {resourcesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg py-2 mt-1"
                  onMouseEnter={() => setResourcesDropdownOpen(true)}
                  onMouseLeave={() => setResourcesDropdownOpen(false)}
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
                <div className="text-[var(--color-text-primary)] font-semibold mb-2">Education</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/blog"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/guides"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Country Guides
                  </Link>
                  <Link
                    href="/verification"
                    className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Safety Guide
                  </Link>
                </div>
              </div>

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
