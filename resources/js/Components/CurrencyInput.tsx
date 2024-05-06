import ReactCurrencyInput, {
    CurrencyInputProps as ReactCurrencyInputProps,
} from "react-currency-input-field";

type CurrencyInputProps = Omit<
    ReactCurrencyInputProps,
    "onChange" | "onValueChange"
> & {
    onChange?: (value: string) => void;
};

export default function CurrencyInput({
    className,
    onChange,
    ...props
}: CurrencyInputProps) {
    return (
        <ReactCurrencyInput
            {...props}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                className
            }
            intlConfig={{ locale: "fr-FR", currency: "EUR" }}
            decimalScale={2}
            decimalsLimit={2}
            onValueChange={(value, name, values) => onChange?.(value ?? "")}
        />
    );
}
