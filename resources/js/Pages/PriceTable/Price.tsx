import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import PriceForm from "@/Features/PriceTable/Components/PriceForm";
import { usePriceColumns } from "@/Features/PriceTable/Hooks/usePriceColumns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Age, Option, PageProps, Price, Zone } from "@/types";
import { Tab, Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Price>;

export default function Index({
    auth,
    price_tables,
    ages,
    options,
    zones,
}: PageProps<{ price_tables: any; ages: any; options: any; zones: any }>) {
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
    } = useForm<Partial<Price & { age_id: number; option_id: 0; zone_id: 0 }>>({
        value: 0.0,
        age_id: 0,
        option_id: 0,
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

    const columns = usePriceColumns({
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
        post(route("prices.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("prices.update", data));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("prices.destroy", data));
    };

    return (
        <>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Table des prix
                    </h2>
                }
            >
                <Head title="Table des prix" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Tab.Group>
                            <Tab.List></Tab.List>
                            <Tab.Panels>
                                <Datagrid
                                    columns={columns}
                                    rows={price_tables.data}
                                    canCreate={auth.user.can.createPrice}
                                    onCreate={() => setShowCreationModal(true)}
                                />
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </Authenticated>

            <Modal
                show={showCreationModal}
                title="Ajouter un Prix"
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
                <PriceForm
                    data={data}
                    ages={ages.data.map((age: Age) => ({
                        label: age.value,
                        value: age.id,
                    }))}
                    options={options.data.map((option: Option) => ({
                        label: option.name,
                        value: option.id,
                    }))}
                    zones={zones.data.map((zone: Zone) => ({
                        label: zone.name,
                        value: zone.id,
                    }))}
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
                title="Modifier un Prix"
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
                <PriceForm
                    mode="edition"
                    data={data}
                    ages={ages.data.map((age: Age) => ({
                        label: age.value,
                        value: age.id,
                    }))}
                    options={options.data.map((option: Option) => ({
                        label: option.name,
                        value: option.id,
                    }))}
                    zones={zones.data.map((zone: Zone) => ({
                        label: zone.name,
                        value: zone.id,
                    }))}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleEditionSubmit}
                    onCancel={() => {
                        cancel();
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset()}
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer un prix "
                onClose={() => {
                    cancel();
                    setShowDeletionModal(false);
                }}
            >
                <DeletionConfirmation
                    name={`${data.value}`}
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
