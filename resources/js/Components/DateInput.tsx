import { fr } from "date-fns/locale/fr";
import { InputHTMLAttributes } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("fr", fr);

type DateInputProps = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "className" | "required" | "placeholder"
> & {
    value?: Date | null;
    onChange: (
        date: Date | null,
        event?: React.SyntheticEvent<any, Event>,
    ) => void;
};

export default function DateInput({
    className,
    value,
    placeholder,
    onChange,
    ...props
}: DateInputProps) {
    return (
        <DatePicker
            {...props}
            placeholderText={placeholder}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                className
            }
            locale="fr"
            selected={value}
            onChange={onChange}
        />
    );
}
