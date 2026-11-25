
import { describe, expect, it } from "vitest";

import { demoVehicles } from "../data/demo-vehicles";
import { explainNoResults } from "./vehicle-no-results";
import type { Vehicle } from "../types/vehicle";

// Create a predictable test vehicle using the existing
// vehicle structure. These tests do not depend on
// the demo inventory's actual specifications.
const testVehicle: Vehicle = {
  ...demoVehicles[0],
  id: "test-sedan",
  bodyStyle: "sedan",
  drivetrain: "FWD",
  seats: 5,
  estimatedPriceCAD: 30000,
};

const vehicles: Vehicle[] = [testVehicle];

describe("Revora no-results explanations", () => {
  it("returns no suggestions when vehicles match", () => {
    const suggestions = explainNoResults(vehicles, {
      bodyStyle: "sedan",
      maxPriceCAD: 35000,
    });

    expect(suggestions).toEqual([]);
  });

  it("suggests increasing the budget when appropriate", () => {
    const suggestions = explainNoResults(vehicles, {
      bodyStyle: "sedan",
      maxPriceCAD: 20000,
    });

    expect(suggestions).toEqual([
      {
        requirement: "maxPriceCAD",
        message: "Try increasing your budget.",
        matchingVehicles: 1,
      },
    ]);
  });

  it("suggests relaxing the drivetrain requirement", () => {
    const suggestions = explainNoResults(vehicles, {
      bodyStyle: "sedan",
      drivetrain: "AWD",
    });

    expect(suggestions).toEqual([
      {
        requirement: "drivetrain",
        message: "Try considering another drivetrain.",
        matchingVehicles: 1,
      },
    ]);
  });

  it("returns no single-filter suggestions when multiple changes are needed", () => {
    const suggestions = explainNoResults(vehicles, {
      drivetrain: "AWD",
      minSeats: 7,
      maxPriceCAD: 20000,
    });

    expect(suggestions).toEqual([]);
  });

  it("handles an empty vehicle dataset", () => {
    const suggestions = explainNoResults([], {
      maxPriceCAD: 20000,
    });

    expect(suggestions).toEqual([]);
  });
});
