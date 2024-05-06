import { format as formatDate, formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";

export const format = (
    dateTime: string,
    format: "full" | "short" | "relative" = "full",
) => {
    const dt = new Date(dateTime ?? null);

    if (format === "short") {
        return formatDate(dt, "dd/MM/yyyy", { locale: fr });
    }

    if (format === "relative") {
        return formatDistanceToNowStrict(dt, { locale: fr, addSuffix: true });
    }

    return formatDate(dt, "EEEE d MMMM yyyy", { locale: fr });
};
