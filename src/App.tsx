/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Sliders, 
  Sparkles, 
  Check, 
  Move, 
  Upload, 
  Copy, 
  Info, 
  Eye, 
  EyeOff, 
  RotateCw, 
  BookOpen, 
  Maximize2, 
  Clock, 
  ExternalLink,
  Smartphone,
  CheckCircle,
  HelpCircle,
  X,
  Plus,
  Minus,
  Menu
} from 'lucide-react';
import { VILLAS, DEVELOPMENT_SPECS, DEFAULT_TUNER_CONFIG, ASSETS } from './data';
import { TunerConfig, VillaData } from './types';
import { POINTS_OF_INTEREST, CATEGORIES, PointOfInterest, CategoryMetadata } from './poiData';

// Gorgeous fallback floor plan drawings rendered using pure vector SVGs
function generateFallbackFloorPlanSVG(
  villaNum: string,
  dimensionMode: "With" | "Without",
  floorLevel: "Ground Floor" | "First Floor"
): string {
  const isWith = dimensionMode === "With";
  const isGF = floorLevel === "Ground Floor";

  const compassSvg = `
    <g transform="translate(730, 80) scale(0.6)">
      <circle cx="0" cy="0" r="30" fill="none" stroke="%23302F2C" stroke-width="1.5" />
      <line x1="0" y1="-40" x2="0" y2="40" stroke="%23302F2C" stroke-width="1.5" />
      <line x1="-40" y1="0" x2="40" y2="0" stroke="%23302F2C" stroke-width="1.5" />
      <polygon points="0,-35 -8,-5 0,0" fill="%23234D3B" />
      <polygon points="0,-35 8,-5 0,0" fill="%23AA783B" />
      <polygon points="0,35 -8,5 0,0" fill="%23302F2C" opacity="0.6" />
      <polygon points="0,35 8,5 0,0" fill="%23302F2C" opacity="0.4" />
      <text x="0" y="-45" font-family="serif" font-size="16" font-weight="bold" fill="%23302F2C" text-anchor="middle">N</text>
    </g>
  `;

  const gfPlan = `
    <!-- Entrance Yard & Parking -->
    <rect x="80" y="380" width="100" height="90" fill="%23E3D5C9" opacity="0.15" stroke="%23302F2C" stroke-width="1" stroke-dasharray="3 3" />
    <text x="130" y="425" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%23302F2C" opacity="0.5">CAR PORCH</text>
    ${isWith ? `<text x="130" y="440" text-anchor="middle" font-family="monospace" font-size="9" fill="%23AA783B">5.10 x 2.80</text>` : ''}

    <rect x="180" y="320" width="80" height="150" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="220" y="390" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23302F2C" font-weight="bold">ENTRANCE</text>
    <path d="M 180,450 A 50,50 0 0,1 230,470" fill="none" stroke="%23302F2C" stroke-width="1" />

    <!-- Kitchen -->
    <rect x="260" y="150" width="120" height="120" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="320" y="200" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23302F2C" font-weight="bold">KITCHEN</text>
    ${isWith ? `<text x="320" y="215" text-anchor="middle" font-family="monospace" font-size="10" fill="%23AA783B">2.84 x 3.22 m</text>` : ''}
    <rect x="260" y="150" width="120" height="20" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="280" cy="160" r="5" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="340" cy="160" r="4" fill="none" stroke="%23302F2C" stroke-width="1" />

    <!-- Dining Space -->
    <rect x="380" y="150" width="160" height="120" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="460" y="200" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23302F2C" font-weight="bold">DINING ROOM</text>
    ${isWith ? `<text x="460" y="215" text-anchor="middle" font-family="monospace" font-size="10" fill="%23AA783B">4.50 x 3.22 m</text>` : ''}
    <circle cx="460" cy="170" r="16" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="435" cy="170" r="4" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="485" cy="170" r="4" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="460" cy="145" r="4" fill="none" stroke="%23302F2C" stroke-width="1" />
    <circle cx="460" cy="195" r="4" fill="none" stroke="%23302F2C" stroke-width="1" />

    <!-- Living Lounge -->
    <rect x="260" y="270" width="280" height="150" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="400" y="335" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23302F2C" font-weight="bold">LIVING SALON</text>
    ${isWith ? `<text x="400" y="352" text-anchor="middle" font-family="monospace" font-size="10" fill="%23AA783B">6.40 x 4.20 m</text>` : ''}
    <rect x="280" y="290" width="130" height="25" fill="none" stroke="%23302F2C" stroke-width="1" rx="4" />

    <!-- Staircase -->
    <rect x="180" y="230" width="80" height="90" fill="none" stroke="%23302F2C" stroke-width="1.5" />
    <text x="220" y="275" text-anchor="middle" font-family="sans-serif" font-size="9" fill="%23302F2C" opacity="0.6">STAIRCASE</text>
    <line x1="180" y1="250" x2="260" y2="250" stroke="%23302F2C" stroke-width="1" />
    <line x1="180" y1="270" x2="260" y2="270" stroke="%23302F2C" stroke-width="1" />
    <line x1="180" y1="290" x2="260" y2="290" stroke="%23302F2C" stroke-width="1" />

    <!-- Verandah -->
    <rect x="540" y="150" width="70" height="270" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="575" y="280" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23302F2C" font-weight="bold" transform="rotate(90 575 280)">VERANDAH</text>

    <!-- Garden & Pool Area -->
    <rect x="610" y="150" width="160" height="270" fill="%23D9E8C0" opacity="0.25" stroke="%23257057" stroke-width="1.5" />
    <text x="690" y="380" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23234D3B" font-weight="bold">GARDEN DECK</text>
    
    <!-- Swimming Pool -->
    <rect x="635" y="190" width="110" height="150" fill="%23D9E8C0" opacity="0.2" stroke="%23302F2C" stroke-width="1" />
    <rect x="645" y="200" width="90" height="130" fill="%23257057" opacity="0.1" stroke="%23257057" stroke-width="2" />
    <path d="M 655,230 Q 665,225 675,230 T 695,230 T 715,230" fill="none" stroke="%23257057" stroke-width="1" opacity="0.4" />
    <path d="M 655,280 Q 665,275 675,280 T 695,280 T 715,280" fill="none" stroke="%23257057" stroke-width="1" opacity="0.4" />
    <text x="690" y="260" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23234D3B" font-weight="bold">POOL</text>
    ${isWith ? `<text x="690" y="278" text-anchor="middle" font-family="monospace" font-size="10" fill="%23234D3B">6.00 x 3.50 m</text>` : ''}
  `;

  const ffPlan = `
    <!-- Master Suite -->
    <rect x="260" y="155" width="200" height="160" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="360" y="230" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23302F2C" font-weight="bold">MASTER BEDROOM</text>
    ${isWith ? `<text x="360" y="248" text-anchor="middle" font-family="monospace" font-size="10" fill="%23AA783B">5.10 x 4.30 m</text>` : ''}
    <rect x="330" y="155" width="60" height="55" fill="none" stroke="%23302F2C" stroke-width="1" />
    <rect x="335" y="160" width="22" height="12" fill="none" stroke="%23302F2C" stroke-width="1" />
    <rect x="363" y="160" width="22" height="12" fill="none" stroke="%23302F2C" stroke-width="1" />

    <!-- Master Balcony -->
    <rect x="200" y="155" width="60" height="160" fill="none" stroke="%23302F2C" stroke-width="1.5" stroke-dasharray="3 3" />
    <text x="230" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="%23302F2C" transform="rotate(-90 230 235)">BALCONY</text>

    <!-- Ensuite Bath -->
    <rect x="460" y="155" width="120" height="110" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="520" y="200" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%23302F2C" font-weight="bold">ENSUITE BATH</text>
    <rect x="480" y="165" width="35" height="15" rx="5" fill="none" stroke="%23302F2C" stroke-width="1" />

    <!-- Bedroom 2 -->
    <rect x="260" y="315" width="200" height="140" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="360" y="380" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23302F2C" font-weight="bold">GUEST BEDROOM 2</text>
    ${isWith ? `<text x="360" y="395" text-anchor="middle" font-family="monospace" font-size="9" fill="%23AA783B">4.10 x 3.65 m</text>` : ''}

    <!-- Bedroom 2 Bath -->
    <rect x="460" y="315" width="120" height="90" fill="none" stroke="%23302F2C" stroke-width="2" />
    <text x="520" y="360" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%23302F2C" font-weight="bold">BATH 2</text>

    <!-- Staircase -->
    <rect x="180" y="315" width="80" height="90" fill="none" stroke="%23302F2C" stroke-width="1.5" />
    <text x="220" y="360" text-anchor="middle" font-family="sans-serif" font-size="9" fill="%23302F2C" opacity="0.6">STAIRCASE</text>
    <line x1="180" y1="335" x2="260" y2="335" stroke="%23302F2C" stroke-width="1" />
    <line x1="180" y1="355" x2="260" y2="355" stroke="%23302F2C" stroke-width="1" />
    <line x1="180" y1="375" x2="260" y2="375" stroke="%23302F2C" stroke-width="1" />

    <!-- Terrace Deck -->
    <rect x="580" y="155" width="140" height="300" fill="%23E3D5C9" opacity="0.1" stroke="%23302F2C" stroke-width="1.5" />
    <text x="650" y="290" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23234D3B" font-weight="bold" transform="rotate(90 650 290)">OPEN AIR TERRACE</text>
    ${isWith ? `<text x="650" y="315" text-anchor="middle" font-family="monospace" font-size="10" fill="%23AA783B">3.00 x 7.30 m</text>` : ''}
  `;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="100%" height="100%" fill="%23FFFEF7" />
      <g stroke="%23E3D5C9" stroke-width="0.5" opacity="0.3">
        <line x1="100" y1="0" x2="100" y2="600" />
        <line x1="200" y1="0" x2="200" y2="600" />
        <line x1="300" y1="0" x2="300" y2="600" />
        <line x1="400" y1="0" x2="400" y2="600" />
        <line x1="500" y1="0" x2="500" y2="600" />
        <line x1="600" y1="0" x2="600" y2="600" />
        <line x1="700" y1="0" x2="700" y2="600" />
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="0" y1="500" x2="800" y2="500" />
      </g>
      <rect x="50" y="100" width="700" height="400" fill="none" stroke="%23234D3B" stroke-width="1.5" opacity="0.15" />
      ${compassSvg}
      ${isGF ? gfPlan : ffPlan}
      <text x="50" y="540" font-family="serif" font-size="20" font-weight="bold" fill="%23234D3B">Villa ${villaNum}</text>
      <text x="50" y="560" font-family="sans-serif" font-size="12" fill="%23257057" font-weight="bold" letter-spacing="1.5" opacity="0.8">${floorLevel.toUpperCase()} ${isWith ? '- WITH DIMENSIONS' : '- WITHOUT DIMENSIONS'}</text>
      <rect x="360" y="525" width="390" height="45" rx="5" fill="%23257057" opacity="0.05" />
      <text x="375" y="543" font-family="sans-serif" font-size="9" font-weight="bold" fill="%23257057">UPLOAD FILE TO /public/assets/floorplans/</text>
      <text x="375" y="556" font-family="monospace" font-size="9" fill="%23AA783B">${dimensionMode === 'With' ? 'WD' : 'WOD'}_${villaNum}_${isGF ? 'GF' : 'FF'}.png</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${svgContent.replace(/\s+/g, ' ')}`;
}

export default function App() {
  // ── STATE MANAGEMENT ─────────────────────────────────
  const [tunerConfig, setTunerConfig] = useState<TunerConfig>(() => {
    try {
      const saved = localStorage.getItem('vianaar_calibration_params_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved calibration", e);
    }
    return DEFAULT_TUNER_CONFIG;
  });

  const [sitePlanImage, setSitePlanImage] = useState<string>(() => {
    const saved = localStorage.getItem('ashwem_siteplan_v1');
    return saved || ASSETS.sitePlan;
  });

  const [selectedVillaId, setSelectedVillaId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tourist' | 'restaurant' | 'hotel' | 'school' | 'airport' | 'other'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeBrochureTab, setActiveBrochureTab] = useState<"overview" | "render" | "floorplan" | "specs">("overview");
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  
  // Immersive modal view for Floor Plans / Renders
  const [modalMedia, setModalMedia] = useState<{ url: string; title: string; sub: string; fallback?: string } | null>(null);

  // Interactive Floor Plan Unit Popup States
  const [interactiveFloorPlanOpen, setInteractiveFloorPlanOpen] = useState<boolean>(false);
  const [interactiveFloorPlanVilla, setInteractiveFloorPlanVilla] = useState<string>("04");
  const [dimensionMode, setDimensionMode] = useState<"With" | "Without">("With");
  const [floorLevelMode, setFloorLevelMode] = useState<"Ground Floor" | "First Floor">("Ground Floor");

  // ── REFERENCES ───────────────────────────────────────
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const overlayElRef = useRef<HTMLDivElement | null>(null);
  const overlayImgRef = useRef<HTMLImageElement | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const roadGroupRef = useRef<L.LayerGroup | null>(null);

  const selectedVilla = VILLAS.find(v => v.id === selectedVillaId) || VILLAS[0];

  // ── SAVE TUNER CONFIG TO LOCALSTORAGE ───────────────
  useEffect(() => {
    localStorage.setItem('vianaar_calibration_params_v2', JSON.stringify(tunerConfig));
  }, [tunerConfig]);

  // ── RECALCULATE OVERLAY POSITION ─────────────────────
  // Computes overlay size in meters to pixel equivalence at current zoom
  const updateOverlayGeometry = () => {
    const map = mapRef.current;
    const overlayEl = overlayElRef.current;
    if (!map || !overlayEl) return;

    const { lat, lng, widthM, heightM, rotation, opacity } = tunerConfig;
    const z = map.getZoom();

    // Standard meters-to-pixel conversion factor based on latitude projection
    const pixelsPerMeter = 1 / (40075016.686 * Math.cos(lat * Math.PI / 180) / Math.pow(2, z + 8));
    const pw = widthM * pixelsPerMeter;
    const ph = heightM * pixelsPerMeter;
    const pt = map.latLngToLayerPoint([lat, lng]);

    overlayEl.style.width = `${pw}px`;
    overlayEl.style.height = `${ph}px`;
    overlayEl.style.left = `${pt.x - pw / 2}px`;
    overlayEl.style.top = `${pt.y - ph / 2}px`;
    overlayEl.style.transform = `rotate(${rotation}deg)`;
    overlayEl.style.opacity = showOverlay ? `${opacity}` : '0';
    overlayEl.style.display = showOverlay ? 'block' : 'none';
  };

  // Trigger geometry recalibration whenever relevant configs shift
  useEffect(() => {
    if (isMapReady) {
      updateOverlayGeometry();
    }
  }, [tunerConfig, showOverlay, isMapReady]);

  // ── MAP INITIALIZATION ───────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Leaflet instance
    // Note: Ashwem core pin 15.643523, 73.723048 is centered
    const map = L.map(mapContainerRef.current, {
      center: [DEVELOPMENT_SPECS.pinCoordinates[0], DEVELOPMENT_SPECS.pinCoordinates[1]],
      zoom: 18,
      zoomControl: false, // Customized controls placed on bottom/right
      maxZoom: 18,
      attributionControl: false,
    });

    mapRef.current = map;

    // Standard Esri World Imagery Satellite backdrop - High native zoom
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        maxNativeZoom: 18,
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      }
    ).addTo(map);

    // Add boundaries/roads/coastal references subtle labels
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        maxNativeZoom: 18,
        opacity: 0.8,
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      }
    ).addTo(map);

    // Create the rotated custom overlay DOM node and bind it to Leaflet's overlayPane
    const overlayEl = document.createElement('div');
    const overlayImg = document.createElement('img');
    
    Object.assign(overlayEl.style, {
      position: 'absolute',
      transformOrigin: 'center center',
      pointerEvents: 'none',
      zIndex: '400',
      display: 'none',
      transition: 'opacity 0.15s ease-out'
    });

    overlayImg.style.cssText = 'width:100%; height:100%; display:block; object-fit:fill;';
    overlayImg.src = sitePlanImage;
    overlayImg.referrerPolicy = "no-referrer";
    overlayImg.onerror = () => {
      if (overlayImg.src !== window.location.origin + ASSETS.fallbackSitePlan && !overlayImg.src.startsWith('data:') && overlayImg.src !== ASSETS.fallbackSitePlan) {
        overlayImg.src = ASSETS.fallbackSitePlan;
      }
    };
    overlayEl.appendChild(overlayImg);

    map.getPanes().overlayPane.appendChild(overlayEl);

    overlayElRef.current = overlayEl;
    overlayImgRef.current = overlayImg;

    // Create custom LayerGroup for interactive pins
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    // Listen to Leaflet zoom and translation commands to scale overlay correctly
    map.on('move zoom viewreset resize', updateOverlayGeometry);

    setIsMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
      overlayElRef.current = null;
      overlayImgRef.current = null;
      markersGroupRef.current = null;
    };
  }, []);

  // Update src tag of leaflet overlay when loaded target shifts
  useEffect(() => {
    if (overlayImgRef.current) {
      overlayImgRef.current.src = sitePlanImage;
      overlayImgRef.current.onerror = () => {
        if (overlayImgRef.current && overlayImgRef.current.src !== ASSETS.fallbackSitePlan) {
          overlayImgRef.current.src = ASSETS.fallbackSitePlan;
        }
      };
      updateOverlayGeometry();
    }
  }, [sitePlanImage]);

  // helper function to calculate distance
  const calculateDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return Number(d.toFixed(1));
  };

  // ── UPDATE MARKERS DYNAMICALLY ───────────────────────
  useEffect(() => {
    const map = mapRef.current;
    const group = markersGroupRef.current;
    if (!map || !group || !isMapReady) return;

    // Clear all existing markers
    group.clearLayers();

    // Filter POIs based on the active category state
    const filteredPOIs = POINTS_OF_INTEREST.filter(poi => {
      if (selectedCategory === 'all') return true;
      return poi.category === selectedCategory;
    });

    // Populate filtered category markers
    filteredPOIs.forEach(item => {
      const cat = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[0];
      const dist = calculateDistanceInKm(
        item.coordinates[0], 
        item.coordinates[1], 
        DEVELOPMENT_SPECS.pinCoordinates[0], 
        DEVELOPMENT_SPECS.pinCoordinates[1]
      );
      const driveTimeSecs = (dist / 35) * 3600;
      const driveTimeMins = Math.max(1, Math.round(driveTimeSecs / 60));

      const pinIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center transition-all duration-200 hover:scale-[1.18] cursor-pointer" style="width: 32px; height: 42px;">
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(17, 24, 19, 0.35));">
              <!-- Slender, jewelry-grade outer shell in Vianaar signature light gold -->
              <path d="M16 2C10.48 2 6 6.48 6 12C6 19.5 16 40 16 40C16 40 26 19.5 26 12C26 6.48 21.52 2 16 2Z" fill="${cat.color}" stroke="#CBB69E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Elegant secondary white inner bezel for crisp architectural definition -->
              <path d="M16 4C11.58 4 8 7.58 8 12C8 17.5 16 33.5 16 33.5C16 33.5 24 17.5 24 12C24 7.58 20.42 4 16 4Z" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              ${cat.svgInner}
            </svg>
          </div>
        `,
        className: 'custom-map-category-pin',
        iconSize: [32, 42],
        iconAnchor: [16, 40]
      });

      const tooltipContent = `
        <div class="custom-luxury-poi-card" style="
          background-color: #fcfaf6; 
          border-radius: 12px; 
          border: 1px solid rgba(113, 115, 104, 0.2); 
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
          padding: 12px 14px;
          width: 200px;
          color: #2F362C;
          text-align: center;
        ">
          <div style="font-family: 'Cardo', Georgia, serif; font-size: 13px; font-weight: bold; color: #1e3d2f; margin-bottom: 5px; line-height: 1.25;">
            ${item.name}
          </div>
          <div style="font-family: 'Mulish', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 1.2px; color: #717368; text-transform: uppercase; line-height: 1.2;">
            ${driveTimeMins} MIN DRIVE
          </div>
          <div style="font-family: 'Mulish', sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 1.2px; color: #717368; text-transform: uppercase; line-height: 1.2;">
            ${dist} KM AWAY
          </div>
        </div>
      `;

      const marker = L.marker(item.coordinates, {
        icon: pinIcon
      }).addTo(group);

      marker.bindTooltip(tooltipContent, {
        className: 'custom-luxury-tooltip-wrap',
        direction: 'top',
        offset: [0, -10],
        sticky: false,
        permanent: false
      });
    });

  }, [selectedCategory, isMapReady]);

  // ── DRAW ROADS & LABELS ─────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    // Create a LayerGroup specifically for roads and their labels
    const roadGroup = L.layerGroup().addTo(map);
    roadGroupRef.current = roadGroup;

    // 1. ACCESS ROAD (Dotted)
    const accessRoadPoints: [number, number][] = [
      [15.643383, 73.722969],
      [15.643144, 73.722954],
      [15.642987, 73.722686],
      [15.642932, 73.722548],
      [15.642939, 73.720976],
      [15.642997, 73.720797],
      [15.643013, 73.720728],
      [15.643044, 73.720452]
    ];

    L.polyline(accessRoadPoints, {
      color: '#FFFFFF',
      weight: 4,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round',
      opacity: 0.95
    }).addTo(roadGroup);

    const accessRoadLabelIcon = L.divIcon({
      html: `
        <div class="select-none text-center shadow-md whitespace-nowrap" style="background-color: #0b3d27; color: #ffffff; font-family: 'Mulish', system-ui, sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 1px; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 8px rgba(0,0,0,0.15); display: inline-block;">
          Access Road
        </div>
      `,
      className: 'custom-road-label-icon',
      iconSize: [80, 24],
      iconAnchor: [40, 12]
    });

    L.marker([15.642923, 73.722380], {
      icon: accessRoadLabelIcon,
      interactive: false
    }).addTo(roadGroup);

    // 2. ASHWEM ROAD (Solid White Line - Without Dot)
    const ashwemRoadPoints: [number, number][] = [
      [15.651101, 73.716376],
      [15.650683, 73.716467],
      [15.650298, 73.716511],
      [15.649950, 73.716514],
      [15.649768, 73.716572],
      [15.649206, 73.716893],
      [15.648567, 73.717202],
      [15.647388, 73.717768],
      [15.646757, 73.717925],
      [15.646429, 73.718043],
      [15.645960, 73.718342],
      [15.645587, 73.718373],
      [15.644919, 73.718724],
      [15.643939, 73.719564],
      [15.641330, 73.721992],
      [15.638886, 73.724397],
      [15.638503, 73.724846],
      [15.638321, 73.725062],
      [15.637720, 73.725652],
      [15.636932, 73.726247],
      [15.636590, 73.726504],
      [15.636152, 73.726753],
      [15.636023, 73.726834],
      [15.635924, 73.726975],
      [15.634943, 73.728655],
      [15.633933, 73.730006],
      [15.633094, 73.731570],
      [15.632889, 73.731918],
      [15.632376, 73.733315],
      [15.632200, 73.733637],
      [15.631745, 73.734341],
      [15.630969, 73.735646],
      [15.630512, 73.736319]
    ];

    L.polyline(ashwemRoadPoints, {
      color: '#FFFFFF',
      weight: 4,
      lineCap: 'round',
      lineJoin: 'round',
      opacity: 0.95
    }).addTo(roadGroup);

    const ashwemRoadLabelIcon = L.divIcon({
      html: `
        <div class="select-none text-center shadow-md whitespace-nowrap" style="background-color: #0b3d27; color: #ffffff; font-family: 'Mulish', system-ui, sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 1px; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 8px rgba(0,0,0,0.15); display: inline-block;">
          Ashwem Road
        </div>
      `,
      className: 'custom-road-label-icon',
      iconSize: [85, 24],
      iconAnchor: [42.5, 12]
    });

    const ashwemLabelCoords: [number, number][] = [
      [15.632764, 73.732209],
      [15.641403, 73.721919],
      [15.647633, 73.717610]
    ];

    ashwemLabelCoords.forEach(coords => {
      L.marker(coords, {
        icon: ashwemRoadLabelIcon,
        interactive: false
      }).addTo(roadGroup);
    });

    return () => {
      if (roadGroupRef.current) {
        roadGroupRef.current.remove();
        roadGroupRef.current = null;
      }
    };
  }, [isMapReady]);

  // ── USER MANIPULATIONS / PANEL CALIBRATIONS ─────────
  const handleCenterMap = () => {
    if (mapRef.current) {
      mapRef.current.setView([tunerConfig.lat, tunerConfig.lng], 18);
    }
  };

  const handleZoomMap = (zoomIn: boolean) => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + (zoomIn ? 1 : -1));
    }
  };

  // Center on designated location target
  const zoomToCoordinate = (coords: [number, number], zoomLevel = 18) => {
    if (mapRef.current) {
      mapRef.current.setView(coords, zoomLevel);
    }
  };

  return (
    <div id="vianaar-platform-root" className="h-screen w-screen flex overflow-hidden bg-brand-charcoal text-white select-none selection:bg-brand-sage-pale selection:text-brand-green-dark">
      
      {/* Floating Three Parallel Lines Menu Button (Hamburger Menu) */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-5 left-5 z-40 bg-[#FAF8F2] hover:bg-white text-[#234D3B] border border-brand-sand/40 h-12 w-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        title="Open Navigation Menu"
      >
        <Menu size="20" />
      </button>

      {/* Backdrop overlay when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black/45 z-[45] transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ── SIDEBAR CONTAINER (LUXURY BRANDING & DIRECT ACTIONS) ────────── */}
      <aside className={`fixed top-0 left-0 w-[380px] h-full flex flex-col bg-[#FAF8F2] text-[#2F362C] border-r border-brand-sand/40 z-50 shadow-2xl overflow-hidden pointer-events-auto transition-transform duration-350 ease-in-out transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand wordmark / Title banner matching the screenshot exactly */}
        <div className="pt-10 pb-6 px-6 border-b border-brand-sand/30 bg-[#FAF8F2] relative text-center select-none">
          <span className="block text-[10px] font-sans tracking-[4px] uppercase text-[#717368] font-light mb-1">VIANAAR HOMES</span>
          <h1 className="text-4xl font-serif text-[#234D3B] tracking-tight font-normal leading-tight">
            Ashwem <span className="italic font-serif block mt-1">Phase 1</span>
          </h1>
          <span className="block text-[10px] font-sans tracking-[2.5px] uppercase text-[#717368]/85 font-light mt-3">ASHWEM . NORTH GOA</span>
          <div className="w-16 h-[1.5px] bg-[#CBB69E] mt-5 mx-auto" />
          
          {/* Small visual close button like in the design */}
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-brand-green-dark transition cursor-pointer font-sans text-lg font-light"
            onClick={() => setIsSidebarOpen(false)}
            title="Close Navigation Menu"
          >
            <X size="20" />
          </button>
        </div>

        {/* Scrollable Sidebar Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-6 gap-6">
          
          {/* TO SITE MAP BUTTON */}
          <button 
            onClick={() => {
              handleCenterMap();
              setShowOverlay(true);
            }}
            className="w-full py-4 px-6 bg-[#5B6C58] hover:bg-[#234D3B] text-brand-white-warm font-sans font-light text-xs tracking-[1.5px] rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
          >
            <Compass size="16" />
            TO SITE MAP
          </button>

          {/* SELECT MODEL SECTION */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-[10px] font-sans font-light tracking-[1.5px] uppercase text-[#717368]">SELECT BLOCK</span>
            </div>
            
            <div className="space-y-3">
              {VILLAS.map((villa) => {
                const isActive = selectedVillaId === villa.id;
                const unitCount = villa.id === 'la-ermida' ? 17 : 20;
                return (
                  <div key={villa.id} className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedVillaId(isActive ? null : villa.id);
                      }}
                      className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between text-left cursor-pointer ${
                        isActive 
                          ? 'bg-white border-brand-green/30 shadow-lg ring-1 ring-brand-green/10' 
                          : 'bg-[#FFFEF7]/60 border-brand-sand/40 hover:bg-white/80 hover:border-brand-sand shadow-sm'
                      }`}
                    >
                      <span className={`font-serif text-2xl font-bold tracking-tight ${isActive ? 'text-[#234D3B]' : 'text-[#717368]/95'}`}>
                        {villa.name}
                      </span>
                      <span className={`text-[10px] font-sans font-light px-3 py-1 rounded-full border ${
                        isActive 
                          ? 'bg-[#257057]/10 text-[#257057] border-[#257057]/20' 
                          : 'bg-gray-100 text-gray-500 border-gray-250'
                      }`}>
                        {unitCount} Units
                      </span>
                    </button>

                    {/* INTERACTIVE FLOOR PLAN HOVER/SELECT GRID DRIVEN DIRECTLY BY THE BLOCK SELECTION */}
                    {isActive && (
                      <div className="p-4 bg-white/70 rounded-2xl border border-brand-sand/35 shadow-inner animate-fadeIn space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <span className="block text-[10px] font-sans font-bold tracking-wider text-brand-terracotta uppercase flex items-center gap-1">
                            <Sparkles size="11" />
                            Individual Villa Layouts (1-{unitCount})
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-light leading-snug">
                          Select a unit number below to load its interactive floor plan perspective with depth scaling and levels.
                        </p>
                        
                        <div className="grid grid-cols-5 gap-1.5 pt-1">
                          {Array.from({ length: unitCount }, (_, i) => {
                            const numStr = String(i + 1).padStart(2, '0');
                            return (
                              <button
                                key={numStr}
                                onClick={() => {
                                  setInteractiveFloorPlanVilla(numStr);
                                  setInteractiveFloorPlanOpen(true);
                                }}
                                className="py-2.5 text-xs font-sans font-extrabold rounded-xl border border-brand-sand/50 bg-[#FFFEF7] text-brand-green-dark hover:bg-[#234D3B] hover:text-white hover:border-[#234D3B] transition-all duration-150 shadow-sm text-center cursor-pointer transform active:scale-95"
                              >
                                {numStr}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-t border-brand-sand/35" />

          {/* RENDERS COMPASS SECTION */}
          <div className="space-y-4">
            <span className="block text-[10px] font-sans font-bold tracking-[1.5px] uppercase text-[#717368] mb-1">EXPLORE RENDERS</span>
            
            {/* LA ERMIDA RENDERS */}
            <div className="rounded-xl border border-brand-sand/30 bg-brand-white-warm/25 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-sand/15 pb-1.5">
                <span className="block text-[12px] font-serif italic text-brand-green-dark">La Ermida</span>
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#717368] opacity-75">Chapel Pavilion</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setModalMedia({
                      url: ASSETS.renderLEFront,
                      fallback: ASSETS.fallbackLEFront,
                      title: "La Ermida — Front",
                      sub: "Portuguese-inspired front elevation render"
                    });
                  }}
                  className="py-2.5 px-2 bg-white hover:bg-[#5B6C58] hover:text-brand-white-warm text-[#5B6C58] text-[10px] font-sans font-light tracking-wide uppercase rounded-xl border border-brand-sand/40 shadow-xs transition duration-155 cursor-pointer text-center flex flex-col items-center justify-center gap-0.5"
                >
                  <span className="font-serif italic font-normal text-[9.5px] opacity-75 lowercase">elevation</span>
                  <span className="font-medium">Front View</span>
                </button>

                <button
                  onClick={() => {
                    setModalMedia({
                      url: ASSETS.renderLEPool,
                      fallback: ASSETS.fallbackLEPool,
                      title: "La Ermida — Pool",
                      sub: "Scenic panoramic layout framing the natural swimming pool"
                    });
                  }}
                  className="py-2.5 px-2 bg-white hover:bg-[#5B6C58] hover:text-brand-white-warm text-[#5B6C58] text-[10px] font-sans font-light tracking-wide uppercase rounded-xl border border-brand-sand/40 shadow-xs transition duration-155 cursor-pointer text-center flex flex-col items-center justify-center gap-0.5"
                >
                  <span className="font-serif italic font-normal text-[9.5px] opacity-75 lowercase">courtyard</span>
                  <span className="font-medium">Pool View</span>
                </button>
              </div>
            </div>

            {/* LA RIBERA VILLA 1 TO 12 */}
            <div className="rounded-xl border border-brand-sand/30 bg-brand-white-warm/25 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-sand/15 pb-1.5">
                <span className="block text-[12px] font-serif italic text-brand-green-dark">La Ribera — Villa 1 to 12</span>
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#717368] opacity-75">Riverfront Duplex</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setModalMedia({
                      url: ASSETS.renderLR1to12Front,
                      fallback: ASSETS.fallbackLR1to12Front,
                      title: "La Ribera — Villa 1 to 12 Front",
                      sub: "Architectural front-elevation perspective of Villa units 1-12"
                    });
                  }}
                  className="py-2.5 px-2 bg-white hover:bg-[#5B6C58] hover:text-brand-white-warm text-[#5B6C58] text-[10px] font-sans font-light tracking-wide uppercase rounded-xl border border-brand-sand/40 shadow-xs transition duration-155 cursor-pointer text-center flex flex-col items-center justify-center gap-0.5"
                >
                  <span className="font-serif italic font-normal text-[9.5px] opacity-75 lowercase">grand entrance</span>
                  <span className="font-medium">Front View</span>
                </button>

                <button
                  onClick={() => {
                    setModalMedia({
                      url: ASSETS.renderLR1to12Back,
                      fallback: ASSETS.fallbackLR1to12Back,
                      title: "La Ribera — Villa 1 to 12 Back",
                      sub: "Exquisite rear facade showcasing private gardens & water features"
                    });
                  }}
                  className="py-2.5 px-2 bg-white hover:bg-[#5B6C58] hover:text-brand-white-warm text-[#5B6C58] text-[10px] font-sans font-light tracking-wide uppercase rounded-xl border border-brand-sand/40 shadow-xs transition duration-155 cursor-pointer text-center flex flex-col items-center justify-center gap-0.5"
                >
                  <span className="font-serif italic font-normal text-[9.5px] opacity-75 lowercase">private deck</span>
                  <span className="font-medium">Back View</span>
                </button>
              </div>
            </div>

            {/* LA RIBERA VILLA 14 TO 20 */}
            <div className="rounded-xl border border-brand-sand/30 bg-brand-white-warm/25 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-sand/15 pb-1.5">
                <span className="block text-[12px] font-serif italic text-brand-green-dark">La Ribera — Villa 14 to 20</span>
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#717368] opacity-75">Creek Sanctuary</span>
              </div>
              <button
                onClick={() => {
                  setModalMedia({
                    url: ASSETS.renderLR14to20,
                    fallback: ASSETS.fallbackLR14to20,
                    title: "La Ribera — Villa 14 to 20",
                    sub: "Premium sanctuary views situated along the peaceful curves of the river creek"
                  });
                }}
                className="w-full py-2.5 px-3 bg-white hover:bg-[#5B6C58] hover:text-brand-white-warm text-[#5B6C58] text-[10px] font-sans font-light tracking-wider uppercase rounded-xl border border-brand-sand/40 shadow-xs transition duration-155 cursor-pointer text-center flex flex-col items-center justify-center gap-0.5"
              >
                <span className="font-serif italic font-normal text-[9.5px] opacity-75 lowercase">estuary panoramic view</span>
                <span className="font-medium">Main Render</span>
              </button>
            </div>
          </div>

          <hr className="border-t border-brand-sand/35" />

          {/* GEOLOCATION CATEGORY FILTERS */}
          <div className="animate-fadeIn">
            <span className="block text-[10px] font-sans font-light tracking-[1.5px] uppercase text-[#717368] mb-3">FILTERS</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-[10px] font-sans font-light tracking-wider uppercase rounded-full border transition duration-150 cursor-pointer shadow-sm select-none ${
                      isActive
                        ? 'bg-[#5B6C58] border-transparent text-white shadow-md transform hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-white hover:bg-[#F3FAF7]/50 text-[#5B6C58] border-[#5B6C58]/25 hover:border-[#5B6C58]/40 active:scale-[0.98]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </aside>

      {/* ── MAP CANVAS (OCCUPIES FULL SPACE BEYOND SIDEBAR) ────────────────── */}
      <main className="flex-1 h-full relative z-10 overflow-hidden">
        
        {/* Interactive map placeholder element */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Dynamic Top Floating Title Chip */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-brand-green-dark/95 border border-brand-green text-brand-white-warm px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 z-30 pointer-events-auto select-none backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sage-pale opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sage-pale"></span>
          </span>
          <span className="text-[10px] font-sans font-bold tracking-[3.5px] uppercase whitespace-nowrap text-brand-white-warm">
            {DEVELOPMENT_SPECS.title} &nbsp;·&nbsp; Interactive Site Plan
          </span>
        </div>

        {/* Custom compass floating widget on Top Right */}
        <div className="absolute top-5 right-5 z-30 pointer-events-auto bg-brand-green-dark/95 hover:bg-brand-green border border-brand-green h-12 w-12 rounded-full flex items-center justify-center shadow-xl transition select-none backdrop-blur-md">
          <svg viewBox="0 0 30 30" fill="none" className="w-8 h-8 pointer-events-none transform transition hover:rotate-12 duration-500">
            <circle cx="15" cy="15" r="13.5" stroke="#257057" strokeWidth="1"/>
            <polygon points="15,4 17,13 15,11.5 13,13" fill="#D9E8C0"/>
            <polygon points="15,26 13,17 15,18.5 17,17" fill="rgba(255,254,247,.3)"/>
            <text x="15" y="9.2" textAnchor="middle" fontSize="6.2" fill="#D9E8C0" fontFamily="Cardo, Georgia, serif" fontWeight="700">N</text>
          </svg>
        </div>

        {/* Map custom control overlay box (Standard floating tiles) on Middle-Right */}
        <div className="absolute bottom-6 right-5 z-30 flex flex-col gap-2.5 pointer-events-auto bg-transparent">
          
          {/* Main location reset map bounds button */}
          <button 
            onClick={() => zoomToCoordinate(DEVELOPMENT_SPECS.pinCoordinates, 18)}
            className="p-3 bg-brand-white-warm hover:bg-brand-sage-pale text-brand-green-dark rounded-xl shadow-lg border border-brand-sand transition flex items-center justify-center cursor-pointer"
            title="Recenter main project complex coordinates"
          >
            <Compass size="18" />
          </button>

          {/* Toggle default layout alignment overlay display */}
          <button 
            onClick={() => setShowOverlay(prev => !prev)}
            className={`p-3 rounded-xl shadow-lg border transition flex items-center justify-center cursor-pointer ${
              showOverlay 
                ? 'bg-brand-green-dark border-brand-green text-brand-white-warm' 
                : 'bg-brand-white-warm border-brand-sand text-gray-500'
            }`}
            title="Toggle Layout Blueprint Overlay Display"
          >
            {showOverlay ? <Eye size="18" /> : <EyeOff size="18" />}
          </button>

          {/* Zoom In button */}
          <button 
            onClick={() => handleZoomMap(true)}
            className="p-3 bg-brand-white-warm hover:bg-brand-sage-pale text-brand-green-dark rounded-xl shadow-lg border border-brand-sand transition flex items-center justify-center font-bold text-base cursor-pointer"
            title="Zoom In"
          >
            <Plus size="18" />
          </button>

          {/* Zoom Out button */}
          <button 
            onClick={() => handleZoomMap(false)}
            className="p-3 bg-brand-white-warm hover:bg-brand-sage-pale text-brand-green-dark rounded-xl shadow-lg border border-brand-sand transition flex items-center justify-center font-bold text-base cursor-pointer"
            title="Zoom Out"
          >
            <Minus size="18" />
          </button>

        </div>

      </main>



      {/* ── IMMERSIVE FULLSCREEN LIGHTBOX MODAL (RENDER / FLOOR PLAN INSPECTION) ── */}
      {modalMedia && (
        <div 
          onClick={() => setModalMedia(null)}
          className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-brand-white-warm border-t-[4px] border-brand-green-dark max-w-4xl w-full rounded-2xl p-6 md:p-8 cursor-default shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-brand-sand">
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-brand-green-dark block mt-0.5">{modalMedia.title}</span>
              </div>
              <button 
                onClick={() => setModalMedia(null)}
                className="p-1.5 hover:bg-brand-grey-light rounded-full text-brand-charcoal hover:text-brand-green transition"
                title="Close Lightbox"
              >
                <X size="22" />
              </button>
            </div>

            {/* Modal Image display */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-brand-grey-light rounded-xl border border-brand-sand select-none aspect-video max-h-[60vh]">
              <img 
                src={modalMedia.url} 
                alt={`${modalMedia.title} fullscreen preview`} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2 max-h-[60vh]"
                onError={(e) => {
                  const target = e.currentTarget;
                  let fallback = modalMedia.fallback || "";
                  if (!fallback) {
                    if (modalMedia.title.includes("Floor Plan")) {
                      fallback = selectedVilla.id === 'la-ermida' ? ASSETS.fallbackFloorPlanErmida : ASSETS.fallbackFloorPlanRibera;
                    } else {
                      fallback = selectedVilla.id === 'la-ermida' ? ASSETS.fallbackRenderErmida : ASSETS.fallbackRenderRibera;
                    }
                  }
                  if (fallback && target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
            </div>

            
          </div>
        </div>
      )}

      {/* ── INTERACTIVE UNIT FLOOR PLAN DIALOGUE (popup centered on screen) ── */}
      {interactiveFloorPlanOpen && (
        <div 
          onClick={() => setInteractiveFloorPlanOpen(false)}
          className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fadeIn transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#FFFEF7] border border-brand-sand max-w-5xl w-full rounded-2xl cursor-default shadow-2xl flex flex-col md:h-[680px] h-[92vh] max-h-[92vh] overflow-hidden"
          >
            {/* Dialogue Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-brand-sand/40 bg-white">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-green-dark tracking-tight uppercase">
                  VILLA {interactiveFloorPlanVilla}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-sans font-light tracking-[2px] text-gray-400 uppercase">
                    FLOOR PLAN PERSPECTIVE
                  </span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[2px] text-brand-green uppercase bg-brand-green/10 px-2 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 bg-brand-green rounded-full animate-pulse" />
                    AVAILABLE
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setInteractiveFloorPlanOpen(false)}
                className="p-1.5 hover:bg-brand-grey-light rounded-full text-brand-charcoal hover:text-[#234D3B] transition cursor-pointer"
                title="Close Floor Plan dialogue"
              >
                <X size="24" />
              </button>
            </div>

            {/* Split Content Panels */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#FFFEF7]">
              
              {/* Left Selector Sidebar */}
              <div className="w-full md:w-64 border-r md:border-b-0 border-b border-brand-sand/40 p-6 flex flex-col justify-start bg-[#FFFEF7]/80 gap-6">
                
                {/* 1. Dimension Toggle */}
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#B9816B] font-light mb-2">
                    Dimensions
                  </span>
                  <div className="flex bg-gray-100 p-1 rounded-full text-xs font-bold relative mt-1.5 overflow-hidden border border-brand-sand/20">
                    <button 
                      onClick={() => setDimensionMode("With")}
                      className={`flex-1 py-1.5 text-center rounded-full transition-all duration-150 z-10 cursor-pointer ${
                        dimensionMode === 'With' 
                          ? 'bg-[#234D3B] text-brand-white-warm shadow-sm' 
                          : 'text-gray-500 hover:text-brand-charcoal'
                      }`}
                    >
                      With
                    </button>
                    <button 
                      onClick={() => setDimensionMode("Without")}
                      className={`flex-1 py-1.5 text-center rounded-full transition-all duration-150 z-10 cursor-pointer ${
                        dimensionMode === 'Without' 
                          ? 'bg-[#234D3B] text-brand-white-warm shadow-sm' 
                          : 'text-gray-500 hover:text-brand-charcoal'
                      }`}
                    >
                      Without
                    </button>
                  </div>
                </div>

                {/* 2. Floor Level Selector */}
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#B9816B] font-light mb-2">
                    Floor Level
                  </span>
                  <div className="space-y-2 mt-1.5">
                    <button
                      onClick={() => setFloorLevelMode("Ground Floor")}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs font-light font-sans transition-all flex items-center justify-between border cursor-pointer ${
                        floorLevelMode === "Ground Floor" 
                          ? "bg-[#234D3B] border-[#234D3B] text-brand-white-warm shadow-md" 
                          : "bg-white border-brand-sand/55 text-gray-500 hover:border-[#234D3B] hover:text-brand-charcoal"
                      }`}
                    >
                      <span>Ground Floor</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${floorLevelMode === "Ground Floor" ? "bg-brand-white-warm" : "bg-transparent"}`} />
                    </button>
                    
                    <button
                      onClick={() => setFloorLevelMode("First Floor")}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs font-light font-sans transition-all flex items-center justify-between border cursor-pointer ${
                        floorLevelMode === "First Floor" 
                          ? "bg-[#234D3B] border-[#234D3B] text-brand-white-warm shadow-md" 
                          : "bg-white border-brand-sand/55 text-gray-500 hover:border-[#234D3B] hover:text-brand-charcoal"
                      }`}
                    >
                      <span>First Floor</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${floorLevelMode === "First Floor" ? "bg-brand-white-warm" : "bg-transparent"}`} />
                    </button>
                  </div>
                </div>

                {/* Note: In accordance with user request, no 'Enquire Now' button is placed here */}
                <div className="mt-auto hidden md:block pt-6 border-t border-brand-sand/10">
                  <div className="bg-brand-sage-pale/40 p-3 rounded-lg border border-brand-sand/30">
                    <p className="text-[10px] leading-relaxed text-gray-500 font-light">
                      *Toggling parameters immediately adapts the layout values. Custom images uploaded to <code className="font-mono text-[9px] bg-brand-charcoal/5 px-1 py-0.5 rounded">/public/assets/floorplans</code> override fallback wireframes dynamically.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Showcase Area */}
              <div className="flex-1 overflow-hidden flex flex-col bg-white relative p-6 md:p-10 select-none items-center justify-center">
                
                {/* Live constructed filename indicator */}
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-brand-charcoal/5 rounded text-[9px] font-mono text-gray-500 tracking-wider">
                  FILE: {dimensionMode === 'With' ? 'WD' : 'WOD'}_{interactiveFloorPlanVilla}_{floorLevelMode === 'Ground Floor' ? 'GF' : 'FF'}.png
                </div>

                {/* Floor Plan Image with dynamic pathing and SVG rendering fallback on error */}
                <div className="w-full h-full max-h-[460px] flex items-center justify-center relative overflow-hidden bg-[#FFFEF7] rounded-xl border border-brand-sand/40 p-4">
                  <img
                    src={`/assets/floorplans/${dimensionMode === 'With' ? 'WD' : 'WOD'}_${interactiveFloorPlanVilla}_${floorLevelMode === 'Ground Floor' ? 'GF' : 'FF'}.png`}
                    alt={`Villa ${interactiveFloorPlanVilla} Floor Plan - ${floorLevelMode}`}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain pointer-events-none transition duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = generateFallbackFloorPlanSVG(interactiveFloorPlanVilla, dimensionMode, floorLevelMode);
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                </div>

                {/* Footer specs details */}
                <div className="w-full mt-4 flex items-end justify-between border-t border-brand-sand/20 pt-3">
                  <div className="text-left">
                    <span className="block font-serif text-lg font-bold text-[#234D3B]">
                      Villa {interactiveFloorPlanVilla}
                    </span>
                    <span className="block text-[10px] text-gray-400 tracking-wider uppercase font-light">
                      {floorLevelMode} Layout (Dimensions {dimensionMode})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-light leading-none">
                      Ashwem Phase 1 · Vianaar Boutique Villas
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
