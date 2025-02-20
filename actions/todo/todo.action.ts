"use server";

import { createServerSideClient } from "@/lib/supabase";

// todoList 가져오기
export const getTodos = async () => {
  const supabase = await createServerSideClient(); // supabase 가져오기
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });

  return result.data;
};

// todoList 가져오기 + byId
export const getTodosById = async (id: number) => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id); // 특정 id 값과 동일한 id

  return result.data;
};

// todoList 가져오기 + byUserId
export const getTodosByUserId = async (userId: string) => {
  const supabase = await createServerSideClient(true);

  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("user_id", userId); // 특정 id 값과 동일한 id

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`) // content에 terms가 포함된 값
    .order("id", { ascending: false })
    .limit(50); // 50개까지만 가져오기

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_with_rls")
    .insert([{ content }]) // key: value (content: content) 값 동일하면 생략 가능
    .select(); // 생성된 데이터 그대로 가져오기
  console.log(result);

  return result.data;
};

// todoList 수정하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_with_rls")
    .update({ content, updated_at: new Date().toISOString() }) // content 값 수정, updated_at 값 수정(UTC 시간으로 변경)
    .eq("id", id) // id 값이 동일한 데이터의 content를 수정
    .select(); // 수정된 데이터 그대로 가져오기
  return result.data;
};

// todoList soft delete
export const deleteTodosSoft = async (id: number) => {
  const supabase = await createServerSideClient();

  const result = await supabase
    .from("todos_with_rls")
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    }) //updated_at/deleted_at 값 수정(UTC 시간으로 변경)
    .eq("id", id) // id 값이 동일한 데이터의 content를 수정
    .select(); // 수정된 데이터 그대로 가져오기

  return result.data;
};
