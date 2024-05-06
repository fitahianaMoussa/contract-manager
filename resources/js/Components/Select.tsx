import { SelectHTMLAttributes } from "react";

export type OptionProps = { label: string; value: string | number };

export default function Select({
    className,
    options = [],
    ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<OptionProps>;
}) {
    return (
        <select
            {...props}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                className
            }
        >
            <option>Choisir...</option>
            {options.map((opt, index) => (
                <option key={index} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
