import type { AuthenticationProvider, RequestInformation } from "@microsoft/kiota-abstractions";

/**
 * Authenticates a customer request: a bearer token once the customer is signed in, and the organization id the
 * customer belongs to. Both are optional — before sign-in there's no token yet, and the organization is only needed
 * where the request doesn't already carry it (the anonymous sign-up names its organization by header).
 */
export class CustomerAuthenticationProvider implements AuthenticationProvider {
  constructor(
    private readonly token?: string,
    private readonly organizationId?: string,
  ) {}

  public authenticateRequest(request: RequestInformation): Promise<void> {
    if (this.token?.trim()) {
      request.headers.tryAdd("Authorization", `Bearer ${this.token}`);
    }
    if (this.organizationId?.trim()) {
      request.headers.tryAdd("X-Organization-Id", this.organizationId);
    }
    return Promise.resolve();
  }
}
