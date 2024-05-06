import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { User } from "@/types";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar user={user} />

            <Sidebar user={user} />

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow md:ml-64 pt-16">
                    <div className="mx-5 py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main
                className={`px-10 md:ml-64 h-auto${!header ? " pt-20" : " pt-4"} pb-4`}
            >
                {children}
            </main>
        </div>
    );
}
