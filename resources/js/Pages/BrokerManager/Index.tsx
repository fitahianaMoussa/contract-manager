import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/Manager/Components/Form";
import { useColumns } from "@/Features/Manager/Hooks/useColumns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Collaborator, PageProps, ResponseResource } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<
    Omit<Collaborator, "role"> & {
        role: "admin" | "broker" | "user" | "collaborator" | "manager";
        password?: string;
        password_confirmation?: string;
    }
>;

export default function Index({
    auth,
    broker_managers,
}: PageProps<{ broker_managers: ResponseResource<Collaborator> }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
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
        password: "",
        password_confirmation: "",
        role: "manager",
        is_active: false,
    });
    const columns = useColumns({
        onEdit: (data) => {
            setData(data as any);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setData(data as any);
            setShowDeletionModal(true);
        },
    });

    useEffect(() => {
        if (hasErrors) {
            reset("password", "password_confirmation");
        }

        if (recentlySuccessful) {
            reset();
            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showEditionModal) {
                setShowEditionModal(false);
            }

            if (showDeletionModal) {
                setShowDeletionModal(false);
            }
        }
    }, [
        hasErrors,
        recentlySuccessful,
        showCreationModal,
        showDeletionModal,
        showEditionModal,
    ]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("managers.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("managers.update", data));
    };

    const handleDeletionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("managers.destroy", data));
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Gestionnaires
                    </h2>
                }
            >
                <Head title="Collaborateurs" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={broker_managers.data}
                            canCreate={auth.user.can.createClient}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal}
                title="Ajouter un Gestionnaire"
                onClose={() => setShowCreationModal(false)}
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
                    onReset={() => reset("password", "password_confirmation")}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title="Modifier un Gestionnaire"
                onClose={() => setShowEditionModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode="edition"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleEditionSubmit}
                    onCancel={() => {
                        cancel();
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset("password", "password_confirmation")}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer un Gestionnaire "
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={data?.first_name + " " + data?.last_name}
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
