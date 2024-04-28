'use client';

import { CheckboxGroup, TextFields, RadioBoxGroup } from "@/_components/survey";
import { Button } from "@repo/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, Input, Label } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Option = {
  id: number;
  type: number;
  title: string;
  optionyn: boolean;
  option: { id: number; name: string }[];
}
interface SurveyContainerProps {
  id: number;
  data: {
    title: string;
    description: string;
    list: Option[];
  }
}

export const SurveyContainer = ({ data, id }: SurveyContainerProps) => {
  const form = useForm({ mode: 'onSubmit' });
  const router = useRouter();

  const onSubmit = async (data: any) => {
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
    })
    router.replace('/')
  }
  return (
    <main className="flex flex-col items-center justify-center h-full px-2">
      <div className="w-full md:w-[750px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
            <div className=" px-5 py-4 rounded-md border mb-8 shadow-md">
              <p className="text-2xl font-medium pb-4">{data.title}</p>
              <p className="text-sm pb-4">{data.description}</p>
              <FormField
                control={form.control}
                name='email'
                defaultValue={''}
                rules={{ required: '이메일을 입력해주세요', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: '이메일 형식이 아닙니다' } }}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={'email'} className="block" >{'이메일 입력'}</Label>
                    <FormControl>
                      <Input type="text" id="email" placeholder="이메일을 입력해주세요" className="text-xs h-[30px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <section className="flex flex-col items-center gap-8">
              {data.list.map(({ type, title, optionyn, option, id }) => {
                if (type === 1) return <TextFields key={title} data={{ title, optionyn, id }} control={form.control} />
                if (type === 3) return <CheckboxGroup key={title} data={{ title, optionyn, option, id }} control={form.control} />
                return <RadioBoxGroup key={title} data={{ title, optionyn, option, id }} control={form.control} />
              })}
            </section>
            <div className="h-[30px]" />
            <Button type="submit" >제출하기</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}