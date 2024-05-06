import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { Client } from "@/types";
import { Disclosure } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { format as formatDate } from "date-fns";
import { FormEventHandler, useEffect } from "react";

type TClient = {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    is_valid: boolean;
    country: string;
    spouse_first_name: string;
    spouse_last_name: string;
    spouse_date_of_birth: string;
    spouse_email: string;
    spouse_phone: string;
    spouse_social_security_number: string;
    bank_details: string;
    insured_person:
        | "client"
        | "spouse"
        | "child"
        | "client_and_spouse"
        | "client_and_child"
        | "client_and_spouse_and_child";
    regime:
        | "independent"
        | "farmer"
        | "retired_employee"
        | "retired_self_employed"
        | "student"
        | "unemployed"
        | "civil_servant"
        | "agricultural_worker";
};

type FormProps = {
    client: TClient;
    onCancel: () => void;
};

const insuredPersons = [
    { name: "Vous-même", value: "client" },
    { name: "Conjoint", value: "spouse" },
    { name: "Enfant", value: "child" },
    { name: "Vous-même et votre épouse", value: "client_and_spouse" },
    { name: "Vous-même et vos enfants", value: "client_and_child" },
    {
        name: "Vous-même , votre épouse et vos enfants",
        value: "client_and_spouse_and_child",
    },
];

const regimes = [
    { name: "Indépendant", value: "independent" },
    { name: "Agriculteur", value: "farmer" },
    { name: "Retraité salarié", value: "retired_employee" },
    { name: "Retraité indépendant", value: "retired_self_employed" },
    { name: "Étudiant", value: "student" },
    { name: "Sans emploi", value: "unemployed" },
    { name: "Fonctionnaire", value: "civil_servant" },
    { name: "Salarié", value: "agricultural_worker" },
];

export default function ValidationForm({ client, onCancel }: FormProps) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        hasErrors,
        recentlySuccessful,
    } = useForm<Partial<Client>>({
        spouse_first_name: client.spouse_first_name,
        spouse_last_name: client.spouse_last_name,
        spouse_date_of_birth:
            client.spouse_date_of_birth &&
            formatDate(client.spouse_date_of_birth, "yyyy-MM-dd"),
        spouse_email: client.spouse_email,
        spouse_phone: client.spouse_phone,
        spouse_social_security_number: client.spouse_social_security_number,
        insured_person: "client",
        regime: "independent",
        bank_details: "",
    });

    useEffect(() => {
        if (hasErrors) {
            reset("bank_details");
        }

        if (recentlySuccessful) {
            reset();
            onCancel();
        }
    }, [hasErrors, recentlySuccessful]);

    const handleValidInformation: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("clients.validate", client));
    };

    return (
        <form className="p-5" onSubmit={handleValidInformation}>
            {!client.is_valid ? (
                <>
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="regime"
                                value="Affilié au régime"
                            />
                            <Select
                                id="regime"
                                name="regime"
                                value={data.regime}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("regime", e.target.value as any)
                                }
                                required
                                options={regimes.map((regime: any) => ({
                                    value: regime.value,
                                    label: regime.name,
                                }))}
                            />

                            <InputError
                                message={errors.insured_person}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="insured_person"
                                value="Personne assurée"
                            />

                            <Select
                                id=" insured_person"
                                name=" insured_person"
                                value={data.insured_person}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "insured_person",
                                        e.target.value as any,
                                    )
                                }
                                required
                                options={insuredPersons.map(
                                    (insured_person: any) => ({
                                        value: insured_person.value,
                                        label: insured_person.name,
                                    }),
                                )}
                            />

                            <InputError
                                message={errors.insured_person}
                                className="mt-2"
                            />
                        </div>
                    </fieldset>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="bank_details"
                            value="Coordonnée bancaire"
                        />

                        <TextInput
                            id="bank_details"
                            name="bank_details"
                            value={data.bank_details}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("bank_details", e.target.value)
                            }
                            required
                        />

                        <InputError message={errors.street} className="mt-2" />
                    </div>
                    <Disclosure>
                        <Disclosure.Button className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                            Etes-vous marié ?
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <fieldset className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <InputLabel
                                        htmlFor="spouse_last_name"
                                        value="Nom de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_last_name"
                                        name="spouse_last_name"
                                        value={data.spouse_last_name}
                                        className="mt-1 block w-full"
                                        autoComplete="spouse_last_name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "spouse_last_name",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.spouse_last_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <InputLabel
                                        htmlFor="spouse_first_name"
                                        value="Prénom de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_first_name"
                                        name="spouse_first_name"
                                        value={data.spouse_first_name}
                                        className="mt-1 block w-full"
                                        autoComplete="spouse_first_name"
                                        onChange={(e) =>
                                            setData(
                                                "spouse_first_name",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="spouse_date_of_birth"
                                        value="Date de naissance de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_date_of_birth"
                                        type="date"
                                        name="spouse_date_of_birth"
                                        value={data.spouse_date_of_birth}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "spouse_date_of_birth",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.spouse_date_of_birth}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="spouse_social_security_number"
                                        value="Numéro de sécurité social de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_social_security_number"
                                        name="spouse_social_security_number"
                                        value={
                                            data.spouse_social_security_number
                                        }
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "spouse_social_security_number",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={
                                            errors.spouse_social_security_number
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </fieldset>

                            <fieldset className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <InputLabel
                                        htmlFor="spouse_email"
                                        value="Email de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_email"
                                        name="spouse_email"
                                        type="email"
                                        value={data.spouse_email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData(
                                                "spouse_email",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.spouse_email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <InputLabel
                                        htmlFor="spouse_phone"
                                        value="Numéro de téléphone de votre partenaire"
                                    />

                                    <TextInput
                                        id="spouse_phone"
                                        name="spouse_phone"
                                        type="tel"
                                        value={data.spouse_phone}
                                        className="mt-1 block w-full"
                                        autoComplete="phone"
                                        onChange={(e) =>
                                            setData(
                                                "spouse_phone",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>
                            </fieldset>
                        </Disclosure.Panel>
                    </Disclosure>
                </>
            ) : (
                <div className="dark:text-white text-center">
                    Client déjà validé, souhaitez-vous annuler la validation
                </div>
            )}
            <div className="flex items-center justify-end mt-4">
                <SecondaryButton
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton>

                <PrimaryButton
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                    {client.is_valid ? "Annuler la validation" : "Valider"}
                </PrimaryButton>
            </div>
        </form>
    );
}
