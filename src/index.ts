export { createConnectClient } from "./connectClient.js";
export { ApiKeyAuthenticationProvider } from "./apiKeyAuthenticationProvider.js";

// The customer surface: the same API seen by an end user, authenticated by a customer bearer token.
export { createCustomerClient } from "./customerClient.js";
export { BearerAuthenticationProvider } from "./bearerAuthenticationProvider.js";

// Re-export the generated models (Customer, Order, Proxy, …) so consumers import them from the package root.
export * from "./generated/models/index.js";

// The customer document's models overlap the public ones by name, so they're exposed under a namespace rather
// than re-exported at the root: `import { CustomerModels } from "@hypelabs-llc/ts-sdk"`.
export * as CustomerModels from "./generated-customer/models/index.js";

// Plain<T> / toPlain(): turn a generated model into its plain-data shape (no hand-written DTOs, safe for React
// Client Components).
export { type Plain, toPlain } from "./plain.js";
