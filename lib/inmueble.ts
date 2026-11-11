import { z } from "zod";

/**
 * Filters the LLM extracts from a free-text query. Every field is nullable
 * (rather than optional) because OpenAI structured outputs require all keys.
 */
export const SearchFiltersSchema = z.object({
  ciudad: z
    .string()
    .nullable()
    .describe("City, uppercase Spanish, e.g. BOGOTA. Null if not mentioned."),
  departamento: z
    .string()
    .nullable()
    .describe("Department, uppercase Spanish. Null if not mentioned."),
  barrio: z
    .string()
    .nullable()
    .describe("Neighborhood, uppercase Spanish. Null if not mentioned."),
  estrato: z
    .string()
    .nullable()
    .describe(
      "Socioeconomic level written as an uppercase Spanish word (e.g. SEIS, not 6) or RURAL. Null if not mentioned."
    ),
  tipo_de_inmueble: z
    .string()
    .nullable()
    .describe(
      "Property type, uppercase Spanish singular, e.g. APARTAMENTO, CASA, LOTE, LOCAL. Null if not mentioned."
    ),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

/** Socrata returns numbers as strings; accept either and keep a string. */
const text = z
  .union([z.string(), z.number()])
  .transform((v) => String(v))
  .optional();

/** One property row from the datos.gov.co dataset. */
export const InmuebleSchema = z.object({
  codigo: text,
  ciudad: text,
  departamento: text,
  barrio: text,
  direccion: text,
  area_terreno: text,
  area_construida: text,
  detalle_disponibilidad: text,
  estrato: text,
  precio: text,
  tipo_de_inmueble: text,
});

export type Inmueble = z.infer<typeof InmuebleSchema>;
