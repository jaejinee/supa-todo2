import { createServerSideClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME; // 홈 경로
  const { searchParams } = new URL(req.url); // 요청 받은 URL 객체 생성해서 searchParams 가져오기

  const code = searchParams.get("code"); // searchParams에서 code 가져오기 (구글에서 인증 받은 코드)
  const next = searchParams.get("next"); // searchParams에서 next 가져오기 (다음 경로 "/auth")

  if (code) {
    const supabase = await createServerSideClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code); // searchParams code로 구글과 세션 교환
    if (error) return NextResponse.redirect(`${overrideOrigin}`); // 에러가 있으면 홈으로
    return NextResponse.redirect(`${overrideOrigin}${next}`); // 성공했으면 다음 경로("/auth")로 이동
  }
  return NextResponse.redirect(`${overrideOrigin}`); // code가 없으면 홈으로
}
