import {
  createTodos,
  deleteTodosSoft,
  getTodosBySearch,
  getTodosByUserId,
  updateTodos,
} from "@/actions/todo/todo.action";
import { Database } from "@/database.types";
import { useCallback, useEffect, useState } from "react";

type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"]; // Database.types.ts 타입에서 todos_no_rls의 Row 타입을 TodoDto로 선언

const useTodosController = (ownerUserId = "") => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoDto[]>([]); // TodoDto 타입으로 todos 선언, 초기값은 빈 배열, typescript에서는 타입을 명시해주어야 함. 명시 하지 않으면 setTodos(resultTodos)에서 에러 발생

  // todoList 가져오기
  const onGetTodos = useCallback(async () => {
    setLoading(true);
    try {
      const resultTodos = await getTodosByUserId(ownerUserId);

      if (resultTodos) setTodos(resultTodos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [ownerUserId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]);

  // 비어있는 todoList 생성하기
  const onCreateEmptyTodos = async () => {
    await createTodos("");
    await onGetTodos();
  };

  // todoList 업데이트
  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };

  // todoList 삭제
  const onDeleteTodos = async (id: number) => {
    await deleteTodosSoft(id);
    await onGetTodos();
  };

  // todoList 검색
  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const todoResult = await getTodosBySearch(terms);
      if (todoResult) {
        setTodos(todoResult);
      }
    } else {
      await onGetTodos();
    }
  };
  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  };
};
export default useTodosController;
