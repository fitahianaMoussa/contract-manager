import Chip from "@/Components/Chip";
import Dropdown from "@/Components/Dropdown";
import { format as formatCurrency } from "@/Utils/Currency";
import { format as formatDate } from "@/Utils/Date";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import React from "react";
import { SwiperSlide } from "swiper/react";

interface Contract {
    id: number;
    reference: string;
    product: {
        name: string;
        company: {
            name: string;
        };
    };
    status: string;
    start_date: string;
    end_date: string;
    amount: string;
    administration_fees?: string;
}

type SetSelectedContract = (contract: Contract | null) => void;

interface ContractItemProps {
    contract: Contract;
    setSelectedContract: SetSelectedContract;
    setShowDetailModal: (show: boolean) => void;
    setShowEditionModal: (show: boolean) => void;
    setShowDeletionModal: (show: boolean) => void;
    setData: (data: any) => void;
}

const ContractItem: React.FC<ContractItemProps> = ({
    contract,
    setSelectedContract,
    setShowDetailModal,
    setShowEditionModal,
    setShowDeletionModal,
    setData,
}) => {
    return (
        <SwiperSlide>
            <div className="my-2">
                <div className="h-full rounded-md prose prose-gray dark:prose-invert bg-gray-50 p-5 shadow-md dark:bg-gray-800">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs">N° {contract.reference}</p>
                            <div className="flex items-start gap-x-2">
                                <h4 className="mt-2">
                                    {contract.product.name}
                                </h4>
                                {contract.status === "active" && (
                                    <Chip type="success">activé</Chip>
                                )}
                            </div>
                            <h5>{contract.product.company.name}</h5>
                        </div>
                        <Dropdown>
                            <Dropdown.Button className="mt-1 rounded-full border border-transparent">
                                <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </Dropdown.Button>
                            <Dropdown.Content contentClasses="bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <Dropdown.Link
                                    href="#"
                                    as="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedContract(contract);
                                        setShowDetailModal(true);
                                    }}
                                >
                                    Détail
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href="#"
                                    as="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedContract(contract);
                                        setData(contract);
                                        setShowEditionModal(true);
                                    }}
                                >
                                    Modifier
                                </Dropdown.Link>
                                <Dropdown.Link
                                    className="!text-red-400"
                                    href="#"
                                    as="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedContract(contract);
                                        setShowDeletionModal(true);
                                    }}
                                >
                                    Supprimer
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="flex gap-x-2">
                        <p>Du: {formatDate(contract.start_date, "short")}</p>
                        <p>Au: {formatDate(contract.end_date, "short")}</p>
                    </div>
                    <p>Montant: {formatCurrency(contract.amount)}</p>
                    {contract.administration_fees && (
                        <p>
                            Frais de dossiers:{" "}
                            {formatCurrency(contract.administration_fees)}
                        </p>
                    )}
                    {!contract.administration_fees && (
                        <p>Aucun frais de dossiers</p>
                    )}
                </div>
            </div>
        </SwiperSlide>
    );
};

export default ContractItem;
