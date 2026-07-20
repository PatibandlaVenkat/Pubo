// Keep this consistent with Postsapi.ts: EXPO_PUBLIC_API_URL points to /api.
const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

type RequestOptions = {
  token: string;
  body: Record<string, unknown>;
};

export type BlueskyConnectionPayload = {
  Handle: string;
  Password: string;
  PlatformId: 3;
  DisplayName?: string;
};

export type LinkedinConnectionPayload = {
  displayName: string;
  
  acessToken: string;
  platformId: 2;
};

async function connect(path: string, { token, body }: RequestOptions): Promise<unknown> {
  const response = await fetch(`${API_BASE}/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json().catch(() => undefined);
}

export const connectionsApi = {
  connectBluesky(token: string, payload: BlueskyConnectionPayload) {
    return connect("/bluesky/connect", { token, body: payload });
  },

  connectLinkedin(token: string, payload: LinkedinConnectionPayload) {
    return connect("/linkedin/connect", { token, body: payload });
  },
};
