'use client';

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

type useUpdateFormProps = {
  id: number;
  password: string;
}

export const useUpdateForm = ({ id, password }: useUpdateFormProps) => {
  const [checkPass, setCheckPass] = useState(false);
  const router = useRouter();

  const form = useForm({ mode: 'onSubmit' });

  const onSubmit = form.handleSubmit(async (data: any) => {
    const { email, ...rest } = data;

    const questions = Object.keys(rest).map(key => {
      if (typeof data[key] === 'object') {
        return { id: Number(key), answer: data[key].map((item: any) => item.value).toString() }
      }
      return { id: Number(key), answer: data[key] }
    })
    const body = { email, questions }

    await fetch(`https://google.vote24.co.kr/question/my/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    form.reset();
    router.replace('/');
  });

  const handleCheckPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value === password && setCheckPass(true)
  }


  useLayoutEffect(() => {
    !password && setCheckPass(true)
  }, [])


  return { form, checkPass, onSubmit, handleCheckPass }
}