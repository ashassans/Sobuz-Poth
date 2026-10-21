import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { packages, typeLabels, type Pkg } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { PackageCard } from "@/components/package-card";
import cover from "@/assets/bandarban.jpg";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "সব ট্যুর প্যাকেজ | সবুজ পথ" },
      { name: "description", content: "Cox's Bazar, Sajek, Sundarbans, Sylhet and more — compare prices and book on WhatsApp." },
      { property: "og:title", content: "সব ট্যুর প্যাকেজ | সবুজ পথ" },
      { property: "og:description", content: "Compare domestic tour packages and book on WhatsApp." },
    ],
  }),
  component: Packages,
});

function Packages() {
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  const [type, setType] = useState<Pkg["types"][number] | "all">("all");
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(0);
  const list = packages.filter((p) => (type === "all" || p.types.includes(type)) && p.price <= budget && (!days || p.days === days));

  return (
    <main>
      <section className="relative flex h-72 items-end overflow-hidden">
        <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <h1 className="relative mx-auto w-full max-w-6xl px-4 pb-6 text-5xl font-bold text-forest">{T("ট্যুর প্যাকেজ", "Tour packages")}</h1>
      </section>
      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
          {(["all", "couple", "family", "group", "student"] as const).map((k) => (
            <button key={k} onClick={() => setType(k)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${type === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {k === "all" ? T("সব", "All") : typeLabels[k][lang]}
            </button>
          ))}
          <select value={days} onChange={(e) => setDays(+e.target.value)} className="rounded-full border bg-background px-3 py-1.5 text-sm">
            <option value={0}>{T("যেকোনো দিন", "Any length")}</option>
            {[2, 3].map((d) => <option key={d} value={d}>{d} {T("দিন", "days")}</option>)}
          </select>
          <label className="flex flex-1 items-center gap-2 text-sm text-muted-foreground">
            {T("বাজেট", "Budget")} ৳{budget}
            <input type="range" min={5000} max={15000} step={500} value={budget} onChange={(e) => setBudget(+e.target.value)} className="flex-1 accent-primary" />
          </label>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
        {!list.length && <p className="mt-10 text-center text-muted-foreground">{T("এই ফিল্টারে কোনো প্যাকেজ নেই।", "No packages match.")}</p>}
      </section>
    </main>
  );
}
