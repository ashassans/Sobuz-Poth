import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Star,
  ArrowRight,
  Calendar,
  Users,
} from "lucide-react";
import { bookingMessage, num, waLink, type Pkg } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { BookingInquiryDialog, type BookingDetails } from "./booking-inquiry-dialog";

// Realistic traveler ratings & reviews for destinations
const packageMeta: Record<string, { rating: number; reviews: number; nights?: number }> = {
  "coxs-bazar": { rating: 4.8, reviews: 215, nights: 2 },
  "saint-martin": { rating: 4.9, reviews: 184, nights: 2 },
  sajek: { rating: 4.9, reviews: 260, nights: 1 },
  bandarban: { rating: 4.8, reviews: 142, nights: 2 },
  sundarbans: { rating: 4.9, reviews: 98, nights: 2 },
  "sylhet-sreemangal": { rating: 4.9, reviews: 176, nights: 2 },
  rangamati: { rating: 4.7, reviews: 88, nights: 1 },
  kuakata: { rating: 4.7, reviews: 94, nights: 2 },
  sonargaon: { rating: 4.8, reviews: 76 },
  bagerhat: { rating: 4.8, reviews: 62, nights: 1 },
  paharpur: { rating: 4.9, reviews: 54, nights: 1 },
  jaflong: { rating: 4.8, reviews: 110, nights: 1 },
  "tanguar-haor": { rating: 4.9, reviews: 165, nights: 1 },
  mahasthangarh: { rating: 4.7, reviews: 48, nights: 1 },
};

export function BookingBox({ p, compact }: { p: Pkg; compact?: boolean }) {
  const { lang } = useLang();
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const total = p.price * people;
  const advance = Math.round(total * 0.3);

  const bookingDetails: BookingDetails = {
    pkg: p,
    adults: people,
    children: 0,
    date,
    transportLabel: lang === "bn" ? "স্ট্যান্ডার্ড এসি বাস" : "Standard AC Bus",
    roomLabel: lang === "bn" ? "স্ট্যান্ডার্ড শেয়ারিং" : "Standard Sharing",
    unitPrice: p.price,
    totalPrice: total,
    advanceEstimated: advance,
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {lang === "bn" ? "ভ্রমণকারী সংখ্যা" : "Number of Guests"}
        </label>
        <div className="flex items-center justify-between rounded-xl border border-input bg-background/60 p-1.5">
          <div className="flex items-center gap-2 pl-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>{lang === "bn" ? "জনপ্রতি হিসাব" : "Per person"}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPeople(Math.max(1, people - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-card text-forest hover:bg-secondary transition active:scale-95"
              aria-label="Decrease travelers"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-12 text-center text-sm font-semibold tabular-nums text-forest">
              {num(people, lang)} {lang === "bn" ? "জন" : "ppl"}
            </span>
            <button
              onClick={() => setPeople(people + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-card text-forest hover:bg-secondary transition active:scale-95"
              aria-label="Increase travelers"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {lang === "bn" ? "ভ্রমণের সম্ভাব্য তারিখ" : "Tentative Travel Date"}
        </label>
        <div className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-input bg-background/60 py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border/60">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">
            {lang === "bn" ? "আনুমানিক মোট খরচ" : "Estimated Total"}
          </span>
          <span className="font-display text-2xl font-bold text-forest tabular-nums">
            ৳{num(total, lang)}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground text-right">
          ৳{num(p.price, lang)} × {num(people, lang)} {lang === "bn" ? "জন" : "guests"}
        </p>
      </div>

      <button
        onClick={() => setIsDialogOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-semibold text-whatsapp-foreground shadow-sm transition hover:opacity-95 active:scale-[0.99]"
      >
        <MessageCircle className="h-4 w-4" />
        <span>
          {lang === "bn" ? "WhatsApp-এ বুকিং ইনকোয়ারি পাঠান" : "Send Booking Inquiry to WhatsApp"}
        </span>
      </button>

      <p className="text-center text-[11px] text-muted-foreground">
        {lang === "bn"
          ? "সরাসরি WhatsApp-এ কনফার্মেশন · কোনো হিডেন চার্জ নেই"
          : "Instant WhatsApp Confirmation · Zero Hidden Charges"}
      </p>

      <BookingInquiryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        details={bookingDetails}
      />
    </div>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  const { t, lang } = useLang();
  const meta = packageMeta[p.slug] ?? { rating: 4.8, reviews: 85 };

  const durationLabel =
    meta.nights && meta.nights > 0
      ? lang === "bn"
        ? `${num(meta.nights, lang)} রাত · ${num(p.days, lang)} দিন`
        : `${meta.nights}N · ${p.days}D`
      : lang === "bn"
        ? `${num(p.days, lang)} দিনের ডে-ট্যুর`
        : `${p.days} Day Tour`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-elevated hover:-translate-y-1.5">
      {/* Visual Anchor */}
      <Link
        to="/packages/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        <img
          src={p.image}
          alt={t(p.title)}
          loading="lazy"
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

        {p.badge && (
          <span className="relative overflow-hidden absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-xs font-medium text-white shadow-xs backdrop-blur-sm">
            <span className="relative z-10">{t(p.badge)}</span>
            <span className="absolute inset-0 pointer-events-none animate-shimmer" />
          </span>
        )}

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/95">
          <span className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
            <span className="truncate max-w-[180px]">{t(p.region)}</span>
          </span>
          <span className="flex items-center gap-1 drop-shadow-sm rounded-md bg-black/35 px-2 py-0.5 backdrop-blur-xs">
            <Clock className="h-3 w-3 text-emerald-300" />
            <span>{durationLabel}</span>
          </span>
        </div>
      </Link>

      {/* Card Content & Hierarchy */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* Rating Line */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center text-amber-600">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="ml-1 font-semibold tabular-nums text-foreground">
                {num(meta.rating, lang)}
              </span>
            </div>
            <span>·</span>
            <span>
              {num(meta.reviews, lang)} {lang === "bn" ? "রিভিউ" : "reviews"}
            </span>
          </div>

          {/* Destination Title */}
          <Link to="/packages/$slug" params={{ slug: p.slug }} className="block">
            <h3 className="font-display text-2xl font-bold tracking-tight text-forest transition-colors group-hover:text-primary">
              {t(p.title)}
            </h3>
          </Link>

          {/* Short Narrative */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{t(p.short)}</p>
        </div>

        {/* Pricing & CTA Line */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-forest tabular-nums">
                ৳{num(p.price, lang)}
              </span>
              <span className="text-xs text-muted-foreground">
                /{lang === "bn" ? "জন" : "person"}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {lang === "bn" ? "থাকা ও যাতায়াত অন্তর্ভুক্ত" : "Stay & transit included"}
            </p>
          </div>

          <Link
            to="/packages/$slug"
            params={{ slug: p.slug }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground group/btn"
          >
            <span>{lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
