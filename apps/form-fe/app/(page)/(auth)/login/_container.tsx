'use client';

import { LoginBtn } from "@/_components/common/login-btn";
import { LoginIcon } from "@/_constants/icon";
import { Spacing } from "@repo/ui";
import { signIn } from "next-auth/react";

export const LogInScreen = () => {

  const onClick = (loginId: string) => () => {
    return signIn(loginId);
  };

  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <div className="w-screen md:w-[750px] h-[300px] rounded-md border p-4 shadow-md flex flex-col justify-center gap-4">
        {Object.keys(LoginIcon).map((login) => (
          <LoginBtn
            key={login}
            onClick={onClick(login)}
            loginData={LoginIcon[login as keyof typeof LoginIcon]}
          />
        ))}
      </div>
    </main>
  )
}