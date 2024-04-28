import { type ForwardedRef } from "react";
import { cn } from "../lib";

type asType = "div" | "p" | "span";
interface ContentType<T>
  extends React.HTMLAttributes<
    T extends "span" ? HTMLSpanElement : HTMLDivElement
  > {
  as?: T;
  contentRef?: ForwardedRef<
    T extends Omit<asType, "span"> ? HTMLDivElement : HTMLSpanElement
  >;
}

/**
 * @description 타이틀 컴포넌트
 * @param {asType} as div, span, p 태그
 * @param {object} contentRef ref object
 */
export const Content = ({
  as,
  contentRef,
  className,
  ...props
}: ContentType<asType>): JSX.Element => {
  const Element = as || "div";
  return (
    <Element
      className={cn('text-sm', className)}
      ref={contentRef}
      {...props}
    />
  );
};
