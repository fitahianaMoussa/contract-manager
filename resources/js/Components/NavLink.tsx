import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center pl-2 pt-2 border-l-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none w-full " +
                (active
                    ? "border-green-400 dark:border-green-600 text-gray-900 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 "
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-300 dark:hover:text-gray-300 dark:hover:bg-gray-700 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
