import { z } from "zod";
import { InmuebleSchema, SearchFiltersSchema, type Inmueble, type SearchFilters } from "./inmueble";

/** "Datos libres" Colombia: properties available for sale. */
export const DATASET_URL = "https://www.datos.gov.co/resource/72gd-px77.json";
export const RESULT_LIMIT = 20;

/** The only dataset columns a search may filter on. */
const FILTER_FIELDS = SearchFiltersSchema.keyof().options;

const ESTRATO_WORDS: Record<string, string> = {
  "1": "UNO",
  "2": "DOS",
  "3": "TRES",
  "4": "CUATRO",
  "5": "CINCO",
  "6": "SEIS",
};

function normalize(value: string): string {
  return value.trim().toUpperCase();
}

/** The dataset stores estrato as a word (e.g. "SEIS"), so map digits to words. */
export function normalizeEstrato(value: string): string {
  const v = normalize(value);
  return ESTRATO_WORDS[v] ?? v;
}

/**
 * Builds the dataset URL from extracted filters. Only known fields are sent and
 * the host is fixed, so model output can never choose what gets fetched.
 */
export function buildQueryUrl(filters: SearchFilters): string {
  const params = new URLSearchParams();
  for (const key of FILTER_FIELDS) {
    const raw = filters[key];
    if (typeof raw !== "string" || raw.trim() === "") continue;
    params.set(key, key === "estrato" ? normalizeEstrato(raw) : normalize(raw));
  }
  params.set("$limit", String(RESULT_LIMIT));
  return `${DATASET_URL}?${params.toString()}`;
}

export class DataSourceError extends Error {}

export async function fetchInmuebles(
  filters: SearchFilters,
  fetchImpl: typeof fetch = fetch
): Promise<Inmueble[]> {
  let res: Response;
  try {
    res = await fetchImpl(buildQueryUrl(filters));
  } catch {
    throw new DataSourceError("Could not reach datos.gov.co.");
  }
  if (!res.ok) {
    throw new DataSourceError(`datos.gov.co responded with ${res.status}.`);
  }
  const parsed = z.array(InmuebleSchema).safeParse(await res.json());
  if (!parsed.success) {
    throw new DataSourceError("Unexpected response from datos.gov.co.");
  }
  return parsed.data;
}
