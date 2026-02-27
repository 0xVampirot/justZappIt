"use client";

import { MapPin } from "lucide-react";
import type { Store } from "@/lib/database.types";

interface StoreListProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
  userLocation: { lat: number; lng: number } | null;
}

function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const STATUS_DOT: Record<string, string> = {
  seed_confirmed:     "bg-green-500",
  community_verified: "bg-blue-500",
  seed_partial:       "bg-yellow-400",
  unverified:         "bg-yellow-300",
  flagged:            "bg-orange-500",
  closed:             "bg-gray-400",
};

export default function StoreList({
  stores,
  selectedStore,
  onSelectStore,
  userLocation,
}: StoreListProps) {
  const sorted = userLocation
    ? [...stores].sort((a, b) => {
        const da = haversineKm(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const db = haversineKm(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return da - db;
      })
    : stores;

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <MapPin size={32} className="text-[var(--color-text-secondary)] mb-3" />
        <p className="text-body font-semibold text-[var(--color-text-primary)]">No stores found</p>
        <p className="text-caption text-[var(--color-text-secondary)] mt-1">
          Try adjusting your filters or search area.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-[var(--color-border)]">
      {sorted.map((store) => {
        const dist = userLocation
          ? haversineKm(userLocation.lat, userLocation.lng, store.lat, store.lng)
          : null;
        const isSelected = selectedStore?.id === store.id;
        const dot = STATUS_DOT[store.verification_status] ?? "bg-gray-400";

        return (
          <button
            key={store.id}
            onClick={() => onSelectStore(store)}
            className={`w-full text-left px-4 py-3 transition-colors hover:bg-[var(--color-surface)] ${
              isSelected ? "bg-primary/5 border-l-2 border-primary" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-body font-semibold text-[var(--color-text-primary)] truncate">
                  {store.operator_name}
                </p>
                <p className="text-caption text-[var(--color-text-secondary)] truncate">
                  {store.city}, {store.country}
                </p>
                {dist !== null && (
                  <p className="text-caption text-primary font-semibold mt-0.5">
                    {dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km`} away
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
