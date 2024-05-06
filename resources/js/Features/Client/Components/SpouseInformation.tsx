// SpouseInformation.js

import Card from "@/Components/Card";
import InfoItem from "@/Components/InfoItem";
import { format as formatDate } from "@/Utils/Date";
import { format as formatPhone } from "@/Utils/Phone";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

interface SpouseInformationProps {
    client: {
        spouse_first_name: string;
        spouse_last_name: string;
        spouse_email: string;
        spouse_phone: string;
        spouse_date_of_birth: string;
        spouse_social_security_number: string;
    };
    showSpouseInfo: boolean;
    setShowSpouseInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpouseInformation: React.FC<SpouseInformationProps> = ({
    client,
    showSpouseInfo,
    setShowSpouseInfo,
}) => {
    const spouseInfoItems = [
        { label: "Nom", value: client.spouse_first_name },
        { label: "Prénom", value: client.spouse_last_name },
        { label: "Email", value: client.spouse_email },
        { label: "Phone", value: formatPhone(client.spouse_phone) },
        {
            label: "Date de naissance",
            value: formatDate(client.spouse_date_of_birth),
        },
        {
            label: "Numéro sécurité sociale",
            value: client.spouse_social_security_number,
        },
    ];
    return (
        <Card>
            <Card.Header
                title={"Conjoint(e)"}
                actions={
                    <button
                        className="focus:outline-none"
                        onClick={() => setShowSpouseInfo(!showSpouseInfo)}
                    >
                        <ChevronDownIcon
                            className={`h-6 w-8 text-green-400 transition-transform ${
                                showSpouseInfo ? "rotate-180 transform" : ""
                            }`}
                        />
                    </button>
                }
            />
            <Card.Content>
                <div className="light:bg-gray-100 light:text-gray-600 mb-4 rounded-md p-4 dark:bg-gray-900 dark:text-white">
                    {showSpouseInfo && (
                        <>
                            {spouseInfoItems.map((item, index) => (
                                <InfoItem
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))}
                        </>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
};

export default SpouseInformation;
