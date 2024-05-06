import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className, ...props }: TextAreaProps) {
    return (
        <textarea
            {...props}
            rows={4}
            className={
                "block w-full bg-gray-10 rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 " +
                className
            }
        />
    );
}
