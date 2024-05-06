import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/Company/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { type PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState, type FormEventHandler } from "react";

export default function Index({
    auth,
    companies,
}: PageProps<{ companies: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
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
    } = useForm({
        name: "",
        description: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        country: "",
        zip_code: "",
    });
    const columns: Array<ColumnDef<any>> = useMemo(() => {
        return [
            {
                accessorKey: "name",
                cell: (info) => `${info.getValue() as string}`,
                header: () => "Compagnie",
            },
            {
                accessorKey: "email",
                cell: (info) => `${info.getValue() as string}`,
                header: () => "E-mail",
            },
            {
                accessorKey: "phone",
                cell: (info) => `${info.getValue() as string}`,
                header: () => "Téléphone",
            },
            {
                accessorKey: "street",
                cell: (info) => `${info.getValue() as string}`,
                header: () => "Adresse",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <Link
                            href={`/companies/${(info.getValue() as any).id}/show`}
                            className={
                                "rounded-md border border-transparent p-1"
                            }
                        >
                            <EyeIcon className="h-5 w-5" />
                        </Link>
                        {(auth.user.role === "ROLE_ADMIN" ||
                            auth.user.id ===
                                (info.getValue() as any).broker.id ||
                            auth.user.id ===
                                (info.getValue() as any).broker.broker_id) && (
                            <button
                                className={
                                    "rounded-md border border-transparent p-1"
                                }
                                onClick={() => {
                                    setShowEditionModal(true);
                                    setData(info.getValue() as any);
                                }}
                            >
                                <PencilIcon className="h-5 w-5 text-green-600" />
                            </button>
                        )}

                        {(auth.user.role === "ROLE_ADMIN" ||
                            auth.user.id ===
                                (info.getValue() as any).broker.id ||
                            auth.user.id ===
                                (info.getValue() as any).broker.broker_id) && (
                            <button
                                className={
                                    "rounded-md border border-transparent p-1"
                                }
                                onClick={() => {
                                    setShowDeletionModal(true);
                                    setSelectedData(info.getValue());
                                }}
                            >
                                <TrashIcon className="h-5 w-5 text-red-600" />
                            </button>
                        )}
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, []);

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            setShowCreationModal(false);
        }
    }, [recentlySuccessful]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("companies.store"));
    };
    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setShowEditionModal(false);
        put(route("companies.update", data));
    };
    const handleCloseModal = () => {
        cancel();
        reset();
        setShowCreationModal(false);
        setShowEditionModal(false);
        setShowDeletionModal(false);
    };
    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("companies.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Compagnies
                    </h2>
                }
            >
                <Head title="Compagnies" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={companies.data}
                            canCreate={auth.user.can.createCompany}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal || showEditionModal}
                title={
                    showEditionModal
                        ? "Modifier une compagnie"
                        : "Ajouter une compagnie"
                }
                onClose={handleCloseModal}
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
                    mode={showEditionModal ? "editon" : ("creation" as any)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={handleCloseModal}
                    onReset={() => reset()}
                />
            </Modal>
            <Modal
                show={showDeletionModal}
                title="Supprimer une compagnie "
                onClose={handleCloseModal}
            >
                <DeletionConfirmation
                    name={selectedData?.name}
                    onCancel={handleCloseModal}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </Modal>
        </>
    );
}
