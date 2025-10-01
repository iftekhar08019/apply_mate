import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
// test folder or show use info after authentication/login

const UserInfo = async () => {
  const session = await getServerSession(authOptions);
  console.log("auth session", session);
  return (
    <>
      {session?.user && (
        <>
          {" "}
          <div>
            <span>{session?.user?.name}</span>
            <span>{session?.user?.email}</span>
         
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
