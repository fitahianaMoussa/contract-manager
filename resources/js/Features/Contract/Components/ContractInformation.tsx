import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import { User } from "@/types";
import React from "react";
import { Swiper } from "swiper/react";
import ContractItem from "./ContractItem";

interface Client {
    contracts: Contract[];
    is_valid: boolean;
}

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

interface ContractInformationProps {
    client: Client;
    setShowCreationModal: (show: boolean) => void;
    setShowDetailModal: (show: boolean) => void;
    setShowEditionModal: (show: boolean) => void;
    setShowDeletionModal: (show: boolean) => void;
    setSelectedContract: SetSelectedContract;
    setData: (data: any) => void;
    user: User;
}

const ContractInformation: React.FC<ContractInformationProps> = ({
    client,
    setShowCreationModal,
    setShowDetailModal,
    setShowEditionModal,
    setShowDeletionModal,
    setSelectedContract,
    setData,
    user,
}) => {
    return (
        <Card>
            <Card.Header
                title={`Contrats(${client.contracts.length})`}
                actions={
                    client.is_valid ? (
                        user.can.createClient && (
                            <PrimaryButton
                                onClick={() => setShowCreationModal(true)}
                                className="mb-4"
                            >
                                + Ajouter un contrat
                            </PrimaryButton>
                        )
                    ) : (
                        <div className="text-center text-red-400">
                            La validation du client est nécessaire pour l'ajout
                            d'un contrat.
                        </div>
                    )
                }
            />
            <Card.Content>
                <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                    {client.is_valid && (
                        <Swiper spaceBetween={50} slidesPerView={5}>
                            {client.contracts.map((contract) => (
                                <ContractItem
                                    key={contract.id}
                                    contract={contract}
                                    setSelectedContract={setSelectedContract}
                                    setShowDetailModal={setShowDetailModal}
                                    setShowEditionModal={setShowEditionModal}
                                    setShowDeletionModal={setShowDeletionModal}
                                    setData={setData}
                                />
                            ))}
                        </Swiper>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
};

export default ContractInformation;
