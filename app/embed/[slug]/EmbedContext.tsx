"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/i18n/types";

interface IEmbedContext {
  slug?: string;
  locale: Locale;
}

const Ctx = createContext<IEmbedContext>({ locale: DEFAULT_LOCALE });

export const useEmbedContext = () => useContext(Ctx);

const resolveLocale = (): Locale => {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("lang");
    if (fromUrl && LOCALES.includes(fromUrl as Locale))
      return fromUrl as Locale;
    const nav = navigator.language?.toLowerCase().slice(0, 2);
    if (nav && LOCALES.includes(nav as Locale)) return nav as Locale;
  } catch {
    /* noop */
  }
  return DEFAULT_LOCALE;
};

export const EmbedContextProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  useEffect(() => {
    setLocale(resolveLocale());
  }, []);

  return <Ctx.Provider value={{ slug, locale }}>{children}</Ctx.Provider>;
};
