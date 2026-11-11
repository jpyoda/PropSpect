import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { fetchInmuebles, DataSourceError } from "./datosGov";
import { SearchFiltersSchema, type Inmueble, type SearchFilters } from "./inmueble";

export const DEFAULT_MODEL = "gpt-5.4-mini";

const SYSTEM_PROMPT = `Extraes filtros de búsqueda de inmuebles en Colombia a partir de la consulta del usuario.
Responde solo con los filtros mencionados explícitamente; usa null para el resto.
Todos los valores deben estar en español y en MAYÚSCULAS. No traduzcas.
Si se menciona un estrato numérico, escríbelo en letras (por ejemplo "SEIS" en lugar de "6").`;

export class SearchError extends Error {}

/**
 * Runs in the browser on purpose: this is a public, bring-your-own-key app,
 * so the user's key goes straight to OpenAI and never through our server.
 */
function createClient(apiKey: string): OpenAI {
  return new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
}

export async function extractFilters(
  client: OpenAI,
  query: string,
  model: string = DEFAULT_MODEL
): Promise<SearchFilters> {
  const response = await client.responses.parse({
    model,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
    text: { format: zodTextFormat(SearchFiltersSchema, "search_filters") },
  });
  if (!response.output_parsed) {
    throw new SearchError("The model did not return any filters.");
  }
  return response.output_parsed;
}

function toSearchError(err: unknown): SearchError {
  if (err instanceof SearchError) return err;
  if (err instanceof DataSourceError) return new SearchError(err.message);
  if (err instanceof OpenAI.APIError) {
    if (err.status === 401) return new SearchError("Your OpenAI API key was rejected. Check it and try again.");
    if (err.status === 429) return new SearchError("OpenAI rate limit or quota reached. Check your usage and try again later.");
    return new SearchError(`OpenAI request failed: ${err.message}`);
  }
  return new SearchError("Something went wrong. Please try again.");
}

export type SearchStage = "understanding" | "fetching";

export type SearchResult = {
  filters: SearchFilters;
  inmuebles: Inmueble[];
};

export async function searchInmuebles(
  apiKey: string,
  query: string,
  onStage?: (stage: SearchStage) => void
): Promise<SearchResult> {
  try {
    onStage?.("understanding");
    const filters = await extractFilters(createClient(apiKey), query);
    onStage?.("fetching");
    const inmuebles = await fetchInmuebles(filters);
    return { filters, inmuebles };
  } catch (err) {
    throw toSearchError(err);
  }
}
