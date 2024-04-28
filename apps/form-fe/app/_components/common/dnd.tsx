'use client';

import { Button } from "@repo/ui/button";
import { FormField, FormItem, Label, Switch } from "@repo/ui/input";
import { Reorder, useDragControls } from "framer-motion";
import { AlignJustify, Trash2 } from "lucide-react";
import { Children } from "react";

type DNDGroupProps = {
  list: number[];
  setList: React.Dispatch<React.SetStateAction<number[]>>;
  children: React.ReactNode;
};

interface DNDItemProps {
  item: number;
  className?: string;
  children: JSX.Element;
};


export const DNDGroup = ({ list, setList, children }: DNDGroupProps) => {

  return (
    <Reorder.Group axis="y" values={list} onReorder={setList}>
      {children}
    </Reorder.Group>
  )
}

export const DNDItem = ({ item, className, children }: DNDItemProps) => {
  const dragControls = useDragControls();
  const child = Children.only(children)
  const { onRemove, control, name } = child.props

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragControls.start(e)
  }

  return (
    <Reorder.Item
      dragControls={dragControls}
      dragListener={false}
      value={item}
      className={className}
    >
      <div className="w-screen md:w-[750px] min-h-[150px] p-3 rounded-md border mb-6 shadow-md select-none bg-background">
        {children}
        <div className="flex items-center justify-between h-[50px] border-t pr-3">
          <Button type="button" size={"icon"} variant={"ghost"} onPointerDown={onPointerDown}>
            <AlignJustify className="cursor-pointer" size={18} />
          </Button>
          <div className="flex items-center gap-4">
            <FormField
              control={control}
              name={`questions.${name}.optionyn`}
              defaultValue={false}
              render={({ field }) => (
                <FormItem>
                  <Label className="font-normal flex items-center gap-2">
                    {'필수'}
                    <Switch onCheckedChange={e => {
                      field.onChange(e)
                    }} />
                  </Label>
                </FormItem>
              )}
            />
            <Button type="button" size={"icon"} variant={"ghost"} onClick={onRemove}>
              <Trash2 size={24} />
            </Button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}