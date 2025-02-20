"use client";
import useHydrate from "@/hooks/useHydrate";
import { createSupabaseBrowerClient } from "@/lib/client/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import React, { useEffect, useState } from "react";

const AuthUI = () => {
  const [user, setUser] = useState();
  const supabase = createSupabaseBrowerClient();
  const isMount = useHydrate();

  const getUserInfo = async () => {
    const result = await supabase.auth.getUser();
    console.log(result);
    if (result?.data?.user) {
      setUser(result?.data?.user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // custom login 구글
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  // custom login 깃헙
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isMount) return null;

  return (
    <section className="w-full p-10">
      <div>{user ? `안녕하세요, ${user.email}님` : "로그인이 필요합니다."}</div>
      <>
        {user && (
          <button
            onClick={handleLogout}
            className="border border-1 border-blue-700 p-1"
          >
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px]">
        <Auth // 로그인 UI
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO} // 로그인 후 리다이렉트, 서버환경 배포환경 다르기에 env로 관리
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa, // 라이브러리 UI
          }}
          onlyThirdPartyProviders // 이메일 로그인 가려주기
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;
