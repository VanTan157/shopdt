type Option = {
  url?: string;
  headers: HeadersInit;
  credentials?: RequestCredentials;
  withCredentials?: boolean;
};

const res = async <Request>({
  method,
  body,
  url,
  option,
}: {
  method: string;
  body?: unknown;
  url: string;
  option: Option;
}) => {
  const baseUrl = option.url ?? process.env.NEXT_PUBLIC_URL_BE;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  try {
    const response = await fetch(fullUrl, {
      method,
      body: body ? JSON.stringify(body) : undefined, // Avoid stringifying undefined
      ...option,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Lỗi server"); // Throw the specific message
    }
    const payload: Request = await response.json();
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // Re-throw the error with the message intact
    } else {
      throw new Error("Lỗi server");
    }
  }
};

const https = {
  get: <Request>(url: string, options: Option) =>
    res<Request>({ method: "GET", url, option: options }),
  post: <Request>(url: string, options: Option, body: unknown) =>
    res<Request>({ method: "POST", body, url, option: options }),
  put: <Request>(url: string, options: Option, body: unknown) =>
    res<Request>({ method: "PUT", body, url, option: options }),
  delete: <Request>(url: string, options: Option) =>
    res<Request>({ method: "DELETE", url, option: options }),
};

export default https;
