import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/Client/Components/Form";
import { useColumns } from "@/Features/Client/Hooks/useColumns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Client, PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Client>;

export default function Index({
    auth,
    clients,
    locations,
}: PageProps<{ clients: any; locations: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
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
        date_of_birth: undefined,
        email: "",
        phone: "",
        social_security_number: "",
        street: "",
        city: "",
        country: "",
        zip_code: "",
        spouse_first_name: "",
        spouse_last_name: "",
        spouse_date_of_birth: "",
        spouse_email: "",
        spouse_phone: "",
        spouse_social_security_number: "",
    });

    const columns = useColumns({
        onEdit: (data) => {
            setData(data);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setData(data);
            setShowDeletionModal(true);
        },
        user: auth.user,
    });

    useEffect(() => {
        if (hasErrors) {
            reset("social_security_number");
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
        post(route("clients.store"));
    };
    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("clients.update", data));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("clients.destroy", data));
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Clients
                    </h2>
                }
            >
                <Head title="Clients" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={clients.data}
                            canCreate={auth.user.can.createClient}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal}
                title={"Ajouter un Client"}
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
                    <p className="text-sm text-red-600 dark:text-gray-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode="creation"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreationSubmit}
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset("social_security_number")}
                    options={locations.data}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title={"Modifier un Client"}
                onClose={() => {
                    cancel();
                    setShowEditionModal(false);
                }}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600 dark:text-gray-400">
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
                    onReset={() => reset("social_security_number")}
                    options={locations.data}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer un Client "
                onClose={() => {
                    cancel();
                    setShowDeletionModal(false);
                }}
            >
                <DeletionConfirmation
                    name={data?.first_name + " " + data?.last_name}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </Modal>
        </>
    );
}
