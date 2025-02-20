import { getTodoAction } from "@/actions/todo/todo.action";

import { NextResponse } from "next/server";

export const GET = async () => {
  const result = await getTodoAction();

  return NextResponse.json({ ...result });
};
