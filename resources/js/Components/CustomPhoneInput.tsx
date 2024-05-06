import { E164Number } from "libphonenumber-js";
import { InputHTMLAttributes } from "react";
import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import fr from "react-phone-number-input/locale/fr";
import "react-phone-number-input/style.css";

export default function CustomPhoneInput({
    className,
    ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    value?: E164Number;
    onChange: (value?: E164Number) => void;
}) {
    return (
        <PhoneInput
            {...props}
            international
            smartCaret
            focusInputOnCountrySelection
            countryCallingCodeEditable={false}
            defaultCountry="FR"
            labels={fr}
            initialValueFormat="national"
            countrySelectProps={{
                className:
                    "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm",
            }}
            numberInputProps={{
                className:
                    "z-20 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                    className,
            }}
        />
    );
}

function isoToEmoji(code: string) {
    return code
        .split("")
        .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
        .map((emojiCode) => String.fromCodePoint(emojiCode))
        .join("");
}
