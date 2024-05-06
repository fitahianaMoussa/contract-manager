import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

type FileInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange"
> & {
    helperText?: string;
    onChange?: (acceptedFiles: File[]) => void;
};

export default function FileInput({
    className = "",
    helperText,
    onChange,
    ...props
}: FileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                ref={fileInputRef}
                {...props}
                type="file"
                className={
                    "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                    className
                }
                onChange={() =>
                    fileInputRef.current &&
                    onChange?.(fileInputRef.current.files! as unknown as File[])
                }
            />
            {helperText && (
                <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                >
                    {helperText}
                </p>
            )}
        </>
    );
}
