import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import ResponsiveNavLink from "./ResponsiveNavLink";

type NavbarProps = {
    user: User;
};

export default function Navbar({ user }: NavbarProps) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="mx-5">
                <div className="flex items-center justify-between h-16">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Button
                                    title={`${user.first_name} ${user.last_name}`}
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <Avatar
                                        src=""
                                        alt={`${user.first_name} ${user.last_name}`}
                                    />
                                </Dropdown.Button>

                                <Dropdown.Content contentClasses="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div className="font-semibold">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="font-medium truncate">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profil
                                        </Dropdown.Link>
                                        {user.role === "ROLE_SUPERUSER" && (
                                            <Dropdown.Link
                                                href={route("admin.index")}
                                            >
                                                Administrateurs
                                            </Dropdown.Link>
                                        )}
                                    </div>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Se déconnecter
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
