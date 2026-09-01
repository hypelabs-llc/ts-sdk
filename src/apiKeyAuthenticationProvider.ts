import type { AuthenticationProvider, RequestInformation } from "@microsoft/kiota-abstractions";

/**
 * Authenticates every request with the Partner API's `X-Api-Key` header. Kiota calls this before each
 * outgoing request; the key is supplied once when the client is created.
 */
export class ApiKeyAuthenticationProvider implements AuthenticationProvider {
  constructor(private readonly apiKey: string) {}

  public authenticateRequest(request: RequestInformation): Promise<void> {
    request.headers.tryAdd("X-Api-Key", this.apiKey);
    return Promise.resolve();
  }
}
