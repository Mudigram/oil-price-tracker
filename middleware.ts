import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/appwriteServer";

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/profile"]; // protect these

  const { pathname } = req.nextUrl;

  // Check if current path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    try {
      const { account } = createAdminClient();

      // Extract session from cookies
      const jwt = req.cookies.get(
        "a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
      );

      if (!jwt) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // If session exists, validate it
      await account.get();

      // Allow request to continue
      return NextResponse.next();
    } catch (err) {
      // If invalid session → redirect
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
