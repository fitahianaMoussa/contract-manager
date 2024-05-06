import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Age } from "@/types";
import { FormEventHandler, useEffect } from "react";

type AgeFormProps = {
    mode?: "creation" | "edition";
    data: Partial<Age>;
    setData: any;
    errors: Partial<Record<keyof Age, string>>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function AgeForm({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}: AgeFormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset>
                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="value" value="Age" />

                    <TextInput
                        data-testid="value-input"
                        id="value"
                        name="value"
                        type="number"
                        min={18}
                        max={100}
                        value={data.value}
                        className="mt-1 block w-full"
                        autoComplete="value"
                        isFocused={true}
                        onChange={(e) => setData("value", e.target.value)}
                        required
                    />

                    <InputError message={errors.value} className="mt-2" />
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
