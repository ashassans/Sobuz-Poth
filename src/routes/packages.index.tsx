import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, X, MapPin, RotateCcw, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { packages, regions, typeLabels, type Pkg, num } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { PackageCard } from "@/components/package-card";
import cover from "@/assets/bandarban.jpg";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "সব ট্যুর প্যাকেজ | সবুজ পথ — Shobuj Poth" },
      {
        name: "description",
        content:
          "কক্সবাজার, সাজেক, সুন্দরবন, সিলেট, সোনারগাঁ, টাঙ্গুয়ার হাওর — বাজেট ও সময় অনুযায়ী সেরা ভ্রমণ প্যাকেজ তুলনা করুন।",
      },
      { property: "og:title", content: "সব ট্যুর প্যাকেজ | সবুজ পথ" },
      {
        property: "og:description",
        content: "Explore and compare domestic nature tour packages across Bangladesh.",
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
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "duration">(
    "featured",
  );

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
    setSortBy("featured");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = packages.filter((p) => {
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

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "duration") {
      return [...filtered].sort((a, b) => b.days - a.days);
    }
    return filtered;
  }, [search, selectedRegion, type, budget, days, sortBy]);

  return (
    <main className="pb-24">
      {/* Editorial Page Header */}
      <section className="relative flex min-h-[38vh] items-end overflow-hidden bg-forest pt-28 pb-10">
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              {T("বাংলাদেশ ট্যুর ডিরেক্টরি", "Bangladesh Tour Directory")}
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {T("সকল ট্যুর প্যাকেজ ও গন্তব্য", "All Tour Packages & Destinations")}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
              {T(
                "পাহাড়, সমুদ্র ও ঐতিহ্যের সেরা ভ্রমণ পথ। আপনার বাজেট ও সুবিধা অনুযায়ী ফিল্টার করে পছন্দের প্যাকেজ বেছে নিন।",
                "Explore hand-crafted itineraries with authentic local guides, clear pricing, and effortless WhatsApp booking.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Filter Control Console */}
        <div className="-mt-8 relative z-20 space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
          {/* Top Row: Search Input */}
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={T(
                "গন্তব্যের নাম বা অঞ্চল দিয়ে খুঁজুন (যেমন: সাজেক, সিলেট, বগুড়া, কক্সবাজার, সুন্দরবন)...",
                "Search destinations by name or region (e.g. Sajek, Sylhet, Bogura, Cox's Bazar)...",
              )}
              className="w-full rounded-xl border border-input bg-background/80 py-3.5 pl-12 pr-10 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
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

          {/* Region Tabs (Unboxed clean segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {T("অঞ্চল:", "Region:")}
            </span>
            <button
              onClick={() => handleRegionChange("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                selectedRegion === "all"
                  ? "bg-forest text-white shadow-xs font-semibold"
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
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-forest text-white shadow-xs font-semibold"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t(r)}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Type, Duration, Budget & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/50 text-xs">
            {/* Travel Type Selectors */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(["all", "couple", "family", "group", "student"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setType(k)}
                  className={`rounded-lg px-3 py-1.5 font-medium transition ${
                    type === k
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted/70 text-foreground hover:bg-secondary"
                  }`}
                >
                  {k === "all" ? T("সব ধরন", "All types") : typeLabels[k][lang]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Duration Select */}
              <div className="flex items-center gap-1.5">
                <select
                  value={days}
                  onChange={(e) => setDays(+e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-1.5 font-medium text-foreground focus:outline-none focus:border-primary"
                >
                  <option value={0}>{T("যেকোনো সময়কাল", "Any length")}</option>
                  {[1, 2, 3].map((d) => (
                    <option key={d} value={d}>
                      {num(d, lang)} {T("দিন", "days")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Select */}
              <div className="flex items-center gap-1.5">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "featured" | "price-asc" | "price-desc" | "duration",
                    )
                  }
                  className="rounded-lg border border-input bg-background px-3 py-1.5 font-medium text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="featured">{T("জনপ্রিয়তা অনুযায়ী", "Sort: Featured")}</option>
                  <option value="price-asc">{T("কম মূল্য থেকে বেশি", "Price: Low to High")}</option>
                  <option value="price-desc">
                    {T("বেশি মূল্য থেকে কম", "Price: High to Low")}
                  </option>
                  <option value="duration">{T("সময়কাল (দীর্ঘ)", "Duration (Longest)")}</option>
                </select>
              </div>

              {/* Budget Slider */}
              <label className="flex items-center gap-2 text-muted-foreground bg-background/50 border border-input/60 rounded-lg px-3 py-1">
                <span>{T("সর্বোচ্চ বাজেট:", "Max Budget:")}</span>
                <span className="font-semibold text-forest tabular-nums">৳{num(budget, lang)}</span>
                <input
                  type="range"
                  min={2500}
                  max={15000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(+e.target.value)}
                  className="w-24 accent-primary"
                />
              </label>

              {/* Reset Link */}
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 font-semibold text-destructive hover:underline ml-auto"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{T("রিসেট", "Reset")}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter Header */}
        <div className="mt-8 flex items-center justify-between px-1">
          <p className="text-sm font-medium text-muted-foreground">
            {T("মোট", "Displaying")}{" "}
            <span className="font-bold text-forest tabular-nums">{num(list.length, lang)}</span>{" "}
            {T("টি ট্যুর প্যাকেজ", "packages")}
            {isFiltered &&
              ` (${num(packages.length, lang)} ${T("টির মধ্য থেকে", "total available")})`}
          </p>
          {search && (
            <span className="text-xs text-muted-foreground">
              {T("অনুসন্ধান:", "Filtered by:")} <strong className="text-forest">"{search}"</strong>
            </span>
          )}
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PackageCard key={p.slug} p={p} />
          ))}
        </div>

        {/* Empty State */}
        {!list.length && (
          <div className="my-16 flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-border/70 bg-card shadow-card">
            <div className="rounded-2xl bg-secondary p-4 text-primary">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-forest">
              {T("কোনো প্যাকেজ পাওয়া যায়নি", "No Tour Packages Found")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
              {T(
                `"${search || selectedRegion}" এর সাথে মেলে এমন কোনো প্যাকেজ পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন অথবা ফিল্টার রিসেট করুন।`,
                `No tour packages match "${search || selectedRegion}". Try relaxing your filters or search keywords.`,
              )}
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{T("সকল ফিল্টার রিসেট করুন", "Reset All Filters")}</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
