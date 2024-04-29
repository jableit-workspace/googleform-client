import { FormControl, FormField, FormItem, FormMessage, Input, Label } from "@repo/ui/input"
import { type Control } from "react-hook-form";

interface SurveyTitleBoxProps {
  control: Control;
  data: {
    title: string;
    description: string;
  }
}

export const SurveyTItleBox = ({ control, data }: SurveyTitleBoxProps) => {

  return (
    <div className=" w-full px-6 py-6 rounded-md border shadow-md mb-8">
      <p className="text-2xl font-medium pb-4">{data.title}</p>
      <p className="text-sm pb-4">{data.description}</p>
      <FormField
        control={control}
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
  )
}