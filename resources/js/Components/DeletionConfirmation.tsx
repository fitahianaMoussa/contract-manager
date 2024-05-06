import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { FormEventHandler } from "react";

type FormProps = {
    name?: string;
    onCancel: () => void;
    handleDeleteSubmit: FormEventHandler;
};

export default function DeletionConfirmation({
    name,
    onCancel,
    handleDeleteSubmit,
}: FormProps) {
    return (
        <div className=" space-y-4 py-5 text-white">
            <p className="text-center">
                Voulez-vous vraiment supprimer {name} ?
            </p>
            <div className="text-center space-x-10">
                <SecondaryButton
                    onClick={() => {
                        onCancel();
                    }}
                >
                    Annuler
                </SecondaryButton>
                <PrimaryButton onClick={handleDeleteSubmit}>Oui</PrimaryButton>
            </div>
        </div>
    );
}
