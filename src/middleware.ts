import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware logic on /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("aadhi_admin_session");
    const isLoginPage = pathname === "/admin/login";

    // If user is accessing protected admin pages without a session cookie
    if (!isLoginPage && !sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user is already logged in with a session cookie and visits /admin/login
    if (isLoginPage && sessionCookie?.value) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
