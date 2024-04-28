"use client";

import { Content } from "@repo/ui/text";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface LoginBtnProps extends HTMLAttributes<HTMLDivElement> {
  loginData: Record<string, string>;
}

export const LoginBtn = ({ loginData, ...props }: LoginBtnProps) => {
  return (
    <div
      className={`px-[24px] select-none flex rounded-[6px] h-[50px] items-center cursor-pointer duration-75 hover:scale-95 ${loginData.style}`}
      {...props}
    >
      <Image
        src={loginData.logo!}
        width={25}
        height={25}
        alt={loginData.title!}
      />
      <Content
        as="span"
        className={"flex-1 leading-[50px] text-center font-medium"}
      // contentRef={(el) => {
      //   if (el) {
      //     el.style.setProperty("font-family", "system-ui", "important");
      //   }
      // }}
      >
        {loginData.title}
      </Content>
    </div>
  );
};
