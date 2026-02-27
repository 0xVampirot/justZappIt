// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState, useEffect, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import type { Store } from "@/lib/database.types";
import { inputClass } from "@/lib/classNames";

export interface FilterState {
  countries: string[];
  citySearch: string;
  operators: string[];
  statuses: string[];
  showClosed: boolean;
  openNow: boolean;
  cryptoTypes: string[];
}

interface FilterBarProps {
  stores: Store[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const CRYPTO_OPTIONS = ["BTC", "ETH", "USDT", "ZEC", "Other"];
const STATUS_OPTIONS = [
  { value: "seed_confirmed", label: "Verified" },
  { value: "community_verified", label: "Community Verified" },
  { value: "seed_partial", label: "Partial" },
  { value: "unverified", label: "Unverified" },
  { value: "flagged", label: "Flagged" },
];

export default function FilterBar({ stores, filters, onChange }: FilterBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [operatorOpen, setOperatorOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [drawerOpen]);

  const countries = useMemo(
    () => [...new Set(stores.map((s) => s.country))].sort(),
    [stores]
  );
  const operators = useMemo(
    () => [...new Set(stores.map((s) => s.operator_name))].sort(),
    [stores]
  );

  const activeCount = [
    filters.countries.length > 0,
    filters.citySearch.length > 0,
    filters.operators.length > 0,
    filters.statuses.length > 0,
    filters.showClosed,
    filters.openNow,
    filters.cryptoTypes.length > 0,
  ].filter(Boolean).length;

  function toggleArray<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  function clearAll() {
    onChange({
      countries: [],
      citySearch: "",
      operators: [],
      statuses: [],
      showClosed: false,
      openNow: false,
      cryptoTypes: [],
    });
  }

  const filterContent = (
    <div className="flex flex-col gap-4">
      {/* City search */}
      <div>
        <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
          City / Region
        </label>
        <input
          type="text"
          placeholder="Search city..."
          value={filters.citySearch}
          onChange={(e) => onChange({ ...filters, citySearch: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* Country multi-select */}
      <div className="relative">
        <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
          Country
        </label>
        <button
          onClick={() => setCountryOpen((o) => !o)}
          className="w-full flex items-center justify-between border border-[var(--color-border)] rounded-md px-3 py-2 text-body bg-[var(--color-bg)] text-[var(--color-text-primary)]"
        >
          <span>
            {filters.countries.length === 0
              ? "All countries"
              : filters.countries.join(", ")}
          </span>
          <ChevronDown size={16} />
        </button>
        {countryOpen && (
          <div className="absolute z-50 mt-1 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg max-h-48 overflow-y-auto">
            {countries.map((c) => (
              <label key={c} className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--color-bg)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.countries.includes(c)}
                  onChange={() => onChange({ ...filters, countries: toggleArray(filters.countries, c) })}
                  className="accent-primary"
                />
                <span className="text-body text-[var(--color-text-primary)]">{c}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Operator multi-select */}
      <div className="relative">
        <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">
          Operator
        </label>
        <button
          onClick={() => setOperatorOpen((o) => !o)}
          className="w-full flex items-center justify-between border border-[var(--color-border)] rounded-md px-3 py-2 text-body bg-[var(--color-bg)] text-[var(--color-text-primary)]"
        >
          <span>
            {filters.operators.length === 0
              ? "All operators"
              : `${filters.operators.length} selected`}
          </span>
          <ChevronDown size={16} />
        </button>
        {operatorOpen && (
          <div className="absolute z-50 mt-1 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg max-h-48 overflow-y-auto">
            {operators.map((op) => (
              <label key={op} className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--color-bg)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.operators.includes(op)}
                  onChange={() => onChange({ ...filters, operators: toggleArray(filters.operators, op) })}
                  className="accent-primary"
                />
                <span className="text-body text-[var(--color-text-primary)]">{op}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Status checkboxes */}
      <div>
        <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => onChange({ ...filters, statuses: toggleArray(filters.statuses, s.value) })}
              className={`px-3 py-1 rounded-sm text-caption border transition-colors ${
                filters.statuses.includes(s.value)
                  ? "bg-primary border-primary text-white"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crypto type chips */}
      <div>
        <label className="block text-caption font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
          Accepts Crypto
        </label>
        <div className="flex flex-wrap gap-2">
          {CRYPTO_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...filters, cryptoTypes: toggleArray(filters.cryptoTypes, c) })}
              className={`px-3 py-1 rounded-sm text-caption border transition-colors ${
                filters.cryptoTypes.includes(c)
                  ? "bg-primary border-primary text-white"
                  : "border-primary text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={filters.openNow}
            onClick={() => onChange({ ...filters, openNow: !filters.openNow })}
            className={`w-10 h-6 rounded-full transition-colors relative ${filters.openNow ? "bg-primary" : "bg-[var(--color-border)]"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${filters.openNow ? "translate-x-5" : "translate-x-1"}`} />
          </button>
          <span className="text-body text-[var(--color-text-primary)]">Open now</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={filters.showClosed}
            onClick={() => onChange({ ...filters, showClosed: !filters.showClosed })}
            className={`w-10 h-6 rounded-full transition-colors relative ${filters.showClosed ? "bg-primary" : "bg-[var(--color-border)]"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${filters.showClosed ? "translate-x-5" : "translate-x-1"}`} />
          </button>
          <span className="text-body text-[var(--color-text-primary)]">Show closed stores</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="text-body text-primary underline text-left"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filter sidebar trigger — shown inside sidebar, not here */}
      {/* Mobile filter button */}
      <div className="lg:hidden fixed bottom-6 right-4 z-30">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-md shadow-lg font-semibold text-button"
        >
          <SlidersHorizontal size={18} />
          Filters
          {activeCount > 0 && (
            <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-caption font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative bg-[var(--color-bg)] rounded-t-lg p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-title font-bold text-[var(--color-text-primary)]">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">
                <X size={22} className="text-[var(--color-text-secondary)]" />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full bg-primary text-white py-3 rounded-md font-semibold text-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Desktop inline filter panel (rendered inside sidebar) */}
      <div className="hidden lg:block">{filterContent}</div>
    </>
  );
}
