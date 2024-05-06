import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import ZoneForm from "@/Features/PriceTable/Components/ZoneForm";
import { useZoneColumns } from "@/Features/PriceTable/Hooks/useZoneColumns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Zone } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Zone>;

export default function Index({ auth, zones }: PageProps<{ zones: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const {
        data,
        setData,
        reset,
        errors,
        post,
        put,
        delete: destroy,
        hasErrors,
        recentlySuccessful,
        processing,
        cancel,
    } = useForm<Partial<Zone>>({ name: "" });

    useEffect(() => {
        if (recentlySuccessful) {
            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showEditionModal) {
                setShowEditionModal(false);
            }

            if (showDeletionModal) {
                setShowDeletionModal(false);
            }

            reset();
        }
    }, [
        recentlySuccessful,
        showCreationModal,
        showDeletionModal,
        showEditionModal,
    ]);

    const columns = useZoneColumns({
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

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("zones.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("zones.update", data));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("zones.destroy", data));
    };

    return (
        <>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Zones
                    </h2>
                }
            >
                <Head title="Zones" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={zones.data}
                            canCreate={auth.user.can.createZone}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </Authenticated>

            <Modal
                show={showCreationModal}
                title="Ajouter une Zone"
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
                <ZoneForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreationSubmit}
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset()}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title="Modifier une Zone"
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
                    <p className="text-center text-sm text-red-600 dark:text-gray-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <ZoneForm
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
                    onReset={() => reset("name")}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer une zone "
                onClose={() => {
                    cancel();
                    setShowDeletionModal(false);
                }}
            >
                <DeletionConfirmation
                    name={data.name}
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
