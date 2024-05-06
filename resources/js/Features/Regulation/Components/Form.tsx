import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { RichTextEditor } from "@/Components/RichTextEditor";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { FormEventHandler, useEffect } from "react";

type Regulation = {
    title: string;
    content: string;
};

type FormProps = {
    mode?: "creation" | "edition";
    data: Regulation;
    setData: any;
    errors: Partial<Regulation>;
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
    useEffect(() => {
        if (mode !== "edition") {
            setData({
                title: "",
                content: "",
            });
        }
    }, [mode]);
    return (
        <form className="p-5" onSubmit={onSubmit}>
            <div>
                <InputLabel htmlFor="title" value="Titre" />

                <TextInput
                    id="title"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    autoComplete="title"
                    isFocused={true}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                />

                <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="content" value="Contenu" />
                <RichTextEditor
                    className="mt-1"
                    onChange={(value) => setData("content", value)}
                />
                <InputError message={errors.content} className="mt-2" />
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
                    {mode === "creation" ? "Créer" : "Sauvegarder"}
                </PrimaryButton>
            </div>
        </form>
    );
}
