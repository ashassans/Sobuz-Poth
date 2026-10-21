import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, X, Clock } from "lucide-react";
import { packages, num } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { BookingBox } from "@/components/package-card";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const p = packages.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = packages.find((x) => x.slug === loaderData?.slug);
    const title = p ? `${p.title.bn} (${p.title.en}) ট্যুর প্যাকেজ | সবুজ পথ` : "প্যাকেজ পাওয়া যায়নি | সবুজ পথ";
    const desc = p ? `${p.short.en} — ${p.days} days from ৳${p.price}. Book on WhatsApp.` : "Package not found.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  notFoundComponent: () => (
    <main className="px-4 pt-40 text-center">
      <h1 className="text-4xl font-bold text-forest">Package not found</h1>
      <Link to="/packages" className="mt-4 inline-block text-primary underline">All packages</Link>
    </main>
  ),
  component: Detail,
});

function Detail() {
  const { slug } = Route.useLoaderData();
  const p = packages.find((x) => x.slug === slug)!;
  const { t, lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  return (
    <main>
      <section className="relative flex h-[60vh] items-end overflow-hidden">
        <img src={p.image} alt={t(p.title)} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-8">
          <h1 className="text-5xl font-bold text-forest md:text-6xl">{t(p.title)}</h1>
          <p className="mt-2 flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> {num(p.days, lang)} {T("দিন", "days")} · {t(p.short)}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div className="space-y-10 md:col-span-2">
          <div>
            <h2 className="text-3xl font-bold text-forest">{T("ভ্রমণসূচি", "Itinerary")}</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-accent pl-6">
              {p.itinerary.map((d, k) => (
                <li key={k}>
                  <p className="text-sm font-semibold text-primary">{T("দিন", "Day")} {num(k + 1, lang)}</p>
                  <p>{t(d)}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-secondary p-5">
              <h3 className="text-2xl font-bold text-forest">{T("যা থাকছে", "Included")}</h3>
              <ul className="mt-3 space-y-2">{p.includes.map((x, k) => <li key={k} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{t(x)}</li>)}</ul>
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <h3 className="text-2xl font-bold text-forest">{T("যা থাকছে না", "Not included")}</h3>
              <ul className="mt-3 space-y-2">{p.excludes.map((x, k) => <li key={k} className="flex gap-2 text-sm"><X className="h-4 w-4 text-destructive" />{t(x)}</li>)}</ul>
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft md:sticky md:top-24">
          <p className="text-sm text-muted-foreground">{T("জনপ্রতি", "Per person")}</p>
          <p className="font-display text-4xl font-bold text-forest">৳{num(p.price, lang)}</p>
          <div className="mt-4"><BookingBox p={p} /></div>
        </aside>
      </section>
    </main>
  );
}
