import { getProfileById } from "@/actions/auth/user.action";
import TodoContainer from "./components/TodoContainer";
import { permanentRedirect } from "next/navigation";
import React from "react";

interface sharePageProps {
  params: Promise<{ user_id: string }>;
  searchParams: Promise<object>;
}
const page = async (props: sharePageProps) => {
  console.log("*****************", typeof props);
  const params = await props?.params;
  const userId = params?.user_id;
  const profile = await getProfileById({ serverComponent: true, userId });
  const userName = profile?.full_name;
  if (!profile) {
    permanentRedirect("/");
  }

  return (
    <div>
      <TodoContainer sharedUserFullName={userName ?? ""} ownerUserId={userId} />
    </div>
  );
};

export default page;
