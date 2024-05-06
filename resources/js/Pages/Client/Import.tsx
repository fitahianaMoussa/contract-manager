import { FormEventHandler, useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AuthProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "@/Features/Client/Components/ImportFom";
import { Transition } from "@headlessui/react";



export default function Import({
    auth
}:AuthProps) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        hasErrors,
    } = useForm({
        attachments: undefined,
    });

    const handleImportSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("import.client"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Import client
                </h2>
            }
        >
            <Head title="Import client" />
            <div className="space-y-4">
                <div className="flex items-center">
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600">
                        Une erreur s'est produite.
                    </p>
                </Transition>
                <Form
                    data={data as any}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleImportSubmit}
                    onReset={() => reset()}
                />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}