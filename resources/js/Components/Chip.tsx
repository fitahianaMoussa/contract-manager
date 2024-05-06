import { PropsWithChildren } from "react";

type ChipProps = PropsWithChildren & {
    type?: "default" | "success" | "info" | "warning" | "error";
};

export default function Chip({ type = "default", children }: ChipProps) {
    const colorClass = {
        default:
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-400",
        success:
            "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400",
        info: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border border-blue-400",
        warning:
            "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400",
        error: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400",
    }[type];

    return (
        <span
            className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${colorClass}`}
        >
            {children}
        </span>
    );
}
