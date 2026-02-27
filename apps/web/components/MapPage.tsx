"use client";

import { useState, useCallback, useMemo, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Plus, ChevronLeft, ChevronRight, List, Map, HelpCircle, X } from "lucide-react";
import Link from "next/link";
import type { Store } from "@/lib/database.types";
import FilterBar, { type FilterState } from "@/components/map/FilterBar";
import StorePanel from "@/components/map/StorePanel";
import StoreList from "@/components/map/StoreList";
import SearchBar from "@/components/map/SearchBar";
import { applyFilters } from "@/lib/filterStores";
import HelpModal from "@/components/HelpModal";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center bg-[var(--color-surface)]" style={{ height: "100dvh" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-body text-[var(--color-text-secondary)]">Loading map…</p>
      </div>
    </div>
  ),
});

interface MapPageProps {
  initialStores: Store[];
}

const DEFAULT_FILTERS: FilterState = {
  countries: [],
  citySearch: "",
  operators: [],
  statuses: [],
  showClosed: false,
  openNow: false,
  cryptoTypes: [],
};

export default function MapPage({ initialStores }: MapPageProps) {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center">Loading map…</div>}>
      <MapPageContent initialStores={initialStores} />
    </Suspense>
  );
}

function MapPageContent({ initialStores }: MapPageProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams?.get("status") ?? null;

  const initialFilters = useMemo(() => ({
    ...DEFAULT_FILTERS,
    statuses: statusParam ? [statusParam] : [],
  }), [statusParam]);

  const [stores, setStores] = useState<Store[]>(initialStores);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem("help_seen");
    if (!lastSeen) {
      setShowHelp(true);
    } else {
      const lastDate = new Date(lastSeen);
      const now = new Date();
      const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
      if (now.getTime() - lastDate.getTime() > oneMonth) {
        setShowHelp(true);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(false);

    async function fetchAllStores() {
      const allStores: Store[] = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const res = await fetch(`/api/stores?page=${page}&limit=200&_t=${Date.now()}`);
          const json = await res.json();

          if (!res.ok || json.error) {
            throw new Error(json.error ?? "Failed to fetch");
          }

          allStores.push(...json.data);
          totalPages = json.pagination.totalPages;
          page++;
        }

        console.log("[Client Fetch] Got", allStores.length, "stores across", page - 1, "page(s)");
        setStores(allStores);
      } catch (err) {
        console.error("[Client Fetch] Error:", err);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllStores();
  }, []);

  const filteredStores = useMemo(
    () => applyFilters(stores, filters),
    [stores, filters]
  );

  const handleSelectStore = useCallback((store: Store) => {
    setSelectedStore(store);
    setMobileView("map");
  }, []);

  const handleSearch = useCallback((lat: number, lng: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__mapFlyTo?.(lat, lng, 13);
  }, []);

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocationError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__mapFlyTo?.(latitude, longitude, 13);
      },
      () => setLocationError(true)
    );
  }, []);

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--color-bg)] relative">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden lg:flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300 flex-shrink-0 ${sidebarOpen ? "w-[360px]" : "w-0 overflow-hidden"
          }`}
      >
        {sidebarOpen && (
          <>
            {/* Logo + Add Store */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-title font-bold text-[var(--color-text-primary)]">
                  Just<span className="text-primary">Zapp</span>It
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHelp(true)}
                  className="p-1.5 rounded-md hover:bg-[var(--color-border)] transition-colors"
                  aria-label="How to contribute"
                >
                  <HelpCircle size={18} className="text-[var(--color-text-secondary)]" />
                </button>
                <Link
                  href="/add"
                  className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-md text-button font-semibold"
                >
                  <Plus size={15} />
                  Add Store
                </Link>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-[var(--color-border)]">
              <SearchBar onSearch={handleSearch} onLocateMe={handleLocateMe} />
            </div>

            {selectedStore ? (
              /* Store detail panel */
              <div className="flex-1 overflow-hidden flex flex-col">
                <StorePanel
                  store={selectedStore}
                  onClose={() => setSelectedStore(null)}
                />
              </div>
            ) : (
              /* Filter + List */
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Filter section */}
                <div className="px-4 py-4 border-b border-[var(--color-border)]">
                  <FilterBar
                    stores={stores}
                    filters={filters}
                    onChange={setFilters}
                  />
                </div>
                {/* Store count */}
                <div className="px-4 py-2 border-b border-[var(--color-border)] flex items-center justify-between">
                  <p className="text-caption text-[var(--color-text-secondary)]">
                    {isLoading ? "Loading..." : `${filteredStores.length} store${filteredStores.length !== 1 ? "s" : ""} shown`}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-caption text-primary hover:underline"
                  >
                    Refresh
                  </button>
                </div>
                {/* Store list */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <StoreList
                    stores={filteredStores}
                    selectedStore={selectedStore}
                    onSelectStore={handleSelectStore}
                    userLocation={userLocation}
                  />
                </div>
                {/* Legal Footer */}
                <div className="px-4 py-3 border-t border-[var(--color-border)] flex flex-wrap gap-x-4 gap-y-1 justify-center bg-[var(--color-bg)] text-[11px] text-[var(--color-text-secondary)]">
                  <Link href="/legal/disclaimer" className="hover:text-[var(--color-text-primary)] transition-colors">Disclaimer</Link>
                  <Link href="/legal/terms" className="hover:text-[var(--color-text-primary)] transition-colors">Terms</Link>
                  <Link href="/legal/privacy" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy</Link>
                  <Link href="/legal/content-policy" className="hover:text-[var(--color-text-primary)] transition-colors">Content Policy</Link>
                </div>
              </div>
            )}
          </>
        )}
      </aside>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={sidebarOpen}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-r-md p-1.5 shadow-md transition-all duration-300"
        style={{ left: sidebarOpen ? "360px" : "0px" }}
      >
        {sidebarOpen ? (
          <ChevronLeft size={18} className="text-[var(--color-text-secondary)]" />
        ) : (
          <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
        )}
      </button>

      {/* ── Map ── */}
      <main className="flex-1 relative">
        <h1 className="sr-only">JustZappIt - Find Physical Crypto Exchanges Near You</h1>
        <MapView
          stores={filteredStores}
          selectedStore={selectedStore}
          onSelectStore={handleSelectStore}
          showClosed={filters.showClosed}
        />

        {/* Mobile top bar */}
        <div className="lg:hidden absolute top-3 left-3 right-3 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Link href="/" className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-md">
              <span className="text-button font-bold text-[var(--color-text-primary)]">
                Just<span className="text-primary">Zapp</span>It
              </span>
            </Link>
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} onLocateMe={handleLocateMe} />
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md p-2 shadow-md flex-shrink-0"
              aria-label="How to contribute"
            >
              <HelpCircle size={18} className="text-[var(--color-text-secondary)]" />
            </button>
          </div>
        </div>

        {/* Inline error toasts */}
        {fetchError && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-3 shadow-lg text-body text-[var(--color-text-primary)] flex items-center gap-3">
            <span>Failed to load stores.</span>
            <button onClick={() => window.location.reload()} className="text-primary font-semibold underline text-button">
              Retry
            </button>
          </div>
        )}
        {locationError && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-3 shadow-lg text-body text-[var(--color-text-primary)] flex items-center gap-3">
            <span>Could not get your location. Please allow location access.</span>
            <button onClick={() => setLocationError(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Mobile store panel (bottom sheet) */}
        {selectedStore && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg)] rounded-t-lg shadow-2xl max-h-[70vh] overflow-y-auto">
            <div className="w-10 h-1 bg-[var(--color-border)] rounded-full mx-auto mt-3 mb-1" />
            <StorePanel
              store={selectedStore}
              onClose={() => setSelectedStore(null)}
            />
          </div>
        )}
      </main>

      {/* ── Mobile List View ── */}
      {mobileView === "list" && (
        <div className="lg:hidden flex-1 flex flex-col bg-[var(--color-bg)]">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <SearchBar onSearch={handleSearch} onLocateMe={handleLocateMe} />
          </div>
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <FilterBar stores={stores} filters={filters} onChange={setFilters} />
          </div>
          <p className="px-4 py-2 text-caption text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
            {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} shown
          </p>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <StoreList
              stores={filteredStores}
              selectedStore={selectedStore}
              onSelectStore={handleSelectStore}
              userLocation={userLocation}
            />
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-bg)] border-t border-[var(--color-border)] flex">
        {!selectedStore && (
          <>
            <button
              onClick={() => setMobileView("map")}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-caption font-semibold ${mobileView === "map" ? "text-primary" : "text-[var(--color-text-secondary)]"
                }`}
            >
              <Map size={20} />
              Map
            </button>
            <button
              onClick={() => setMobileView("list")}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-caption font-semibold ${mobileView === "list" ? "text-primary" : "text-[var(--color-text-secondary)]"
                }`}
            >
              <List size={20} />
              List
            </button>
            <Link
              href="/add"
              className="flex-1 flex flex-col items-center gap-1 py-3 text-caption font-semibold text-primary"
            >
              <Plus size={20} />
              Add Store
            </Link>
          </>
        )}
      </div>
      {showHelp && (
        <HelpModal
          onClose={() => {
            localStorage.setItem("help_seen", new Date().toISOString());
            setShowHelp(false);
          }}
        />
      )}
    </div>
  );
}
