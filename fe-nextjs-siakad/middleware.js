import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  if (path === "/login") return NextResponse.next();

  if (path === "/") {
    const role = request.cookies.get("role")?.value;

    if (role !== "superadmin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
