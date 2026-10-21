import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { L, Lang } from "./site";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (x: L) => string }>({
  lang: "bn",
  setLang: () => {},
  t: (x) => x.bn,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");
  useEffect(() => {
    const s = localStorage.getItem("lang");
    if (s === "en" || s === "bn") setLangState(s);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: (x) => x[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
