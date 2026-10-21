import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { useLang } from "@/lib/lang";
import { SITE, waLink } from "@/lib/site";
import cover from "@/assets/coxsbazar.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ | সবুজ পথ — Shobuj Poth Travels" },
      {
        name: "description",
        content:
          "সবুজ পথ ট্রাভেলসের সাথে যোগাযোগ করুন — WhatsApp, ফোন ও ইমেইলে সরাসরি ট্যুর বুকিং ও পরামর্শ।",
      },
      { property: "og:title", content: "যোগাযোগ | সবুজ পথ" },
      {
        property: "og:description",
        content:
          "Get in touch with Shobuj Poth on WhatsApp, phone, or email for Bangladesh travel inquiries.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    topic: "general",
    message: "",
  });

  const queryMessage = T(
    `আসসালামু আলাইকুম!\n\n• নাম: ${form.name || "নামহীন"}\n• ফোন: ${form.phone || "এই WhatsApp নম্বর"}\n• বিষয়: ${form.topic === "package" ? "ট্যুর প্যাকেজ বুকিং" : form.topic === "custom" ? "কাস্টম ট্রিপ" : "সাধারণ জিজ্ঞাসা"}\n• বার্তা: ${form.message || "পরামর্শ চাই"}`,
    `Hello!\n\n• Name: ${form.name || "Anonymous"}\n• Phone: ${form.phone || "This WhatsApp"}\n• Topic: ${form.topic}\n• Message: ${form.message || "Need travel consultation"}`,
  );

  return (
    <main className="min-h-screen pb-28">
      {/* Header Banner */}
      <section className="relative min-h-[38vh] flex items-end overflow-hidden bg-forest pt-28 pb-10">
        <img
          src={cover}
          alt="Contact Shobuj Poth"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              {T("সার্বক্ষণিক সেবা", "Direct Concierge Desk")}
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {T("যোগাযোগ ও সহায়তা", "Get in Touch")}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
              {T(
                "যেকোনো ভ্রমণ প্যাকেজ, কর্পোরেট ট্যুর বা কাস্টমাইজড ট্রিপের জন্য আমরা সবসময় আপনার পাশে আছি।",
                "Reach out via WhatsApp, phone, or email. Our team is ready to answer questions and tailor your trip.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-7 shadow-card space-y-5">
              <h2 className="font-display text-2xl font-bold text-forest">
                {T("সরাসরি যোগাযোগের ঠিকানা", "Direct Channels")}
              </h2>

              <div className="space-y-4 text-sm text-foreground/85">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {T("হটলাইন ও ফোন", "Phone & Hotline")}
                    </p>
                    <p className="font-semibold text-forest text-base">{SITE.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {T("অফিসিয়াল ইমেইল", "Official Email")}
                    </p>
                    <p className="font-semibold text-forest text-base">{SITE.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {T("অফিসের ঠিকানা", "Office Address")}
                    </p>
                    <p className="font-semibold text-forest text-base">{t(SITE.address)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {T("কাজের সময়", "Operating Hours")}
                    </p>
                    <p className="font-semibold text-forest text-sm">
                      {T(
                        "সকাল ৯টা – রাত ১০টা (প্রতিদিন খোলা)",
                        "9:00 AM – 10:00 PM (7 Days a Week)",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={waLink(
                    T(
                      "আসসালামু আলাইকুম! সবুজ পথ ট্রাভেলসের সেবা সম্পর্কে জানতে চাই।",
                      "Hello, I want to inquire about Shobuj Poth services.",
                    ),
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 font-semibold text-whatsapp-foreground shadow-sm transition hover:opacity-95"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{T("WhatsApp-এ তাৎক্ষণিক মেসেজ দিন", "Direct Chat on WhatsApp")}</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
              <div className="p-3 bg-secondary/50 border-b border-border/50 text-xs text-muted-foreground flex items-center justify-between">
                <span className="font-medium text-forest flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {t(SITE.address)}
                </span>
                <span>Google Maps</span>
              </div>
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps?q=Dhanmondi,Dhaka&output=embed"
                className="h-60 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-card">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest">
                {T("আমাদের বার্তা পাঠান", "Send an Inquiry")}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {T(
                  "ফর্মটি পূরণ করে সরাসরি WhatsApp চ্যানেলের মাধ্যমে আমাদের ট্রাভেল টিমের সাথে যোগাযোগ করুন।",
                  "Fill out the inquiry form to launch an instant pre-filled WhatsApp conversation.",
                )}
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("আপনার নাম", "Your Name")}
                    </label>
                    <input
                      type="text"
                      placeholder={T("যেমন: আশরাফুল ইসলাম", "e.g. Ashraful Islam")}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background/60 py-2.5 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("ফোন / মোবাইল নম্বর", "Phone Number")}
                    </label>
                    <input
                      type="text"
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background/60 py-2.5 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("জিজ্ঞাসার বিষয়", "Topic of Inquiry")}
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background/60 py-2.5 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="general">
                      {T("সাধারণ তথ্য ও পরামর্শ", "General Travel Consultation")}
                    </option>
                    <option value="package">
                      {T("নির্দিষ্ট ট্যুর প্যাকেজ বুকিং", "Specific Package Booking")}
                    </option>
                    <option value="custom">
                      {T("কাস্টম ফ্যামিলি / কর্পোরেট ট্রিপ", "Custom Family / Corporate Tour")}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("আপনার বার্তা বা প্রশ্ন", "Your Message")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={T(
                      "আপনার ভ্রমণ পরিকল্পনা বা কোনো প্রশ্ন থাকলে লিখুন...",
                      "Describe your intended travel destination, dates, or questions...",
                    )}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background/60 py-2.5 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={waLink(queryMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-sm font-semibold text-whatsapp-foreground shadow-sm transition hover:opacity-95"
                  >
                    <Send className="h-4 w-4" />
                    <span>{T("WhatsApp-এ পাঠান", "Send on WhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
