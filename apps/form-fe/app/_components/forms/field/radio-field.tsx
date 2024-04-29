'use client';

import { Button } from "@repo/ui/button";
import { FormField, FormItem, FormMessage, Input } from "@repo/ui/input";
import { X } from "lucide-react";
import { useEffect, useLayoutEffect } from "react";
import { type Control, useFieldArray } from "react-hook-form";

interface RadioFieldProps {
  name: string;
  control: Control;
}

export const RadioItem = ({ name, control }: RadioFieldProps) => {
  const { fields, append, remove, update, } = useFieldArray({
    control,
    name: `questions.${name}.option`,
  });

  const onAdd = (length: number) => (e: React.MouseEvent) => {
    append({ value: '옵션 ' + (length + 1) })
  }
  useLayoutEffect(() => {
    console.log(fields, fields.length, 'fields')
    if (fields && !fields.length) {
      console.log('add')
      onAdd(fields.length)
    }

  }, [fields])

  return (
    <div className="grid gap-3">
      {fields.map((field, idx) => (
        <FormField
          key={field.id}
          control={control}
          name={`questions.${name}.option.${idx}.value`}
          rules={{ required: '옵션을 입력해주세요' }}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center flex-nowrap">
                <Input type="text" className="grow mr-3" autoFocus {...field} />
                {fields.length > 1 ?
                  <Button className="text-muted-foreground" size={"icon"} variant={"ghost"} onClick={() => remove(idx)}>
                    <X />
                  </Button>
                  : null}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button type="button" onClick={onAdd(fields.length)}>추가하기</Button>
    </div>
  )
}