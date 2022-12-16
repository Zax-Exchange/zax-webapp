import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../translations/en.json";
import zhCn from "../translations/zh-cn.json";

export type Locale = "en" | "zh-cn";

export const SUPPORTED_LOCALES: Locale[] = ["en", "zh-cn"];

type LocaleContext = {
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
  locale: Locale;
};

export const LocaleContext = React.createContext<LocaleContext>({
  setLocale: () => {},
  locale: "en",
});

export const getStoredLocale = () => {
  const storedLocale = (localStorage.getItem("user-locale") as Locale) || "en";
  return storedLocale;
};

export const getIntlFile = (locale: Locale) => {
  switch (locale) {
    case "en":
      return en;
    case "zh-cn":
      return zhCn;
  }
};
export const LocaleContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [locale, setLocale] = useState<Locale>(getStoredLocale());

  const [intlFile, setIntlFile] = useState<Record<string, string> | undefined>(
    undefined
  );
  useEffect(() => {
    if (locale) {
      setIntlFile(getIntlFile(locale));
    }
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      <IntlProvider locale={locale} messages={intlFile}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
