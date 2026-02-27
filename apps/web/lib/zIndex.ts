// SPDX-License-Identifier: AGPL-3.0-only

/**
 * Named z-index scale for the app.
 *
 * Layer order (low to high):
 *   map          (z-0)   - Leaflet map canvas
 *   mapControls  (z-10)  - Mobile top bar, search, filter dropdowns
 *   sidebar      (z-20)  - Sidebar toggle, toasts, error banners
 *   mobileNav    (z-30)  - Bottom nav bar, filter FAB
 *   bottomSheet  (z-40)  - Mobile store panel
 *   overlay      (z-50)  - Modals, drawers, cookie consent
 *   topModal     (z-[9999]) - Help modal (above everything)
 */
export const Z = {
  map: "z-0",
  mapControls: "z-10",
  sidebar: "z-20",
  mobileNav: "z-30",
  bottomSheet: "z-40",
  overlay: "z-50",
  topModal: "z-[9999]",
} as const;
