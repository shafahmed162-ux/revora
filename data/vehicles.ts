
import type { Vehicle } from "../types/vehicle";

/**
 * Synthetic development data.
 * These records are NOT verified vehicle specifications.
 * Do not use them for real recommendations.
 */
export const sampleVehicles: Vehicle[] = [
  {
    id: "demo-vehicle-001",
    make: "Demo Motors",
    model: "City",
    year: 2025,
    trim: "Standard",
    market: "CA",

    bodyStyle: "sedan",
    seats: null,
    drivetrain: null,
    horsepower: null,
    fuelEconomyCombined: null,

    ambientLighting: null,
    estimatedPriceCAD: null,

    sources: [],
  },
  {
    id: "demo-vehicle-002",
    make: "Demo Motors",
    model: "Adventure",
    year: 2025,
    trim: "Standard",
    market: "CA",

    bodyStyle: "suv",
    seats: null,
    drivetrain: null,
    horsepower: null,
    fuelEconomyCombined: null,

    ambientLighting: null,
    estimatedPriceCAD: null,

    sources: [],
  },
];
