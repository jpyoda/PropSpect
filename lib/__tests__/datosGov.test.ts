import { describe, expect, it, vi } from "vitest";
import {
  buildQueryUrl,
  DataSourceError,
  DATASET_URL,
  fetchInmuebles,
  normalizeEstrato,
  RESULT_LIMIT,
} from "../datosGov";
import type { SearchFilters } from "../inmueble";

const empty: SearchFilters = {
  ciudad: null,
  departamento: null,
  barrio: null,
  estrato: null,
  tipo_de_inmueble: null,
};

function params(url: string) {
  expect(url.startsWith(`${DATASET_URL}?`)).toBe(true);
  return new URL(url).searchParams;
}

describe("normalizeEstrato", () => {
  it("maps digits to Spanish words", () => {
    expect(normalizeEstrato("6")).toBe("SEIS");
    expect(normalizeEstrato(" 1 ")).toBe("UNO");
  });
  it("uppercases words and keeps unknown values", () => {
    expect(normalizeEstrato("cinco")).toBe("CINCO");
    expect(normalizeEstrato("rural")).toBe("RURAL");
  });
});

describe("buildQueryUrl", () => {
  it("sends only the limit when no filters are set", () => {
    const p = params(buildQueryUrl(empty));
    expect([...p.keys()]).toEqual(["$limit"]);
    expect(p.get("$limit")).toBe(String(RESULT_LIMIT));
  });

  it("uppercases values and normalizes estrato", () => {
    const p = params(
      buildQueryUrl({ ...empty, ciudad: "Bogota", estrato: "6", tipo_de_inmueble: "apartamento" })
    );
    expect(p.get("ciudad")).toBe("BOGOTA");
    expect(p.get("estrato")).toBe("SEIS");
    expect(p.get("tipo_de_inmueble")).toBe("APARTAMENTO");
    expect(p.has("barrio")).toBe(false);
  });

  it("skips blank values and encodes special characters", () => {
    const p = params(buildQueryUrl({ ...empty, barrio: "Santa Fe & Co", ciudad: "  " }));
    expect(p.get("barrio")).toBe("SANTA FE & CO");
    expect(p.has("ciudad")).toBe(false);
  });

  it("ignores keys that are not known filters", () => {
    const sneaky = { ...empty, $where: "1=1" } as unknown as SearchFilters;
    const p = params(buildQueryUrl(sneaky));
    expect(p.has("$where")).toBe(false);
    expect([...p.keys()]).toEqual(["$limit"]);
  });
});

describe("fetchInmuebles", () => {
  const ok = (body: unknown) =>
    vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));

  it("parses rows and coerces numbers to strings", async () => {
    const fetchImpl = ok([{ codigo: 7, ciudad: "BOGOTA", precio: 500000000, extra: "x" }]);
    const rows = await fetchInmuebles({ ...empty, ciudad: "bogota" }, fetchImpl);
    expect(rows).toEqual([{ codigo: "7", ciudad: "BOGOTA", precio: "500000000" }]);
    expect(fetchImpl).toHaveBeenCalledWith(expect.stringContaining("ciudad=BOGOTA"));
  });

  it("throws DataSourceError on HTTP errors", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("nope", { status: 500 }));
    await expect(fetchInmuebles(empty, fetchImpl)).rejects.toBeInstanceOf(DataSourceError);
  });

  it("throws DataSourceError on network failure", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(fetchInmuebles(empty, fetchImpl)).rejects.toBeInstanceOf(DataSourceError);
  });

  it("throws DataSourceError on an unexpected payload", async () => {
    await expect(fetchInmuebles(empty, ok({ error: true }))).rejects.toBeInstanceOf(DataSourceError);
  });
});
