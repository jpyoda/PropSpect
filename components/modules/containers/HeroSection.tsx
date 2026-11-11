import PropertySearch from "@/components/elements/inputs/PropertySearch";
import React from "react";

export const SAMPLE_QUERIES = [
  "Apartamentos en Bogotá estrato seis",
  "Casas en Bogotá estrato 5",
  "Lotes comerciales en el barrio Tintala",
  "Barrio La Calera estrato rural",
];

type Props = {
  searchTerm: string;
  busy: boolean;
  onSearchTermChange: (value: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onSampleQuery: (query: string) => void;
};

const HeroSection = ({ searchTerm, busy, onSearchTermChange, onSearch, onSampleQuery }: Props) => {
  return (
    <section className="relative isolate overflow-hidden border-b border-gray-200 bg-white">
      {/* Soft brand glow and a faint street-grid pattern behind the heading. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,var(--color-brand-100),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--color-gray-200)_1px,transparent_1px),linear-gradient(90deg,var(--color-gray-200)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="mx-auto max-w-(--breakpoint-md) px-4 pb-10 pt-10 text-center sm:pb-14 sm:pt-16">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-200">
          {`AI property search for brokers`}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {`Discover properties in seconds`}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 sm:text-lg">
          {`Describe what you need. We search Colombia's open property data for you.`}
        </p>

        <div className="mt-8 text-left">
          <PropertySearch
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onSearch={onSearch}
            disabled={busy}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-gray-500">{`Try:`}</span>
          {SAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              disabled={busy}
              onClick={() => onSampleQuery(q)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-xs hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-brand-100 disabled:opacity-60"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
