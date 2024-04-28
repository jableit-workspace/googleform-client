'use client';

import { type Control } from "react-hook-form";
import { SurveyBox } from "../common/survey-box";
import { FormField, FormItem, FormMessage, Input } from "@repo/ui/input";

interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    optionyn: boolean;
    title: string;
    id: number;
  }
  control: Control;
}

export const TextFields = ({ data: { optionyn, title, id }, control, ...props }: CheckboxGroupProps) => {

  return (
    <SurveyBox title={title} {...props}>
      <FormField
        control={control}
        name={id.toString()}
        rules={{ required: optionyn ? '답변을 입력해주세요' : false }}
        defaultValue={''}
        render={({ field }) => (
          <FormItem>
            <Input type="text" autoComplete='off' spellCheck={false} placeholder="내 답변"  {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
    </SurveyBox>
  )
}