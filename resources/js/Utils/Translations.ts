import { InsuredPerson, Regime } from "@/types";

export const mapRegimeToFrench = (regime: Regime): string => {
    const regimes = {
        independent: "Indépendant",
        farmer: "Agriculteur",
        retired_employee: "Retraité salarié",
        retired_self_employed: "Retraité indépendant",
        student: "Étudiant",
        unemployed: "Sans emploi",
        civil_servant: "Fonctionnaire",
        agricultural_worker: "Salarié agricole",
    };

    return regimes[regime] || "Inconnu";
};

export const mapInsuredPersonToFrench = (
    insuredPerson: InsuredPerson,
): string => {
    const insuredPersons = {
        client: "Lui-même",
        spouse: "Conjoint",
        child: "Enfant",
        client_and_spouse: "Lui-même et son épouse",
        client_and_child: "Lui-même et ses enfants",
        client_and_spouse_and_child: "Lui-même , son épouse et ses enfants",
    };

    return insuredPersons[insuredPerson] || "Inconnu";
};

export const mapPaymentFrequencyToFrench = (
    paymentFrequency: "monthly" | "quarterly" | "annual",
): string => {
    const paymentFrequencies = {
        monthly: "Mensuel",
        quarterly: "Trimestriel",
        annual: "Annuel",
    };

    return paymentFrequencies[paymentFrequency] || "Inconnu";
};
