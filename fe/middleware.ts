import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AccountType } from "./app/validate";
import ReqApi from "./lib/ResApi";

const privateRouter = ["/profile"];
const publicRouter = ["/register", "/login"];
const adminRouter = ["/admin"];

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  let user: AccountType | null = null;
  try {
    const res = await ReqApi.getMe(accessToken?.value || "");
    user = res;
    console.log(res);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }
  const url = request.nextUrl.pathname;
  if (publicRouter.includes(url) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (privateRouter.includes(url) && !accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (user && adminRouter.includes(url) && user.type !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!user && adminRouter.includes(url)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/login", "/register", "/admin"],
};
