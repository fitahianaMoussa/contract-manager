import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/Admin/Components/Form";
import { useColumns } from "@/Features/Admin/Hooks/useColumns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Omit<User, "role"> & { role: "admin" | "superuser" }>;

export default function Index({ auth, admins }: PageProps<{ admins: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm<TData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "admin",
        is_active: false,
    });

    const columns = useColumns({
        onDelete: (data) => {
            setData(data as any);
            setShowDeletionModal(true);
        },
    });

    useEffect(() => {
        if (recentlySuccessful) {
            reset();

            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showDeletionModal) {
                setShowDeletionModal(false);
            }
        }
    }, [recentlySuccessful, showCreationModal, showDeletionModal]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("ages.store"));
    };

    const handleDeletionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("ages.destroy", data));
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Administrateurs
                    </h2>
                }
            >
                <Head title="Administrateurs" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={admins.data}
                            canCreate={auth.user.can.createAdmin}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal}
                title="Ajouter un Administrateur"
                onClose={() => {
                    cancel();
                    setShowCreationModal(false);
                }}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-center text-sm text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreationSubmit}
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer un Administrateur"
                onClose={() => {
                    cancel();
                    setShowDeletionModal(false);
                }}
            >
                <DeletionConfirmation
                    name={data.first_name + " " + data.last_name}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>
        </>
    );
}
