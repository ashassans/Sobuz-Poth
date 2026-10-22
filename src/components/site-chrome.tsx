import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Leaf,
  MessageCircle,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Facebook,
} from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { useLang } from "@/lib/lang";

const navItems = [
  { to: "/", bn: "হোম", en: "Home" },
  { to: "/packages", bn: "প্যাকেজ", en: "Packages" },
  { to: "/about", bn: "আমাদের কথা", en: "About Us" },
  { to: "/contact", bn: "যোগাযোগ", en: "Contact" },
] as const;

export function Header() {
  const { lang, setLang, t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-4 md:py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-border/80 bg-card/92 px-5 py-2.5 shadow-card backdrop-blur-md"
              : isHome
                ? "border-white/15 bg-forest/80 px-5 py-3 text-hero-foreground shadow-card backdrop-blur-md"
                : "border-border/60 bg-card/85 px-5 py-3 shadow-card backdrop-blur-md"
          }`}
        >
          {/* Brand Wordmark Zone */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-95"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                scrolled
                  ? "bg-secondary text-primary"
                  : isHome
                    ? "bg-white/15 text-emerald-300"
                    : "bg-secondary text-primary"
              }`}
            >
              <Leaf className="h-4 w-4" />
            </div>
            <span
              className={`font-display text-xl font-bold tracking-tight md:text-2xl ${
                scrolled ? "text-forest" : isHome ? "text-hero-foreground" : "text-forest"
              }`}
            >
              {t(SITE.name)}
            </span>
          </Link>

          {/* Navigation Links Zone */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative text-sm font-medium transition-colors hover:opacity-100 ${
                    scrolled
                      ? active
                        ? "text-primary font-semibold"
                        : "text-foreground/80 hover:text-forest"
                      : isHome
                        ? active
                          ? "text-white font-semibold"
                          : "text-white/80 hover:text-white"
                        : active
                          ? "text-primary font-semibold"
                          : "text-foreground/80 hover:text-forest"
                  }`}
                >
                  {item[lang]}
                  {active && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        scrolled ? "bg-primary" : isHome ? "bg-emerald-300" : "bg-primary"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action & Language Toggle Zone */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
                scrolled
                  ? "border-border/70 text-forest hover:bg-secondary"
                  : isHome
                    ? "border-white/25 text-white hover:bg-white/10"
                    : "border-border/70 text-forest hover:bg-secondary"
              }`}
              aria-label="Toggle language"
            >
              {lang === "bn" ? "EN" : "বাংলা"}
            </button>

            <Link
              to="/packages"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-xs ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : isHome
                    ? "bg-white text-forest hover:bg-white/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              <span>{lang === "bn" ? "ট্যুর প্যাকেজ" : "Browse Tours"}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>

            <button
              className={`p-1.5 md:hidden transition-colors ${
                scrolled ? "text-forest" : isHome ? "text-white" : "text-forest"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-elevated md:hidden animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
                      active
                        ? "bg-secondary text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <span>{item[lang]}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-border/60 flex flex-col gap-3">
              <a
                href={waLink(
                  lang === "bn"
                    ? "আসসালামু আলাইকুম, ট্যুর পরামর্শ ও বুকিং তথ্য জানতে চাই।"
                    : "Hello, I would like tour consultation and booking details.",
                )}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground transition hover:opacity-95 shadow-xs"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{lang === "bn" ? "WhatsApp কনসিয়ার্জ" : "WhatsApp Concierge"}</span>
              </a>

              <div className="flex items-center justify-between text-xs text-muted-foreground px-2 pt-1">
                <span>{SITE.phoneDisplay}</span>
                <span>{t(SITE.address)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function WhatsAppFloat() {
  const { lang } = useLang();
  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex items-center gap-2.5 group">
      <span className="hidden sm:inline-block pointer-events-none rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-forest shadow-soft border border-border/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {lang === "bn" ? "ট্যুর বুকিং সহায়তা" : "Direct WhatsApp Help"}
      </span>
      <a
        href={waLink(
          lang === "bn"
            ? "আসসালামু আলাইকুম, সবুজ পথ ট্যুর সম্পর্কে জানতে চাই।"
            : "Hello, I'd like to inquire about Shobuj Poth tour packages.",
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Contact"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated animate-pulse-glow transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-whatsapp/40"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export function Footer() {
  const { t, lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const popularDestinations = [
    { title: "সাজেক ভ্যালি", en: "Sajek Valley", slug: "sajek" },
    { title: "কক্সবাজার", en: "Cox's Bazar", slug: "coxs-bazar" },
    { title: "সুন্দরবন", en: "Sundarbans", slug: "sundarbans" },
    { title: "সেন্টমার্টিন", en: "Saint Martin", slug: "saint-martin" },
    { title: "সিলেট-শ্রীমঙ্গল", en: "Sylhet & Sreemangal", slug: "sylhet-sreemangal" },
    { title: "টাঙ্গুয়ার হাওর", en: "Tanguar Haor", slug: "tanguar-haor" },
  ];

  return (
    <footer className="mt-28 border-t border-forest/15 bg-forest text-hero-foreground">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Ethos */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                {t(SITE.name)}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/75 max-w-xs">
              {T(
                "বাংলাদেশের প্রকৃতির সান্নিধ্যে নিরাপদ, গোছানো ও আন্তরিক ভ্রমণ। অভিজ্ঞ স্থানীয় গাইড ও নির্ভরযোগ্য সেবায় প্রতিটি যাত্রা হোক স্মরণীয়।",
                "Mindful, trustworthy journeys through Bangladesh's pristine landscapes. Experienced local guides and transparent service for every traveler.",
              )}
            </p>
            <div className="pt-2 flex items-center gap-3 text-white/60">
              <span className="flex items-center gap-1.5 text-xs text-white/80">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {T("নিবন্ধিত ট্যুর অপারেটর", "Registered Tour Operator")}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold uppercase tracking-wider text-white/90">
              {T("দ্রুত লিঙ্ক", "Quick Links")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  {T("মূল পাতা", "Home")}
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white/70 hover:text-white transition-colors">
                  {T("সকল প্যাকেজ", "All Packages")}
                </Link>
              </li>
              <li>
                <a
                  href="/#custom-trip"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {T("কাস্টম ট্রিপ বানান", "Custom Trip Planner")}
                </a>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  {T("আমাদের সম্পর্কে", "About Us")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  {T("যোগাযোগ", "Contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div>
            <h3 className="font-display text-base font-semibold uppercase tracking-wider text-white/90">
              {T("জনপ্রিয় গন্তব্য", "Top Destinations")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {popularDestinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    to="/packages/$slug"
                    params={{ slug: d.slug }}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{lang === "bn" ? d.title : d.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4">
            <h3 className="font-display text-base font-semibold uppercase tracking-wider text-white/90">
              {T("যোগাযোগ ও সহায়তা", "Contact & Support")}
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{SITE.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{SITE.email}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{t(SITE.address)}</span>
              </p>
              <p className="flex items-center gap-2.5 text-xs text-white/60">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{T("সকাল ৯টা – রাত ১০টা (প্রতিদিন)", "9:00 AM – 10:00 PM (Daily)")}</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href={waLink(
                  lang === "bn"
                    ? "আসসালামু আলাইকুম! সবুজ পথ ট্রাভেলস এর সাথে কথা বলতে চাই।"
                    : "Hello! I would like to chat with Shobuj Poth Travels.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp/90 px-4 py-2 text-xs font-semibold text-white transition hover:bg-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{T("সরাসরি WhatsApp বার্তা", "Chat on WhatsApp")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} {t(SITE.name)}.{" "}
            {T("সর্বস্বত্ব সংরক্ষিত।", "All rights reserved.")}
          </p>
          <div className="flex items-center gap-4">
            <span>
              {T(
                "প্রকৃতির কাছে, ভালোবাসায় ও দায়িত্বে।",
                "Closer to nature, with care & responsibility.",
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
