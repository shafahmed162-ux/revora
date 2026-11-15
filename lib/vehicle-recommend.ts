
import type { Vehicle } from "../types/vehicle";

import {
  filterVehicles,
  type VehicleFilters,
} from "./vehicle-filter";

import {
  scoreVehicle,
  type VehiclePreferences,
  type VehicleScore,
} from "./vehicle-score";

export interface RecommendationRequest {
  requirements: VehicleFilters;
  preferences: VehiclePreferences;
}

export function recommendVehicles(
  vehicles: Vehicle[],
  request: RecommendationRequest
): VehicleScore[] {
  // Step 1: Apply mandatory requirements.
  const eligibleVehicles = filterVehicles(
    vehicles,
    request.requirements
  );

  // Step 2: Score vehicles that passed filtering.
  const scoredVehicles = eligibleVehicles.map((vehicle) =>
    scoreVehicle(vehicle, request.preferences)
  );

  // Step 3: Rank highest-scoring vehicles first.
  return scoredVehicles.sort(
    (first, second) => second.score - first.score
  );
}
