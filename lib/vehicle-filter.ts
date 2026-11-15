
import type { BodyStyle, Drivetrain, Vehicle } from "../types/vehicle";

export interface VehicleFilters {
  bodyStyle?: BodyStyle;
  drivetrain?: Drivetrain;
  minSeats?: number;
  maxPriceCAD?: number;
}

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  return vehicles.filter((vehicle) => {
    // A requested body style must match exactly.
    if (
      filters.bodyStyle !== undefined &&
      vehicle.bodyStyle !== filters.bodyStyle
    ) {
      return false;
    }

    // A requested drivetrain must match exactly.
    if (
      filters.drivetrain !== undefined &&
      vehicle.drivetrain !== filters.drivetrain
    ) {
      return false;
    }

    // Unknown seating capacity cannot satisfy a minimum.
    if (filters.minSeats !== undefined) {
      if (
        vehicle.seats === null ||
        vehicle.seats < filters.minSeats
      ) {
        return false;
      }
    }

    if (filters.maxPriceCAD !== undefined) {
      if (
        vehicle.estimatedPriceCAD === null ||
        vehicle.estimatedPriceCAD > filters.maxPriceCAD
      ) {
        return false;
      }
    }

    return true;
  });
}
