import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import ClientInformation from "@/Features/Client/Components/ClientInformation";
import SpouseInformation from "@/Features/Client/Components/SpouseInformation";
import ValidationForm from "@/Features/Client/Components/ValidationForm";
import ContractDetail from "@/Features/Contract/Components/ContractDetail";
import ContractInformation from "@/Features/Contract/Components/ContractInformation";
import Form from "@/Features/Contract/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InsuredPerson, PageProps, Regime } from "@/types";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";

interface Broker {
    id: number;
    first_name: string;
    last_name: string;
}
interface Contract {
    id: number;
    name: string;
    client_id: number;
    product_id: string;
    description: string;
    due: string;
    created_at: string;
    [key: string]: any;
}
interface ClientDetailsProps {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    social_security_number: number;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    broker: Broker;
    spouse_first_name: string;
    spouse_last_name: string;
    spouse_date_of_birth: string;
    spouse_social_security_number: string;
    spouse_email: string;
    bank_details: string;
    regime: Regime;
    insured_person: InsuredPerson;
    spouse_phone: string;
    is_valid: boolean;
    contracts: Contract[];
}

export default function Detail({
    auth,
    flash,
    client,
    products,
    options,
}: PageProps<{ client: ClientDetailsProps; products: any; options: any }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [wantToValidate, setWantToValidate] = useState(false);
    const [showSpouseInfo, setShowSpouseInfo] = useState(false);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(
        null,
    );
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
        reference: "",
        client_id: client.id,
        product_id: 0,
        option_id: 0,
        amount: "",
        administration_fees: "",
        payment_frequency: "monthly",
        start_date: new Date(new Date().getFullYear(), 0, 1),
        end_date: new Date(new Date().getFullYear(), 11, 31),
        description: "",
        attachments: undefined,
    });

    useEffect(() => {
        if (flash.message) {
            toast(flash.message.content, { type: flash.message.type });
            if (flash.message.context === "contract") {
                toast("Le prix n'a pas été calculé automatiquement", {
                    type: "info",
                });
            }
        }
    }, [flash.message]);

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            setShowCreationModal(false);
            setShowEditionModal(false);
        }
    }, [recentlySuccessful]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("contracts.store"));
    };
    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("contracts.update"));
    };

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("contracts.destroy", selectedContract?.id));
        setSelectedContract(null);
        setShowDeletionModal(false);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <SecondaryButton>
                            <Link
                                href={`/clients/`}
                                className="flex items-center space-x-2"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                                Retour
                            </Link>
                        </SecondaryButton>
                    </h2>
                }
            >
                <Head title={client.first_name + " " + client.last_name} />
                <div className="space-y-4">
                    <div className="flex items-center">
                        <h1 className="m-2 text-lg font-semibold text-green-600">
                            Information du client:
                        </h1>
                        {/* <Switch
                            data-testid="status-switch"
                            className="mt-1"
                            checked={client.is_valid}
                            onChange={() => setShowInformationModal(true)}
                        /> */}
                        {client.is_valid && (
                            <CheckCircleIcon
                                title="Validé"
                                className="h-6 w-6 text-green-600"
                            />
                        )}
                        {!client.is_valid && (
                            <PrimaryButton
                                onClick={() => setWantToValidate(true)}
                            >
                                Valider
                            </PrimaryButton>
                        )}
                    </div>

                    <ClientInformation client={client as ClientDetailsProps} />

                    <SpouseInformation
                        client={client}
                        showSpouseInfo={showSpouseInfo}
                        setShowSpouseInfo={setShowSpouseInfo}
                    />

                    {!auth.user.can.createClient && (
                        <div className="my-4 ">
                            <span className="text-lg text-white">
                                {" "}
                                <span className="font-semibold text-green-500">
                                    Courtier{" "}
                                </span>
                                : {client.broker.last_name}{" "}
                                {client.broker.first_name}
                            </span>
                        </div>
                    )}
                    {auth.user.role === "ROLE_BROKER" &&
                        client.broker.id !== auth.user.id && (
                            <div className="my-4 ">
                                <span className="text-lg text-white">
                                    {" "}
                                    <span className="font-semibold text-green-500">
                                        Collaborateur{" "}
                                    </span>
                                    : {client.broker.last_name}{" "}
                                    {client.broker.first_name}
                                </span>
                            </div>
                        )}

                    <ContractInformation
                        client={client as any}
                        setShowCreationModal={setShowCreationModal}
                        setShowDetailModal={setShowDetailModal}
                        setShowEditionModal={setShowEditionModal}
                        setShowDeletionModal={setShowDeletionModal}
                        setSelectedContract={setSelectedContract as any}
                        setData={setData}
                        user={auth.user}
                    />
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal || showEditionModal}
                title={
                    showEditionModal
                        ? "Modifier un contrat"
                        : "Ajouter un contrat"
                }
                onClose={() => setShowCreationModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600">
                        Une erreur s'est produite.
                    </p>
                </Transition>
                <Form
                    mode={showEditionModal ? "edition" : "creation"}
                    data={data as any}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset()}
                    products={products.data.map((product: any) => ({
                        label: `${product.company.name} - ${product.name}`,
                        value: product.id,
                    }))}
                    options={options.data.map((option: any) => ({
                        label: option.name,
                        value: option.id,
                    }))}
                />
            </Modal>
            <Modal
                show={showDeletionModal}
                title="Supprimer un Contrat "
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={selectedContract?.name}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </Modal>
            <Modal
                show={wantToValidate}
                title="Information du client"
                onClose={() => setWantToValidate(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600">
                        Une erreur s'est produite.
                    </p>
                </Transition>
                <ValidationForm
                    client={client}
                    onCancel={() => setWantToValidate(false)}
                />
            </Modal>
            <Modal
                show={showDetailModal}
                title="Détail du contrat"
                onClose={() => {
                    setSelectedContract(null);
                    setShowDetailModal(false);
                }}

                <ContractDetail selectedContract={selectedContract as any} />
            </Modal>
        </>
    );
}
