
import { describe, expect, it } from "vitest";
import { parseVehicleQuery } from "./vehicle-query-parser";

describe("Natural-language vehicle query parser", () => {
  it("recognizes body style and drivetrain", () => {
    const result = parseVehicleQuery(
      "I want an AWD SUV"
    );

    expect(result.requirements.bodyStyle).toBe("suv");
    expect(result.requirements.drivetrain).toBe("AWD");
  });

  it("extracts a maximum budget", () => {
    const result = parseVehicleQuery(
      "Find me a sedan under $30,000 CAD"
    );

    expect(result.requirements.maxPriceCAD).toBe(30000);
  });

  it("extracts minimum seating", () => {
    const result = parseVehicleQuery(
      "I need an SUV with at least 7 seats"
    );

    expect(result.requirements.minSeats).toBe(7);
  });

  it("recognizes ambient lighting preferences", () => {
    const result = parseVehicleQuery(
      "I prefer ambient lighting"
    );

    expect(result.preferences.ambientLighting).toBe(true);
  });

  it("extracts multiple requirements together", () => {
    const result = parseVehicleQuery(
      "I want an AWD SUV under $30,000 with 5 seats and ambient lighting"
    );

    expect(result.requirements).toEqual({
      bodyStyle: "suv",
      drivetrain: "AWD",
      maxPriceCAD: 30000,
      minSeats: 5,
    });

    expect(result.preferences).toEqual({
      ambientLighting: true,
    });
  });


  it("understands abbreviated budgets", () => {
    const result = parseVehicleQuery(
      "I want an SUV under $30k"
    );

    expect(result.requirements.maxPriceCAD).toBe(30000);
  });

  it("understands budget shorthand without a dollar sign", () => {
    const result = parseVehicleQuery(
      "My budget is 35k"
    );

    expect(result.requirements.maxPriceCAD).toBe(35000);
  });

  it("understands decimal budget shorthand", () => {
    const result = parseVehicleQuery(
      "Find me a sedan below $27.5k"
    );

    expect(result.requirements.maxPriceCAD).toBe(27500);
  });


  it("detects unsupported heated seats", () => {
    const result = parseVehicleQuery(
      "I need an AWD SUV with heated seats"
    );

    expect(result.unsupportedFeatures).toContain(
      "Heated seats"
    );
  });

  it("detects multiple unsupported features", () => {
    const result = parseVehicleQuery(
      "I want a sedan with Apple CarPlay and a sunroof"
    );

    expect(result.unsupportedFeatures).toContain(
      "Apple CarPlay"
    );

    expect(result.unsupportedFeatures).toContain(
      "Sunroof"
    );
  });

  it("returns no unsupported features for a supported query", () => {
    const result = parseVehicleQuery(
      "I want an AWD SUV under $30k with ambient lighting"
    );

    expect(result.unsupportedFeatures).toEqual([]);
  });


});
