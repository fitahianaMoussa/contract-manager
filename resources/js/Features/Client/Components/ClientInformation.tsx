import Card from "@/Components/Card";
import InfoItem from "@/Components/InfoItem";
import PrimaryButton from "@/Components/PrimaryButton";
import { generateClientPDF } from "@/Services/PdfServices";
import { format as formatDate } from "@/Utils/Date";
import { format as formatPhone } from "@/Utils/Phone";
import { InsuredPerson, Regime } from "@/types";
import { DocumentIcon } from "@heroicons/react/20/solid";
import {
    mapInsuredPersonToFrench,
    mapRegimeToFrench,
} from "../../../Utils/Translations";

interface Contract {
    id: number;
    name: string;
    client_id: number;
    product_id: string;
    description: string;
    due: string;
    created_at: string;
    [key: string]: any;
}

interface Broker {
    id: number;
    first_name: string;
    last_name: string;
}
interface ClientDetailsProps {
    client: {
        id: number;
        first_name: string;
        last_name: string;
        date_of_birth: string;
        social_security_number: number;
        email: string;
        phone: string;
        street: string;
        city: string;
        country: string;
        broker: Broker;
        spouse_first_name: string;
        spouse_last_name: string;
        spouse_date_of_birth: string;
        spouse_social_security_number: string;
        spouse_email: string;
        bank_details: string;
        regime: Regime;
        insured_person: InsuredPerson;
        spouse_phone: string;
        is_valid: boolean;
        contracts: Contract[];
    };
}

const ClientInformation: React.FC<ClientDetailsProps> = ({ client }) => {
    const clientInfo = [
        { label: "Nom", value: client.first_name },
        { label: "Prénom", value: client.last_name },
        { label: "Email", value: client.email },
        { label: "Phone", value: formatPhone(client.phone) },
        { label: "Date de naissance", value: formatDate(client.date_of_birth) },
        {
            label: "Numéro sécurité sociale",
            value: client.social_security_number,
        },
        {
            label: "Address",
            value: `${client.street}, ${client.city}, ${client.country}`,
        },
        { label: "Coordonnée bancaire", value: client.bank_details },
        { label: "Regime", value: mapRegimeToFrench(client.regime) },
        {
            label: "Personne assurée",
            value: mapInsuredPersonToFrench(client.insured_person),
        },
    ];
    return (
        <Card>
            <Card.Header
                title={"Client"}
                actions={
                    <PrimaryButton
                        className="float-right"
                        onClick={() => {
                            generateClientPDF(client);
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
                        {client.first_name + " " + client.last_name}
                    </h1>
                    {clientInfo.map((info, index) => (
                        <InfoItem
                            key={index}
                            label={info.label}
                            value={info.value}
                        />
                    ))}
                </div>
            </Card.Content>
        </Card>
    );
};

export default ClientInformation;
