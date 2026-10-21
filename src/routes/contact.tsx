import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/lang";
import { SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ | সবুজ পথ" },
      { name: "description", content: "Contact Shobuj Poth on WhatsApp, phone or email." },
      { property: "og:title", content: "যোগাযোগ | সবুজ পথ" },
      { property: "og:description", content: "Reach us on WhatsApp, phone or email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  return (
    <main className="mx-auto max-w-5xl px-4 pt-32">
      <h1 className="text-5xl font-bold text-forest">{T("যোগাযোগ", "Contact")}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-card p-6 shadow-soft">
          <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> {SITE.phoneDisplay}</p>
          <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> {SITE.email}</p>
          <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> {t(SITE.address)}</p>
          <a href={waLink(T("আসসালামু আলাইকুম!", "Hello!"))} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-whatsapp-foreground">
            <MessageCircle className="h-5 w-5" /> {T("WhatsApp-এ মেসেজ দিন", "Message on WhatsApp")}
          </a>
        </div>
        <iframe title="map" src="https://www.google.com/maps?q=Dhanmondi,Dhaka&output=embed" className="h-72 w-full rounded-2xl border-0 shadow-soft" loading="lazy" />
      </div>
    </main>
  );
}
