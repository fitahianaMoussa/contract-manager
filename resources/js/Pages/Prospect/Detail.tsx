import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { generateClientPDF } from "@/Services/PdfServices";
import { PageProps } from "@/types";
import { format as formatDate } from "@/Utils/Date";
import { format as formatPhone } from "@/Utils/Phone";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import "swiper/css";

interface Broker {
    id: number;
    first_name: string;
    last_name: string;
}

interface ProspectDetailsProps {
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
    broker_id: string;
    broker: Broker;
}

export default function Detail({
    auth,
    prospect,
}: PageProps<{ prospect: ProspectDetailsProps }>) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({});
    const handleConvertToClient = (prospect: any) => {
        put(route("prospects.convertToClient", prospect));
    };
    const [showAddClientInformation, setShowAddClientInformation] =
        useState(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <SecondaryButton>
                        <Link
                            href={`/prospects/`}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                            Retour
                        </Link>
                    </SecondaryButton>
                </h2>
            }
        >
            <Head title={prospect.first_name + " " + prospect.last_name} />
            <div className="space-y-4">
                <Card>
                    <Card.Header
                        title={"Prospect"}
                        actions={
                            <PrimaryButton
                                className="float-right"
                                onClick={() => {
                                    generateClientPDF(prospect);
                                }}
                            >
                                <DocumentIcon className="w-6 h-6" />
                                Exporter en pdf
                            </PrimaryButton>
                        }
                    />
                    <Card.Content>
                        <div className="light:bg-gray-100 dark:bg-gray-900 light:text-gray-600 dark:text-white p-4 rounded-md mb-4">
                            <h1 className="text-2xl text-green-400 font-bold mb-2">
                                {prospect.first_name + " " + prospect.last_name}
                            </h1>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">Nom:</span>{" "}
                                {prospect.first_name}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">Prénom:</span>{" "}
                                {prospect.last_name}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">Email:</span>{" "}
                                {prospect.email}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">Phone:</span>{" "}
                                {formatPhone(prospect.phone)}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">
                                    Date de naissance:
                                </span>{" "}
                                {formatDate(prospect.date_of_birth)}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">
                                    Description:
                                </span>{" "}
                                {prospect.description}
                            </p>
                            <p className="text-sm mb-2">
                                <span className="font-semibold">Address:</span>{" "}
                                {prospect.postal_code},{prospect.address},{" "}
                                {prospect.city}, {prospect.country}
                            </p>

                            <p className="text-sm mb-2">
                                Statut:{" "}
                                <span
                                    className={`font-medium me-2 px-2.5 py-0.5 rounded-full ${
                                        (prospect.status === "qualified" &&
                                            "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400") ||
                                        (prospect.status === "unqualified" &&
                                            "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400") ||
                                        (prospect.status === "converted" &&
                                            "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border border-blue-400") ||
                                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-400"
                                    }`}
                                >
                                    {prospect.status.charAt(0).toUpperCase() +
                                        prospect.status.slice(1)}
                                </span>
                            </p>
                            <div className="text-center">
                                <PrimaryButton
                                    onClick={() =>
                                        setShowAddClientInformation(true)
                                    }
                                >
                                    Valider en tant que client
                                </PrimaryButton>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
                <Modal
                    show={showAddClientInformation}
                    title="Convertir en Client"
                    onClose={() => {
                        setShowAddClientInformation(false);
                    }}
                >
                    <div className="dark:text-white text-center m-5">
                        Voulez-vous vraiment convertir ce prospect en client?
                        <div className="flex justify-between m-5 dark:text-white text-center">
                            <div className="text-s">
                                <SecondaryButton
                                    className="mr-2"
                                    onClick={() =>
                                        setShowAddClientInformation(false)
                                    }
                                >
                                    Annuler
                                </SecondaryButton>
                            </div>
                            <div className="text-e">
                                <PrimaryButton
                                    onClick={() => {
                                        handleConvertToClient(prospect);
                                    }}
                                >
                                    Confirmer
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
