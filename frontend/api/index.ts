interface FetchOptions {
  body?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export interface FetchSuccess<ResData> {
  isError: false;
  data: ResData;
}

export interface FetchError {
  isError: true;
  data: Record<"detail", string> | Record<string, string[]>;
}

export default async function apiFetch<T>(
  path: string,
  options?: FetchOptions
): Promise<FetchSuccess<T> | FetchError> {
  const accessToken = localStorage.getItem("access");

  const fetchOptions: RequestInit = {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  };

  if (typeof options !== "undefined") {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
      ...options.headers,
    };
    fetchOptions.method = "POST";
  }

  const res = await fetch(`http://localhost:8000/api/v1/${path}`, fetchOptions);

  const data = await res.json();

  if (!res.ok) {
    return {
      isError: true,
      data,
    };
  }

  return {
    isError: false,
    data: data as T,
  };
}
