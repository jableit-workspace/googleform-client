'use client';
import { Spacing } from "@repo/ui";
import { Input } from "@repo/ui/input"
import { Title } from "@repo/ui/text";

interface PasswordProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Password = ({ onChange }: PasswordProps) => {

  return (
    <div className="h-dvh grid items-center" >
      <div className="px-5 py-4 w-full md:w-[500px] rounded-md border mb-8 shadow-md">
        <Title as="h3" className="font-medium" >비밀번호 확인</Title>
        <Spacing size={20} />
        <Input onChange={onChange} />
      </div>
    </div>
  )
}