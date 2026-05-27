/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PointOfInterest {
  id: string;
  name: string;
  category: 'tourist' | 'restaurant' | 'hotel' | 'school' | 'airport' | 'other';
  coordinates: [number, number];
  description: string;
}

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: "ashwem-beach",
    name: "Ashwem Beach",
    category: "tourist",
    coordinates: [15.642115, 73.718267],
    description: ""
  },
  {
    id: "mandrem-beach",
    name: "Mandrem Beach",
    category: "tourist",
    coordinates: [15.658731, 73.713360],
    description: ""
  },
  {
    id: "thalasa-resort",
    name: "Thalasa Beach Resort",
    category: "hotel",
    coordinates: [15.641522, 73.718968],
    description: ""
  },
  {
    id: "leela-cottages",
    name: "Leela Cottages",
    category: "hotel",
    coordinates: [15.642075, 73.719562],
    description: ""
  },
  {
    id: "latelier-restaurant",
    name: "L'Atelier - Seaside Restaurant",
    category: "restaurant",
    coordinates: [15.645138, 73.717622],
    description: ""
  },
  {
    id: "farzi-cafe",
    name: "Farzi Beach Café",
    category: "restaurant",
    coordinates: [15.637612, 73.721381],
    description: ""
  },
  {
    id: "saz-cafe",
    name: "Saz on the Beach",
    category: "restaurant",
    coordinates: [15.636872, 73.721115],
    description: ""
  },
  {
    id: "blue-turtle",
    name: "Blue Turtle Beach Bar & Café",
    category: "restaurant",
    coordinates: [15.633270, 73.722840],
    description: ""
  },
  {
    id: "iskcon-temple",
    name: "ISKCON Temple",
    category: "other",
    coordinates: [15.635559, 73.723793],
    description: ""
  }
];

export interface CategoryMetadata {
  id: 'all' | 'tourist' | 'restaurant' | 'hotel' | 'school' | 'airport' | 'other';
  label: string;
  color: string;
  svgInner: string;
}

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'all',
    label: 'All Pins',
    color: '#1C3322', // Forest Velvet Green
    svgInner: `<circle cx="16" cy="12" r="3" fill="#FFFFFF"/>`
  },
  {
    id: 'tourist',
    label: 'Tourist Spots',
    color: '#134D37', // Genuine deep forest green matching the screenshot exactly
    svgInner: `
      <circle cx="16" cy="12" r="3.2" fill="#FFFFFF"/>
      <circle cx="16" cy="12" r="1.2" fill="#134D37"/>
    `
  },
  {
    id: 'restaurant',
    label: 'Restaurants & Cafes',
    color: '#9E242B', // Luxurious Crimson Vermilion instead of bright red
    svgInner: `
      <g stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
        <path d="M13 16V13M11 9v2.5a2 2 0 0 0 1.5 1.95V16" />
        <path d="M13 9v2.5M15 9v2.5" />
        <path d="M19 16V9c0 0-2 .5-2 2.5V16" />
      </g>
    `
  },
  {
    id: 'hotel',
    label: 'Hotels',
    color: '#801831', // Deep Burgundy Wine Royale instead of generic magenta
    svgInner: `
      <g stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
        <path d="M10 16v-6M22 16v-4a2 2 0 0 0-2-2H12a2 2 0 0 0-2 2v4" />
        <path d="M10 13h12" />
        <rect x="11.5" y="10.5" width="4" height="2" rx="0.5" fill="#FFFFFF" stroke="none" />
        <rect x="16.5" y="10.5" width="4" height="2" rx="0.5" fill="#FFFFFF" stroke="none" />
      </g>
    `
  },
  {
    id: 'school',
    label: 'Schools',
    color: '#172E47', // Midnight Navy Blue
    svgInner: `
      <g stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
        <polygon points="16,8.5 22,11 16,13.5 10,11" fill="#FFFFFF" fill-opacity="0.15"/>
        <path d="M12 12v2c0 1 1.5 1.5 4 1.5s4-.5 4-1.5v-2" />
        <path d="M20 11v3.5" />
      </g>
    `
  },
  {
    id: 'airport',
    label: 'Airports',
    color: '#25508a', // Slate Blue
    svgInner: `
      <g stroke="#FFFFFF" stroke-width="1.2" fill="#FFFFFF" fill-opacity="0.15" opacity="0.95">
        <path d="M16 8l-1 2H12l2 2h-1.5l-1 1h2.5v2h2v-2h2.5l-1-1H18l2-2h-3L16 8z"/>
      </g>
    `
  },
  {
    id: 'other',
    label: 'Other Spots',
    color: '#55584D', // Antique Charcoal Grey
    svgInner: `
      <g stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
        <path d="M16 8l3 3.5h-6z" fill="#FFFFFF" stroke="none" />
        <path d="M10 16h12v-3a2 2 0 0 0-2-2H12a2 2 0 0 0-2 2zm3-5V9.5a3 3 0 0 1 6 0V11" />
        <circle cx="16" cy="13.5" r="1.2" fill="#FFFFFF" stroke="none" />
      </g>
    `
  }
];
