import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import LocationForm from "@/Features/PriceTable/Components/LocationForm";
import { useLocationColumns } from "@/Features/PriceTable/Hooks/useLocationColumns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Location, PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Location>;

export default function Index({
    auth,
    locations,
    zones,
}: PageProps<{ locations: any; zones: any }>) {
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
    } = useForm<Partial<Location & { zone_id: number }>>({
        name: "",
        country: "",
        zip_code: "",
        zone_id: 0,
    });

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

    const columns = useLocationColumns({
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
        post(route("locations.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("locations.update", data));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("locations.destroy", data));
    };

    return (
        <>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Localisations
                    </h2>
                }
            >
                <Head title="Localisations" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={locations.data}
                            canCreate={auth.user.can.createLocation}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </Authenticated>

            <Modal
                show={showCreationModal}
                title="Ajouter une Location"
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
                    <p className="text-center text-sm text-red-600 dark:text-gray-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <LocationForm
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
                    zones={zones.data.map((zone: any) => ({
                        label: zone.name,
                        value: zone.id,
                    }))}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title="Modifier une Location"
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
                <LocationForm
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
                    onReset={() => reset()}
                    zones={zones.data.map((zone: any) => ({
                        label: zone.name,
                        value: zone.id,
                    }))}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer une location "
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
