import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, MessageCircle, Minus, Plus } from "lucide-react";
import { bookingMessage, num, waLink, type Pkg } from "@/lib/site";
import { useLang } from "@/lib/lang";

export function BookingBox({ p, compact }: { p: Pkg; compact?: boolean }) {
  const { lang } = useLang();
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-full border bg-background">
          <button onClick={() => setPeople(Math.max(1, people - 1))} className="p-2" aria-label="-">
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-12 text-center text-sm">
            {num(people, lang)} {lang === "bn" ? "জন" : "ppl"}
          </span>
          <button onClick={() => setPeople(people + 1)} className="p-2" aria-label="+">
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="min-w-0 flex-1 rounded-full border bg-background px-3 py-1.5 text-sm"
        />
      </div>
      {!compact && (
        <p className="text-sm text-muted-foreground">
          {lang === "bn" ? "মোট" : "Total"}:{" "}
          <span className="font-bold text-forest">৳{num(p.price * people, lang)}</span>
        </p>
      )}
      <a
        href={waLink(bookingMessage(p, people, date, lang))}
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-2.5 font-semibold text-whatsapp-foreground transition hover:brightness-105"
      >
        <MessageCircle className="h-4 w-4" />{" "}
        {lang === "bn" ? "WhatsApp-এ বুক করুন" : "Book on WhatsApp"}
      </a>
    </div>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  const { t, lang } = useLang();
  return (
    <article className="group overflow-hidden rounded-2xl bg-card shadow-soft">
      <Link
        to="/packages/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={p.image}
          alt={t(p.title)}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-forest">
            {t(p.badge)}
          </span>
        )}
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <Link to="/packages/$slug" params={{ slug: p.slug }}>
            <h3 className="text-2xl font-bold text-forest">{t(p.title)}</h3>
          </Link>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {num(p.days, lang)} {lang === "bn" ? "দিন" : "days"}
          </span>
        </div>
        <p className="flex items-center gap-1 text-xs font-medium text-primary">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{t(p.region)}</span>
        </p>
        <p className="text-sm text-muted-foreground">{t(p.short)}</p>
        <p className="text-xl font-bold text-primary">
          ৳{num(p.price, lang)}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            /{lang === "bn" ? "জন" : "person"}
          </span>
        </p>
        <BookingBox p={p} compact />
      </div>
    </article>
  );
}
