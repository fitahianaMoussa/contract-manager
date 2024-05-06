import { Switch as ReactSwitch } from "@headlessui/react";
import { ButtonHTMLAttributes } from "react";

export default function Switch({
    checked,
    className,
    onChange,
    ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
    checked?: boolean;
    value?: string;
    onChange?: (checked: boolean) => void;
}) {
    return (
        <ReactSwitch.Group>
            <div className={"flex items-center " + className}>
                <ReactSwitch
                    {...props}
                    checked={checked}
                    onChange={onChange}
                    className={`${
                        checked
                            ? "bg-green-600"
                            : "border bg-gray-200 border-gray-300 dark:bg-gray-900 dark:border-gray-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                >
                    <span
                        className={`${
                            checked ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-700 transition-transform`}
                    />
                </ReactSwitch>
                <ReactSwitch.Label className="ml-4">
                    {props.children}
                </ReactSwitch.Label>
            </div>
        </ReactSwitch.Group>
    );
}
