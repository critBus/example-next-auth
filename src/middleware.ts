import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedroutes = ["/user"];
export default async function midddleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isProtected = protectedroutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
