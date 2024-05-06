import GoogleAutocomplete from "@/Components/GoogleAutocomplete";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { Location } from "@/types";
import { FormEventHandler, useEffect } from "react";

type LocationFormProps = {
    mode?: "creation" | "edition";
    data: Partial<Location & { zone_id: number }>;
    setData: any;
    errors: Partial<Record<keyof Location | "zone_id", string>>;
    processing: boolean;
    onReset?: any;
    zones: any[];
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function LocationForm({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    zones,
    onSubmit,
    onCancel,
}: LocationFormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset>
                <div>
                    <InputLabel htmlFor="zone_id" value="Zone" />

                    <Select
                        id="zone_id"
                        name="zone_id"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("zone_id", e.target.value)}
                        required
                        options={zones}
                    />

                    <InputError message={errors.zone_id} className="mt-2" />
                </div>
            </fieldset>
            <fieldset className="mt-4 grid grid-cols-2 gap-2">
                <div>
                    <InputLabel htmlFor="name" value="Nom" />

                    <GoogleAutocomplete
                        id="name"
                        name="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(value) => {
                            setData((prevVal: any) => ({
                                ...prevVal,
                                name: value.locality,
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

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
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
                <div>
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
            <div className="flex items-center justify-end mt-4">
                <SecondaryButton
                    data-testid="cancel-button"
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton>

                <PrimaryButton
                    data-testid="submit-button"
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                    {mode === "creation" ? "Créer" : "Sauvegarder"}
                </PrimaryButton>
            </div>
        </form>
    );
}
