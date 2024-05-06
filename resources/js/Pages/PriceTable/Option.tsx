import Datagrid from "@/Components/Datagrid";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import OptionForm from "@/Features/PriceTable/Components/OptionForm";
import { useOptionColumns } from "@/Features/PriceTable/Hooks/useOptionColumns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Option, PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TData = Partial<Option>;

export default function Index({ auth, options }: PageProps<{ options: any }>) {
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
    } = useForm<Partial<Option>>({ name: "" });

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

    const columns = useOptionColumns({
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
        post(route("options.store"));
    };

    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("options.update", data));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("options.destroy", data));
    };

    return (
        <>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="light:text-gray-200 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Options
                    </h2>
                }
            >
                <Head title="Options" />

                <div className="py-12">
                    <div className="mx-5 sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={options.data}
                            canCreate={auth.user.can.createPrice}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                </div>
            </Authenticated>

            <Modal
                show={showCreationModal}
                title="Ajouter une Option"
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
                <OptionForm
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
                title="Modifier une Option"
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
                <OptionForm
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
                />
            </Modal>

            <Modal
                show={showDeletionModal}
                title="Supprimer une option "
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
