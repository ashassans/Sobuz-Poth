import { useState, useId } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  User,
  Phone,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bus,
  Hotel,
} from "lucide-react";
import { num, waLink, SITE, type Pkg } from "@/lib/site";
import { useLang } from "@/lib/lang";

export interface BookingDetails {
  pkg: Pkg;
  adults: number;
  children: number;
  date: string;
  transportLabel?: string;
  roomLabel?: string;
  unitPrice: number;
  totalPrice: number;
  advanceEstimated: number;
  addOns?: string[];
}

export function BookingInquiryDialog({
  isOpen,
  onClose,
  details,
}: {
  isOpen: boolean;
  onClose: () => void;
  details: BookingDetails | null;
}) {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupCity, setPickupCity] = useState("ঢাকা (Dhaka)");
  const [specialNote, setSpecialNote] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate a consistent pseudo reference code based on timestamp & id
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const [referenceCode] = useState(
    () => `SP-${new Date().getFullYear().toString().slice(-2)}-${randomSuffix}`,
  );

  if (!details) return null;

  const totalGuests = details.adults + details.children;

  const compiledMessage = T(
    `আসসালামু আলাইকুম! আমি সবুজ পথ-এ একটি ট্যুর বুকিং ইনকোয়ারি পাঠাচ্ছি:\n\n` +
      `📌 বুকিং রেফারেন্স: ${referenceCode}\n` +
      `🌿 প্যাকেজ: ${details.pkg.title.bn} (${details.pkg.days} দিন)\n` +
      `📅 সম্ভাব্য ভ্রমণের তারিখ: ${details.date || "এখনো চূড়ান্ত নয় (পরামর্শ চাই)"}\n` +
      `👥 ভ্রমণকারী: ${details.adults} জন প্রাপ্তবয়স্ক${details.children > 0 ? `, ${details.children} জন শিশু` : ""}\n` +
      `🚌 যাতায়াত: ${details.transportLabel || "স্ট্যান্ডার্ড এসি বাস"}\n` +
      `🏨 আবাসন: ${details.roomLabel || "স্ট্যান্ডার্ড শেয়ারিং"}\n` +
      (details.addOns && details.addOns.length > 0
        ? `✨ যুক্ত সেবা: ${details.addOns.join(", ")}\n`
        : "") +
      `💰 আনুমানিক মোট খরচ: ৳${num(details.totalPrice, "bn")}\n` +
      `💳 আনুমানিক বুকিং অ্যাডভান্স: ৳${num(details.advanceEstimated, "bn")}\n\n` +
      `👤 প্রধান ভ্রমণকারী: ${name || "নাম উল্লেখ করা হয়নি"}\n` +
      `📱 হোয়াটসঅ্যাপ নম্বর: ${phone || "এই চ্যাট থেকেই"}\n` +
      `📍 শুরুর শহর: ${pickupCity}\n` +
      (specialNote ? `📝 বিশেষ চাহিদা: ${specialNote}\n\n` : "\n") +
      `দয়া করে সিট অ্যাভেইলেবিলিটি ও বিস্তারিত বুকিং তথ্য নিশ্চিত করুন। ধন্যবাদ!`,

    `Hello! I am sending a tour booking inquiry through Shobuj Poth:\n\n` +
      `📌 Booking Reference: ${referenceCode}\n` +
      `🌿 Package: ${details.pkg.title.en} (${details.pkg.days} Days)\n` +
      `📅 Tentative Date: ${details.date || "Flexible / Need Advice"}\n` +
      `👥 Travelers: ${details.adults} Adults${details.children > 0 ? `, ${details.children} Children` : ""}\n` +
      `🚌 Transport: ${details.transportLabel || "Standard AC Bus"}\n` +
      `🏨 Accommodation: ${details.roomLabel || "Standard Sharing"}\n` +
      (details.addOns && details.addOns.length > 0
        ? `✨ Add-ons: ${details.addOns.join(", ")}\n`
        : "") +
      `💰 Estimated Total: ৳${num(details.totalPrice, "en")}\n` +
      `💳 Estimated Advance: ৳${num(details.advanceEstimated, "en")}\n\n` +
      `👤 Lead Traveler: ${name || "Not provided"}\n` +
      `📱 WhatsApp: ${phone || "Current chat"}\n` +
      `📍 Departure City: ${pickupCity}\n` +
      (specialNote ? `📝 Note: ${specialNote}\n\n` : "\n") +
      `Please confirm seat availability and final itinerary. Thank you!`,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    window.open(waLink(compiledMessage), "_blank");
    setStep(3); // Show confirmed state
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-0 sm:rounded-3xl border border-border/80 bg-card">
        {/* Modal Top Header */}
        <div className="bg-forest p-6 text-white relative">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{T("অফিসিয়াল বুকিং ইনকোয়ারি", "Official Booking Inquiry")}</span>
            </span>
            <span className="font-mono text-xs text-white/70 tracking-wider">
              REF: {referenceCode}
            </span>
          </div>
          <DialogTitle className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
            {t(details.pkg.title)}
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs text-white/80">
            {T(
              "হোয়াটসঅ্যাপে সরাসরি পরামর্শ ও নিশ্চিতকরণের জন্য আপনার তথ্যসমূহ রিভিউ করুন।",
              "Review your tailored specifications before connecting directly to our WhatsApp concierge.",
            )}
          </DialogDescription>
        </div>

        {/* Multi-step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Trip Summary Card */}
              <div className="rounded-2xl border border-border/70 bg-secondary/50 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border/50">
                  <span>{T("প্যাকেজ সময়কাল", "Tour Duration")}</span>
                  <span className="font-semibold text-forest">
                    {num(details.pkg.days, lang)} {T("দিন", "Days")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">
                      {T("যাত্রার তারিখ", "Travel Date")}:
                    </span>
                    <p className="font-semibold text-forest mt-0.5">
                      {details.date || T("তারিখ উন্মুক্ত (পরামর্শ চাই)", "Flexible date")}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{T("ভ্রমণকারী", "Guests")}:</span>
                    <p className="font-semibold text-forest mt-0.5">
                      {num(details.adults, lang)} {T("প্রাপ্তবয়স্ক", "Adults")}
                      {details.children > 0 &&
                        ` + ${num(details.children, lang)} ${T("শিশু", "Kids")}`}
                    </p>
                  </div>
                  {details.transportLabel && (
                    <div>
                      <span className="text-muted-foreground">{T("পরিবহন", "Transport")}:</span>
                      <p className="font-semibold text-forest mt-0.5">{details.transportLabel}</p>
                    </div>
                  )}
                  {details.roomLabel && (
                    <div>
                      <span className="text-muted-foreground">{T("আবাসন", "Room")}:</span>
                      <p className="font-semibold text-forest mt-0.5">{details.roomLabel}</p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-2 border-t border-border/50 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {T("আনুমানিক মোট খরচ", "Calculated Total")}
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      {T("বুকিং নিশ্চিত করতে অগ্রিম", "Advance to confirm")}: ৳
                      {num(details.advanceEstimated, lang)}
                    </p>
                  </div>
                  <span className="font-display text-2xl font-bold text-forest tabular-nums">
                    ৳{num(details.totalPrice, lang)}
                  </span>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{T("ধাপ ১/২: হিসাব যাচাই সম্পন্ন", "Step 1/2: Price verified")}</span>
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-forest/90"
                >
                  <span>{T("যোগাযোগের তথ্য দিন", "Enter Contact Info")}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-forest">
                {T("আপনার যোগাযোগের তথ্য", "Lead Traveler Contact")}
              </h4>
              <p className="text-xs text-muted-foreground -mt-1">
                {T(
                  "এই তথ্যগুলো আপনার তৈরি করা হোয়াটসঅ্যাপ মেসেজে স্বয়ংক্রিয়ভাবে যুক্ত হবে।",
                  "These details will be compiled into your ready-to-send WhatsApp message.",
                )}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("আপনার নাম", "Full Name")} *
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={T("যেমন: হাসান মাহমুদ", "e.g. Hasan Mahmud")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("হোয়াটসঅ্যাপ মোবাইল নম্বর", "WhatsApp Number")}
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {T("যাত্রার শুরুর শহর / স্থান", "Departure Pickup Location")}
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder={T(
                      "যেমন: ঢাকা (মতিঝিল / আরামবাগ / ধানমন্ডি)",
                      "e.g. Dhaka / Chittagong",
                    )}
                    className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {T("বিশেষ নোট বা পছন্দ (ঐচ্ছিক)", "Special Requests / Room Preferences")}
                </label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder={T(
                    "যেমন: কাপল বেড, উইন্ডো সিট, অতিরিক্ত বারবিকিউ...",
                    "e.g. Couple bed, window seat, extra BBQ...",
                  )}
                  className="w-full rounded-xl border border-input bg-card py-2 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>

              {/* Message Preview Box */}
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-semibold">
                    {T("WhatsApp মেসেজ প্রিভিউ", "Message Preview")}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>
                      {copied ? T("কপি হয়েছে!", "Copied!") : T("মেসেজ কপি করুন", "Copy Text")}
                    </span>
                  </button>
                </div>
                <div className="max-h-24 overflow-y-auto text-[11px] text-muted-foreground whitespace-pre-wrap font-sans bg-card/60 p-2.5 rounded-lg border border-border/40">
                  {compiledMessage}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-forest hover:bg-secondary transition"
                >
                  {T("← পেছনে", "← Back")}
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 px-5 text-sm font-semibold text-whatsapp-foreground shadow-sm transition hover:opacity-95 active:scale-[0.99]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{T("WhatsApp-এ ইনকোয়ারি পাঠান", "Send Inquiry to WhatsApp")}</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-7 w-7" />
              </div>
              <h4 className="font-display text-2xl font-bold text-forest">
                {T("বুকিং ইনকোয়ারি প্রস্তুত!", "Inquiry Ready & Sent!")}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {T(
                  `আপনার বুকিং রেফারেন্স (${referenceCode}) সহ WhatsApp চ্যাট ওপেন হয়েছে। আমাদের ট্রাভেল টিম শীঘ্রই আপনার প্রশ্নের উত্তর ও সিট নিশ্চিত করবে।`,
                  `Your booking inquiry has been prepared with reference (${referenceCode}). Our team will confirm seat availability shortly on WhatsApp.`,
                )}
              </p>

              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-xs font-semibold text-forest hover:bg-secondary transition"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {copied ? T("কপি হয়েছে", "Copied") : T("মেসেজ কপি করুন", "Copy Details")}
                  </span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="rounded-xl bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest/90 transition"
                >
                  {T("সম্পন্ন (Close)", "Done")}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
