/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VillaData, TunerConfig } from './types';

// Configured with clean local paths under /public/assets/ with robust SVG fallback defaults
export const ASSETS = {
  sitePlan: '/assets/siteplan/site-plan.png',
  fallbackSitePlan: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23234D3B" opacity="0.1"/><rect width="100%" height="100%" fill="none" stroke="%23257057" stroke-width="6" stroke-dasharray="12 12"/><line x1="0" y1="0" x2="800" y2="600" stroke="%23257057" stroke-width="2" opacity="0.3"/><line x1="800" y1="0" x2="0" y2="600" stroke="%23257057" stroke-width="2" opacity="0.3"/><circle cx="400" cy="300" r="120" fill="none" stroke="%23d9e8c0" stroke-width="3" stroke-dasharray="6 6"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="22" fill="%23ffffff" font-weight="bold">Ashwem Phase 1 · Vianaar</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23d9e8c0">Please upload site-plan.png under /public/assets/siteplan/</text><text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23eeeeee" opacity="0.8">Or load a site plan directly via the "Upload site plan drawing" control in the Tuner board</text></svg>',
  
  renderErmida: '/assets/renders/render-ermida.png',
  fallbackRenderErmida: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23302F2C"/><rect width="90%" height="90%" x="5%" y="5%" fill="none" stroke="%23E3D5C9" stroke-width="1" opacity="0.4"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23E3D5C9" font-weight="bold">La Ermida Render Placeholder</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23D9E8C0">Upload render-ermida.png to /public/assets/renders/ to show villa renders</text></svg>',
  
  renderRibera: '/assets/renders/render-ribera.png',
  fallbackRenderRibera: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23302F2C"/><rect width="90%" height="90%" x="5%" y="5%" fill="none" stroke="%23E3D5C9" stroke-width="1" opacity="0.4"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23E3D5C9" font-weight="bold">La Ribera Render Placeholder</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23D9E8C0">Upload render-ribera.png to /public/assets/renders/ to show villa renders</text></svg>',
  
  floorPlanErmida: '/assets/floorplans/floorplan-ermida.png',
  fallbackFloorPlanErmida: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23FFFEF7"/><rect width="90%" height="90%" x="5%" y="5%" fill="none" stroke="%23257057" stroke-width="2" stroke-dasharray="10 10"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23234D3B" font-weight="bold">La Ermida Floor Plan Placeholder</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23257057">Upload floorplan-ermida.png to /public/assets/floorplans/ to show layout</text></svg>',
  
  floorPlanRibera: '/assets/floorplans/floorplan-ribera.png',
  fallbackFloorPlanRibera: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23FFFEF7"/><rect width="90%" height="90%" x="5%" y="5%" fill="none" stroke="%23257057" stroke-width="2" stroke-dasharray="10 10"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23234D3B" font-weight="bold">La Ribera Floor Plan Placeholder</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23257057">Upload floorplan-ribera.png to /public/assets/floorplans/ to show layout</text></svg>',
};

export const DEFAULT_TUNER_CONFIG: TunerConfig = {
  lat: 15.643613,
  lng: 73.723982,
  widthM: 232,
  heightM: 123,
  rotation: -5.5,
  opacity: 0.9,
};

export const DEVELOPMENT_SPECS = {
  title: "Ashwem Phase 1",
  developer: "Vianaar",
  location: "Ashwem, North Goa",
  pinCoordinates: [15.643613, 73.723982] as [number, number],
  distanceToBeach: "800 meters (5 mins stroll)",
  totalLandArea: "1.8 Acres",
  totalUnits: "37 Exclusive Boutique Villas",
  completionDate: "December 2027",
  overview: "Ashwem Phase 1 represents our signature Goan architectural philosophy: a refined blend of premium modern minimalist geometries with earth-honest Portuguese-Goan craft textures. Using local terracotta columns, hand-chiseled basalt, double-gabled clay-tile heights, and sweeping views of lush palm groves, we create an immersive ecological santurary to restore your senses.",
  localHighlights: [
    { name: "Ashwem Beachfront", detail: "Clean white sands & pristine tides favored by nesting turtles and surfers." },
    { name: "La Plage & Olive", detail: "Exquisite culinary icons right on the edge of the Arabian Sea." },
    { name: "Mandrem Secret Backwaters", detail: "Serene mangrove channels teeming with tropical birdlife." },
    { name: "Mopa Airport (GOX)", detail: "Smooth 35-minute drive via the high-speed northern expressway." }
  ]
};

export const VILLAS: VillaData[] = [
  {
    id: "la-ermida",
    name: "La Ermida",
    sub: "Classical Chapel-Inspired Pavilion",
    description: "Imbued with the timeless symmetry of Goan interior chapels, La Ermida features high vaulted double-height wooden ceilings, cool white plaster walls, and an arched entry corridor that frames the private limestone swimming pool.",
    bedrooms: 3,
    bathrooms: 3.5,
    sizeSqFt: 3450,
    renderUrl: ASSETS.renderErmida,
    floorPlanUrl: ASSETS.floorPlanErmida,
    coordinates: [15.643720, 73.722920],
    highlights: [
      "Vaulted 6.5-meter clearance ceilings in living salon",
      "Private 8-meter organic green-slate pool with outdoor shower",
      "Traditional handcrafted terrazzo terracotta bathroom tiles",
      "Custom timber louvers for natural cross-breeze ventilation"
    ],
    specifications: {
      structure: "Earthquake-resistant RC monolithic framework with traditional high dry-stone foundation wrapping.",
      flooring: "Artisanal hand-cast green dynamic terrazzo in private areas; polished local Goan beige limestone in public decks.",
      doorsWindows: "A-Grade Burmese teakwood frames fitted with high-performance double-glazed solar filter panes.",
      sanitaryware: "Handcarved solid granite basin sinks paired with water-efficient brushed bronze Kohler fixtures.",
      kitchen: "Exquisite seamless quartz countertops, fully customized modular oak shutter cabinets, and state-of-the-art Italian gas range.",
      swimmingPool: "Laminated dark emerald-quartz tiles with water filtration, perimeter wood seating deck, and natural micro-plaster steps."
    }
  },
  {
    id: "la-ribera",
    name: "La Ribera",
    sub: "Sustainable Riverfront Oasis",
    description: "Designed to float harmoniously along the coastal creek curves, La Ribera utilizes sweeping wrap-around cantilevers, gorgeous hand-cut volcanic stone cladding, and double-tiered sun-decks engineered to maximize the soothing breeze.",
    bedrooms: 4,
    bathrooms: 4.5,
    sizeSqFt: 4620,
    renderUrl: ASSETS.renderRibera,
    floorPlanUrl: ASSETS.floorPlanRibera,
    coordinates: [15.643350, 73.723220],
    highlights: [
      "Panoramic wrap-around wooden deck suspended over landscaping",
      "Master bedroom with custom walk-in rain closet and river balcony",
      "Exterior hand-chiseled local Goan terracotta brick facades",
      "Full solar grid tile integration and dual water collection loop"
    ],
    specifications: {
      structure: "Exposed architectural-grade fair-faced concrete with micro-plaster organic clay coats.",
      flooring: "Handcut ivory-white river stone mosaic panels paired with premium treated ashwood planks.",
      doorsWindows: "Ultra-slim charcoal matte aluminum sliding screens spanning floor-to-ceiling.",
      sanitaryware: "Gessi handcrafted matte charcoal tapware and premium bespoke white marble monolithic tubs.",
      kitchen: "Fully integrated professional chef's kitchen featuring soft-close walnut finishes and Miele culinary suites.",
      swimmingPool: "Infinity edge salt-chlorinated structure lined with custom hand-glazed turquoise pottery tiles."
    }
  }
];
