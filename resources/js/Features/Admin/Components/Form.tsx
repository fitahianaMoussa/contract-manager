import CustomPhoneInput from "@/Components/CustomPhoneInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioGroup from "@/Components/RadioGroup";
import SecondaryButton from "@/Components/SecondaryButton";
import Switch from "@/Components/Switch";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";
import { FormEventHandler, useEffect } from "react";

type FormProps = {
    data: Partial<
        Omit<User, "role"> & {
            role: "admin" | "superuser";
        }
    >;
    setData: any;
    errors: Partial<Record<keyof User, string>>;
    processing: boolean;
    onReset?: any;
    onSubmit: FormEventHandler;
    onCancel: () => void;
};

export default function Form({
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
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="last_name" value="Nom" />

                    <TextInput
                        data-testid="last_name-input"
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="first_name" value="Prénom" />

                    <TextInput
                        data-testid="first_name-input"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        data-testid="email-input"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Numéro de téléphone" />
                    <CustomPhoneInput
                        data-testid="phone-input"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(val) => setData("phone", val)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>
            </fieldset>

            <fieldset>
                <div className="mt-4">
                    <InputLabel value="Rôle" />

                    <RadioGroup
                        value={data.role}
                        onChange={(value) => setData("role", value)}
                        className="mt-1"
                    >
                        <RadioGroup.Option
                            data-testid="admin_role-radio"
                            label="Administrateur"
                            value="admin"
                        />
                        <RadioGroup.Option
                            data-testid="broker_role-radio"
                            label="Super utilisateur"
                            value="superuser"
                        />
                    </RadioGroup>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Statut" />

                    <Switch
                        data-testid="status-switch"
                        className="mt-1"
                        checked={data.is_active}
                        onChange={(state) => setData("is_active", state)}
                    >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Active
                        </span>
                    </Switch>

                    <InputError message={errors.is_active} className="mt-2" />
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
                    Créer
                </PrimaryButton>
            </div>
        </form>
    );
}
