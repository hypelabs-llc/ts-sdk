import type { AdditionalDataHolder, Parsable } from "@microsoft/kiota-abstractions";

// The Kiota infrastructure every generated model carries: the `additionalData` bag and the (de)serialization
// methods from Parsable. Strip these to get a plain data shape — the part safe to hand to a React Client
// Component, JSON.stringify, or store as-is.
type KiotaParts = keyof AdditionalDataHolder | keyof Parsable;

/**
 * The plain-data shape of a generated model: same fields, minus Kiota's `additionalData` and serialization
 * methods. Use it so you never have to hand-write a DTO — `Plain<Location>` is exactly the model's data fields,
 * and stays in sync when the API adds one.
 */
export type Plain<T> = Omit<T, KiotaParts>;

/**
 * Returns a plain copy of a generated model — the data fields only, with `additionalData` and the Parsable
 * methods dropped — so it can cross a React Server/Client boundary (Next.js "Only plain objects" error),
 * be JSON-serialized, or be persisted without dragging the Kiota machinery along.
 */
export function toPlain<T extends AdditionalDataHolder>(model: T): Plain<T> {
	// Spread copies only own enumerable properties (the data fields + additionalData); Parsable's methods live on
	// the type, not as own enumerable props, so they're already gone. Then drop additionalData.
	const { additionalData: _additionalData, ...rest } = model as T & Record<string, unknown>;
	return rest as Plain<T>;
}
