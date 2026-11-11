const ESTRATO_NUMBERS: Record<string, string> = {
  UNO: "1",
  DOS: "2",
  TRES: "3",
  CUATRO: "4",
  CINCO: "5",
  SEIS: "6",
};

/** Street-type abbreviations used in Colombian addresses; kept uppercase. */
const ADDRESS_ABBREVIATIONS = new Set([
  "AC", "AK", "AV", "AVE", "CL", "CLL", "CR", "CRA", "KR", "KRA", "DG", "TV", "TR", "BIS", "SUR", "ESTE",
]);

const LOWERCASE_WORDS = new Set(["de", "del", "la", "las", "el", "los", "en", "y", "a"]);

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * The dataset is all uppercase. Title-case it for display while keeping
 * abbreviations such as "D.C." and street types such as "CL" or "KR" intact.
 */
export function titleCase(value: string | undefined): string {
  if (!value) return "";
  return value
    .trim()
    .split(/\s+/)
    .map((word, i) => {
      const upper = word.toUpperCase();
      if (word.includes(".") || ADDRESS_ABBREVIATIONS.has(upper)) return upper;
      const lower = word.toLowerCase();
      if (i > 0 && LOWERCASE_WORDS.has(lower)) return lower;
      return capitalize(lower);
    })
    .join(" ");
}

/** Sentence case for long free text such as availability details. */
export function sentenceCase(value: string | undefined): string {
  if (!value) return "";
  return capitalize(value.trim().toLowerCase());
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** "850000000" -> "$ 850.000.000". Returns null when the value is not a number. */
export function formatPrice(value: string | undefined): string | null {
  if (!value) return null;
  const n = Number(value.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return copFormatter.format(n);
}

/** "120.5" -> "120,5 m²". Returns null for missing or zero areas. */
export function formatArea(value: string | undefined): string | null {
  if (!value) return null;
  const n = Number(value.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return `${n.toLocaleString("es-CO", { maximumFractionDigits: 1 })} m²`;
}

/** "SEIS" -> "6", "RURAL" -> "Rural". */
export function formatEstrato(value: string | undefined | null): string | null {
  if (!value) return null;
  const upper = value.trim().toUpperCase();
  return ESTRATO_NUMBERS[upper] ?? titleCase(upper);
}

export type Availability = "available" | "unavailable" | "unknown";

/** Classifies the free-text availability detail for a status badge. */
export function availabilityOf(detail: string | undefined): Availability {
  if (!detail) return "unknown";
  const d = detail
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
  if (/\bNO DISPONIBLE\b|\bVENDID|\bRESERVAD|\bSANEAMIENTO\b|\bOCUPAD/.test(d)) return "unavailable";
  if (/\bDISPONIBLE\b/.test(d)) return "available";
  return "unknown";
}
