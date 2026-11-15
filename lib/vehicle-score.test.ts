
import { describe, expect, it } from "vitest";
import { scoreVehicle } from "./vehicle-score";
import type { Vehicle } from "../types/vehicle";

// Synthetic vehicle used only for unit testing.
const testVehicle: Vehicle = {
  id: "test-score-001",
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
  ambientLighting: true,
  estimatedPriceCAD: null,
  sources: [],
};

describe("Vehicle preference scoring", () => {
  it("awards points for verified ambient lighting", () => {
    const result = scoreVehicle(testVehicle, {
      ambientLighting: true,
    });

    expect(result.score).toBe(100);
    expect(result.matchedPreferences).toContain("Ambient lighting");
    expect(result.unknownPreferences).toHaveLength(0);
  });

  it("does not award points for absent ambient lighting", () => {
    const vehicle = {
      ...testVehicle,
      ambientLighting: false,
    };

    const result = scoreVehicle(vehicle, {
      ambientLighting: true,
    });

    expect(result.score).toBe(0);
    expect(result.matchedPreferences).toHaveLength(0);
    expect(result.unknownPreferences).toHaveLength(0);
  });

  it("tracks unknown ambient lighting without awarding points", () => {
    const vehicle = {
      ...testVehicle,
      ambientLighting: null,
    };

    const result = scoreVehicle(vehicle, {
      ambientLighting: true,
    });

    expect(result.score).toBe(0);
    expect(result.unknownPreferences).toContain("Ambient lighting");
  });
});
