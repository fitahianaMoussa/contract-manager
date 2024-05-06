import { RadioGroup as ReactRadioGroup } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";

export default function RadioGroup({
    value,
    className,
    onChange,
    ...props
}: PropsWithChildren<{
    value?: any;
    onChange?: (value: any) => void;
    className?: string;
}>) {
    return (
        <ReactRadioGroup value={value} onChange={onChange}>
            <div className={"flex items-center gap-4 " + className}>
                {props.children}
            </div>
        </ReactRadioGroup>
    );
}

function RadioGroupOption({
    value,
    label,
    ...props
}: {
    value: any;
    label: string;
    "data-testid"?: string;
}) {
    return (
        <ReactRadioGroup.Option
            {...props}
            value={value}
            className="cursor-pointer flex items-center gap-2"
        >
            {({ active, checked }) => (
                <>
                    {checked ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    ) : (
                        <span className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    )}

                    <ReactRadioGroup.Label
                        as="span"
                        className="text-gray-900 dark:text-gray-400 block text-sm font-medium"
                    >
                        {label}
                    </ReactRadioGroup.Label>
                </>
            )}
        </ReactRadioGroup.Option>
    );
}

RadioGroup.Option = RadioGroupOption;
