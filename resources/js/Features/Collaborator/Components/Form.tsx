import CustomPhoneInput from "@/Components/CustomPhoneInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioGroup from "@/Components/RadioGroup";
import SecondaryButton from "@/Components/SecondaryButton";
import Switch from "@/Components/Switch";
import TextInput from "@/Components/TextInput";
import { Collaborator } from "@/types";
import { FormEventHandler, useEffect } from "react";

type FormProps = {
    mode?: "creation" | "edition";
    data: Partial<
        Omit<Collaborator, "role"> & {
            role: "admin" | "broker" | "user" | "collaborator";
            password?: string;
            password_confirmation?: string;
        }
    >;
    setData: any;
    errors: Partial<
        Record<
            keyof Collaborator | "password" | "password_confirmation",
            string
        >
    >;
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
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
                role: "collaborator",
                is_active: false,
            });
        }
    }, [mode]);
    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mt-4 md:mt-0">
                    <InputLabel htmlFor="last_name" value="Nom" />

                    <TextInput
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

            {/*{mode === "creation" && (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmation du mot de passe"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </fieldset>
                        )}*/}

            <fieldset>
                {mode === "creation" && (
                    <div className="mt-4">
                        <InputLabel value="Rôle" />

                        <RadioGroup
                            value={data.role}
                            onChange={(value) => setData("role", value)}
                            className="mt-1"
                        >
                            <RadioGroup.Option
                                label="Collaborateur"
                                value="collaborator"
                            />
                        </RadioGroup>

                        <InputError message={errors.role} className="mt-2" />
                    </div>
                )}
                <div className="mt-4">
                    <InputLabel value="Statut" />

                    <Switch
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
