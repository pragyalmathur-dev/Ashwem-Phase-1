/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VillaData {
  id: string;
  name: string;
  sub: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  renderUrl: string;
  floorPlanUrl: string;
  coordinates: [number, number];
  highlights: string[];
  specifications: {
    structure: string;
    flooring: string;
    doorsWindows: string;
    sanitaryware: string;
    kitchen: string;
    swimmingPool: string;
  };
}

export interface TunerConfig {
  lat: number;
  lng: number;
  widthM: number;
  heightM: number;
  rotation: number;
  opacity: number;
}
