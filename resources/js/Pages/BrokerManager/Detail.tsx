import Avatar from "@/Components/Avatar";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { generateBrokerPDF } from "@/Services/PdfServices";
import { PageProps } from "@/types";
import {
    ChevronLeftIcon,
    DocumentIcon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/20/solid";
import { Head, Link } from "@inertiajs/react";

interface TClient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
type TCompany = {
    id: number;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    zip_code: string;
    description: string;
};
type TBroker = {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    office_address: string;
    email: string;
    clients: TClient[];
    companies: TCompany[];
    is_active: boolean;
};

export default function Detail({
    auth,
    broker_manager,
}: PageProps<{ broker_manager: TBroker }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <SecondaryButton>
                        <Link
                            href={`/collaborators`}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                            Retour
                        </Link>
                    </SecondaryButton>
                </h2>
            }
        >
            <Head title="Collaborateurs" />
            <PrimaryButton
                className="float-right"
                onClick={() => {
                    generateBrokerPDF(broker_manager);
                }}
            >
                <DocumentIcon className="h-6 w-6" />
                Exporter en pdf
            </PrimaryButton>
            <div className="light:bg-white mx-auto rounded-md p-8 shadow-md dark:bg-gray-800">
                <div className="">
                    <h6 className="mb-4 border-l-4 border-green-400 pl-2 text-xl font-semibold dark:text-white">
                        Information du Collaborateur:
                    </h6>

                    <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                        <h1 className="mb-2 text-2xl font-bold text-green-400">
                            {broker_manager.first_name +
                                " " +
                                broker_manager.last_name}
                        </h1>
                        <p className="mb-2  text-sm">
                            Nom: {broker_manager.last_name}
                        </p>
                        <p className="mb-2  text-sm">
                            Prénom: {broker_manager.first_name}
                        </p>
                        <p className="mb-2  text-sm">
                            Email: {broker_manager.email}
                        </p>
                        <p className="mb-2  text-sm">
                            Phone: {broker_manager.phone}
                        </p>
                        <p className="mb-2  text-sm">
                            Adresse du bureau: {broker_manager.office_address}
                        </p>
                        <p className="mb-2 text-sm">
                            Status:{" "}
                            <span
                                className={`me-2 rounded-full px-2.5 py-0.5 font-medium ${broker_manager.is_active ? "border border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400" : "border border-red-400 bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400"}`}
                            >
                                {broker_manager.is_active
                                    ? "active"
                                    : "inactive"}
                            </span>
                        </p>
                    </div>
                </div>
                <h6 className="mb-4 border-l-4 border-green-400 pl-2 text-xl font-semibold dark:text-white">
                    Liste des clients :
                </h6>
                <p className="p-3 dark:text-white">
                    Nombre de client:{" "}
                    <span className="text-green-600 ">
                        {broker_manager.clients.length}
                    </span>
                </p>
                <div className="grid max-h-80 grid-cols-1 gap-4 overflow-y-auto">
                    {broker_manager.clients.length > 0 &&
                        broker_manager.clients.map((client) => (
                            <div
                                key={client.id}
                                className="light:bg-white mb-4 flex items-center justify-between rounded-md p-4 dark:bg-gray-900 dark:text-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        size="lg"
                                        src=""
                                        alt={
                                            client.first_name +
                                            " " +
                                            client.last_name
                                        }
                                    />
                                    <div className="space-y-2">
                                        <h2 className="text-[16px] font-semibold">
                                            {client.first_name +
                                                " " +
                                                client.last_name}
                                        </h2>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-xs font-thin italic">
                                                <EnvelopeIcon className="h-3 w-3" />
                                                {client.email}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-thin italic">
                                                <PhoneIcon className="h-3 w-3" />
                                                {client.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <h6 className="mb-4 border-l-4 border-green-400 pl-2 text-xl font-semibold dark:text-white">
                    Liste des companies :
                </h6>
                <p className="p-3 dark:text-white">
                    Nombre de companie:{" "}
                    <span className="text-green-600 ">
                        {broker_manager.companies.length}
                    </span>
                </p>
                <div className="grid max-h-80 grid-cols-1 gap-4 overflow-y-auto">
                    {broker_manager.companies.length > 0 &&
                        broker_manager.companies.map((company) => (
                            <div
                                key={company.id}
                                className="light:bg-white mb-4 flex items-center justify-between rounded-md p-4 dark:bg-gray-900 dark:text-white"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="space-y-2">
                                        <h2 className="text-[16px] font-semibold">
                                            {company.name}
                                        </h2>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-xs font-thin italic">
                                                <EnvelopeIcon className="h-3 w-3" />
                                                {company.email}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-thin italic">
                                                <PhoneIcon className="h-3 w-3" />
                                                {company.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
