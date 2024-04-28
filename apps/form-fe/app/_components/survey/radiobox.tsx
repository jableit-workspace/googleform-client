'use client';
import { Control } from "react-hook-form";
import { SurveyBox } from "../common/survey-box"
import { FormField, FormItem, FormMessage } from "@repo/ui/input";

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

export const RadioBoxGroup = ({ data: { option, optionyn, title, id }, control, ...props }: CheckboxGroupProps) => {

  return (

    <SurveyBox title={title} {...props}>
      <ul className="flex flex-col gap-5">
        <FormField
          control={control}
          name={id.toString()}
          rules={{ required: optionyn ? '설문에 답해주세요' : false }}
          render={({ field }) => (
            <FormItem>
              {option.map(({ name }: any) => {
                return (
                  <li key={name} className="">
                    <label className="flex items-center gap-3">
                      <input type="radio" {...field} value={name} />
                      {name}
                    </label>
                  </li>
                )
              })}
              <FormMessage />
            </FormItem>
          )}
        />
      </ul>
    </SurveyBox>
  )
}