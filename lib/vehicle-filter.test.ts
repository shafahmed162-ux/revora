
import { describe, expect, it } from "vitest";
import { filterVehicles } from "./vehicle-filter";
import type { Vehicle } from "../types/vehicle";

const testVehicles: Vehicle[] = [
  {
    id: "test-001",
    make: "Demo Motors",
    model: "Adventure",
    year: 2025,
    trim: "AWD",
    market: "CA",
    bodyStyle: "suv",
    seats: 5,
    drivetrain: "AWD",
    horsepower: null,
    fuelEconomyCombined: null,
    ambientLighting: null,
    estimatedPriceCAD: null,
    sources: [],
  },
  {
    id: "test-002",
    make: "Demo Motors",
    model: "City",
    year: 2025,
    trim: "Standard",
    market: "CA",
    bodyStyle: "sedan",
    seats: 5,
    drivetrain: "FWD",
    horsepower: null,
    fuelEconomyCombined: null,
    ambientLighting: null,
    estimatedPriceCAD: null,
    sources: [],
  },
  {
    id: "test-003",
    make: "Demo Motors",
    model: "Mystery",
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

describe("Vehicle filtering engine", () => {
  it("filters vehicles by body style", () => {
    const results = filterVehicles(testVehicles, {
      bodyStyle: "sedan",
    });

    expect(results.map((vehicle) => vehicle.id)).toEqual([
      "test-002",
    ]);
  });

  it("excludes vehicles with unknown drivetrain", () => {
    const results = filterVehicles(testVehicles, {
      drivetrain: "AWD",
    });

    expect(results.map((vehicle) => vehicle.id)).toEqual([
      "test-001",
    ]);
  });

  it("enforces minimum seating requirements", () => {
    const results = filterVehicles(testVehicles, {
      minSeats: 5,
    });

    expect(results.map((vehicle) => vehicle.id)).toEqual([
      "test-001",
      "test-002",
    ]);
  });

  it("applies multiple filters together", () => {
    const results = filterVehicles(testVehicles, {
      bodyStyle: "suv",
      drivetrain: "AWD",
      minSeats: 5,
    });

    expect(results.map((vehicle) => vehicle.id)).toEqual([
      "test-001",
    ]);
  });

  it("returns all vehicles when no filters are supplied", () => {
    const results = filterVehicles(testVehicles, {});

    expect(results).toHaveLength(3);
  });

  it("excludes vehicles exceeding the maximum budget", () => {
    const vehicles = [
      { ...testVehicles[0], estimatedPriceCAD: 25000 },
      { ...testVehicles[1], estimatedPriceCAD: 35000 },
    ];

    const results = filterVehicles(vehicles, {
      maxPriceCAD: 30000,
    });

    expect(results.map((vehicle) => vehicle.id)).toEqual([
      "test-001",
    ]);
  });

  it("includes vehicles priced exactly at the budget limit", () => {
    const vehicles = [
      { ...testVehicles[0], estimatedPriceCAD: 30000 },
    ];

    const results = filterVehicles(vehicles, {
      maxPriceCAD: 30000,
    });

    expect(results).toHaveLength(1);
  });

  it("excludes vehicles with unknown prices when a budget is required", () => {
    const results = filterVehicles(testVehicles, {
      maxPriceCAD: 30000,
    });

    expect(results).toHaveLength(0);
  });
});
