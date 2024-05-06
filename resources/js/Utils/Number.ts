export const format = (
    num: number,
    options?: Intl.NumberFormatOptions,
    locale: string | string[] = "fr",
) => {
    return new Intl.NumberFormat(locale, options).format(num);
};
