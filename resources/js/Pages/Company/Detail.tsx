import Card from "@/Components/Card";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Form from "@/Features/Products/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { generateCompanyPDF } from "@/Services/PdfServices";
import { format as formatDate } from "@/Utils/Date";
import { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

type TProduct = {
    id: number;
    name: string;
    description: string;
    company_id: number;
    broker: any;
    created_at: string;
};

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
    products: TProduct[];
    broker: any;
    created_at: string;
};

export default function Index({
    auth,
    company,
}: PageProps<{ company: TCompany }>) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(
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
        name: "",
        description: "",
        company_id: company.id,
    });
    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            setShowCreationModal(false);
        }
    }, [recentlySuccessful]);

    const handleCreationSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };
    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("products.destroy", selectedProduct?.id));
        setSelectedProduct(null);
        setShowDeletionModal(false);
    };
    const handleEditionSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setShowEditionModal(false);
        put(route("products.update", data));
    };
    const handleCloseModal = () => {
        cancel();
        reset();
        setShowCreationModal(false);
        setShowEditionModal(false);
        setShowDeletionModal(false);
        setShowDetailModal(false);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <SecondaryButton>
                            <Link
                                href={`/companies/`}
                                className="flex items-center space-x-2"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                                Retour
                            </Link>
                        </SecondaryButton>
                    </h2>
                }
            >
                <Head title={company.name} />
                <div className="space-y-4">
                    <Card>
                        <Card.Header
                            title={"Compagnie"}
                            actions={
                                <PrimaryButton
                                    className="float-right"
                                    onClick={() => {
                                        generateCompanyPDF(company);
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
                                    {company.name}
                                </h1>
                                <p className="mb-2  text-sm">
                                    Email: {company.email}
                                </p>
                                <p className="mb-2 text-sm">
                                    Phone: {company.phone}
                                </p>
                                <p className="mb-2 text-sm">
                                    Address: {company.street}, {company.city},{" "}
                                    {company.country}, {company.zip_code}
                                </p>
                                <p className="mb-2 text-sm">
                                    Description: {company.description}
                                </p>
                            </div>
                            {auth.user.role === "ROLE_BROKER" &&
                                company.broker.id !== auth.user.id &&
                                company.broker.broker_id === auth.user.id && (
                                    <div className="my-4 ">
                                        <span className="text-lg text-white">
                                            {" "}
                                            <span className="font-semibold text-green-500">
                                                Collaborateur{" "}
                                            </span>
                                            : {company.broker.last_name}{" "}
                                            {company.broker.first_name}
                                        </span>
                                    </div>
                                )}
                            {auth.user.role === "ROLE_ADMIN" &&
                                company.broker.id !== auth.user.id && (
                                    <div className="my-4 ">
                                        <span className="text-lg text-white">
                                            {" "}
                                            <span className="font-semibold text-green-500">
                                                Utilisateur{" "}
                                            </span>
                                            : {company.broker.last_name}{" "}
                                            {company.broker.first_name}
                                            <span className="font-semibold text-green-500">
                                                {" "}
                                                Date{" "}
                                            </span>
                                            :{" "}
                                            {formatDate(
                                                company.created_at as any,
                                            )}
                                        </span>
                                    </div>
                                )}
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Header
                            title={"Produits(" + company.products.length + ")"}
                            actions={
                                auth.user.can.createProduct && (
                                    <PrimaryButton
                                        onClick={() => {
                                            setShowCreationModal(true);
                                        }}
                                        className="mb-4"
                                    >
                                        + Ajouter un produit
                                    </PrimaryButton>
                                )
                            }
                        />
                        <Card.Content>
                            <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                                <h1 className="mb-2 text-2xl font-bold text-green-400">
                                    {company.name}
                                </h1>
                                {company.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="light:bg-white mb-4 flex items-center justify-between rounded-md p-4 dark:bg-gray-900 dark:text-white"
                                    >
                                        <div>
                                            <h2 className="mb-2 text-lg font-semibold">
                                                {product.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {product.description}
                                            </p>
                                            <p className="">
                                                <button
                                                    onClick={() => {
                                                        setShowDetailModal(
                                                            true,
                                                        );
                                                        setSelectedProduct(
                                                            product,
                                                        );
                                                    }}
                                                    className="my-2 rounded-lg border-green-200 bg-green-400 px-2 py-1 text-white"
                                                >
                                                    Voir plus...
                                                </button>
                                            </p>
                                        </div>
                                        {(auth.user.role === "ROLE_ADMIN" ||
                                            auth.user.id ===
                                                product.broker.id ||
                                            auth.user.id ===
                                                product.broker.broker_id) && (
                                            <div className="flex items-center space-x-4">
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setShowEditionModal(
                                                            true,
                                                        );
                                                        setData(product);
                                                    }}
                                                    className="rounded-md px-2 py-1  text-sm"
                                                >
                                                    Modifier
                                                </SecondaryButton>
                                                <PrimaryButton
                                                    onClick={() => {
                                                        setShowDeletionModal(
                                                            true,
                                                        );
                                                        setSelectedProduct(
                                                            product,
                                                        );
                                                    }}
                                                    className="rounded-md px-2 py-1 text-sm"
                                                >
                                                    Supprimer
                                                </PrimaryButton>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </AuthenticatedLayout>

            <Modal
                show={showCreationModal || showEditionModal}
                title={
                    showEditionModal
                        ? "Modifier un produit"
                        : "Ajouter un produit"
                }
                onClose={handleCloseModal}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-red-600 dark:text-gray-400">
                        Something went wrong.
                    </p>
                </Transition>
                <Form
                    mode={showEditionModal ? "edition" : ("creation" as any)}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={handleCloseModal}
                    onReset={() => reset()}
                />
            </Modal>
            <Modal
                show={showDetailModal}
                title="Détail du produit"
                onClose={handleCloseModal}
            >
                {selectedProduct && (
                    <div className="m-5 p-5">
                        <h2 className="mb-4 text-xl font-bold text-green-400">
                            {selectedProduct.name}
                        </h2>
                        <div className="text-xm light:text-gray-700 mb-4 dark:text-white">
                            <p className="mb-2">
                                <span className="font-bold">
                                    Nom du produit:
                                </span>{" "}
                                {selectedProduct.name}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">
                                    Description du produit:
                                </span>{" "}
                                {selectedProduct.description}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Company:</span>{" "}
                                {company.name}
                            </p>
                        </div>
                        <div className="">
                            {auth.user.role === "ROLE_ADMIN" && (
                                <p className="light:text-gray-700 my-5 mb-2 text-sm dark:text-white">
                                    Utilisateur:
                                    {selectedProduct.broker.first_name +
                                        " " +
                                        selectedProduct.broker.last_name}
                                </p>
                            )}
                            <p className="light:text-gray-700 mb-2 text-sm dark:text-white">
                                Date: {formatDate(selectedProduct.created_at)}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <PrimaryButton onClick={handleCloseModal}>
                                Annuler
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </Modal>

            {/* //Suppression */}
            <Modal
                show={showDeletionModal}
                title="Supprimer un Produit "
                onClose={handleCloseModal}
            >
                <DeletionConfirmation
                    name={selectedProduct?.name}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                        // setSelectedData(null);
                    }}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </Modal>
        </>
    );
}
