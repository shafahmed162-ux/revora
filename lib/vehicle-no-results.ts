
import type { Vehicle } from "../types/vehicle";

import {
  filterVehicles,
  type VehicleFilters,
} from "./vehicle-filter";

export interface NoResultsSuggestion {
  requirement: string;
  message: string;
  matchingVehicles: number;
}

export function explainNoResults(
  vehicles: Vehicle[],
  filters: VehicleFilters
): NoResultsSuggestion[] {
  if (filterVehicles(vehicles, filters).length > 0) {
    return [];
  }


  if (vehicles.length === 0) {
    return [];
  }

  const suggestions: NoResultsSuggestion[] = [];

  function checkRelaxation(
    key: keyof VehicleFilters,
    message: string
  ) {
    if (filters[key] === undefined) {
      return;
    }

    const relaxedFilters = { ...filters };

    delete relaxedFilters[key];

    const matches = filterVehicles(
      vehicles,
      relaxedFilters
    );

    if (matches.length > 0) {
      suggestions.push({
        requirement: key,
        message,
        matchingVehicles: matches.length,
      });
    }
  }

  checkRelaxation(
    "maxPriceCAD",
    "Try increasing your budget."
  );

  checkRelaxation(
    "bodyStyle",
    "Try considering another body style."
  );

  checkRelaxation(
    "excludedBodyStyles",
    "Try allowing additional body styles."
  );

  checkRelaxation(
    "drivetrain",
    "Try considering another drivetrain."
  );

  checkRelaxation(
    "minSeats",
    "Try reducing your minimum seating requirement."
  );

  return suggestions.sort(
    (a, b) => b.matchingVehicles - a.matchingVehicles
  );
}
