import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Option } from "@/types";
import { FormEventHandler, useEffect } from "react";

type OptionFormProps = {
    mode?: "creation" | "edition";
    data: Partial<Option>;
    setData: any;
    errors: Partial<Record<keyof Option, string>>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function OptionForm({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}: OptionFormProps) {
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
