"use client";

import React, { useState } from "react";
import { IoShareSocialOutline, IoSearchOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListItem from "./TodoListItem";
import { Database } from "@/database.types";
import TodoListItemReadOnly from "./TodoListItemReadOnly";

type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

interface TodoListProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
  loading?: boolean;
  todoListData: TodoDto[]; // ✅ todoListData의 타입을 명확히 지정
  isReadOnly?: boolean;
  onUpdate: (id: number, updatedContent: string) => void;
  onCreate: () => void;
  onDelete: (id: number) => void;
  onSearch: (terms: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  sharedUserFullName = "",
  ownerUserId = "",
  loading = false,
  todoListData = [],
  isReadOnly = false,
  // onUpdate = (id, updatedContent) => {},
  // onCreate = () => {},
  // onDelete = (id) => {},
  // onSearch = (terms) => {},
  onUpdate,
  onCreate,
  onDelete,
  onSearch,
}) => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/share/${ownerUserId}`;
    copy(shareLink)
      .then(() => {
        window.alert(`공유링크 복사완료! \n${shareLink}`); // \n 줄바꿈
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const handleSearchEnd = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  return (
    <section className="min-h-[70vh] bg-[#e5e5e5]">
      <div className="w-full max-w-[800px] p-[20px] mx-auto">
        <article className="flex flex-row justify-between items-center">
          <div className="font-bold text-[32px]">
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
            Things to do:
          </div>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className="font-bold text-[20px] flex flex-row items-center cursor-pointer"
            >
              Share
              <IoShareSocialOutline />
            </div>
          )}
        </article>
        {!isReadOnly && (
          <article className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex flex-1 h-[60px]">
              <input
                value={userSearchInput}
                onChange={(e) => {
                  setUserSearchInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchEnd();
                  }
                }}
                className="p-4 flex-1 bg-yellow-200  border border-blue-700 rounded-l-2xl font-bold"
                type="text"
              />
              <div
                onClick={() => handleSearchEnd()}
                className="w-[60px] flex justify-center items-center bg-[#000] text-[#fff] rounded-r-2xl cursor-pointer"
              >
                <IoSearchOutline size={40} color="#fff" />
              </div>
            </div>
            <div
              onClick={onCreate}
              className="h-[60px] w-[200px] flex justify-center items-center bg-sky-200 border border-blue-700 rounded-2xl font-bold cursor-pointer text-[20px]"
            >
              New Task
            </div>
          </article>
        )}

        <div className="h-[1px] my-10 bg-blue-700 "></div>
        {todoListData?.length >= 1 ? (
          <ul className="flex flex-col gap-6">
            {(todoListData ?? []).map((todo) => {
              if (isReadOnly) {
                return <TodoListItemReadOnly key={todo?.id} todo={todo} />;
              }
              return (
                <TodoListItem
                  key={todo?.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "로딩중..." : "없음"}</div>
        )}
      </div>
    </section>
  );
};

export default TodoList;
