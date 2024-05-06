import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { generateRegulationPDF } from "@/Services/PdfServices";
import { format as formatDate } from "@/Utils/Date";
import { PageProps } from "@/types";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from "dompurify";

type TRegulation = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

export default function Index({
    auth,
    regulation,
}: PageProps<{ regulation: TRegulation }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <SecondaryButton>
                        <Link
                            href={`/regulations/`}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                            Retour
                        </Link>
                    </SecondaryButton>
                </h2>
            }
        >
            <Head title={regulation.title} />
            <div className="space-y-4">
                <Card>
                    <Card.Header
                        title={"Réglementation"}
                        actions={
                            <PrimaryButton
                                className="float-right"
                                onClick={() => {
                                    generateRegulationPDF(regulation);
                                }}
                            >
                                <DocumentIcon className="h-6 w-6" />
                                Exporter en pdf
                            </PrimaryButton>
                        }
                    />
                    <Card.Content>
                        <div className="mb-4 rounded-md bg-gray-100 p-4 text-center text-gray-600 dark:bg-gray-900 dark:text-white">
                            <h1 className="mb-2 text-2xl font-bold text-green-400">
                                {regulation.title}
                            </h1>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        regulation.content,
                                    ),
                                }}
                            />
                            <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">Date:</span>{" "}
                                {formatDate(regulation.created_at)}
                            </p>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
