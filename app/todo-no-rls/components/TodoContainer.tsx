"use client";

import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";

const TodoContainer = () => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController(); // CRUD 로직을 받아서 처리하는 컴포넌트

  return (
    <div>
      <TodoList
        sharedUserFullName="xptmxm"
        ownerUserId="111"
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div> // Todo UI, CRUD를 받아서 보여주는 컴포넌트
  );
};

export default TodoContainer;
