"use client";

import React, { useContext, useState } from "react";
import HeroSection from "../modules/containers/HeroSection";
import CardsSection from "../modules/containers/CardsSection";
import LoadItems from "../elements/skeletons/LoadItems";
import ApiKeyContext from "../layouts/ApiKeyContext";
import { searchInmuebles, SearchError } from "@/lib/search";
import type { Inmueble } from "@/lib/inmueble";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "done"; inmuebles: Inmueble[] };

const HomePage = () => {
  const apiKey = useContext(ApiKeyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!apiKey) return;
    setStatus({ kind: "loading" });
    try {
      const inmuebles = await searchInmuebles(apiKey, searchTerm);
      setStatus({ kind: "done", inmuebles });
    } catch (err) {
      const message =
        err instanceof SearchError ? err.message : "Something went wrong. Please try again.";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 px-0 md:px-24 bg-slate-50">
      <HeroSection
        searchTerm={searchTerm}
        apikeyAlert={!apiKey}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
      />
      {status.kind === "loading" ? <LoadItems /> : null}
      {status.kind === "error" ? (
        <div
          className="max-w-screen-md w-full px-4 mb-6"
          role="alert"
        >
          <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50">{status.message}</div>
        </div>
      ) : null}
      {status.kind === "done" ? (
        status.inmuebles.length > 0 ? (
          <CardsSection inmuebles={status.inmuebles} />
        ) : (
          <p className="text-gray-500 mb-6">{`No properties matched your search.`}</p>
        )
      ) : null}
    </main>
  );
};

export default HomePage;
