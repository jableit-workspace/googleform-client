import { HTMLAttributes } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message: string;
  className?: string;
}

/**
 * @description 에러 메시지 컴포넌트
 * @param {string} message p 태그 에러 메시지
 */
export const ErrorText = ({
  message,
  className,
  ...props
}: ErrorMessageProps) => {
  return (
    <p className={`text-[12px] text-main pt-1 pl-1 ${className}`} {...props}>
      {message}
    </p>
  );
};
