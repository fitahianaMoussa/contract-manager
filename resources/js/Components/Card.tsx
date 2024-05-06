import { PropsWithChildren, ReactNode } from "react";

function Card({
    className,
    children,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={
                "broder border-gray-300 dark:border-gray-700 rounded-md shadow-md bg-white dark:bg-gray-800 h-full " +
                className
            }
        >
            {children}
        </div>
    );
}

function Header({
    className,
    title,
    actions,
}: {
    className?: string;
    title?: ReactNode;
    actions?: ReactNode;
}) {
    return (
        <div
            className={
                "flex items-center justify-between px-5 py-2 border-l-4 border-green-500 " +
                className
            }
        >
            {typeof title === "string" ? (
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                </h2>
            ) : (
                title
            )}
            <div>{actions}</div>
        </div>
    );
}

function Content({
    className,
    children,
}: PropsWithChildren<{ className?: string }>) {
    return <div className={"w-full p-5 " + className}>{children}</div>;
}

function Actions({
    className,
    children,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={"flex items-center justify-evenly " + className}>
            {children}
        </div>
    );
}

Card.Header = Header;
Card.Content = Content;
Card.Actions = Actions;

export default Card;
