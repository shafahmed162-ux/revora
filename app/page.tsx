
"use client";

import { useEffect, useRef, useState } from "react";
import { demoVehicles } from "../data/demo-vehicles";
import { recommendVehicles } from "../lib/vehicle-recommend";
import type { BodyStyle, Drivetrain } from "../types/vehicle";
import type { VehicleScore } from "../lib/vehicle-score";
import { parseVehicleQuery } from "../lib/vehicle-query-parser";


export default function Home() {
  const [search, setSearch] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [minSeats, setMinSeats] = useState("");
  const [ambientLighting, setAmbientLighting] = useState(false);
  const [results, setResults] = useState<VehicleScore[] | null>(null);
  const [error, setError] = useState("");
  const [unsupportedFeatures, setUnsupportedFeatures] = useState<string[]>([]);
  const resultsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (results !== null) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);


  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const budget =
      maxBudget.trim() === "" ? undefined : Number(maxBudget);

    const seats =
      minSeats.trim() === "" ? undefined : Number(minSeats);

    if (
      (budget !== undefined &&
        (!Number.isFinite(budget) || budget < 0)) ||
      (seats !== undefined &&
        (!Number.isInteger(seats) || seats < 1))
    ) {
      setResults(null);
      setError(
        "Please enter a valid budget and minimum seating requirement."
      );
      return;
    }

    const parsed = parseVehicleQuery(search);


    setUnsupportedFeatures(parsed.unsupportedFeatures);

    if (parsed.unsupportedFeatures.length > 0) {
      setResults(null);
      return;
    }


    const recommendations = recommendVehicles(demoVehicles, {
      requirements: {
        ...parsed.requirements,
        ...(bodyStyle && {
          bodyStyle: bodyStyle as BodyStyle,
        }),
        ...(drivetrain && {
          drivetrain: drivetrain as Drivetrain,
        }),
        ...(budget !== undefined && {
          maxPriceCAD: budget,
        }),
        ...(seats !== undefined && {
          minSeats: seats,
        }),
      },
      preferences: {
        ...parsed.preferences,
        ambientLighting:
          ambientLighting ||
          parsed.preferences.ambientLighting === true,
      },
    });

    setResults(recommendations);
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          REVORA
        </h1>

        <span className="text-sm text-zinc-400">
          Intelligent Automotive Discovery
        </span>
      </nav>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-28 text-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Find Your Drive
        </p>

        <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
          Your next car.
          <span className="block text-blue-400">
            Smarter discovery.
          </span>
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Discover vehicles that match your budget, lifestyle,
          and preferences. Describe your ideal car and explore
          recommendations tailored to you.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-12 w-full max-w-2xl"
        >
          <label htmlFor="vehicle-search" className="sr-only">
            Describe your ideal vehicle
          </label>

          <textarea
            id="vehicle-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="I want a sporty AWD sedan under $30,000 CAD with ambient lighting..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-900 p-5 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500"
          />


          <p className="mt-2 text-left text-xs text-zinc-500">
            Describe your ideal vehicle or use the filters below.
            Revora currently understands basic requirements such as
            budget, body style, drivetrain, seating, and ambient lighting.
          </p>


          <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Body Style
              <select
                value={bodyStyle}
                onChange={(event) => setBodyStyle(event.target.value)}
                className="rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
              >
                <option value="">Any body style</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="coupe">Coupe</option>
                <option value="hatchback">Hatchback</option>
                <option value="wagon">Wagon</option>
                <option value="truck">Truck</option>
                <option value="minivan">Minivan</option>
                <option value="convertible">Convertible</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Drivetrain
              <select
                value={drivetrain}
                onChange={(event) => setDrivetrain(event.target.value)}
                className="rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
              >
                <option value="">Any drivetrain</option>
                <option value="AWD">AWD</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="4WD">4WD</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Maximum Budget (CAD)
              <input
                type="number"
                min="0"
                step="1"
                value={maxBudget}
                onChange={(event) => setMaxBudget(event.target.value)}
                placeholder="e.g. 30000"
                className="rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              Minimum Seats
              <input
                type="number"
                min="1"
                step="1"
                value={minSeats}
                onChange={(event) => setMinSeats(event.target.value)}
                placeholder="e.g. 5"
                className="rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500"
              />
            </label>
          </div>

          <label className="mt-6 flex items-center gap-3 text-left text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={ambientLighting}
              onChange={(event) =>
                setAmbientLighting(event.target.checked)
              }
              className="h-4 w-4 accent-blue-500"
            />
            Prefer ambient lighting
          </label>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}


          {unsupportedFeatures.length > 0 && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-left"
            >
              <h3 className="font-semibold text-amber-300">
                Some requested features aren't supported yet
              </h3>

              <p className="mt-2 text-sm text-zinc-300">
                Revora currently cannot verify these features:
              </p>

              <ul className="mt-3 list-inside list-disc text-sm text-amber-200">
                {unsupportedFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <p className="mt-3 text-sm text-zinc-400">
                Please remove these requirements and search again.
                We're expanding vehicle feature support.
              </p>
            </div>
          )}


          <button
            type="submit"
            className="mt-8 rounded-xl bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Discover Vehicles
          </button>
        </form>

        <p className="mt-8 text-sm text-zinc-500">
          Built for Canadian drivers.
        </p>
      </section>

      {results !== null && (
        <section
          ref={resultsRef}
          className="mx-auto max-w-5xl scroll-mt-8 px-6 pb-24"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">
              Your Recommendations
            </h2>
            <span className="text-sm text-zinc-400">
              {results.length} matching vehicles
            </span>
          </div>

          <p className="mb-6 text-sm text-amber-300">
            Development demonstration: All vehicles and prices below
            are fictional and are not real automotive listings.
          </p>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center">
              <h3 className="text-xl font-semibold">
                No matches found
              </h3>
              <p className="mt-3 text-zinc-400">
                Try adjusting your budget or vehicle requirements.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {results.map((result) => (
                <article
                  key={result.vehicle.id}
                  className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition hover:border-blue-500/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Revora Demo
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {result.vehicle.year}{" "}
                        {result.vehicle.make}{" "}
                        {result.vehicle.model}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {result.vehicle.trim}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                      {result.score} pts
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                      {result.vehicle.bodyStyle?.toUpperCase() ?? "Unknown"}
                    </span>

                    <span className="rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                      {result.vehicle.drivetrain ?? "Unknown drivetrain"}
                    </span>

                    <span className="rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                      {result.vehicle.seats ?? "Unknown"} seats
                    </span>
                  </div>

                  <p className="mt-6 text-2xl font-bold text-blue-400">
                    {result.vehicle.estimatedPriceCAD === null
                      ? "Price unavailable"
                      : new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency: "CAD",
                        maximumFractionDigits: 0,
                      }).format(result.vehicle.estimatedPriceCAD)}
                  </p>

                  {result.matchedPreferences.map((preference) => (
                    <p
                      key={preference}
                      className="mt-3 text-sm text-green-400"
                    >
                      ✓ Matches preference: {preference}
                    </p>
                  ))}

                  {result.unknownPreferences.map((preference) => (
                    <p
                      key={preference}
                      className="mt-3 text-sm text-amber-300"
                    >
                      Availability unknown: {preference}
                    </p>
                  ))}

                  <p className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-500">
                    Fictional vehicle for development and testing only.
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
