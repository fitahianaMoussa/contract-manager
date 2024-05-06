import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import Form from "@/Features/Prospect/Components/Form";
import { useColumns } from "@/Features/Prospect/Hooks/useColumns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Prospect } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

interface ProspectData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    description: string;
    status: "qualified" | "unqualified" | "converted";
    phone: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    social_security_number: string;
}

type TData = Partial<ProspectData>;

export default function Index({
    auth,
    prospects,
}: PageProps<{ prospects: any; locations: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedData, setSelectedData] = useState<ProspectData | null>(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        cancel,
        reset,
        hasErrors,
        recentlySuccessful,
    } = useForm<TData>({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        description: "",
        status: "qualified",
        phone: "",
        address: "",
        city: "",
        country: "",
        postal_code: "",
        social_security_number: "",
    });
    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data as unknown as Prospect);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        user: auth.user,
    });

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            setShowCreationModal(false);
        }
        if (showCreationModal) {
            setData({
                first_name: "",
                last_name: "",
                date_of_birth: "",
                description: "",
                status: "qualified",
                phone: "",
                address: "",
                city: "",
                country: "",
                postal_code: "",
                social_security_number: "",
            });
        }
    }, [hasErrors, recentlySuccessful, showCreationModal]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("prospects.store"));
    };
    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setShowEditionModal(false);
        put(route("prospects.update", data));
    };
    const handleDeleteSubmit: FormEventHandler = (e) => {
        if (selectedData !== null) {
            e.preventDefault();
            destroy(route("prospects.destroy", selectedData as any));
            setSelectedData(null);
            setShowDeletionModal(false);
        }
    };
    const handleCloseModal = () => {
        cancel();
        reset();
        setShowCreationModal(false);
        setShowEditionModal(false);
        setShowDeletionModal(false);
    };
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Prospects
                    </h2>
                }
            >
                <Head title="Clients" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={prospects}
                            canCreate={auth.user.can.createProspect}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal || showEditionModal}
                title={
                    showEditionModal
                        ? "Modifier un Prospect"
                        : "Ajouter un Prospect"
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
                    mode={showEditionModal ? "edition" : ("creation" as any)}
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
                />
            </Modal>
            <Modal
                show={showDeletionModal}
                title="Supprimer un Prospect "
                onClose={handleCloseModal}
            >
                <DeletionConfirmation
                    name={
                        selectedData?.first_name + " " + selectedData?.last_name
                    }
                    onCancel={handleCloseModal}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </Modal>
        </>
    );
}
