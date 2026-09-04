export { createPartnerClient } from "./partnerClient.js";
export { ApiKeyAuthenticationProvider } from "./apiKeyAuthenticationProvider.js";

// Re-export the generated models (Customer, Order, Proxy, …) so consumers import them from the package root.
export * from "./generated/models/index.js";

// Plain<T> / toPlain(): turn a generated model into its plain-data shape (no hand-written DTOs, safe for React
// Client Components).
export { type Plain, toPlain } from "./plain.js";
