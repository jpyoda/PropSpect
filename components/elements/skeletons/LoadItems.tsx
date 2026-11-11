import React from "react";
import type { SearchStage } from "@/lib/search";

const STAGE_TEXT: Record<SearchStage, string> = {
  understanding: "Understanding your search…",
  fetching: "Searching datos.gov.co…",
};

const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="animate-pulse space-y-3">
      <div className="h-3 w-24 rounded bg-gray-200" />
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="h-4 w-48 rounded bg-gray-100" />
      <div className="flex gap-2 pt-2">
        <div className="h-5 w-16 rounded bg-gray-100" />
        <div className="h-5 w-14 rounded bg-gray-100" />
      </div>
    </div>
  </div>
);

const LoadItems = ({ stage }: { stage: SearchStage }) => {
  return (
    <div role="status" aria-live="polite">
      <p className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600">
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" aria-hidden="true" />
        {STAGE_TEXT[stage]}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default LoadItems;
