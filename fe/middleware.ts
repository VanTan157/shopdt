import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRouter = ["/profile"];
const publicRouter = ["/register", "/login"];

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const url = request.nextUrl.pathname;
  if (publicRouter.includes(url) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (privateRouter.includes(url) && !accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/login", "/register"],
};
