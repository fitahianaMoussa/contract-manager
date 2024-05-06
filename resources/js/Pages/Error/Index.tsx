import ApplicationLogo from "@/Components/ApplicationLogo";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth, status }: PageProps<{ status: number }>) {
    const title = {
        503: "503: Service non disponible",
        500: "500: Erreur serveur",
        404: "404: Page Introuvable",
        403: "403: Accès refusé",
    }[status];

    const description = {
        503: "Désolé, nous effectuons quelques travaux de maintenance. Veuillez revenir plutard.",
        500: "Oups, quelque chose s'est mal passé sur nos serveurs.",
        404: "Désolé, la page que vous recherchez est introuvable.",
        403: "Désolé, vous n'êtes pas authorisé à visiter cette page.",
    }[status];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Head title={title} />

            <div className="py-12">
                <div className="prose prose-gray dark:prose-invert mx-auto max-w-7xl text-center sm:px-6 lg:px-8 flex flex-col items-center">
                    <ApplicationLogo />
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
