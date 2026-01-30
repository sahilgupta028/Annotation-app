import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token") || null;

  if (req.nextUrl.pathname.startsWith("/canvas") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}