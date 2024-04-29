'use client';
import { Control } from "react-hook-form";
import { SurveyBox } from "../common/survey-box"
import { FormField, FormItem, FormMessage, Label, RadioGroup, RadioGroupItem } from "@repo/ui/input";

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
              <RadioGroup
                onValueChange={field.onChange}
              >
                <ul className="flex flex-col gap-5">
                  {option.map(({ name }: any) => {
                    return (
                      <li key={name}>
                        <Label className="cursor-pointer flex items-center gap-3" >
                          <RadioGroupItem value={name} />
                          {name}
                        </Label>
                      </li>
                    )
                  })}
                  <FormMessage />
                </ul>
              </RadioGroup>
            </FormItem>
          )}
        />
      </ul>
    </SurveyBox>
  )
}