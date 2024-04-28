import { ForwardedRef, forwardRef } from "react";
import { cn } from "../lib";

type asType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: asType;
}
type TitleType<T extends React.ElementType> = {
  as?: T;
} & React.ComponentProps<T>;

/**
 * @description 타이틀 컴포넌트
 * @param {asType} as h1, h2 ... 태그
 * @param {number} size 폰트 사이즈
 */
export const Title = forwardRef(
  <T extends asType = "h1">(
    { as, ...props }: TitleType<T>,
    ref: ForwardedRef<HTMLHeadingElement>,
  ) => {
    const Element = as || "h1";
    return (
      <Element
        className={cn("text-lg font-bold", props.className)}
        ref={ref}
        {...props}
      />
    );
  },
);
