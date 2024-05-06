import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Zone } from "@/types";
import { FormEventHandler, useEffect } from "react";

type ZoneFormProps = {
    mode?: "creation" | "edition";
    data: Partial<Zone>;
    setData: any;
    errors: Partial<Record<keyof Zone, string>>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function ZoneForm({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}: ZoneFormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset>
                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="name" value="Nom" />

                    <TextInput
                        data-testid="name-input"
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
