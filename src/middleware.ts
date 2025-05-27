import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth } from "@/auth";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_ROUTES,
  LOGIN_URL,
} from "@/lib/authRoutes";
const { auth } = NextAuth(authConfig);

export default async function midddleware(request: NextRequest) {
  try {
    const session = await auth();
    const { pathname } = request.nextUrl;
    const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    // const isLoggedIn = !!request.auth;
    const isLoggedIn = !!session;
    if (isProtected && !session) {
      let callbackUrl = request.nextUrl.pathname;
      if (request.nextUrl.search) {
        callbackUrl += request.nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(`${LOGIN_URL}?callbackUrl=${encodedCallbackUrl}`, request.url)
      );
    }

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url)
      );
    }
  } catch (error) {
    console.log("midlegware error");
    console.log(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
