import { useState } from "react";
import {
  Calculator,
  Bus,
  Hotel,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  Compass,
} from "lucide-react";
import { packages, num, type Pkg } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { BookingInquiryDialog, type BookingDetails } from "./booking-inquiry-dialog";

interface TransportOption {
  id: string;
  bn: string;
  en: string;
  descBn: string;
  descEn: string;
  diffPerPerson: number;
}

interface RoomOption {
  id: string;
  bn: string;
  en: string;
  descBn: string;
  descEn: string;
  diffPerPerson: number;
}

export function TripCalculator({ initialPkg }: { initialPkg?: Pkg }) {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialPkg?.slug || packages[0]?.slug || "coxs-bazar",
  );
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [transportId, setTransportId] = useState<string>("ac-luxury");
  const [roomId, setRoomId] = useState<string>("couple-private");
  const [bbqAddon, setBbqAddon] = useState<boolean>(true);
  const [boatAddon, setBoatAddon] = useState<boolean>(false);
  const [photoAddon, setPhotoAddon] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const currentPkg = packages.find((p) => p.slug === selectedSlug) || packages[0]!;

  const transportOptions: TransportOption[] = [
    {
      id: "ac-luxury",
      bn: "এসি লাক্সারি বাস",
      en: "AC Luxury Coach",
      descBn: "হানিফ / এনা / শ্যামলী আধুনিক এসি বাস",
      descEn: "Scania / Hyundai modern AC coach",
      diffPerPerson: 1000,
    },
    {
      id: "non-ac",
      bn: "নন-এসি চেয়ার কোচ",
      en: "Non-AC Coach",
      descBn: "সাশ্রয়ী চেয়ার কোচ পরিবহন",
      descEn: "Standard budget friendly bus",
      diffPerPerson: 0,
    },
    {
      id: "microbus",
      bn: "রিজার্ভ হাইয়েস মাইক্রোবাস",
      en: "Reserved AC HiAce",
      descBn: "ব্যক্তিগত ও পারিবারিক ট্যুরের জন্য সেরা",
      descEn: "Private door-to-door for groups",
      diffPerPerson: 1800,
    },
    {
      id: "self",
      bn: "নিজস্ব যাতায়াত (পরিবহন ছাড়া)",
      en: "Own Transport",
      descBn: "শুধুমাত্র রিসোর্ট, খাবার ও গাইড প্যাকেজ",
      descEn: "Resort, meals & guide only",
      diffPerPerson: -1400,
    },
  ];

  const roomOptions: RoomOption[] = [
    {
      id: "sharing",
      bn: "স্ট্যান্ডার্ড শেয়ারিং রুম",
      en: "Twin / Group Sharing",
      descBn: "২-৪ জন বন্ধু বা গ্রুপ শেয়ারিং বেড",
      descEn: "Shared comfortable double beds",
      diffPerPerson: 0,
    },
    {
      id: "couple-private",
      bn: "কাপল প্রাইভেট রুম / কটেজ",
      en: "Couple Private Cottage",
      descBn: "সম্পূর্ণ প্রাইভেট ব্যালকনি ও এটাচড বাথ",
      descEn: "Private attached bath & balcony",
      diffPerPerson: 800,
    },
    {
      id: "family-suite",
      bn: "প্রিমিয়াম ফ্যামিলি স্যুট",
      en: "Premium Family Suite",
      descBn: "প্রশস্ত স্পেস, মনোরম ভিউ ও অতিরিক্ত বেড",
      descEn: "Spacious scenic view room",
      diffPerPerson: 1500,
    },
  ];

  const activeTransport =
    transportOptions.find((o) => o.id === transportId) || transportOptions[0]!;
  const activeRoom = roomOptions.find((o) => o.id === roomId) || roomOptions[0]!;

  // Base calculation
  const baseRate = currentPkg.price;
  const adultUnitRate = Math.max(
    1000,
    baseRate + activeTransport.diffPerPerson + activeRoom.diffPerPerson,
  );
  // Child rate (approx 55% of adult rate)
  const childUnitRate = Math.round(adultUnitRate * 0.55);

  let addonsTotal = 0;
  const addonsList: string[] = [];
  const totalTravelers = adults + children;

  if (bbqAddon) {
    addonsTotal += 450 * totalTravelers;
    addonsList.push(T("স্পেশাল বারবিকিউ ডিনার", "Special BBQ Dinner"));
  }
  if (boatAddon) {
    addonsTotal += 500 * totalTravelers;
    addonsList.push(T("প্রাইভেট বোট / কায়াকিং", "Private Boat / Kayaking"));
  }
  if (photoAddon) {
    addonsTotal += 1500; // Flat per group
    addonsList.push(T("ডেডিকেটেড ট্রাভেল ফটোগ্রাফার", "Travel Photographer"));
  }

  const grandTotal = adultUnitRate * adults + childUnitRate * children + addonsTotal;
  const perPersonAvg = totalTravelers > 0 ? Math.round(grandTotal / totalTravelers) : adultUnitRate;
  const advanceRequired = Math.round(grandTotal * 0.3); // 30% advance to lock booking

  const bookingDetails: BookingDetails = {
    pkg: currentPkg,
    adults,
    children,
    date,
    transportLabel: lang === "bn" ? activeTransport.bn : activeTransport.en,
    roomLabel: lang === "bn" ? activeRoom.bn : activeRoom.en,
    unitPrice: perPersonAvg,
    totalPrice: grandTotal,
    advanceEstimated: advanceRequired,
    addOns: addonsList,
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card shadow-elevated overflow-hidden">
      {/* Top Banner */}
      <div className="bg-forest p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Calculator className="h-3.5 w-3.5" />
            <span>{T("লাইভ ট্যুর প্রাইস ক্যালকুলেটর", "Live Tour Cost Calculator")}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {T("আপনার পছন্দ অনুযায়ী খরচ হিসাব করুন", "Customize & Calculate Trip Costs")}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-white/80">
            {T(
              "পরিবহন, রুম ক্যাটাগরি ও যাত্রী সংখ্যা নির্বাচন করলেই তাৎক্ষণিক সঠিক বাজেট পেয়ে যাবেন।",
              "Adjust transport, rooms, and group size to see exact itemized estimates with no hidden fees.",
            )}
          </p>
        </div>

        {/* Live Calculation Pill */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:px-6 text-right shrink-0 backdrop-blur-sm">
          <span className="text-[11px] text-white/75 font-medium uppercase tracking-wider block">
            {T("গড় জনপ্রতি খরচ", "Average Per Person")}
          </span>
          <span className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums block">
            ৳{num(perPersonAvg, lang)}
          </span>
          <span className="text-[11px] text-emerald-300">
            {T("মোট আনুমানিক:", "Total Est:")} ৳{num(grandTotal, lang)}
          </span>
        </div>
      </div>

      {/* Main Configuration Form Grid */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Step 1: Destination Selection (if not locked by package) */}
        {!initialPkg && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" />
              <span>{T("১. গন্তব্য নির্বাচন করুন", "1. Select Destination")}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {packages.slice(0, 12).map((pkg) => (
                <button
                  key={pkg.slug}
                  onClick={() => setSelectedSlug(pkg.slug)}
                  className={`rounded-xl p-2.5 text-left transition-all duration-200 border text-xs active:scale-95 ${
                    selectedSlug === pkg.slug
                      ? "border-primary bg-secondary/80 font-semibold text-forest shadow-xs scale-[1.02] ring-1 ring-primary/40"
                      : "border-border/70 bg-card hover:bg-secondary/40 text-foreground/80 hover:border-primary/40 hover:-translate-y-0.5"
                  }`}
                >
                  <p className="font-medium truncate">{t(pkg.title)}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {num(pkg.days, lang)} {T("দিন", "Days")} · ৳{num(pkg.price, lang)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Passenger Steppers & Date */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Adults */}
          <div className="space-y-2 rounded-2xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {T("প্রাপ্তবয়স্ক (Adults)", "Adults (12+ yrs)")}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>{T("পূর্ণ খরচ", "Full fare")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-forest hover:bg-secondary transition active:scale-95"
                  aria-label="Decrease adults"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center font-display text-base font-bold text-forest tabular-nums">
                  {num(adults, lang)}
                </span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-forest hover:bg-secondary transition active:scale-95"
                  aria-label="Increase adults"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Children */}
          <div className="space-y-2 rounded-2xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {T("শিশু (Children ৩-১১ বছর)", "Kids (3-11 yrs)")}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>{T("৫৫% ছাড়", "45% discount")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-forest hover:bg-secondary transition active:scale-95"
                  aria-label="Decrease children"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center font-display text-base font-bold text-forest tabular-nums">
                  {num(children, lang)}
                </span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-forest hover:bg-secondary transition active:scale-95"
                  aria-label="Increase children"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Travel Date */}
          <div className="space-y-2 rounded-2xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {T("ভ্রমণের সম্ভাব্য তারিখ", "Tentative Date")}
            </span>
            <div className="relative mt-1">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-1.5 pl-9 pr-3 text-xs sm:text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Transport Choice */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Bus className="h-4 w-4 text-primary" />
            <span>{T("২. পরিবহন মাধ্যম পছন্দ করুন", "2. Choose Transport Mode")}</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {transportOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setTransportId(opt.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 active:scale-95 ${
                  transportId === opt.id
                    ? "border-primary bg-secondary/80 shadow-card scale-[1.02] ring-1 ring-primary/40"
                    : "border-border/70 bg-card hover:border-primary/40 hover:bg-secondary/30 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-base font-bold text-forest">
                    {lang === "bn" ? opt.bn : opt.en}
                  </h4>
                  <span className="text-xs font-semibold tabular-nums text-primary">
                    {opt.diffPerPerson > 0 && `+৳${num(opt.diffPerPerson, lang)}`}
                    {opt.diffPerPerson < 0 && `-৳${num(Math.abs(opt.diffPerPerson), lang)}`}
                    {opt.diffPerPerson === 0 && T("মূল খরচে", "Included")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {lang === "bn" ? opt.descBn : opt.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Accommodation Choice */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Hotel className="h-4 w-4 text-primary" />
            <span>{T("৩. রুম ও আবাসন ক্যাটাগরি", "3. Room & Stay Category")}</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {roomOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setRoomId(opt.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 active:scale-95 ${
                  roomId === opt.id
                    ? "border-primary bg-secondary/80 shadow-card scale-[1.02] ring-1 ring-primary/40"
                    : "border-border/70 bg-card hover:border-primary/40 hover:bg-secondary/30 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-base font-bold text-forest">
                    {lang === "bn" ? opt.bn : opt.en}
                  </h4>
                  <span className="text-xs font-semibold tabular-nums text-primary">
                    {opt.diffPerPerson > 0
                      ? `+৳${num(opt.diffPerPerson, lang)}`
                      : T("মূল খরচে", "Base")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {lang === "bn" ? opt.descBn : opt.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 5: Optional Add-ons */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>
              {T("৪. বিশেষ অভিজ্ঞতা ও অ্যাড-অন (ঐচ্ছিক)", "4. Experience Add-ons (Optional)")}
            </span>
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {/* BBQ */}
            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3.5 cursor-pointer hover:bg-secondary/30 transition">
              <input
                type="checkbox"
                checked={bbqAddon}
                onChange={(e) => setBbqAddon(e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <div className="text-xs">
                <span className="font-bold text-forest block">
                  {T("স্পেশাল ক্যাম্পফায়ার বারবিকিউ", "Campfire BBQ Night")}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  +৳৪৫০/{lang === "bn" ? "জন" : "person"}
                </span>
              </div>
            </label>

            {/* Boat */}
            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3.5 cursor-pointer hover:bg-secondary/30 transition">
              <input
                type="checkbox"
                checked={boatAddon}
                onChange={(e) => setBoatAddon(e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <div className="text-xs">
                <span className="font-bold text-forest block">
                  {T("প্রাইভেট বোট / কায়াকিং সেশন", "Private Boat / Kayaking")}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  +৳৫০০/{lang === "bn" ? "জন" : "person"}
                </span>
              </div>
            </label>

            {/* Photographer */}
            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3.5 cursor-pointer hover:bg-secondary/30 transition">
              <input
                type="checkbox"
                checked={photoAddon}
                onChange={(e) => setPhotoAddon(e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <div className="text-xs">
                <span className="font-bold text-forest block">
                  {T("ডেডিকেটেড ট্রাভেল ফটোগ্রাফার", "Travel Photographer")}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  +৳১,৫০০/{lang === "bn" ? "গ্রুপ" : "group"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Final Calculation Summary & Action Button */}
        <div className="rounded-2xl border border-border/80 bg-secondary/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {T("হিসাব সারাংশ", "Calculation Breakdown")}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-3xl font-bold text-forest tabular-nums">
                ৳{num(grandTotal, lang)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({num(adults, lang)} {T("বড়", "adults")}
                {children > 0 && ` + ${num(children, lang)} ${T("শিশু", "kids")}`}) ·{" "}
                {T("গড়", "avg")}: ৳{num(perPersonAvg, lang)}
              </span>
            </div>
            <p className="text-xs text-emerald-700 font-medium">
              ✓ {T("সিট লক করতে অগ্রিম:", "Advance to secure seat:")} ৳{num(advanceRequired, lang)}{" "}
              <span className="text-muted-foreground">
                ({T("বাকিটা যাত্রার দিন", "remainder on trip day")})
              </span>
            </p>
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-forest/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{T("এই হিসাব দিয়ে বুকিং পাঠান", "Send Booking with this Estimate")}</span>
            <ArrowRight className="h-4 w-4 text-emerald-300" />
          </button>
        </div>
      </div>

      {/* Inquiry Dialog */}
      <BookingInquiryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        details={bookingDetails}
      />
    </div>
  );
}
