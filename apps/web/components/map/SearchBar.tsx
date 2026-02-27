// SPDX-License-Identifier: AGPL-3.0-only
"use client";

import { useState, useRef } from "react";
import { Search, LocateFixed, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (lat: number, lng: number, label: string) => void;
  onLocateMe: () => void;
}

export default function SearchBar({ onSearch, onLocateMe }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        onSearch(parseFloat(data[0].lat), parseFloat(data[0].lon), data[0].display_name);
      } else {
        setError("Location not found. Try a different search.");
      }
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md shadow-md px-3 py-2">
      <Search size={18} className="text-[var(--color-text-secondary)] flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search city or address..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setError(null); }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 bg-transparent text-body text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none min-w-0"
      />
      {query && (
        <button onClick={() => { setQuery(""); inputRef.current?.focus(); }}>
          <X size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      )}
      <button
        onClick={handleSearch}
        disabled={loading || !query.trim()}
        className="bg-primary text-white px-3 py-1.5 rounded-md text-button font-semibold disabled:opacity-50 flex-shrink-0"
      >
        {loading ? "..." : "Go"}
      </button>
      <button
        onClick={onLocateMe}
        title="Find Near Me"
        className="p-1.5 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors flex-shrink-0"
      >
        <LocateFixed size={18} className="text-primary" />
      </button>
      {error && (
        <p className="absolute top-full mt-1 left-0 right-0 text-caption text-red-500 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-md">
          {error}
        </p>
      )}
    </div>
  );
}
