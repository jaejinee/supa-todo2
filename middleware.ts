import { NextRequest, NextResponse } from "next/server";

const COOKIE_COUNTER = "cookie-counter";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  console.log("middleware 통과!");
  if (req.cookies.get(COOKIE_COUNTER)?.value) {
    const prev = req.cookies.get(COOKIE_COUNTER)?.value;
    res.cookies.set(COOKIE_COUNTER, `${Number(prev) + 1}`);
  } else {
    res.cookies.set(COOKIE_COUNTER, "1");
  }

  return res;
}
export const config = {
  matcher: ["/", "/todo-no-rls", "/api/:path*"],
};
