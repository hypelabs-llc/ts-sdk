import { DefaultRequestAdapter } from "@microsoft/kiota-bundle";
import { createConnectApiClient } from "./generated/connectApiClient.js";
import { ApiKeyAuthenticationProvider } from "./apiKeyAuthenticationProvider.js";

/**
 * The entry point to the HypeLabs Connect API. Create one with your API key and use the fluent request
 * builders it returns — `client.products.get()`, `client.customers.post(...)`, and so on.
 *
 * ```ts
 * const client = createConnectClient("hl_live_...");
 * const products = await client.products.get();
 * ```
 *
 * The request adapter and the `X-Api-Key` authentication are wired up internally, so callers never touch
 * the generated Kiota plumbing directly.
 *
 * @param apiKey A Connect API key (e.g. `hl_live_…`).
 */
export function createConnectClient(apiKey: string) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("An API key is required.");
  }
  const adapter = new DefaultRequestAdapter(new ApiKeyAuthenticationProvider(apiKey));
  return createConnectApiClient(adapter);
}
