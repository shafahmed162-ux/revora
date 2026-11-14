
"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          REVORA
        </h1>

        <span className="text-sm text-zinc-400">
          Intelligent Automotive Discovery
        </span>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center">
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

        {/* Search Form */}
        <form
          className="mt-12 w-full max-w-2xl"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Search functionality coming soon!");
          }}
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

          <button
            type="submit"
            className="mt-4 rounded-xl bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Discover Vehicles
          </button>
        </form>

        <p className="mt-8 text-sm text-zinc-500">
          Built for Canadian drivers.
        </p>
      </section>
    </main>
  );
}
