import type { AuthenticationProvider } from "@microsoft/kiota-abstractions";
import { DefaultRequestAdapter } from "@microsoft/kiota-bundle";
import { createCustomerApiClient } from "./generated-customer/customerApiClient.js";
import { BearerAuthenticationProvider } from "./bearerAuthenticationProvider.js";

// Sends nothing: used before sign-in so the anonymous authenticate and sign-up endpoints can be called without a token.
const anonymous: AuthenticationProvider = { authenticateRequest: () => Promise.resolve() };

/**
 * The entry point to the HypeLabs Connect API as one of your end users. Create one without a token to sign a
 * customer in or up (the authenticate and sign-up endpoints are anonymous), then create one with the returned token
 * to reach the rest — `client.orders.get()`, `client.proxies.get()`, and so on.
 *
 * ```ts
 * const auth = createCustomerClient();
 * const session = await auth.customers.authenticate.post({ email, password });
 * const client = createCustomerClient(session.token);
 * const orders = await client.orders.get();
 * ```
 *
 * The request adapter and the `Authorization: Bearer` authentication are wired up internally, so callers never
 * touch the generated Kiota plumbing directly.
 *
 * @param token A customer token obtained from one of the authenticate endpoints; omit it before signing in.
 * @param baseUrl Optional API base URL; leave empty to use the SDK default.
 */
export function createCustomerClient(token?: string, baseUrl?: string) {
  const provider = token?.trim() ? new BearerAuthenticationProvider(token) : anonymous;
  const adapter = new DefaultRequestAdapter(provider);
  if (baseUrl?.trim()) {
    adapter.baseUrl = baseUrl;
  }
  return createCustomerApiClient(adapter);
}
