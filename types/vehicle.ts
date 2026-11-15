
export type BodyStyle =
  | "sedan"
  | "suv"
  | "coupe"
  | "hatchback"
  | "wagon"
  | "truck"
  | "minivan"
  | "convertible";

export type Drivetrain =
  | "FWD"
  | "RWD"
  | "AWD"
  | "4WD";

export interface VehicleSource {
  url: string;
  title: string;
  verifiedAt: string;
}

export interface Vehicle {
  id: string;

  // Vehicle identity
  make: string;
  model: string;
  year: number;
  trim: string;
  market: "CA";

  // Vehicle specifications
  bodyStyle: BodyStyle | null;
  seats: number | null;
  drivetrain: Drivetrain | null;
  horsepower: number | null;
  fuelEconomyCombined: number | null;

  // Features
  ambientLighting: boolean | null;

  // Pricing
  estimatedPriceCAD: number | null;

  // Data verification
  sources: VehicleSource[];
}
