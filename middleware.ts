import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./actions/auth";

const protectedRoutes = ["/customers", "/", "/profile"];

export default async function middleware(request: NextRequest) {
  const user: UserDetails | null = await getLoggedInUser();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (!user && isProtected) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
