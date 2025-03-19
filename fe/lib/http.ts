type Option = {
  url?: string;
  headers: HeadersInit;
  credentials?: RequestCredentials;
  withCredentials?: boolean;
};

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

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

  // Kiểm tra xem body có phải là object rỗng hay không
  const isEmptyObject =
    body && typeof body === "object" && Object.keys(body).length === 0;
  const requestBody = body && !isEmptyObject ? JSON.stringify(body) : undefined;

  try {
    const response = await fetch(fullUrl, {
      method,
      body: requestBody, // Sử dụng requestBody đã xử lý
      ...option,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new HttpError(error.message || "Lỗi server", error.statusCode); // Throw the specific message
    }
    const payload: Request = await response.json();
    return payload;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error; // Re-throw the error with the message intact
    } else {
      throw new Error("Lỗi server!!!");
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
  patch: <Request>(url: string, options: Option, body: unknown) =>
    res<Request>({ method: "PATCH", body, url, option: options }),
  delete: <Request>(url: string, options: Option) =>
    res<Request>({ method: "DELETE", url, option: options }),
};

export default https;
