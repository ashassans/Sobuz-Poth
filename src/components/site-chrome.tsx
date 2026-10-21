import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Leaf, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { useLang } from "@/lib/lang";

const nav = [
  { to: "/", bn: "হোম", en: "Home" },
  { to: "/packages", bn: "প্যাকেজ", en: "Packages" },
  { to: "/about", bn: "আমাদের কথা", en: "About" },
  { to: "/contact", bn: "যোগাযোগ", en: "Contact" },
] as const;

export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-card/85 px-4 py-2 shadow-soft backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-forest">
          <Leaf className="h-5 w-5 text-primary" /> {t(SITE.name)}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground hover:text-forest" activeProps={{ className: "text-forest" }} activeOptions={{ exact: true }}>
              {n[lang]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "bn" ? "en" : "bn")} className="rounded-full border px-3 py-1 text-xs font-semibold text-forest">
            {lang === "bn" ? "EN" : "বাং"}
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl bg-card p-4 shadow-soft md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 font-medium text-forest">
              {n[lang]}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function WhatsAppFloat() {
  const { lang } = useLang();
  return (
    <a
      href={waLink(lang === "bn" ? "আসসালামু আলাইকুম, ট্যুর প্যাকেজ সম্পর্কে জানতে চাই।" : "Hello, I'd like to know about your tour packages.")}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 bg-forest text-hero-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl font-bold"><Leaf className="h-5 w-5" /> {t(SITE.name)}</div>
          <p className="mt-2 text-sm opacity-80">{lang === "bn" ? "প্রকৃতির কাছে, নিশ্চিন্তে।" : "Closer to nature, worry free."}</p>
        </div>
        <div className="text-sm opacity-90">
          <p>{SITE.phoneDisplay}</p>
          <p>{SITE.email}</p>
          <p>{t(SITE.address)}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="opacity-90 hover:opacity-100">{n[lang]}</Link>)}
        </div>
      </div>
      <p className="pb-6 text-center text-xs opacity-60">© {new Date().getFullYear()} {t(SITE.name)}</p>
    </footer>
  );
}
