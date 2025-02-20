"use server"; // serverAction 사용하기 위해 반드시 작성

export const pingAction = async () => {
  console.log("ping");
  return "pong";
};
