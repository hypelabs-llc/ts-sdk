<p align="center">
  <img src="https://i.imgur.com/NtKvmk2.png" height="100" alt="HypeLabs" />
</p>
<h3 align="center">
  HypeLabs Partner SDK
</h3>
<p align="center">
  The TypeScript client for the HypeLabs Partner API, for internal services. 🚀
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@hypelabs-llc/ts-sdk"><img src="https://img.shields.io/npm/v/@hypelabs-llc/ts-sdk?color=cb3837&label=npm" /></a>
  <a href="https://www.npmjs.com/package/@hypelabs-llc/ts-sdk"><img src="https://img.shields.io/npm/dt/@hypelabs-llc/ts-sdk?color=cb3837&label=Downloads" /></a>
  <a href="https://connect.hypelabs.network"><img src="https://img.shields.io/badge/API-connect.hypelabs.network-6366f1" /></a>
  <a href="https://learn.microsoft.com/openapi/kiota/"><img src="https://img.shields.io/badge/Generated%20With-Kiota-0078d4" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-lightgrey.svg" /></a>
</p>

## Requirements

- Node.js 18 or later
- A HypeLabs Partner API key (`hl_live_…`)

> The client authenticates with an API key, so run it **server-side** (Node, a backend, or a framework's
> server runtime) — never ship your key to the browser.

## Install

```bash
npm install @hypelabs-llc/ts-sdk
```

## Usage

Create a client with your API key and call the API. Every call is async and returns typed models.

```ts
import { createPartnerClient } from "@hypelabs-llc/ts-sdk";

const client = createPartnerClient(process.env.PARTNER_API_KEY!);

const products = await client.products.get();
for (const product of products ?? []) {
  console.log(product.name, product.id);
}
```

### With Next.js

Keep one shared client in a server-only module so the key never reaches the browser:

```ts
// lib/partner.ts
import "server-only";
import { createPartnerClient } from "@hypelabs-llc/ts-sdk";

export const partner = createPartnerClient(process.env.PARTNER_API_KEY!);
```

```tsx
// app/products/page.tsx — a Server Component
import { partner } from "@/lib/partner";

export default async function Page() {
  const products = await partner.products.get();
  return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
```

The API is authenticated with the `X-Api-Key` header, wired up internally — you never touch the Kiota plumbing.
