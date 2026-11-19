
import type { BodyStyle } from "../types/vehicle";
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

  const stylePattern =
    /\b(sedans?|suvs?|coupes?|hatchbacks?|wagons?|trucks?|minivans?|convertibles?)\b/gi;

  const negativeBodyStylePattern =
    /\b(?:don't want|do not want|not|no|without|avoid|excluding)\s+(?:(?:an?|any)\s+)?(?:sedans?|suvs?|coupes?|hatchbacks?|wagons?|trucks?|minivans?|convertibles?)(?:\s*(?:,|or|and)\s*(?:(?:an?|any)\s+)?(?:sedans?|suvs?|coupes?|hatchbacks?|wagons?|trucks?|minivans?|convertibles?))*/gi;

  const excludedStyles = new Set<BodyStyle>();

  const negativeMatches = text.match(
    negativeBodyStylePattern
  ) ?? [];

  for (const phrase of negativeMatches) {
    const styles = phrase.match(stylePattern) ?? [];

    for (const style of styles) {
      const normalized = style.endsWith("s")
        ? style.slice(0, -1)
        : style;

      if (
        bodyStyles.includes(
          normalized as (typeof bodyStyles)[number]
        )
      ) {
        excludedStyles.add(normalized as BodyStyle);
      }
    }
  }

  if (excludedStyles.size > 0) {
    requirements.excludedBodyStyles = [
      ...excludedStyles,
    ];
  }

  const cleanedText = text.replace(
    negativeBodyStylePattern,
    " "
  );

  for (const style of bodyStyles) {
    const pattern = new RegExp(
      String.raw`\b${style}\b`,
      "i"
    );

    if (pattern.test(cleanedText)) {
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

    const multiplier = budgetMatch[2]
      ? 1000
      : 1;

    const budget = amount * multiplier;

    if (
      Number.isFinite(budget) &&
      budget > 0
    ) {
      requirements.maxPriceCAD = budget;
    }
  }

  const seatsMatch = text.match(
    /\b(?:at least\s*)?(\d+)\s*(?:seats|seaters)\b/i
  );

  if (seatsMatch) {
    requirements.minSeats = Number(
      seatsMatch[1]
    );
  }

  const negativeAmbientLighting =
    /\b(?:don't want|do not want|not|no|without|avoid)\s+(?:any\s+)?ambient lighting\b/i.test(
      text
    );

  if (negativeAmbientLighting) {
    unsupportedFeatures.push(
      "Excluding ambient lighting"
    );
  } else if (/\bambient lighting\b/i.test(text)) {
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
