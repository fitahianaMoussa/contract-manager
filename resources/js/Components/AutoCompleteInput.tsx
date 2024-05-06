import { Combobox, Transition } from "@headlessui/react";
import { SelectHTMLAttributes, useState } from "react";
import { OptionProps } from "./Select";

type AutoCompleteInputProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "multiple" | "onChange"
> & {
    options?: OptionProps[];
    multiple?: false;
    onChange?: (value: string | number | readonly string[]) => void;
};

export default function AutoCompleteInput({
    id,
    className,
    options = [],
    multiple = false,
    required,
    ...props
}: AutoCompleteInputProps) {
    const [query, setQuery] = useState("");
    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => option.label.includes(query));

    return (
        <Combobox {...props}>
            <Combobox.Input
                id={id}
                className={
                    "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                    className
                }
                onChange={(event) => setQuery(event.target.value)}
                required={required}
            />
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-900 py-1 text-base text-gray-700 dark:text-gray-100 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredOptions.map((option, index) => (
                        <Combobox.Option
                            key={index}
                            value={option.value}
                            className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-600" : ""
                                } hover:bg-gray-300 dark:hover:bg-gray-700`
                            }
                        >
                            {option.label}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
}
