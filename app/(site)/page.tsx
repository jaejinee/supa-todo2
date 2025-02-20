import { getUser } from "@/actions/auth/user.action";
import TodoContainer from "./components/TodoContainer";
import { DotLoader } from "react-spinners";

export default async function Home() {
  const user = await getUser({ serverComponent: true }); // 서버액션이 서버 사이드 랜더링 도중에 호출될 경우 쿠키 조작 불가능하기에 분기 처리하여 쿠키 조작을 할 수 있도록 함

  return (
    <main>
      {user ? (
        <TodoContainer ownerUserId={user?.id} />
      ) : (
        <>
          <div className="flex flex-col items-center mt-12">
            <div>
              <DotLoader />
            </div>
            <div className="font-bold my-2">Please login first</div>
          </div>
        </>
      )}
    </main>
  );
}
