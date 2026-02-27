// SPDX-License-Identifier: AGPL-3.0-only

export type VerificationStatus =
  | "seed_confirmed"
  | "community_verified"
  | "seed_partial"
  | "unverified"
  | "flagged"
  | "closed";

interface StatusConfig {
  label: string;
  /** Tailwind text color class */
  textColor: string;
  /** Tailwind bg color class for dot indicators */
  dotColor: string;
  /** Hex fill color for SVG markers */
  markerFill: string;
  /** Hex stroke color for SVG markers */
  markerStroke: string;
  /** Opacity for SVG markers */
  markerOpacity: number;
}

export const STATUS_CONFIG: Record<VerificationStatus, StatusConfig> = {
  seed_confirmed: {
    label: "Verified",
    textColor: "text-green-600",
    dotColor: "bg-green-500",
    markerFill: "#22c55e",
    markerStroke: "#16a34a",
    markerOpacity: 1,
  },
  community_verified: {
    label: "Community Verified",
    textColor: "text-blue-600",
    dotColor: "bg-blue-500",
    markerFill: "#3b82f6",
    markerStroke: "#1d4ed8",
    markerOpacity: 1,
  },
  seed_partial: {
    label: "Partial Info",
    textColor: "text-yellow-600",
    dotColor: "bg-yellow-400",
    markerFill: "#facc15",
    markerStroke: "#ca8a04",
    markerOpacity: 0.85,
  },
  unverified: {
    label: "Unverified",
    textColor: "text-yellow-500",
    dotColor: "bg-yellow-300",
    markerFill: "#facc15",
    markerStroke: "#ca8a04",
    markerOpacity: 0.7,
  },
  flagged: {
    label: "Flagged",
    textColor: "text-orange-500",
    dotColor: "bg-orange-500",
    markerFill: "#f97316",
    markerStroke: "#c2410c",
    markerOpacity: 1,
  },
  closed: {
    label: "Closed",
    textColor: "text-gray-400",
    dotColor: "bg-gray-400",
    markerFill: "#9ca3af",
    markerStroke: "#6b7280",
    markerOpacity: 1,
  },
};

/** Fallback for unknown statuses */
export const DEFAULT_STATUS = STATUS_CONFIG.unverified;
