# PropSpect

### The AI Revolution for Brokers

Describe the property you are looking for in plain language, for example
*"apartamentos en Bogotá estrato seis"*, and PropSpect searches Colombia's open
property data for matching listings. No filter forms needed.

---

## Features

- **Plain-language search**: an OpenAI model turns your query into structured filters.
- **Open data**: results come from the *Datos Abiertos Colombia* dataset of properties for sale
  ([`72gd-px77`](https://www.datos.gov.co/resource/72gd-px77.json)).
- **Bring your own key**: you paste your own OpenAI API key; it is sent only to OpenAI.

## How it works

1. You type a query and press **Search**.
2. Your browser makes one OpenAI call (Responses API with structured output) that
   extracts filters: `ciudad`, `departamento`, `barrio`, `estrato`, `tipo_de_inmueble`
   (`lib/search.ts`).
3. PropSpect builds a query against the fixed datos.gov.co endpoint from those
   fields only, with a result limit (`lib/datosGov.ts`). The model never chooses
   which URL is fetched.
4. The rows are validated with zod and shown as cards.

### About your API key

PropSpect is a public, static app with no backend. Your key stays in your
browser's memory and goes directly to `api.openai.com`; it never passes through
a PropSpect server. Tick **Remember for this tab** to keep it in
`sessionStorage` until the tab closes. We recommend
[setting a spending limit](https://platform.openai.com/settings/organization/limits)
on your OpenAI account.

The model is set by `DEFAULT_MODEL` in `lib/search.ts`.

---

## Getting started

Requires **Node.js 20.9+** (see `.nvmrc`).

```bash
git clone https://github.com/jpyoda/PropSpect
cd PropSpect
npm install
npm run dev
```

Open http://localhost:3000, paste your OpenAI API key at the top of the page,
and try one of the sample queries.

### Scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the dev server               |
| `npm run build`     | Production build                   |
| `npm start`         | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | TypeScript, no emit                |
| `npm test`          | Unit tests (Vitest)                |

### Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript, the `openai`
SDK and zod 4.

---

## Limitations

- **OpenAI rate limits and cost**: searches use your key's quota.
- **Exact matching**: filters are sent as exact, uppercase matches against the
  dataset, so spelling has to match the source data (for example `BOGOTA`).
  Estrato is sent as a word (`SEIS`), as the dataset stores it.
- **Data coverage**: results are limited to what the public dataset contains.

## Contributing

Contributions are welcome. Open an issue or pull request on GitHub. CI runs
lint, typecheck, tests and a production build on every pull request.

## License

MIT, see [LICENSE](LICENSE). Property data comes from Datos Abiertos Colombia;
follow its terms of use when deploying or redistributing this app.
