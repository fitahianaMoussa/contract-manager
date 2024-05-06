import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/User/Components/Form";
import { useColumns } from "@/Features/User/Hooks/useColumns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Collaborator, PageProps, ResponseResource } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<
    Omit<Collaborator, "role"> & {
        role: "admin" | "broker" | "user";
        password?: string;
        password_confirmation?: string;
    }
>;

export default function Index({
    auth,
    collaborators,
}: PageProps<{ collaborators: ResponseResource<Collaborator> }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);

    const [selectedData, setSelectedData] = useState<any | null>(null);
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
        role: "user",
        is_active: false,
    });
    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data as unknown as TData);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
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
        }
    }, [hasErrors, recentlySuccessful]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("users.update", selectedData));
    };

    const handleDeletionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("users.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Collaborateurs
                    </h2>
                }
            >
                <Head title="Collaborateurs" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={collaborators.data}
                            canCreate={auth.user.can.createBroker}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal}
                title="Ajouter un Collaborateur"
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
                title="Modifier un Collaborateur"
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
                title="Supprimer un Collaborateur "
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={
                        selectedData?.first_name + " " + selectedData?.last_name
                    }
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                        // setSelectedData(null);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>
        </>
    );
}
