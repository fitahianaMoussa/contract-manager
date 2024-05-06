import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { FormEventHandler, useEffect } from "react";

type FormProps = {
    data: {
        attachments: string;
    };
    setData: any;
    errors: Partial<Record<"attachments", string>>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
};

export default function Form({
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
}: FormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5 min-h-min overflow-y-auto" onSubmit={onSubmit}>
            <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="attachments" value="Pièces jointes" />

                    <FileInput
                        id="attachments"
                        name="attachments"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        className="mt-1 block w-full"
                        onChange={(files) => setData("attachments", files)}
                        helperText="xlsx"
                    />

                    <InputError message={errors.attachments} className="mt-2" />
                </div>
            </fieldset>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                    Importer
                </PrimaryButton>
            </div>
        </form>
    );
}
