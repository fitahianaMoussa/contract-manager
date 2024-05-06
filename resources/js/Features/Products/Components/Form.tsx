import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { FormEventHandler, useEffect } from "react";

type Product = {
    name: string;
    description: string;
};

type FormProps = {
    mode?: "creation" | "edition";
    data: Product;
    setData: any;
    errors: Partial<Product>;
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
            <fieldset className="grid gap-2">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

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
            </fieldset>
            <fieldset className="grid gap-2">
                <div>
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
            </fieldset>

            <fieldset className="grid gap-2">
                <div className="flex items-center justify-end mt-4">
                    <SecondaryButton
                        className="ms-4"
                        onClick={onCancel}
                        disabled={processing}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-4"
                        type="submit"
                        disabled={processing}
                    >
                        {mode === "creation" ? "Créer" : "Modifier"}
                    </PrimaryButton>
                </div>
            </fieldset>
        </form>
    );
}
