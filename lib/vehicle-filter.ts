
import type { BodyStyle, Drivetrain, Vehicle } from "../types/vehicle";

export interface VehicleFilters {
  bodyStyle?: BodyStyle;
  excludedBodyStyles?: BodyStyle[];
  drivetrain?: Drivetrain;
  minSeats?: number;
  maxPriceCAD?: number;
}

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  return vehicles.filter((vehicle) => {
    if (
      filters.bodyStyle !== undefined &&
      vehicle.bodyStyle !== filters.bodyStyle
    ) {
      return false;
    }

    if (
      filters.excludedBodyStyles !== undefined &&
      vehicle.bodyStyle !== null &&
      filters.excludedBodyStyles.includes(vehicle.bodyStyle)
    ) {
      return false;
    }

    if (
      filters.drivetrain !== undefined &&
      vehicle.drivetrain !== filters.drivetrain
    ) {
      return false;
    }

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
