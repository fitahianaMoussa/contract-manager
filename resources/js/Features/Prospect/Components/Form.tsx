import CustomPhoneInput from "@/Components/CustomPhoneInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea"
import { Prospect } from "@/types";
import { FormEventHandler, useEffect } from "react";

type TProspect = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    description: string;
    status: "qualified" | "unqualified" | "converted";
    phone: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
};

type FormProps = {
    mode?: "creation" | "edition";
    data: Partial<Prospect>;
    setData: any;
    errors: Partial<Record<keyof Prospect, string>>;
    processing: boolean;
    onReset?: any;
    options?: any[];
    onSubmit: FormEventHandler;
    onCancel: () => void;
};
const status = [
    { label: "Qualifié", value: "qualified" },
    { label: "Non qualifié", value: "unqualified" },
    { label: "Converti", value: "converted" },
];
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

                    <TextInput
                        id="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        value={data.date_of_birth}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("date_of_birth", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.date_of_birth}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    />

                    <InputError message={errors.description} className="mt-2" />
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
                    <InputLabel htmlFor="address" value="Adresse" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("address", e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel htmlFor="city" value="Ville" />

                    <TextInput
                        id="city"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("city", e.target.value)}
                        required
                    />
                    {/* <AutoCompleteInput
                        id="city"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        onChange={(val) => setData("city", val)}
                        required
                        options={options?.map((option) => ({
                            label: option.name,
                            value: option.name,
                        }))}
                    /> */}

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
                    <InputLabel htmlFor="postal_code" value="postal_code" />

                    <TextInput
                        id="postal_code"
                        name="postal_code"
                        value={data.postal_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("postal_code", e.target.value)}
                        required
                    />
                    <InputError message={errors.postal_code} className="mt-2" />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <Select
                        id="status"
                        name="status"
                        value={data.status}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("status", e.target.value)}
                        required
                        options={status}
                    />
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </fieldset>
            <fieldset>
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
