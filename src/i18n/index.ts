import { hu } from "./hu";
import { en } from "./en";

export type Lang = "hu" | "en";

export const languages: Record<Lang, typeof hu> = { hu, en };

export function useTranslations(lang: Lang) {
  return languages[lang];
}
