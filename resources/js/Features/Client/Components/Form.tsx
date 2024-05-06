import CustomPhoneInput from "@/Components/CustomPhoneInput";
import DateInput from "@/Components/DateInput";
import GoogleAutocomplete from "@/Components/GoogleAutocomplete";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Client } from "@/types";
import { Disclosure } from "@headlessui/react";
import { FormEventHandler, useEffect } from "react";

type TClient = {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    phone: string;
    social_security_number: string;
    street: string;
    city: string;
    country: string;
    zip_code: string;
    spouse_first_name: string;
    spouse_last_name: string;
    spouse_date_of_birth: string;
    spouse_email: string;
    spouse_phone: string;
    spouse_social_security_number: string;
};

type FormProps = {
    mode?: "creation" | "edition";
    data: Partial<Client>;
    setData: any;
    errors: Partial<Record<keyof Client, string>>;
    processing: boolean;
    onReset?: any;
    options?: any[];
    onSubmit: FormEventHandler;
    onCancel: () => void;
};
export default function Form({
    mode,
    data,
    setData,
    errors,
    processing,
    onReset,
    options,
    onSubmit,
    onCancel,
}: FormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                    <InputLabel htmlFor="last_name" value="Nom" />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="first_name" value="Prénom" />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="date_of_birth"
                        value="Date de naissance"
                    />

                    <DateInput
                        id="date_of_birth"
                        name="date_of_birth"
                        value={data.date_of_birth}
                        placeholder="dd/mm/yyyy"
                        className="mt-1 block w-full"
                        onChange={(val) => setData("date_of_birth", val)}
                        required
                    />

                    <InputError
                        message={errors.date_of_birth}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="social_security_number"
                        value="Numéro de sécurité social"
                    />

                    <TextInput
                        id="social_security_number"
                        name="social_security_number"
                        value={data.social_security_number}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("social_security_number", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.social_security_number}
                        className="mt-2"
                    />
                </div>
            </fieldset>

            <fieldset className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="phone" value="Numéro de téléphone" />

                    <CustomPhoneInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(val) => setData("phone", val)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4">
                    <InputLabel htmlFor="street" value="Adresse" />

                    <TextInput
                        id="street"
                        name="street"
                        value={data.street}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("street", e.target.value)}
                        required
                    />

                    <InputError message={errors.street} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel htmlFor="city" value="Ville" />

                    <GoogleAutocomplete
                        id="city"
                        name="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(value) => {
                            setData((prevVal: any) => ({
                                ...prevVal,
                                city: value.locality,
                            }));
                            setData((prevVal: any) => ({
                                ...prevVal,
                                country: value.country,
                            }));
                            setData((prevVal: any) => ({
                                ...prevVal,
                                zip_code: value.postal_code,
                            }));
                        }}
                        aria-required
                    />

                    <InputError message={errors.city} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="country" value="Pays" />

                    <TextInput
                        id="country"
                        name="country"
                        value={data.country}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("country", e.target.value)}
                        required
                    />

                    <InputError message={errors.country} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="zip_code" value="Code Postal" />

                    <TextInput
                        id="zip_code"
                        name="zip_code"
                        value={data.zip_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("zip_code", e.target.value)}
                        required
                    />
                    <InputError message={errors.zip_code} className="mt-2" />
                </div>
            </fieldset>
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
                                    setData("spouse_last_name", e.target.value)
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
                                    setData("spouse_first_name", e.target.value)
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
                                value={data.spouse_social_security_number}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "spouse_social_security_number",
                                        e.target.value,
                                    )
                                }
                            />

                            <InputError
                                message={errors.spouse_social_security_number}
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
                                    setData("spouse_email", e.target.value)
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
                                    setData("spouse_phone", e.target.value)
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
                    {mode === "creation" ? "Créer" : "Modifier"}
                </PrimaryButton>
            </div>
        </form>
    );
}
