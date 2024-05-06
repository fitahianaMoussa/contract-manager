import { format as formatCurrency } from "@/Utils/Currency";
import { format as formatDate } from "@/Utils/Date";
import React from "react";

interface Contract {
    product: {
        name: string;
        company: {
            name: string;
        };
    };
    created_at: string;
    status: string;
    start_date: string;
    end_date: string;
    amount: any;
}

interface ContractDetailProps {
    selectedContract: Contract | null;
}

const ContractDetail: React.FC<ContractDetailProps> = ({
    selectedContract,
}) => {
    return (
        <div className="space-y-3 p-5 text-base text-gray-800 dark:text-gray-300">
            {selectedContract && (
                <>
                    <h4 className="text-xl font-semibold">
                        {selectedContract.product.name}
                    </h4>
                    <h5 className="text-lg font-semibold">
                        {selectedContract.product.company.name}
                    </h5>
                    <p className="text-xs">
                        {formatDate(selectedContract.created_at, "short")}
                    </p>
                    <p>Statut: {selectedContract.status}</p>
                    <p>
                        Du: {formatDate(selectedContract.start_date, "short")}
                    </p>
                    <p>Au: {formatDate(selectedContract.end_date, "short")}</p>
                    <p>Montant: {formatCurrency(selectedContract.amount)}</p>
                </>
            )}
        </div>
    );
};

export default ContractDetail;
