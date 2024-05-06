import Avatar from "@/Components/Avatar";
import Card from "@/Components/Card";
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
    firm_address: string;
    firm_name: string;
    email: string;
    clients: TClient[];
    companies: TCompany[];
    is_active: boolean;
};

export default function Index({
    auth,
    broker,
}: PageProps<{ broker: TBroker }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <SecondaryButton>
                        <Link
                            href={`/brokers/`}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                            Retour
                        </Link>
                    </SecondaryButton>
                </h2>
            }
        >
            <Head title={broker.first_name + " " + broker.last_name} />

            <div className="py-12">
                <div className="mx-5 space-y-4 sm:px-6 lg:px-8">
                    <Card>
                        <Card.Header
                            title="Information Générale"
                            actions={
                                <PrimaryButton
                                    className="float-right"
                                    onClick={() => {
                                        generateBrokerPDF(broker);
                                    }}
                                >
                                    <DocumentIcon className="h-6 w-6" />
                                    Exporter en pdf
                                </PrimaryButton>
                            }
                        />
                        <Card.Content>
                            <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                                <p className="mb-2  text-sm">
                                    Nom: {broker.last_name}
                                </p>
                                <p className="mb-2  text-sm">
                                    Prénom: {broker.first_name}
                                </p>
                                <p className="mb-2  text-sm">
                                    Email: {broker.email}
                                </p>
                                <p className="mb-2  text-sm">
                                    Phone: {broker.phone}
                                </p>
                                <p className="mb-2  text-sm">
                                    Nom du cabinet: {broker.firm_name}
                                </p>
                                <p className="mb-2  text-sm">
                                    Adresse du cabinet: {broker.firm_address}
                                </p>
                                <p className="mb-2 text-sm">
                                    Status:{" "}
                                    <span
                                        className={`me-2 rounded-full px-2.5 py-0.5 font-medium ${broker.is_active ? "border border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400" : "border border-red-400 bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400"}`}
                                    >
                                        {broker.is_active
                                            ? "active"
                                            : "inactive"}
                                    </span>
                                </p>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Header
                            title={
                                <h2 className="text-xl font-semibold dark:text-white">
                                    Clients ({broker.clients.length})
                                </h2>
                            }
                        />
                        <Card.Content>
                            {broker.clients.length > 0 &&
                                broker.clients.map((client) => (
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
                            {broker.companies.length === 0 && (
                                <p className="text-sm text-gray-800 dark:text-gray-100">
                                    Aucun client trouvé.
                                </p>
                            )}
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Header
                            title={
                                <h2 className="text-xl font-semibold dark:text-white">
                                    Compagnies ({broker.companies.length})
                                </h2>
                            }
                        />
                        <Card.Content>
                            {broker.companies.length > 0 &&
                                broker.companies.map((company) => (
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
                            {broker.companies.length === 0 && (
                                <p className="text-sm text-gray-800 dark:text-gray-100">
                                    Aucune compagnie trouvée.
                                </p>
                            )}
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
