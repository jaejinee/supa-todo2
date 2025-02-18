"use client";
import { createSupabaseBrowerClient } from "@/lib/client/supabase";

// todoList 가져오기
export const getTodos = async () => {
  const supabase = createSupabaseBrowerClient(); // supabase 가져오기
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });

  return result.data;
};

// todoList 가져오기 + byId
export const getTodosById = async (id: number) => {
  const supabase = createSupabaseBrowerClient();

  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id); // 특정 id 값과 동일한 id

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = createSupabaseBrowerClient();

  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`) // content에 terms가 포함된 값
    .order("id", { ascending: false })
    .limit(50); // 50개까지만 가져오기

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = createSupabaseBrowerClient();

  const result = await supabase
    .from("todos_no_rls")
    .insert([{ content }]) // key: value (content: content) 값 동일하면 생략 가능
    .select(); // 생성된 데이터 그대로 가져오기

  return result.data;
};

// todoList 수정하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = createSupabaseBrowerClient();

  const result = await supabase
    .from("todos_no_rls")
    .update({ content, updated_at: new Date().toISOString() }) // content 값 수정, updated_at 값 수정(UTC 시간으로 변경)
    .eq("id", id) // id 값이 동일한 데이터의 content를 수정
    .select(); // 수정된 데이터 그대로 가져오기

  return result.data;
};

// todoList soft delete
export const deleteTodosSoft = async (id: number) => {
  const supabase = createSupabaseBrowerClient();

  const result = await supabase
    .from("todos_no_rls")
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    }) //updated_at/deleted_at 값 수정(UTC 시간으로 변경)
    .eq("id", id) // id 값이 동일한 데이터의 content를 수정
    .select(); // 수정된 데이터 그대로 가져오기

  return result.data;
};

// todoList hard delete (구현하지 않는 것 추천)
// export const deleteTodosHard = async (id: number) => {
//   const supabase = createSupabaseBrowerClient();

//   const result = await supabase
//     .from("todos_no_rls")
//     .delete() // 데이터 삭제
//     .eq("id", id); // id 값이 동일한 데이터의 content를 수정

//   return result.data;
// };
