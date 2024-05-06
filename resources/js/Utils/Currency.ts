import { formatValue } from "react-currency-input-field";
import { IntlConfig } from "react-currency-input-field/dist/components/CurrencyInputProps";

export const format = (
    amount: string,
    intlConfig: IntlConfig = { locale: "fr-FR", currency: "EUR" },
) => {
    return formatValue({
        value: amount,
        intlConfig: intlConfig,
    });
};
