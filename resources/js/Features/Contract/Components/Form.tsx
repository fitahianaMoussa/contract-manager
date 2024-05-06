import CurrencyInput from "@/Components/CurrencyInput";
import DateInput from "@/Components/DateInput";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioGroup from "@/Components/RadioGroup";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { Contract } from "@/types";
import { FormEventHandler, useEffect } from "react";

type FormProps = {
    mode?: "creation" | "edition";
    data: Partial<
        Omit<Contract, "client" | "product" | "status" | "due_date"> & {
            product_id: number;
            option_id: number;
        }
    >;
    setData: any;
    errors: Partial<
        Record<
            | keyof Omit<Contract, "client" | "product" | "status" | "due_date">
            | "product_id"
            | "option_id",
            string
        >
    >;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
    products: any[];
    options: any[];
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
    products,
    options,
}: FormProps) {
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5 min-h-min overflow-y-auto" onSubmit={onSubmit}>
            <div>
                <InputLabel htmlFor="reference" value="Numéro*" />

                <TextInput
                    id="reference"
                    name="reference"
                    value={data.reference}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("reference", e.target.value)}
                    required
                />

                <InputError message={errors.reference} className="mt-2" />
            </div>

            <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="product" value="Assurance*" />

                    <Select
                        id="product"
                        name="product_id"
                        value={data.product_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("product_id", e.target.value)}
                        options={products}
                        required
                    />

                    <InputError message={errors.product_id} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="option" value="Garantie*" />

                    <Select
                        id="option"
                        name="option_id"
                        value={data.option_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("option_id", e.target.value)}
                        options={options}
                        required
                    />

                    <InputError message={errors.option_id} className="mt-2" />
                </div>
            </fieldset>

            {/* <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="amount" value="Montant" />

                    <TextInput
                        id="amount"
                        name="amount"
                        type="number"
                        value={data.amount}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("amount", e.target.value)}
                        placeholder="0.00"
                    />

                    <InputError message={errors.amount} className="mt-2" />
                </div>
            </fieldset> */}

            <fieldset className="mt-4 grid grid-cols-2">
                <div>
                    <InputLabel
                        htmlFor="payment_frequency"
                        value="Fréquence de piement"
                    />

                    <RadioGroup
                        value={data.payment_frequency}
                        onChange={(value) =>
                            setData("payment_frequency", value)
                        }
                        className="mt-1"
                    >
                        <RadioGroup.Option label="Mensuel" value="monthly" />
                        <RadioGroup.Option
                            label="Trimestriel"
                            value="quaterly"
                        />
                        <RadioGroup.Option label="Annuel" value="annual" />
                    </RadioGroup>

                    <InputError
                        message={errors.payment_frequency}
                        className="mt-2"
                    />
                </div>
            </fieldset>

            <div className="mt-4">
                <InputLabel htmlFor="amount" value="Montant" />

                <CurrencyInput
                    id="amount"
                    name="amount"
                    value={data.amount}
                    className="mt-1 block w-full"
                    onChange={(value) => setData("amount", value)}
                />

                <InputError message={errors.amount} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel
                    htmlFor="administration_fees"
                    value="Frais du dossier"
                />

                <CurrencyInput
                    id="administration_fees"
                    name="administration_fees"
                    className="mt-1 block w-full"
                    value={data.administration_fees}
                    onChange={(value) => setData("administration_fees", value)}
                />

                <InputError
                    message={errors.administration_fees}
                    className="mt-2"
                />
            </div>

            <fieldset className="mt-4 grid grid-cols-2 gap-2">
                <div>
                    <InputLabel htmlFor="from" value="Du" />

                    <DateInput
                        id="from"
                        name="from"
                        className="mt-1 block w-full"
                        value={data.start_date}
                        onChange={(val) => setData("start_date", val)}
                        required
                    />

                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="to" value="A" />

                    <DateInput
                        id="to"
                        name="to"
                        className="mt-1 block w-full"
                        value={data.end_date}
                        onChange={(val) => setData("end_date", val)}
                        required
                    />

                    <InputError message={errors.end_date} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="attachments" value="Pièces jointes" />

                    <FileInput
                        id="attachments"
                        name="attachments"
                        accept="image/png, image/jpeg, application/pdf"
                        // value={data.attachments}
                        className="mt-1 block w-full"
                        onChange={(files) => setData("attachments", files)}
                        helperText="PNG, JPG, or PDF."
                    />

                    <InputError message={errors.attachments} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="mt-4">
                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("description", e.target.value)}
                    />

                    <InputError message={errors.description} className="mt-2" />
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
                    {mode === "creation" ? "Créer" : "Sauvegarder"}
                </PrimaryButton>
            </div>
        </form>
    );
}
