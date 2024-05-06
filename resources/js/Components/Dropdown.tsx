import { Menu, Transition } from "@headlessui/react";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

const Dropdown = ({ children }: PropsWithChildren) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            {children}
        </Menu>
    );
};

const Content = ({
    align = "right",
    width = "48",
    contentClasses = "py-1 bg-white dark:bg-gray-700",
    children,
}: PropsWithChildren<{
    align?: "left" | "right";
    width?: string;
    contentClasses?: string;
}>) => {
    let alignmentClasses = "origin-top";

    if (align === "left") {
        alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
    } else if (align === "right") {
        alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
    }

    const widthClasses = "w-" + width;

    return (
        <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Menu.Items
                className={`absolute z-[9999] mt-2 rounded-md shadow-lg ring-1 ring-black/5 ${alignmentClasses} ${widthClasses} ${contentClasses}`}
            >
                {children}
            </Menu.Items>
        </Transition>
    );
};

const DropdownLink = ({
    className = "",
    children,
    ...props
}: InertiaLinkProps) => {
    return (
        <Menu.Item>
            <Link
                {...props}
                className={
                    "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out " +
                    className
                }
            >
                {children}
            </Link>
        </Menu.Item>
    );
};

Dropdown.Button = Menu.Button;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
