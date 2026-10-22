import {
  MessageCircle,
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { useLang } from "@/lib/lang";
import { SITE, waLink } from "@/lib/site";

export function HowBookingWorks() {
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const steps = [
    {
      step: "০১",
      stepEn: "01",
      icon: CalendarCheck,
      title: T("প্যাকেজ ও হিসাব নির্বাচন", "Select Package & Customise"),
      desc: T(
        "আপনার পছন্দের গন্তব্য, দিনক্ষণ, পরিবহন ও হোটেল ক্যাটাগরি বেছে নিন। লাইভ ক্যালকুলেটরে তাৎক্ষণিক খরচ দেখুন।",
        "Browse packages, pick your travel dates, transport mode and room tier with live transparent cost calculation.",
      ),
    },
    {
      step: "০২",
      stepEn: "02",
      icon: MessageCircle,
      title: T("WhatsApp-এ সরাসরি পরামর্শ", "Personal WhatsApp Consultation"),
      desc: T(
        "ওয়েবসাইটে এক ক্লিকে বুকিং রিকোয়েস্ট পাঠালে আমাদের অভিজ্ঞ ট্রাভেল অ্যাডভাইজার আপনার সাথে বিস্তারিত কথা বলে সব কনফার্ম করবেন।",
        "Send your request with one click to chat directly with a tour advisor to tailor every aspect of your journey.",
      ),
    },
    {
      step: "০৩",
      stepEn: "03",
      icon: CreditCard,
      title: T("নিরাপদ বুকিং ও যাত্রা", "Secure Advance & Journey"),
      desc: T(
        "কোনো হিডেন চার্জ নেই। অফিসিয়াল বিকাশ বা ব্যাংক চ্যানেলে সামান্য অ্যাডভান্স করে সিট নিশ্চিত করুন; বাকিটা ট্যুরের দিন পরিশোধ করুন।",
        "Zero hidden fees. Confirm with a verified partial advance via bKash or Bank; pay the rest upon trip departure.",
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:pt-28">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {T("স্বচ্ছ ও সহজ বুকিং ধাপ", "Frictionless Booking Guide")}
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
          {T("কীভাবে বুকিং করবেন?", "How Our Booking Works")}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {T(
            "অনলাইনে কোনো জটিল পেমেন্ট গেটওয়ে নেই — WhatsApp-এ আমাদের সাথে সরাসরি জেনে-বুঝে শতভাগ নিশ্চিন্তে বুকিং সম্পন্ন করুন।",
            "No impersonal payment gateways. Discuss everything upfront with our team, verify details, and book with total confidence.",
          )}
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, idx) => (
          <div
            key={s.stepEn}
            className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-3xl font-bold text-forest/20 tabular-nums">
                  {lang === "bn" ? s.step : s.stepEn}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-forest">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>
                {idx === 0 && T("তাৎক্ষণিক হিসাব যাচাই", "Instant calculation")}
                {idx === 1 && T("২৪/৭ ট্রাভেল কনসালট্যান্ট", "Dedicated trip advisor")}
                {idx === 2 && T("মানি-ব্যাক সুরক্ষা ও ভাউচার", "Verified money security")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Callout Banner */}
      <div className="mt-8 rounded-2xl border border-emerald-900/10 bg-secondary/70 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-display text-base sm:text-lg font-bold text-forest">
              {T("কেন WhatsApp-এ সরাসরি নিশ্চিতকরণ?", "Why Confirm Directly on WhatsApp?")}
            </h4>
            <p className="text-xs sm:text-sm text-foreground/80 mt-0.5">
              {T(
                "যাত্রার আবহাওয়া, হোটেলের রুম ভিউ, খাবারের মেনু এবং কাস্টমাইজেশন আগে থেকে যাচাই করে নিলে ভ্রমণের অভিজ্ঞতা হয় সেরা ও নিরাপদ।",
                "Verifying weather, resort views, and transport timings before paying guarantees an authentic, tailored experience without surprises.",
              )}
            </p>
          </div>
        </div>

        <a
          href={waLink(
            lang === "bn"
              ? "আসসালামু আলাইকুম! সবুজ পথ ট্রাভেলস সম্পর্কে বিস্তারিত জানতে চাই।"
              : "Hello! I would like to learn more about Shobuj Poth tour packages.",
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-forest/90"
        >
          <PhoneCall className="h-4 w-4" />
          <span>{T("পরামর্শ পেতে কল বা চ্যাট করুন", "Speak with an Advisor")}</span>
        </a>
      </div>
    </section>
  );
}
