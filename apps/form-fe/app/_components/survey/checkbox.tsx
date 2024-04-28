'use client'
import { Checkbox, Label } from "@repo/ui/input";
import { type Control, useFieldArray } from "react-hook-form";
import { SurveyBox } from "../common/survey-box";

type option = {
  name: string;
  id: number;
}

interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    option: option[];
    optionyn: boolean;
    title: string;
    id: number;
  }
  control: Control;
}

export function CheckboxGroup({ data: { option, optionyn, title, id }, control, ...props }: CheckboxGroupProps) {
  const { append, remove } = useFieldArray({
    control,
    name: id.toString(),
    rules: { required: optionyn && '설문에 답해주세요' }
  });

  const onCheckedChange = (option: any, idx: number) => (e: boolean) => {
    if (e === true) {
      append({ value: option.name })
    }
    remove(idx)
  }

  return (
    <SurveyBox title={title} {...props}>
      <ul className="flex flex-col gap-5">
        {option.map((item, idx) => (
          <li className="flex items-center gap-3" key={item.name + idx}>
            <Checkbox id={item.name} onCheckedChange={onCheckedChange(item, idx)} />
            <Label htmlFor={item.name} className="w-full">{item.name}</Label>
          </li>
        ))}
      </ul>
    </SurveyBox>
  )
}