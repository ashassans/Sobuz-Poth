import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import {
  Compass,
  Heart,
  ShieldCheck,
  TreePine,
  Users,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import img from "@/assets/sylhet.jpg";
import cover from "@/assets/bandarban.jpg";
import { waLink, SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "আমাদের কথা | সবুজ পথ — Shobuj Poth Travels" },
      {
        name: "description",
        content:
          "আমাদের গল্প ও দর্শন — বাংলাদেশের প্রকৃতির সৌন্দর্যকে নিরাপদ ও পরিবেশবান্ধব উপায়ে তুলে ধরাই আমাদের ব্রত।",
      },
      { property: "og:title", content: "আমাদের কথা | সবুজ পথ" },
      {
        property: "og:description",
        content:
          "Discover our journey, eco-conscious values, and passionate team at Shobuj Poth Travels.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const values = [
    {
      icon: TreePine,
      title: T("পরিবেশবান্ধব ও দায়িত্বশীল ভ্রমণ", "Eco-Conscious Tourism"),
      desc: T(
        "আমরা বিশ্বাস করি প্রকৃতির সৌন্দর্য উপভোগ করার পাশাপাশি তার বিশুদ্ধতা রক্ষা করা আমাদের নৈতিক দায়িত্ব। প্রতিটি ট্যুরে বর্জ্যমুক্ত পরিবেশ নিশ্চিত করা হয়।",
        "We believe in leaving nature cleaner than we found it. Zero-plastic ethos and respect for fragile ecological biomes.",
      ),
    },
    {
      icon: Users,
      title: T("স্থানীয় সমাজকে সম্পৃক্তকরণ", "Local Community Support"),
      desc: T(
        "আমাদের প্রতিটি ট্রিপে স্থানীয় আদিবাসী ও গ্রামীণ গাইড, কটেজ মালিক এবং নৌকার মাঝিদের সাথে কাজ করে তাদের অর্থনৈতিক ক্ষমতায়নে অংশ নিই।",
        "We directly employ local indigenous guides, boatmen, and locally owned homestays to sustain village economies.",
      ),
    },
    {
      icon: ShieldCheck,
      title: T("নিরাপত্তা ও পারিবারিক স্বাচ্ছন্দ্য", "Safety & Comfort First"),
      desc: T(
        "একক নারী ভ্রমণকারী, যুগল বা শিশুদের নিয়ে পারিবারিক ভ্রমণ — প্রতিটি যাত্রায় সর্বোচ্চ নিরাপত্তা ও আরামদায়ক পরিবেশ আমাদের প্রধান অঙ্গীকার।",
        "Whether you are solo travelers, couples, or families with children, safety and respectful hospitality remain non-negotiable.",
      ),
    },
  ];

  return (
    <main className="min-h-screen pb-28">
      {/* Header Banner */}
      <section className="relative min-h-[38vh] flex items-end overflow-hidden bg-forest pt-28 pb-10">
        <img
          src={cover}
          alt="Bandarban mountains"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              {T("আমাদের দর্শন", "Our Heritage & Philosophy")}
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {T("আমাদের কথা", "About Shobuj Poth")}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
              {T(
                "আমরা একদল প্রকৃতিপ্রেমী তরুণ। পাহাড়, সমুদ্র আর অরণ্যের নিবিড় রূপ সবার কাছে পৌঁছে দেওয়াই আমাদের অনুপ্রেরণা।",
                "A passionate team of naturalists and wanderers dedicated to mindful journeys across Bangladesh.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/80 shadow-elevated">
              <img
                src={img}
                alt="Sylhet tea garden"
                className="h-full w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 rounded-2xl border border-border/80 bg-card p-4 shadow-elevated backdrop-blur-md">
              <p className="font-display text-2xl font-bold text-forest">৭+ বছর</p>
              <p className="text-xs text-muted-foreground">
                {T("বিশ্বস্ত ভ্রমণ সেবায়", "In Curated Travels")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{T("প্রকৃতির কাছে ফেরা", "Returning to Roots")}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-forest leading-tight">
              {T(
                "যান্ত্রিক জীবন ছেড়ে প্রকৃতির সান্নিধ্যে নিশ্চিন্ত ভ্রমণ",
                "Meaningful journeys beyond ordinary sightseeing",
              )}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {T(
                "২০১৯ সালে আমাদের যাত্রা শুরু হয়েছিল একটি সাধারণ স্বপ্ন নিয়ে — বাংলাদেশের পাহাড়, হাওর, নদী আর বনাঞ্চলের আদি সৌন্দর্যকে মানুষের সামনে তুলে ধরা, তবে বাণিজ্যিক কৃত্রিমতা ছাড়া।",
                "Shobuj Poth began with a simple belief: that travel in Bangladesh should be immersive, peaceful, and unhurried — not rushed tourist checklists.",
              )}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {T(
                "প্রতিটি ট্যুর রুট আমাদের নিজেদের পায়ে হেঁটে, স্থানীয় মানুষের সাথে মিশে এবং কটেজগুলোর আতিথেয়তা যাচাই করে তৈরি করা হয়। তাই সবুজ পথের প্রতিটি পদক্ষেপে থাকে আন্তরিক নির্ভরতা।",
                "Every trail, houseboat, and hilltop cottage in our catalog has been scouted firsthand. We ensure fair compensation for local hosts and authentic, restful memories for our guests.",
              )}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-xs"
              >
                <span>{T("আমাদের প্যাকেজ দেখুন", "Explore Our Tours")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink(
                  T(
                    "আসসালামু আলাইকুম! সবুজ পথ সম্পর্কে আরও জানতে চাই।",
                    "Hello, I'd like to learn more about Shobuj Poth.",
                  ),
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-5 py-2.5 text-sm font-semibold text-forest hover:bg-secondary transition"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp" />
                <span>{T("WhatsApp-এ কথা বলুন", "Chat on WhatsApp")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {T("মূল্যবোধ", "Core Ethics")}
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-forest">
            {T("আমাদের মূল্যবোধ ও দর্শন", "Our Values in Action")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {T(
              "আমরা শুধু ট্যুর করাই না, পরিবেশ ও মানুষের প্রতি দায়বদ্ধ থাকি।",
              "How we conduct every tour with sustainability, ethics, and care.",
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border/70 bg-card p-6 sm:p-7 shadow-card transition-all hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-forest">{v.title}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
