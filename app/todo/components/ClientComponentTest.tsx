"use client";
import { getTodoAction } from "@/actions/todo/todo.action";
import React from "react";

const handleClick = async () => {
  const result = await getTodoAction();
  console.log(">> clientAction result", result);
};

const ClientComponentTest = () => {
  return (
    <div>
      test
      <button onClick={handleClick}>test serverAction</button>
    </div>
  );
};

export default ClientComponentTest;
