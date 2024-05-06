import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { Price } from "@/types";
import { FormEventHandler } from "react";

export type PriceTable = {
    zone_id: string;
    option_id: string;
    age_id: string;
    value: string;
};

type PriceFormProps = {
    mode?: "creation" | "edition";
    data: Partial<
        Price & { zone_id: number; option_id: number; age_id: number }
    >;
    ages: any[];
    options: any[];
    zones: any[];
    setData: any;
    errors: Partial<
        Record<keyof Price | "zone_id" | "option_id" | "age_id", string>
    >;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function PriceForm({
    mode = "creation",
    data,
    ages,
    options,
    zones,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}: PriceFormProps) {
    return (
        <form className="p-5" onSubmit={onSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="zone_id" value="Zone" />

                <Select
                    id="zone_id"
                    name="zone_id"
                    value={data.zone_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("zone_id", e.target.value)}
                    required
                    options={zones}
                />

                <InputError message={errors.zone_id} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="option_id" value="Option" />

                <Select
                    id="option_id"
                    name="option_id"
                    value={data.option_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("option_id", e.target.value)}
                    required
                    options={options}
                />

                <InputError message={errors.option_id} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="age_id" value="Age" />

                <Select
                    id="age_id"
                    name="age_id"
                    value={data.age_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("age_id", e.target.value)}
                    required
                    options={ages}
                />

                <InputError message={errors.age_id} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="value" value="Prix" />

                <TextInput
                    id="value"
                    name="value"
                    type="number"
                    step="0.01"
                    value={data.value}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("value", e.target.value)}
                    required
                />

                <InputError message={errors.value} className="mt-2" />
            </div>
            <div className="mt-4">
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
            </div>
        </form>
    );
}
