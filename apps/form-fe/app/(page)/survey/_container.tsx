'use client';

import { CheckboxGroup, TextFields, RadioBoxGroup, Password, SurveyTItleBox } from "@/_components/survey";
import { useUpdateForm } from "@/_hooks/useUpdateForm";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/input";

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
    password: string;
    list: Option[];
  }
}

export const SurveyContainer = ({ data, id }: SurveyContainerProps) => {
  const { form, checkPass, onSubmit, handleCheckPass } = useUpdateForm({ id, password: data.password });

  return (
    <main className="px-2 grid justify-center">
      {!checkPass ?
        <Password onChange={handleCheckPass} />
        :
        (<div className="w-full md:w-[750px]">
          <Form {...form}>
            <form onSubmit={onSubmit} className="my-8">
              <SurveyTItleBox data={data} control={form.control} />
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
        </div>)
      }

    </main>
  )
}