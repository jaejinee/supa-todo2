"use server";
import { createServerSideClient } from "@/lib/supabase";

// serverAction 사용하기 위해 반드시 작성, 자동으로 서버 모듈이 되기에 export 필요없음

export const getTodoAction = async () => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });

  console.log(result);
  return result.data;
};
