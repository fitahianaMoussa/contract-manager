import Checkbox from "@/Components/Checkbox";
import CustomPhoneInput from "@/Components/CustomPhoneInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm, Link } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

type Company = {
    name: string;
    description: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    zip_code: string;
};

type FormProps = {
    mode?: "creation" | "edition";
    data: Company;
    setData: any;
    errors: Partial<Company>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function Form({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
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
            <div>
                <InputLabel htmlFor="name" value="Nom" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <fieldset className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4 md:mt-0">
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
                        autoComplete="username"
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

                <div className="mt-4">
                    <InputLabel htmlFor="city" value="Ville" />

                    <TextInput
                        id="city"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("city", e.target.value)}
                        required
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

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />

                <TextArea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    autoComplete="description"
                    onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

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
