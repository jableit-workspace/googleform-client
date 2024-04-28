'use client';

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { X } from "lucide-react";
import { useLayoutEffect } from "react";
import { type Control, useFieldArray } from "react-hook-form";

interface RadioFieldProps {
  name: string;
  control: Control;
}

export const RadioItem = ({ name, control }: RadioFieldProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `questions.${name}.option`,
  });

  const onAdd = (length: number) => (e: React.MouseEvent) => {
    append({ value: '옵션 ' + (length + 1) })
  }

  return (
    <div className="grid gap-3">
      {fields.map((field, idx) => (
        <div key={field.id} className="flex items-center flex-nowrap">
          <Input name={idx + name} type="text" className="grow mr-3" autoFocus {...field} onChange={e => {
            update(idx, { value: e.target.value })
          }} />
          {fields.length > 1 ?
            <Button className="text-muted-foreground" size={"icon"} variant={"ghost"} onClick={() => remove(idx)}>
              <X />
            </Button>
            : null}
        </div>
      ))}
      <Button type="button" onClick={onAdd(fields.length)}>추가하기</Button>
    </div>
  )
}