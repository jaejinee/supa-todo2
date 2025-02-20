"use client";
import React from "react";

const TodoListItemReadOnly = ({ todo }) => {
  todo?.content ?? "";

  return (
    <li className="min-h-[60px] bg-fuchsia-300 border border-blue-700 rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-[18px]">{todo?.content}</div>
      </article>
    </li>
  );
};

export default TodoListItemReadOnly;
