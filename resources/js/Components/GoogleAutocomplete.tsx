import ReactGoogleAutocomplete, {
    ReactGoogleAutocompleteInputProps,
    ReactGoogleAutocompleteProps,
} from "react-google-autocomplete";

type GoogleAutocompleteProps = Omit<
    ReactGoogleAutocompleteProps,
    "onPlaceSelected"
> &
    Omit<ReactGoogleAutocompleteInputProps, "onChange"> & {
        name?: string;
        value?: string;
        onChange?: (value: Record<string, any>) => void;
    };

export default function GoogleAutocomplete({
    className,
    value,
    onChange,
    ...props
}: GoogleAutocompleteProps) {
    return (
        <ReactGoogleAutocomplete
            {...props}
            inputAutocompleteValue={value}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 rounded-md shadow-sm " +
                className
            }
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            onPlaceSelected={(place) =>
                onChange?.(
                    place.address_components.reduce(
                        (
                            acc: Record<string, string>,
                            obj: {
                                long_name: string;
                                short_name: string;
                                types: string[];
                            },
                        ) => {
                            if (obj.types.includes("locality")) {
                                acc.locality = obj.long_name;
                            } else if (obj.types.includes("country")) {
                                acc.country = obj.long_name;
                            } else if (obj.types.includes("postal_code")) {
                                acc.postal_code = obj.long_name;
                            }
                            return acc;
                        },
                        {},
                    ),
                )
            }
            options={{
                types: ["(regions)"],
                componentRestrictions: { country: "fr" },
            }}
        />
    );
}
