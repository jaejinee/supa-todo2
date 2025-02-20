// RouteHandler, React Server Component, Middleware, ServerActions

import { Database } from "@/database.types";
import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// RouteHandler, ServerActions
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return; // Server Component는 쿠키 조작 불가능
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          if (serverComponent) return; // Server Component는 쿠키 조작 불가능
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};

// React Server Component, 쿠키 조작 불가능
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// Middleware 쿠키 처리 방식이 다름
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, { req, res }),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options }); // 쿠키 조작 방식 다름
        },
        remove: (key, options) => {
          setCookie(key, "", { req, res, ...options }); // 쿠키 조작 방식 다름
        },
      },
    }
  );
};
