import React from "react";
import type { SearchFilters } from "@/lib/inmueble";
import { formatEstrato, titleCase } from "@/lib/format";

type Props = {
  count: number;
  filters: SearchFilters;
  limit: number;
};

/** Shows how the query was understood, so a misread is easy to spot. */
const ResultsSummary = ({ count, filters, limit }: Props) => {
  const estrato = formatEstrato(filters.estrato);
  const chips = [
    filters.tipo_de_inmueble && titleCase(filters.tipo_de_inmueble),
    filters.barrio && `Barrio ${titleCase(filters.barrio)}`,
    filters.ciudad && titleCase(filters.ciudad),
    filters.departamento && titleCase(filters.departamento),
    estrato && `Estrato ${estrato}`,
  ].filter(Boolean) as string[];

  const countText =
    count === 0
      ? "No properties found"
      : `${count}${count === limit ? "+" : ""} ${count === 1 ? "property" : "properties"}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-semibold text-gray-900">{countText}</span>
      {chips.length > 0 ? (
        <>
          <span className="text-gray-400">{`for`}</span>
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-brand-800 ring-1 ring-brand-200"
            >
              {c}
            </span>
          ))}
        </>
      ) : (
        <span className="text-gray-500">{`(no filters recognised)`}</span>
      )}
    </div>
  );
};

export default ResultsSummary;
