import React from "react";
import type { Inmueble } from "@/lib/inmueble";
import {
  availabilityOf,
  formatArea,
  formatEstrato,
  formatPrice,
  sentenceCase,
  titleCase,
  type Availability,
} from "@/lib/format";

const AVAILABILITY_STYLES: Record<Availability, { label: string; className: string }> = {
  available: { label: "Disponible", className: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  unavailable: { label: "No disponible", className: "bg-amber-50 text-amber-900 ring-amber-200" },
  unknown: { label: "Consultar", className: "bg-gray-100 text-gray-700 ring-gray-200" },
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{children}</span>
);

const PropertyCard = ({ inmueble: v }: { inmueble: Inmueble }) => {
  const price = formatPrice(v.precio);
  const estrato = formatEstrato(v.estrato);
  const area = formatArea(v.area_construida) ?? formatArea(v.area_terreno);
  const availability = availabilityOf(v.detalle_disponibilidad);
  const status = AVAILABILITY_STYLES[availability];
  const place = [titleCase(v.barrio), titleCase(v.ciudad)].filter(Boolean).join(", ");
  const detail = sentenceCase(v.detalle_disponibilidad);

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          {titleCase(v.tipo_de_inmueble) || "Inmueble"}
        </p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
        {price ?? <span className="text-lg font-semibold text-gray-500">{`Precio a consultar`}</span>}
      </p>
      {place ? <h3 className="mt-1 text-base font-semibold text-gray-800">{place}</h3> : null}
      {v.direccion ? <p className="mt-0.5 text-sm text-gray-500">{titleCase(v.direccion)}</p> : null}

      {estrato || area ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {estrato ? <Tag>{`Estrato ${estrato}`}</Tag> : null}
          {area ? <Tag>{area}</Tag> : null}
        </div>
      ) : null}

      {detail && availability !== "available" ? (
        <p className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">{detail}</p>
      ) : null}
    </article>
  );
};

type Props = {
  inmuebles: Inmueble[];
};

const CardsSection = ({ inmuebles }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {inmuebles.map((v, i) => (
        <PropertyCard key={`${v.codigo ?? ""}-${i}`} inmueble={v} />
      ))}
    </div>
  );
};

export default CardsSection;
