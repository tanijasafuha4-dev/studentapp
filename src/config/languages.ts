export const defaultLanguage = "en";
export const languages = ["en", "de"] as const;
export type Language = (typeof languages)[number];
