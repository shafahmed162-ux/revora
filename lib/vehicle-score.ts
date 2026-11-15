
import type { Vehicle } from "../types/vehicle";

export interface VehiclePreferences {
  ambientLighting?: boolean;
}

export interface VehicleScore {
  vehicle: Vehicle;
  score: number;
  matchedPreferences: string[];
  unknownPreferences: string[];
}

export function scoreVehicle(
  vehicle: Vehicle,
  preferences: VehiclePreferences
): VehicleScore {
  let score = 0;

  const matchedPreferences: string[] = [];
  const unknownPreferences: string[] = [];

  if (preferences.ambientLighting === true) {
    if (vehicle.ambientLighting === true) {
      score += 100;
      matchedPreferences.push("Ambient lighting");
    } else if (vehicle.ambientLighting === null) {
      unknownPreferences.push("Ambient lighting");
    }
  }

  return {
    vehicle,
    score,
    matchedPreferences,
    unknownPreferences,
  };
}
