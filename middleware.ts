import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("reque" , request)
  const country =
    request.headers.get("x-vercel-ip-country") || "US";

  const host = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  console.log("---- MIDDLEWARE ----");
  console.log("Host:", host);
  console.log("Path:", pathname);
  console.log("Detected country:", country);

  const url = request.nextUrl.clone();

  if (host === "abc.com") {
    if (country === "ZA") {
      url.hostname = "abc.co.za";
      return NextResponse.redirect(url);
    }

    if (country === "AE") {
      url.hostname = "abc.co.uae";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};

