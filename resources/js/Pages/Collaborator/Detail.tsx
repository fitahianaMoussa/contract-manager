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
    office_address: string;
    email: string;
    role: string;
    clients: TClient[];
    companies: TCompany[];
    is_active: boolean;
};

export default function Detail({
    auth,
    collaborator,
}: PageProps<{ collaborator: TBroker }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <SecondaryButton>
                        <Link
                            href={`/users/`}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                            Retour
                        </Link>
                    </SecondaryButton>
                </h2>
            }
        >
            <Head
                title={collaborator.first_name + " " + collaborator.last_name}
            />
            <div className="space-y-4">
                <Card>
                    <Card.Header
                        title={
                            collaborator.role === "ROLE_BROKER_COLLABORATOR"
                                ? "Collaborateur"
                                : "Gestionnaire"
                        }
                        actions={
                            <PrimaryButton
                                className="float-right"
                                onClick={() => {
                                    generateBrokerPDF(collaborator);
                                }}
                            >
                                <DocumentIcon className="h-6 w-6" />
                                Exporter en pdf
                            </PrimaryButton>
                        }
                    />
                    <Card.Content>
                        <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                            <h1 className="mb-2 text-2xl font-bold text-green-400">
                                {collaborator.first_name +
                                    " " +
                                    collaborator.last_name}
                            </h1>
                            <p className="mb-2  text-sm">
                                Nom: {collaborator.last_name}
                            </p>
                            <p className="mb-2  text-sm">
                                Prénom: {collaborator.first_name}
                            </p>
                            <p className="mb-2  text-sm">
                                Email: {collaborator.email}
                            </p>
                            <p className="mb-2  text-sm">
                                Phone: {collaborator.phone}
                            </p>
                            <p className="mb-2  text-sm">
                                Adresse du bureau: {collaborator.office_address}
                            </p>
                            <p className="mb-2 text-sm">
                                Status:{" "}
                                <span
                                    className={`me-2 rounded-full px-2.5 py-0.5 font-medium ${collaborator.is_active ? "border border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400" : "border border-red-400 bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400"}`}
                                >
                                    {collaborator.is_active
                                        ? "active"
                                        : "inactive"}
                                </span>
                            </p>
                        </div>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Header
                        title={"Clients(" + collaborator.clients.length + ")"}
                    />
                    <Card.Content>
                        <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                            {collaborator.clients.length > 0 &&
                                collaborator.clients.map((client) => (
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
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Header
                        title={
                            "Compagnies(" + collaborator.companies.length + ")"
                        }
                    />
                    <Card.Content>
                        <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                            {collaborator.companies.length > 0 &&
                                collaborator.companies.map((company) => (
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
                    </Card.Content>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
