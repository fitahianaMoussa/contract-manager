import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Assurance
                </h2>
            }
        >
            <Head title="Assurance" />

            <div className="py-12">
                <div className="mx-5 sm:px-6 lg:px-8">
                    <iframe
                        className="w-full h-screen bg-white"
                        title="Formation website"
                        src="https://rec-mutualia-santetns.interne.app.lyaprotect.com/"
                    ></iframe>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
