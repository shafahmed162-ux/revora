
import { describe, expect, it } from "vitest";
import type { Vehicle } from "../types/vehicle";
import { filterVehicles } from "./vehicle-filter";

const testVehicles: Vehicle[] = [
  {
    bodyStyle: "suv",
    drivetrain: "AWD",
    seats: 7,
    estimatedPriceCAD: 35000,
  } as Vehicle,
  {
    bodyStyle: "sedan",
    drivetrain: "FWD",
    seats: 5,
    estimatedPriceCAD: 25000,
  } as Vehicle,
  {
    bodyStyle: "coupe",
    drivetrain: "RWD",
    seats: 4,
    estimatedPriceCAD: 42000,
  } as Vehicle,
  {
    bodyStyle: "suv",
    drivetrain: null,
    seats: null,
    estimatedPriceCAD: null,
  } as Vehicle,
];

describe("Vehicle filtering engine", () => {
  it("filters vehicles by body style", () => {
    const results = filterVehicles(testVehicles, {
      bodyStyle: "sedan",
    });

    expect(results).toHaveLength(1);
    expect(results[0].bodyStyle).toBe("sedan");
  });

  it("excludes vehicles with unknown drivetrain", () => {
    const results = filterVehicles(testVehicles, {
      drivetrain: "AWD",
    });

    expect(results).toHaveLength(1);
    expect(results[0].drivetrain).toBe("AWD");
  });

  it("enforces minimum seating requirements", () => {
    const results = filterVehicles(testVehicles, {
      minSeats: 7,
    });

    expect(results).toHaveLength(1);
    expect(results[0].seats).toBe(7);
  });

  it("applies multiple filters together", () => {
    const results = filterVehicles(testVehicles, {
      bodyStyle: "suv",
      drivetrain: "AWD",
      minSeats: 7,
      maxPriceCAD: 35000,
    });

    expect(results).toHaveLength(1);
    expect(results[0].bodyStyle).toBe("suv");
    expect(results[0].drivetrain).toBe("AWD");
  });

  it("returns all vehicles when no filters are supplied", () => {
    const results = filterVehicles(testVehicles, {});

    expect(results).toHaveLength(testVehicles.length);
  });

  it("excludes vehicles exceeding the maximum budget", () => {
    const results = filterVehicles(testVehicles, {
      maxPriceCAD: 30000,
    });

    expect(results).toHaveLength(1);
    expect(results[0].estimatedPriceCAD).toBe(25000);
  });

  it("includes vehicles priced exactly at the budget limit", () => {
    const results = filterVehicles(testVehicles, {
      maxPriceCAD: 35000,
    });

    expect(results).toHaveLength(2);
    expect(
      results.some(
        (vehicle) => vehicle.estimatedPriceCAD === 35000
      )
    ).toBe(true);
  });

  it("excludes vehicles with unknown prices when a budget is required", () => {
    const results = filterVehicles(testVehicles, {
      maxPriceCAD: 50000,
    });

    expect(results).toHaveLength(3);
    expect(
      results.every(
        (vehicle) => vehicle.estimatedPriceCAD !== null
      )
    ).toBe(true);
  });

  it("excludes unwanted body styles", () => {
    const results = filterVehicles(testVehicles, {
      excludedBodyStyles: ["sedan"],
    });

    expect(results).toHaveLength(3);
    expect(
      results.every(
        (vehicle) => vehicle.bodyStyle !== "sedan"
      )
    ).toBe(true);
  });

  it("excludes multiple body styles", () => {
    const results = filterVehicles(testVehicles, {
      excludedBodyStyles: ["sedan", "suv"],
    });

    expect(results).toHaveLength(1);
    expect(results[0].bodyStyle).toBe("coupe");
  });
});
