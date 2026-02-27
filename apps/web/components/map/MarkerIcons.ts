export type MarkerStyle =
  | "seed_confirmed"
  | "seed_partial"
  | "community_verified"
  | "unverified"
  | "flagged"
  | "approximate";

const PIN_SIZE: [number, number] = [28, 36];
const PIN_ANCHOR: [number, number] = [14, 36];
const POPUP_ANCHOR: [number, number] = [0, -36];

function makeSvgPin(fill: string, stroke: string, opacity = 1): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
      fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="2"/>
    <circle cx="14" cy="14" r="5" fill="white" fill-opacity="0.9"/>
  </svg>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createIcon(L: any, style: MarkerStyle): unknown {
  const configs: Record<MarkerStyle, { fill: string; stroke: string; opacity?: number }> = {
    seed_confirmed:     { fill: "#22c55e", stroke: "#16a34a" },
    community_verified: { fill: "#3b82f6", stroke: "#1d4ed8" },
    seed_partial:       { fill: "#facc15", stroke: "#ca8a04", opacity: 0.85 },
    unverified:         { fill: "#facc15", stroke: "#ca8a04", opacity: 0.7 },
    flagged:            { fill: "#f97316", stroke: "#c2410c" },
    approximate:        { fill: "#9ca3af", stroke: "#6b7280" },
  };

  const { fill, stroke, opacity = 1 } = configs[style];

  return L.divIcon({
    html: makeSvgPin(fill, stroke, opacity),
    className: "",
    iconSize: PIN_SIZE,
    iconAnchor: PIN_ANCHOR,
    popupAnchor: POPUP_ANCHOR,
  });
}

export function getMarkerIcon(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  L: any,
  status: string,
  isApproximate: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  if (isApproximate) {
    if (!ICONS["approximate"]) ICONS["approximate"] = createIcon(L, "approximate");
    return ICONS["approximate"];
  }

  const style = status as MarkerStyle;
  if (!ICONS[style]) ICONS[style] = createIcon(L, style);
  return ICONS[style];
}
