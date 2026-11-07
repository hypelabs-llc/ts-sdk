import type { AuthenticationProvider, RequestInformation } from "@microsoft/kiota-abstractions";

/**
 * Authenticates every request with a bearer token in the `Authorization` header. Kiota calls this before each
 * outgoing request; the token is supplied once when the client is created.
 */
export class BearerAuthenticationProvider implements AuthenticationProvider {
  constructor(private readonly token: string) {}

  public authenticateRequest(request: RequestInformation): Promise<void> {
    request.headers.tryAdd("Authorization", `Bearer ${this.token}`);
    return Promise.resolve();
  }
}
