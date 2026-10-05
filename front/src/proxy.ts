import { auth } from "@/../auth";
import { NextResponse } from "next/server";

const ROUTE_FLAGS: Record<string, string> = {
  "/caminhao": "admin_access",
  "/admin": "admin_access",
};

function getRequiredFlag(pathname: string): string | undefined {
  const match = Object.keys(ROUTE_FLAGS).find((route) =>
    pathname.startsWith(route)
  );
  return match ? ROUTE_FLAGS[match] : undefined;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const requiredFlag = getRequiredFlag(pathname);

  if (!requiredFlag) {
    return NextResponse.next();
  }

  const userFlags: string[] = req.auth?.user?.flags ?? [];

  if (!userFlags.includes(requiredFlag)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    console.log("[proxy]", "\x1b[31m[err]\x1b[0m", req.url, "Acesso não autorizado", userFlags);
    return NextResponse.redirect(url);
  }

  console.log("[proxy]", "\x1b[32m[suc]\x1b[0m", req.url);

  return NextResponse.next();
});

export const config = {
  matcher: ["/caminhao/:path*", "/admin/:path*"],
};