import { describe, expect, it } from "vitest";
import {
  availabilityOf,
  formatArea,
  formatEstrato,
  formatPrice,
  sentenceCase,
  titleCase,
} from "../format";

describe("titleCase", () => {
  it("keeps abbreviations with dots uppercase", () => {
    expect(titleCase("BOGOTA D.C.")).toBe("Bogota D.C.");
  });
  it("keeps street types uppercase in addresses", () => {
    expect(titleCase("CL 94 # 11-45 APTO 502")).toBe("CL 94 # 11-45 Apto 502");
    expect(titleCase("KR 4 # 70-12")).toBe("KR 4 # 70-12");
  });
  it("lowercases Spanish connector words after the first word", () => {
    expect(titleCase("SAN JOSE DE LA MONTAÑA")).toBe("San Jose de la Montaña");
  });
  it("handles empty input", () => {
    expect(titleCase(undefined)).toBe("");
  });
});

describe("sentenceCase", () => {
  it("capitalizes only the first letter", () => {
    expect(sentenceCase("DISPONIBLE PARA LA VENTA")).toBe("Disponible para la venta");
  });
});

describe("formatPrice", () => {
  it("formats Colombian pesos with thousands separators", () => {
    expect(formatPrice("850000000")).toMatch(/^\$\s?850\.000\.000$/);
  });
  it("accepts decimal strings", () => {
    expect(formatPrice("1250000000.0")).toMatch(/1\.250\.000\.000/);
  });
  it("returns null for missing or non-numeric values", () => {
    expect(formatPrice(undefined)).toBeNull();
    expect(formatPrice("A CONVENIR")).toBeNull();
    expect(formatPrice("0")).toBeNull();
  });
});

describe("formatArea", () => {
  it("adds square metres", () => {
    expect(formatArea("120")).toBe("120 m²");
    expect(formatArea("85.5")).toBe("85,5 m²");
  });
  it("returns null for zero or missing", () => {
    expect(formatArea("0")).toBeNull();
    expect(formatArea(undefined)).toBeNull();
  });
});

describe("formatEstrato", () => {
  it("turns words into digits", () => {
    expect(formatEstrato("SEIS")).toBe("6");
    expect(formatEstrato("uno")).toBe("1");
  });
  it("title-cases other values", () => {
    expect(formatEstrato("RURAL")).toBe("Rural");
  });
});

describe("availabilityOf", () => {
  it("detects available listings", () => {
    expect(availabilityOf("DISPONIBLE PARA LA VENTA")).toBe("available");
  });
  it("detects unavailable listings before matching 'disponible'", () => {
    expect(availabilityOf("NO DISPONIBLE TEMPORALMENTE")).toBe("unavailable");
    expect(availabilityOf("EN PROCESO DE SANEAMIENTO JURÍDICO")).toBe("unavailable");
  });
  it("returns unknown otherwise", () => {
    expect(availabilityOf("CONSULTAR")).toBe("unknown");
    expect(availabilityOf(undefined)).toBe("unknown");
  });
});
