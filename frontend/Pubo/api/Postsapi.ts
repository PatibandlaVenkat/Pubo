import { PostDraft,PostStatus } from "@/types/Post";

// Set EXPO_PUBLIC_API_URL in your .env, e.g. EXPO_PUBLIC_API_URL=https://api.yourapp.com/api
const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api';

export interface PostResponse {
  id: string;
  content: string;
  platforms: string[];
  images: string[];
  status: PostStatus;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}): ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

type PostPayload = Pick<PostDraft, 'content' | 'platforms'> & { images: string[] };

export const postsApi = {
  createDraft(payload: PostPayload) {
    return request<PostResponse>('/posts', {
      method: 'POST',
      body: JSON.stringify({ ...payload, status: 'draft' }),
    });
  },

  updatePost(id: string, payload: Partial<PostPayload>) {
    return request<PostResponse>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  schedulePost(id: string, scheduledAt: string) {
    return request<PostResponse>(`/posts/${id}/schedule`, {
      method: 'POST',
      body: JSON.stringify({ scheduledAt }),
    });
  },

  publishNow(id: string) {
    return request<PostResponse>(`/posts/${id}/publish`, { method: 'POST' });
  },

  deletePost(id: string) {
    return request<void>(`/posts/${id}`, { method: 'DELETE' });
  },

  listPosts(status?: PostStatus) {
    const query = status ? `?status=${status}` : '';
    return request<PostResponse[]>(`/posts${query}`);
  },
};