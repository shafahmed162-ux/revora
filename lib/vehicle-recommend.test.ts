
import { describe, expect, it } from "vitest";
import { recommendVehicles } from "./vehicle-recommend";
import type { Vehicle } from "../types/vehicle";

// Synthetic records for testing only.
const baseVehicle: Vehicle = {
  id: "base",
  make: "Demo Motors",
  model: "Adventure",
  year: 2025,
  trim: "Standard",
  market: "CA",
  bodyStyle: "suv",
  seats: 5,
  drivetrain: "AWD",
  horsepower: null,
  fuelEconomyCombined: null,
  ambientLighting: null,
  estimatedPriceCAD: 25000,
  sources: [],
};

const vehicles: Vehicle[] = [
  {
    ...baseVehicle,
    id: "eligible-preferred",
    ambientLighting: true,
  },
  {
    ...baseVehicle,
    id: "eligible-no-lighting",
    ambientLighting: false,
  },
  {
    ...baseVehicle,
    id: "over-budget",
    estimatedPriceCAD: 40000,
    ambientLighting: true,
  },
  {
    ...baseVehicle,
    id: "wrong-drivetrain",
    drivetrain: "FWD",
    ambientLighting: true,
  },
];

describe("Vehicle recommendation pipeline", () => {
  it("filters mandatory requirements before scoring", () => {
    const results = recommendVehicles(vehicles, {
      requirements: {
        bodyStyle: "suv",
        drivetrain: "AWD",
        minSeats: 5,
        maxPriceCAD: 30000,
      },
      preferences: {
        ambientLighting: true,
      },
    });

    expect(results.map((result) => result.vehicle.id)).toEqual([
      "eligible-preferred",
      "eligible-no-lighting",
    ]);
  });

  it("ranks preferred features higher", () => {
    const results = recommendVehicles(vehicles, {
      requirements: {
        maxPriceCAD: 30000,
        drivetrain: "AWD",
      },
      preferences: {
        ambientLighting: true,
      },
    });

    expect(results[0].vehicle.id).toBe("eligible-preferred");
    expect(results[0].score).toBe(100);
    expect(results[1].score).toBe(0);
  });

  it("never recommends an over-budget vehicle", () => {
    const results = recommendVehicles(vehicles, {
      requirements: {
        maxPriceCAD: 20000,
      },
      preferences: {
        ambientLighting: true,
      },
    });

    expect(results).toEqual([]);
  });

  it("returns no results when requirements cannot be met", () => {
    const results = recommendVehicles(vehicles, {
      requirements: {
        bodyStyle: "coupe",
      },
      preferences: {},
    });

    expect(results).toHaveLength(0);
  });
});
