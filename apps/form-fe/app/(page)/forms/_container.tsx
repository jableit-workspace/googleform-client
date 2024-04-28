'use client';
import { Button } from "@repo/ui/button"
import { ComponentProps, useEffect, useId, useRef, useState } from "react";
import { useForm, Control, type FieldErrors, useWatch, useFieldArray } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Switch, Textarea } from "@repo/ui/input";
import { Eye, Plus, Trash2 } from "lucide-react";
import { Spacing } from "@repo/ui";
import { RadioItem } from "@/_components/forms/field/radio-field";
import { DNDGroup, DNDItem } from "@/_components/common/dnd";
import { DialogCloseButton } from "@/_components/common/modal";

const options = [
  "단답형",
  "객관식 질문",
  "체크박스"
]

export const FormScreen = ({ email }: { email: string }) => {
  const form = useForm({
    mode: 'onSubmit', defaultValues: {
      title: '제목 없는 설문지',
      description: '',
      password: '',
      questions: [{
        name: '',
        type: '0',
        optionyn: false,
        option: ''
      }]
    }
  });
  const textarea = useRef<HTMLTextAreaElement>(null)
  const [list, setList] = useState<number[]>([0])
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<number>(0);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions'
  })

  useEffect(() => {
    console.log(list)
  }, [list])

  const addForm = (new_form: any): ComponentProps<'button'>['onClick'] => e => {
    e.preventDefault();
    append({ name: '', type: '0', optionyn: false, option: '' })
    setList(pre => ([...pre, new_form]))
  }
  const removeForm = (idx: number) => () => {
    remove(idx)
    // form.unregister(`questions.${idx}`)
    setList(pre => pre.filter((_, i) => i !== idx))
  }

  const onSubmit = async (data: any) => {
    if (list.length === 0) {
      alert('질문을 추가해주세요')
      return;
    }
    const { title, description, questions } = data;
    // ! 타입 옵션 설정
    const body = {
      title,
      description,
      email,
      password: '',
      questions: questions.map(({ name, optionyn, option, type }: any) => {
        return { name, type: Number(type) + 1, option: type === '0' ? '' : option.map(({ value }: { value: string }) => value).toString(), optionyn }
      })
    }
    console.log(body, 'submit')
    await fetch(`https://google.vote24.co.kr/question`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => res.json()).then(res => setResult(res.id))
    setOpen(true);
  }

  const onSubmitError = (err: FieldErrors</* FormValues */ any>) => {
    console.log(err, 'error')
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="sticky top-0 px-8 py-3 w-full flex gap-6 bg-opacity-95 backdrop-blur-sm justify-end shadow-md">
          <DialogCloseButton open={open} setOpen={setOpen} id={result} />
          <Button type="submit" onClick={form.handleSubmit(onSubmit, onSubmitError)} variant={"default"} >보내기</Button>
          <Button type="button" size={"icon"} variant={"ghost"}>
            <Eye />
          </Button>
        </div>
        <div className="fixed bottom-0 lg:top-[50%] right-32 rounded-md">
          <Button size={'icon'} variant={'outline'} className="text-xl" onClick={addForm(list.length + 1)}><Plus /></Button>
        </div>

        <Spacing size={20} />
        <Form {...form}>
          <form className="space-y-8">
            <div className="w-screen md:w-[750px] rounded-md border mb-2 shadow-md overflow-hidden">
              <div className="h-[15px] bg-foreground border border-foreground" />
              <div className="p-5">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: '제목을 입력해주세요' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" className="h-14 text-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Spacing size={20} />
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: '설명을 입력해주세요' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea ref={textarea} className="h-auto overflow-hidden" placeholder={'설문지 설명'} rows={1} onChange={e => {
                          if (textarea.current) {
                            textarea.current.style.height = 'auto';
                            textarea.current.style.height = textarea.current.scrollHeight + 'px';
                            field.onChange(e)
                          }
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Spacing size={20} />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" placeholder="비밀번호 생성" className="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DNDGroup list={list} setList={setList}>
              {list?.map((question, idx) => (
                <DNDItem item={question} key={fields[idx]?.id} >
                  <FormBox defaultType="0" control={form.control as any} name={idx.toString()} onRemove={removeForm(idx)} />
                </DNDItem>
              ))}
            </DNDGroup>
          </form>
        </Form>
      </div>
    </main>

  )
}

function FormBox({ defaultType = '0', control, name, onRemove }: { defaultType?: string, control: Control, name: string, onRemove?: () => void }) {

  const type = useWatch({
    name: `questions.${name}.type`,
    control
  });

  return (
    <>
      <div className="flex sm:flex-nowrap items-center h-10">
        <FormField
          control={control}
          name={`questions.${name}.name`}
          rules={{ required: '질문을 입력해주세요' }}
          defaultValue={""}
          render={({ field }) => (
            <FormItem className="grow h-full mr-4">
              <FormControl>
                <Input type="text" autoFocus placeholder="질문" className="h-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`questions.${name}.type`}
          defaultValue={defaultType}
          render={({ field }) => (
            <Select defaultValue={defaultType} onValueChange={field.onChange}>
              <SelectTrigger className="w-52 py-1 h-full" >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option, idx) => (
                    <SelectItem key={option} value={idx.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Spacing size={30} />
      <div>
        {(type && type !== '0') ? (
          <RadioItem name={name} control={control} />
        ) : null}
      </div>
      <Spacing size={10} />
    </>
  )

}