"use client";

import React, { useContext, useState } from "react";
import HeroSection from "../modules/containers/HeroSection";
import CardsSection from "../modules/containers/CardsSection";
import ResultsSummary from "../modules/containers/ResultsSummary";
import LoadItems from "../elements/skeletons/LoadItems";
import ApiKeyContext from "../layouts/ApiKeyContext";
import { searchInmuebles, SearchError, type SearchResult, type SearchStage } from "@/lib/search";
import { RESULT_LIMIT } from "@/lib/datosGov";

type Status =
  | { kind: "idle" }
  | { kind: "loading"; stage: SearchStage }
  | { kind: "error"; message: string }
  | { kind: "done"; result: SearchResult };

const HomePage = () => {
  const { apiKey, requestApiKey } = useContext(ApiKeyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function runSearch(query: string) {
    if (!query.trim()) return;
    if (!apiKey) {
      requestApiKey();
      return;
    }
    setStatus({ kind: "loading", stage: "understanding" });
    try {
      const result = await searchInmuebles(apiKey, query, (stage) =>
        setStatus({ kind: "loading", stage })
      );
      setStatus({ kind: "done", result });
    } catch (err) {
      const message =
        err instanceof SearchError ? err.message : "Something went wrong. Please try again.";
      setStatus({ kind: "error", message });
    }
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void runSearch(searchTerm);
  }

  function handleSampleQuery(query: string) {
    setSearchTerm(query);
    void runSearch(query);
  }

  return (
    <main>
      <HeroSection
        searchTerm={searchTerm}
        busy={status.kind === "loading"}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        onSampleQuery={handleSampleQuery}
      />
      <section className="mx-auto max-w-(--breakpoint-lg) px-4 py-8 sm:py-10" aria-label="Results">
        {status.kind === "loading" ? <LoadItems stage={status.stage} /> : null}
        {status.kind === "error" ? (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200" role="alert">
            {status.message}
          </div>
        ) : null}
        {status.kind === "done" ? (
          <div className="space-y-5">
            <ResultsSummary
              count={status.result.inmuebles.length}
              filters={status.result.filters}
              limit={RESULT_LIMIT}
            />
            {status.result.inmuebles.length > 0 ? (
              <CardsSection inmuebles={status.result.inmuebles} />
            ) : (
              <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                {`Nothing matched. Try a broader search, for example just the city and property type.`}
              </p>
            )}
          </div>
        ) : null}
        {status.kind === "idle" ? (
          <p className="text-center text-sm text-gray-500">
            {apiKey
              ? `Results will appear here.`
              : `Add your OpenAI API key (top right) to start searching.`}
          </p>
        ) : null}
      </section>
    </main>
  );
};

export default HomePage;
