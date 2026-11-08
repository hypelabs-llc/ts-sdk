import { DefaultRequestAdapter } from "@microsoft/kiota-bundle";
import { createCustomerApiClient } from "./generated-customer/customerApiClient.js";
import { CustomerAuthenticationProvider } from "./customerAuthenticationProvider.js";

/** Options for {@link createCustomerClient}. */
export interface CustomerClientOptions {
  /** The organization the customer belongs to, sent as `X-Organization-Id`. Required for the anonymous sign-up, which
   * names its organization by header; harmless once signed in (the token already carries it). */
  organizationId?: string;
  /** API base URL; leave empty to use the SDK default. */
  baseUrl?: string;
}

/**
 * The entry point to the HypeLabs Connect API as one of your end users. Create one without a token to sign a
 * customer in or up (the authenticate and sign-up endpoints are anonymous), then create one with the returned token
 * to reach the rest — `client.orders.get()`, `client.proxies.get()`, and so on.
 *
 * ```ts
 * const auth = createCustomerClient(undefined, { organizationId });
 * const session = await auth.customers.authenticate.post({ email, password });
 * const client = createCustomerClient(session.token, { organizationId });
 * const orders = await client.orders.get();
 * ```
 *
 * The request adapter, the `Authorization: Bearer` authentication and the `X-Organization-Id` header are wired up
 * internally, so callers never touch the generated Kiota plumbing directly.
 *
 * @param token A customer token obtained from one of the authenticate endpoints; omit it before signing in.
 * @param options The organization id to scope the client to, and an optional base URL.
 */
export function createCustomerClient(token?: string, options?: CustomerClientOptions) {
  const adapter = new DefaultRequestAdapter(new CustomerAuthenticationProvider(token, options?.organizationId));
  if (options?.baseUrl?.trim()) {
    adapter.baseUrl = options.baseUrl;
  }
  return createCustomerApiClient(adapter);
}
