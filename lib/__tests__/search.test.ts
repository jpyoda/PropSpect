import { afterEach, describe, expect, it, vi } from "vitest";
import { searchInmuebles, SearchError } from "../search";

const filters = {
  ciudad: "BOGOTA",
  departamento: null,
  barrio: null,
  estrato: "SEIS",
  tipo_de_inmueble: "APARTAMENTO",
};

function openAiResponse(parsed: unknown) {
  return {
    id: "resp_1",
    object: "response",
    created_at: 0,
    status: "completed",
    model: "test",
    output: [
      {
        type: "message",
        id: "msg_1",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", annotations: [], text: JSON.stringify(parsed) }],
      },
    ],
    usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
  };
}

function mockFetch(handler: (url: string) => Response) {
  const fn = vi.fn(async (input: RequestInfo | URL) =>
    handler(typeof input === "string" ? input : input instanceof URL ? input.href : input.url)
  );
  vi.stubGlobal("fetch", fn);
  return fn;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("searchInmuebles", () => {
  it("extracts filters with OpenAI, then queries datos.gov.co with them", async () => {
    const fetchMock = mockFetch((url) =>
      url.startsWith("https://api.openai.com")
        ? json(openAiResponse(filters))
        : json([{ codigo: "1", ciudad: "BOGOTA", estrato: "SEIS" }])
    );

    const rows = await searchInmuebles("sk-test", "apartamentos en bogota estrato 6");

    expect(rows).toEqual([{ codigo: "1", ciudad: "BOGOTA", estrato: "SEIS" }]);
    const datosCall = fetchMock.mock.calls
      .map(([input]) => String(input instanceof Request ? input.url : input))
      .find((u) => u.includes("datos.gov.co"));
    expect(datosCall).toContain("ciudad=BOGOTA");
    expect(datosCall).toContain("estrato=SEIS");
  });

  it("reports a rejected API key clearly", async () => {
    mockFetch(() => json({ error: { message: "bad key", type: "invalid_request_error" } }, 401));
    await expect(searchInmuebles("sk-bad", "casas")).rejects.toThrow(/API key was rejected/);
  });

  it("wraps data source failures in SearchError", async () => {
    mockFetch((url) =>
      url.startsWith("https://api.openai.com") ? json(openAiResponse(filters)) : json("down", 503)
    );
    const err = await searchInmuebles("sk-test", "casas").catch((e) => e);
    expect(err).toBeInstanceOf(SearchError);
    expect(err.message).toMatch(/datos\.gov\.co responded with 503/);
  });
});
