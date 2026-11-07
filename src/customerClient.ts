import { DefaultRequestAdapter } from "@microsoft/kiota-bundle";
import { createCustomerApiClient } from "./generated-customer/customerApiClient.js";
import { BearerAuthenticationProvider } from "./bearerAuthenticationProvider.js";

/**
 * The entry point to the HypeLabs Connect API as one of your end users. Create one with a customer token and use
 * the fluent request builders it returns — `client.orders.get()`, `client.proxies.get()`, and so on.
 *
 * ```ts
 * const client = createCustomerClient("<customer token>");
 * const orders = await client.orders.get();
 * ```
 *
 * The request adapter and the `Authorization: Bearer` authentication are wired up internally, so callers never
 * touch the generated Kiota plumbing directly. The token is the one returned by the authenticate endpoints.
 *
 * @param token A customer token obtained from one of the authenticate endpoints.
 * @param baseUrl Optional API base URL; leave empty to use the SDK default.
 */
export function createCustomerClient(token: string, baseUrl?: string) {
  if (!token || !token.trim()) {
    throw new Error("A customer token is required.");
  }
  const adapter = new DefaultRequestAdapter(new BearerAuthenticationProvider(token));
  if (baseUrl?.trim()) {
    adapter.baseUrl = baseUrl;
  }
  return createCustomerApiClient(adapter);
}
