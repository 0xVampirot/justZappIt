"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Store } from "@/lib/database.types";
import { getMarkerIcon } from "./MarkerIcons";

interface MapViewProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store) => void;
  showClosed: boolean;
}

export default function MapView({
  stores,
  selectedStore,
  onSelectStore,
  showClosed,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerMapRef = useRef<Map<string, any>>(new Map());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);

  // ── Effect 1: initialise map once ────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    const currentMapNode = mapRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (leafletMapRef.current || (currentMapNode as any)._leaflet_id) return;

    let cancelled = false;

    (async () => {
      await import("leaflet/dist/leaflet.css");
      await import("leaflet.markercluster/dist/MarkerCluster.css");
      await import("leaflet.markercluster/dist/MarkerCluster.Default.css");
      const L = (await import("leaflet")).default;
      await import("leaflet.markercluster");

      if (cancelled) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (leafletMapRef.current || (mapRef.current as any)._leaflet_id) return;

      leafletRef.current = L;

      const map = L.map(mapRef.current!, {
        center: [20, 0],
        zoom: 3,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clusterGroup = (L as any).markerClusterGroup({
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      map.addLayer(clusterGroup);
      leafletMapRef.current = map;
      markersLayerRef.current = clusterGroup;

      // Expose flyTo globally for SearchBar / LocateMe
      (window as unknown as Record<string, unknown>).__mapFlyTo = (
        lat: number,
        lng: number,
        zoom = 14
      ) => {
        leafletMapRef.current?.flyTo([lat, lng], zoom, { duration: 0.8 });
      };
    })();

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      markersLayerRef.current = null;
      leafletRef.current = null;
      if (currentMapNode) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (currentMapNode as any)._leaflet_id = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Effect 2: update markers whenever stores / showClosed change ──────────
  const updateMarkers = useCallback(
    (storeList: Store[], showClosedStores: boolean) => {
      const L = leafletRef.current;
      const clusterGroup = markersLayerRef.current;
      if (!leafletMapRef.current || !clusterGroup || !L) return;

      clusterGroup.clearLayers();
      markerMapRef.current.clear();

      const visible = storeList.filter(
        (s) => showClosedStores || s.verification_status !== "closed"
      );

      visible.forEach((store) => {
        const icon = getMarkerIcon(L, store.verification_status, store.is_approximate);
        const marker = L.marker([store.lat, store.lng], { icon });
        marker.on("click", () => onSelectStore(store));
        clusterGroup.addLayer(marker);
        markerMapRef.current.set(store.id, marker);
      });
    },
    [onSelectStore]
  );

  useEffect(() => {
    // If map isn't ready yet, poll briefly then update
    if (!leafletMapRef.current || !markersLayerRef.current) {
      const timer = setTimeout(() => updateMarkers(stores, showClosed), 300);
      return () => clearTimeout(timer);
    }
    updateMarkers(stores, showClosed);
  }, [stores, showClosed, updateMarkers]);

  // ── Effect 3: fly to selected store ──────────────────────────────────────
  useEffect(() => {
    if (!selectedStore || !leafletMapRef.current) return;
    leafletMapRef.current.flyTo([selectedStore.lat, selectedStore.lng], 16, {
      duration: 0.8,
    });
  }, [selectedStore]);

  return (
    <div
      ref={mapRef}
      className="w-full"
      style={{ height: "100dvh" }}
      aria-label="Store map"
    />
  );
}
