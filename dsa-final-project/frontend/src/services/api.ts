const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface BackendHealthResponse {
  status: string;
  timestamp?: string;
  [key: string]: unknown;
}

export interface HealthCheckResult {
  isHealthy: boolean;
  status: string;
  details?: unknown;
}

/**
 * Generic fetch wrapper configured with base API URL and standard headers.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const normalizedBase = BASE_URL.replace(/\/+$/, '');
  const normalizedEndpoint = endpoint.replace(/^\/+/, '');
  const url = `${normalizedBase}/${normalizedEndpoint}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`API Request failed [${response.status} ${response.statusText}]: ${errorText || url}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Checks backend health by querying GET /health.
 */
export async function checkBackendHealth(): Promise<HealthCheckResult> {
  try {
    const data = await apiFetch<BackendHealthResponse>('/health', {
      method: 'GET',
    });
    return {
      isHealthy: true,
      status: data.status || 'UP',
      details: data,
    };
  } catch (error) {
    return {
      isHealthy: false,
      status: 'DOWN',
      details: error instanceof Error ? error.message : 'Backend unreachable',
    };
  }
}
