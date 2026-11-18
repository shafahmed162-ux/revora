
import type { VehicleFilters } from "./vehicle-filter";
import type { VehiclePreferences } from "./vehicle-score";

export interface ParsedVehicleQuery {
  requirements: VehicleFilters;
  preferences: VehiclePreferences;
  unsupportedFeatures: string[];
}

export function parseVehicleQuery(
  query: string
): ParsedVehicleQuery {
  const text = query.toLowerCase();

  const requirements: VehicleFilters = {};
  const preferences: VehiclePreferences = {};
  const unsupportedFeatures: string[] = [];

  const bodyStyles = [
    "sedan",
    "suv",
    "coupe",
    "hatchback",
    "wagon",
    "truck",
    "minivan",
    "convertible",
  ] as const;

  for (const style of bodyStyles) {
    if (new RegExp(`\\b${style}\\b`, "i").test(text)) {
      requirements.bodyStyle = style;
      break;
    }
  }

  const drivetrainMatch = text.match(
    /\b(awd|fwd|rwd|4wd)\b/i
  );

  if (drivetrainMatch) {
    requirements.drivetrain =
      drivetrainMatch[1].toUpperCase() as
      NonNullable<VehicleFilters["drivetrain"]>;
  }

  const budgetMatch = text.match(
    /\b(?:under|below|max(?:imum)?|budget(?:\s+(?:of|is))?)\s*\$?\s*([\d,]+(?:\.\d+)?)\s*(k)?\b/i
  );

  if (budgetMatch) {
    const amount = Number(
      budgetMatch[1].replaceAll(",", "")
    );

    const multiplier = budgetMatch[2] ? 1000 : 1;
    const budget = amount * multiplier;

    if (Number.isFinite(budget) && budget > 0) {
      requirements.maxPriceCAD = budget;
    }
  }

  const seatsMatch = text.match(
    /\b(?:at least\s*)?(\d+)\s*(?:seats|seaters)\b/i
  );

  if (seatsMatch) {
    requirements.minSeats = Number(seatsMatch[1]);
  }

  if (/\bambient lighting\b/i.test(text)) {
    preferences.ambientLighting = true;
  }

  const unsupportedFeaturePatterns = [
    {
      name: "Heated seats",
      pattern: /\bheated seats?\b/i,
    },
    {
      name: "Ventilated seats",
      pattern: /\b(?:ventilated|cooled) seats?\b/i,
    },
    {
      name: "Sunroof",
      pattern: /\b(?:sunroof|moonroof)\b/i,
    },
    {
      name: "Panoramic roof",
      pattern: /\bpanoramic (?:roof|sunroof)\b/i,
    },
    {
      name: "Leather seats",
      pattern: /\bleather (?:seats?|interior)\b/i,
    },
    {
      name: "Apple CarPlay",
      pattern: /\b(?:apple )?carplay\b/i,
    },
    {
      name: "Android Auto",
      pattern: /\bandroid auto\b/i,
    },
    {
      name: "Backup camera",
      pattern: /\b(?:backup|rearview|rear-view) camera\b/i,
    },
  ];

  for (const feature of unsupportedFeaturePatterns) {
    if (feature.pattern.test(text)) {
      unsupportedFeatures.push(feature.name);
    }
  }

  return {
    requirements,
    preferences,
    unsupportedFeatures,
  };
}
