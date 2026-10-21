import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, X, MapPin, RotateCcw } from "lucide-react";
import { packages, regions, typeLabels, type Pkg, num } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { PackageCard } from "@/components/package-card";
import cover from "@/assets/bandarban.jpg";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "সব ট্যুর প্যাকেজ | সবুজ পথ" },
      {
        name: "description",
        content:
          "Cox's Bazar, Sajek, Sundarbans, Sylhet, Sonargaon and more — compare prices and book on WhatsApp.",
      },
      { property: "og:title", content: "সব ট্যুর প্যাকেজ | সবুজ পথ" },
      {
        property: "og:description",
        content: "Search and compare domestic tour packages by name or region.",
      },
    ],
  }),
  component: Packages,
});

function Packages() {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [type, setType] = useState<Pkg["types"][number] | "all">("all");
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const q = p.get("q") ?? "";
      const reg = p.get("region") ?? "all";
      setSearch(q);
      setSelectedRegion(reg);
    }
  }, [location.search]);

  const updateUrl = (qVal: string, rVal: string) => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams();
      if (qVal.trim()) p.set("q", qVal.trim());
      if (rVal !== "all") p.set("region", rVal);
      const str = p.toString();
      window.history.replaceState(
        null,
        "",
        str ? `${window.location.pathname}?${str}` : window.location.pathname,
      );
    }
  };

  const handleSearchChange = (qVal: string) => {
    setSearch(qVal);
    updateUrl(qVal, selectedRegion);
  };

  const handleRegionChange = (rVal: string) => {
    setSelectedRegion(rVal);
    updateUrl(search, rVal);
  };

  const isFiltered =
    search.trim() !== "" ||
    selectedRegion !== "all" ||
    type !== "all" ||
    days !== 0 ||
    budget < 15000;

  const resetFilters = () => {
    setSearch("");
    setSelectedRegion("all");
    setType("all");
    setDays(0);
    setBudget(15000);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return packages.filter((p) => {
      // Name & region text search
      const matchesSearch =
        !q ||
        p.title.bn.toLowerCase().includes(q) ||
        p.title.en.toLowerCase().includes(q) ||
        p.region.bn.toLowerCase().includes(q) ||
        p.region.en.toLowerCase().includes(q) ||
        p.short.bn.toLowerCase().includes(q) ||
        p.short.en.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);

      // Region quick filter
      const matchesRegion =
        selectedRegion === "all" ||
        p.region.en.toLowerCase().includes(selectedRegion.toLowerCase()) ||
        p.region.bn.includes(selectedRegion);

      // Category type filter
      const matchesType = type === "all" || p.types.includes(type);

      // Budget filter
      const matchesBudget = p.price <= budget;

      // Days duration filter
      const matchesDays = !days || p.days === days;

      return matchesSearch && matchesRegion && matchesType && matchesBudget && matchesDays;
    });
  }, [search, selectedRegion, type, budget, days]);

  return (
    <main className="pb-20">
      <section className="relative flex h-72 items-end overflow-hidden">
        <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {T("গন্তব্য তালিকা", "Destination Directory")}
          </p>
          <h1 className="mt-1 text-5xl font-bold text-forest">
            {T("ট্যুর প্যাকেজ ও স্থানসমূহ", "Tour Packages & Places")}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        {/* Search Bar at the Top of the Destination List */}
        <div className="-mt-8 relative z-20 space-y-3 rounded-2xl bg-card p-5 shadow-soft border border-border/50">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={T(
                "গন্তব্যের নাম বা অঞ্চল দিয়ে খুঁজুন (যেমন: সাজেক, সিলেট, বগুড়া, চট্টগ্রাম, কক্সবাজার)...",
                "Search places by name or region (e.g. Sajek, Sylhet, Bogura, Chittagong, Cox's Bazar)...",
              )}
              className="w-full rounded-xl border border-input bg-background/80 py-3.5 pl-12 pr-10 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label={T("মুছুন", "Clear")}
                className="absolute right-3.5 p-1 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Region Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold uppercase text-muted-foreground mr-1">
              <MapPin className="h-3 w-3 text-primary" />
              {T("অঞ্চল:", "Region:")}
            </span>
            <button
              onClick={() => handleRegionChange("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedRegion === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {T("সব অঞ্চল", "All regions")}
            </button>
            {regions.map((r) => {
              const active = selectedRegion === r.en;
              return (
                <button
                  key={r.en}
                  onClick={() => handleRegionChange(active ? "all" : r.en)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t(r)}
                </button>
              );
            })}
          </div>

          {/* Category, Days, Budget & Reset Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/40">
            <div className="flex flex-wrap items-center gap-1.5">
              {(["all", "couple", "family", "group", "student"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setType(k)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition ${
                    type === k
                      ? "bg-forest text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-secondary"
                  }`}
                >
                  {k === "all" ? T("সব ধরন", "All types") : typeLabels[k][lang]}
                </button>
              ))}
            </div>

            <select
              value={days}
              onChange={(e) => setDays(+e.target.value)}
              className="rounded-full border border-input bg-background px-3 py-1 text-xs"
            >
              <option value={0}>{T("যেকোনো সময়কাল", "Any length")}</option>
              {[1, 2, 3].map((d) => (
                <option key={d} value={d}>
                  {num(d, lang)} {T("দিন", "days")}
                </option>
              ))}
            </select>

            <label className="flex min-w-[200px] flex-1 items-center gap-2 text-xs text-muted-foreground">
              <span>{T("বাজেট", "Budget")}</span>
              <span className="font-semibold text-forest">৳{num(budget, lang)}</span>
              <input
                type="range"
                min={2000}
                max={15000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="flex-1 accent-primary"
              />
            </label>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-medium text-destructive hover:underline ml-auto"
              >
                <RotateCcw className="h-3 w-3" />
                {T("রিসেট", "Reset")}
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Header */}
        <div className="mt-6 flex items-center justify-between px-1">
          <p className="text-sm font-medium text-muted-foreground">
            {T("মোট", "Showing")}{" "}
            <span className="font-bold text-forest">{num(list.length, lang)}</span>{" "}
            {T("টি প্যাকেজ", "packages")}
            {isFiltered && ` (${num(packages.length, lang)} ${T("টির মধ্যে", "total")})`}
          </p>
          {search && (
            <span className="text-xs text-muted-foreground">
              {T("খোঁজা হচ্ছে:", "Searching:")} <strong className="text-forest">"{search}"</strong>
            </span>
          )}
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PackageCard key={p.slug} p={p} />
          ))}
        </div>

        {/* Empty State */}
        {!list.length && (
          <div className="my-16 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-card border border-border/60">
            <div className="rounded-full bg-secondary p-4 text-muted-foreground">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-forest">
              {T("কোনো গন্তব্য পাওয়া যায়নি", "No destinations found")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {T(
                `"${search || selectedRegion}" এর সাথে মেলে এমন কোনো প্যাকেজ বা স্থান পাওয়া যায়নি। বানান যাচাই করুন অথবা ফিল্টার পরিবর্তন করুন।`,
                `No tour packages match "${search || selectedRegion}". Try checking your spelling or adjusting your filters.`,
              )}
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              <RotateCcw className="h-4 w-4" />
              {T("সব ফিল্টার রিসেট করুন", "Reset all filters")}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
