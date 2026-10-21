import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Compass,
  HeartHandshake,
  Headphones,
  BadgePercent,
  ChevronDown,
  MessageCircle,
  Search,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  TreePine,
  Maximize2,
  X,
  Camera,
} from "lucide-react";
import { heroSlides, packages, num, waLink, SITE } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { PackageCard } from "@/components/package-card";

// Photo Gallery Images
import sajekImg from "@/assets/sajek.jpg";
import coxImg from "@/assets/coxsbazar.jpg";
import sylhetImg from "@/assets/sylhet.jpg";
import sundarbanImg from "@/assets/sundarban.jpg";
import bandarbanImg from "@/assets/bandarban.jpg";
import stmartinImg from "@/assets/stmartin.jpg";
import kuakataImg from "@/assets/kuakata.jpg";
import rangamatiImg from "@/assets/rangamati.jpg";
import tanguarImg from "@/assets/images/tanguar_haor_1792587164340.jpg";
import jaflongImg from "@/assets/images/jaflong_1792587164131.jpg";
import sonargaonImg from "@/assets/images/sonargaon_1792587146969.jpg";
import bagerhatImg from "@/assets/images/bagerhat_1792587147425.jpg";
import paharpurImg from "@/assets/images/paharpur_1792587147975.jpg";
import mahasthanImg from "@/assets/images/mahasthangarh_1792587164880.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "সবুজ পথ — প্রকৃতির কাছে ভ্রমণ | Shobuj Poth Travels" },
      {
        name: "description",
        content:
          "সাজেক, কক্সবাজার, সুন্দরবন, সিলেট — সাশ্রয়ী ও প্রিমিয়াম বাংলাদেশ ট্যুর প্যাকেজ, সরাসরি WhatsApp-এ বুকিং।",
      },
      { property: "og:title", content: "সবুজ পথ — প্রকৃতির কাছে ভ্রমণ" },
      {
        property: "og:description",
        content: "Discover nature tour packages across Bangladesh. Book easily on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const trustMarkers = [
    { bn: "৫০০+ সন্তুষ্ট ভ্রমণকারী", en: "500+ Happy Travelers" },
    { bn: "৪.৯/৫ গড় রেটিং", en: "4.9/5 Average Rating" },
    { bn: "অভিজ্ঞ লোকাল গাইড", en: "Expert Local Guides" },
    { bn: "স্বচ্ছ মূল্য তালিকা", en: "Zero Hidden Costs" },
  ];

  return (
    <section className="relative flex min-h-[92vh] sm:min-h-[96vh] items-center justify-center overflow-hidden bg-forest pt-20 pb-16">
      {/* Background Slideshow with subtle Ken Burns effect */}
      {heroSlides.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="Bangladesh Nature"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out ${
            idx === slideIndex ? "animate-kenburns opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      ))}

      {/* Measured Dark Scrim for High-Contrast Bengali Legibility */}
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-scrim absolute inset-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center text-hero-foreground">
        {/* Subtle Brand Kicker */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-forest/60 px-4 py-1.5 text-xs font-medium tracking-wide text-white/95 backdrop-blur-md mb-6 shadow-xs">
          <TreePine className="h-3.5 w-3.5 text-emerald-300" />
          <span>
            {T("প্রকৃতির সান্নিধ্যে নির্ভরযোগ্য ভ্রমণ", "Mindful Travel Across Bangladesh")}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-md">
          {T("বাংলাদেশকে নতুন করে আবিষ্কার করুন", "Rediscover Bangladesh with Shobuj Poth")}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal">
          {T(
            "পাহাড়, সমুদ্র, বন আর নদীর মাঝে আপনার পরবর্তী ভ্রমণ শুরু হোক আমাদের সাথে। নিরাপদে, স্বাচ্ছন্দ্যে ও লোকাল অভিজ্ঞতায়।",
            "Let your next journey begin through the hills, oceans, forests and rivers with us — seamless, authentic, and curated by local experts.",
          )}
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-forest shadow-card transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{T("ট্যুর দেখুন", "Explore Packages")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="#custom-trip"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 active:scale-[0.98]"
          >
            <span>{T("নিজের ট্রিপ বানান", "Plan Custom Trip")}</span>
          </a>
        </div>

        {/* Small Clean Trust Indicators below CTAs */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-white/85">
          {trustMarkers.map((marker, idx) => (
            <div key={marker.en} className="flex items-center gap-2">
              {idx > 0 && <span className="hidden sm:inline text-white/30">·</span>}
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{lang === "bn" ? marker.bn : marker.en}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === slideIndex ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Bangladesh Nature Gallery Places (pure photo gallery with many locations)
const galleryPlaces = [
  {
    name: "সাজেক ভ্যালি",
    nameEn: "Sajek Valley",
    location: "রাঙামাটি",
    locationEn: "Rangamati",
    category: "hills",
    image: sajekImg,
    caption: "মেঘের উপত্যকা ও কুয়াশাঘেরা সবুজ পাহাড়",
    captionEn: "Valley of clouds amidst rolling emerald hills",
  },
  {
    name: "কক্সবাজার সমুদ্র সৈকত",
    nameEn: "Cox's Bazar Beach",
    location: "কক্সবাজার",
    locationEn: "Cox's Bazar",
    category: "sea",
    image: coxImg,
    caption: "১২০ কিলোমিটার দীর্ঘ অবিরাম বালুকাময় সৈকত",
    captionEn: "The world's longest unbroken natural sandy beach",
  },
  {
    name: "সেন্টমার্টিন প্রবাল দ্বীপ",
    nameEn: "Saint Martin Island",
    location: "টেকনাফ, কক্সবাজার",
    locationEn: "Teknaf, Cox's Bazar",
    category: "sea",
    image: stmartinImg,
    caption: "স্বচ্ছ নীল জল, প্রবাল প্রাচীর ও নারকেল বীথি",
    captionEn: "Turquoise waters, coral formations, and coconut groves",
  },
  {
    name: "সুন্দরবন ম্যানগ্রোভ",
    nameEn: "Sundarbans Mangrove",
    location: "খুলনা ও বাগেরহাট",
    locationEn: "Khulna & Bagerhat",
    category: "forest",
    image: sundarbanImg,
    caption: "রয়েল বেঙ্গল টাইগার ও গোলপাতার আদি অরণ্য",
    captionEn: "Home of the Royal Bengal Tiger and pristine tidal canals",
  },
  {
    name: "টাঙ্গুয়ার হাওর",
    nameEn: "Tanguar Haor",
    location: "সুনামগঞ্জ, সিলেট",
    locationEn: "Sunamganj, Sylhet",
    category: "water",
    image: tanguarImg,
    caption: "অথৈ নীল জলরাশি ও মেঘালয়ের আকাশছোঁয়া পাহাড়",
    captionEn: "Vast sapphire wetland sanctuary framed by Meghalaya hills",
  },
  {
    name: "নীলগিরি ও বান্দরবান",
    nameEn: "Nilgiri & Bandarban",
    location: "বান্দরবান",
    locationEn: "Bandarban",
    category: "hills",
    image: bandarbanImg,
    caption: "পাহাড়ের চূড়া ছুঁয়ে যাওয়া মেঘের অপূর্ব মেলা",
    captionEn: "High-altitude peaks rising above a boundless sea of clouds",
  },
  {
    name: "শ্রীমঙ্গলের চা বাগান",
    nameEn: "Sreemangal Tea Estates",
    location: "মৌলভীবাজার, সিলেট",
    locationEn: "Moulvibazar, Sylhet",
    category: "forest",
    image: sylhetImg,
    caption: "দিগন্তজোড়া সবুজে মোড়ানো শান্ত পাহাড়ি চা উপত্যকা",
    captionEn: "Endless rolling carpets of lush green tea estates",
  },
  {
    name: "কুয়াকাটা সাগরকন্যা",
    nameEn: "Kuakata Beach",
    location: "পটুয়াখালী, বরিশাল",
    locationEn: "Patuakhali, Barisal",
    category: "sea",
    image: kuakataImg,
    caption: "একই সৈকত থেকে সূর্যোদয় ও সূর্যাস্তের বিরল দৃশ্য",
    captionEn: "Rare beach offering both sunrise and sunset panoramas",
  },
  {
    name: "কাপ্তাই হ্রদ ও রাঙামাটি",
    nameEn: "Kaptai Lake & Rangamati",
    location: "রাঙামাটি",
    locationEn: "Rangamati",
    category: "water",
    image: rangamatiImg,
    caption: "পাহাড় ঘেরা নীল জলের সুবিশাল শান্ত হ্রদ ও ঝুলন্ত সেতু",
    captionEn: "Serene sapphire waters enclosed by rugged mountain ridges",
  },
  {
    name: "জাফলং ও পিয়াইন নদী",
    nameEn: "Jaflong & Piyain River",
    location: "গোয়াইনঘাট, সিলেট",
    locationEn: "Gowainghat, Sylhet",
    category: "water",
    image: jaflongImg,
    caption: "মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ স্ফটিক জল ও পাথরের ধারা",
    captionEn: "Crystal mountain stream flowing from the Meghalayan cliffs",
  },
  {
    name: "ঐতিহাসিক সোনারগাঁ ও পানাম",
    nameEn: "Historic Sonargaon & Panam",
    location: "নারায়ণগঞ্জ, ঢাকা",
    locationEn: "Narayanganj, Dhaka",
    category: "heritage",
    image: sonargaonImg,
    caption: "প্রাচীন বাংলার রাজধানী ও শতবর্ষী স্থাপত্যের পানাম নগরী",
    captionEn: "Ancient medieval capital and centuries-old merchant mansions",
  },
  {
    name: "ষাট গম্বুজ মসজিদ",
    nameEn: "Sixty Dome Mosque",
    location: "বাগেরহাট, খুলনা",
    locationEn: "Bagerhat, Khulna",
    category: "heritage",
    image: bagerhatImg,
    caption: "ইউনেস্কো বিশ্ব ঐতিহ্য পঞ্চদশ শতাব্দীর সুলতানি স্থাপত্য",
    captionEn: "15th-century UNESCO World Heritage brick sultanate marvel",
  },
  {
    name: "পাহাড়পুর সোমপুর মহাবিহার",
    nameEn: "Paharpur Somapura Vihara",
    location: "নওগাঁ, রাজশাহী",
    locationEn: "Naogaon, Rajshahi",
    category: "heritage",
    image: paharpurImg,
    caption: "অষ্টম শতকের অন্যতম বৃহত্তম প্রাচীন বৌদ্ধ মহাবিহার",
    captionEn: "Ancient 8th-century Buddhist monastic mega-complex",
  },
  {
    name: "মহাস্থানগড় পুণ্ড্রনগর",
    nameEn: "Mahasthangarh Citadel",
    location: "বগুড়া, রাজশাহী",
    locationEn: "Bogura, Rajshahi",
    category: "heritage",
    image: mahasthanImg,
    caption: "আড়াই হাজার বছরের প্রাচীনতম সুরক্ষিত দুর্গনগরী",
    captionEn: "Ancient fortified urban capital dating back to 3rd century BCE",
  },
];

function Index() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  // 4 Core Benefits
  const benefits = [
    {
      icon: Compass,
      title: T("স্থানীয় গাইড", "Local Expert Guides"),
      desc: T(
        "প্রতিটি অঞ্চলের স্থানীয় অভিজ্ঞ গাইড, যারা চেনেন পাহাড়, হাওর ও অরণ্যের প্রতিটি গোপন পথ।",
        "Deeply knowledgeable local guides who navigate the trails, culture, and nature.",
      ),
    },
    {
      icon: HeartHandshake,
      title: T("আপনার মতো করে ট্রিপ", "Tailored to Your Schedule"),
      desc: T(
        "আপনার সুবিধাজনক তারিখ, পছন্দসই গ্রুপ ও বাজেটে সম্পূর্ণ কাস্টমাইজড ভ্রমণ পরিকল্পনা।",
        "Personalized trips matching your travel pace, preferences, and private dates.",
      ),
    },
    {
      icon: Headphones,
      title: T("২৪/৭ সার্বক্ষণিক সাপোর্ট", "24/7 Dedicated Support"),
      desc: T(
        "যাত্রা শুরুর পূর্বমুহূর্ত থেকে বাড়ি ফেরা পর্যন্ত একজন সার্বক্ষণিক ট্রাভেল অ্যাসিস্ট্যান্ট পাশে থাকে।",
        "Always reachable before and during the trip for peace of mind at every step.",
      ),
    },
    {
      icon: BadgePercent,
      title: T("স্বচ্ছ মূল্য তালিকা", "Transparent Pricing"),
      desc: T(
        "কোনো লুকানো চার্জ নেই; প্রতিটি প্যাকেজে যাতায়াত, থাকা ও খাবারের সঠিক ও স্পষ্ট হিসাব।",
        "No hidden fees or surprise costs — full transparency in accommodation & meals.",
      ),
    },
  ];

  // Modern Clean FAQ
  const faqs = [
    {
      q: T("বুকিং প্রক্রিয়াটি কীভাবে কাজ করে?", "How does the booking process work?"),
      a: T(
        "পছন্দের প্যাকেজের নিচে আপনার সম্ভাব্য তারিখ ও কতজন ভ্রমণ করবেন তা বেছে নিয়ে 'WhatsApp-এ বুকিং' বাটনে চাপ দিন। আমাদের ট্রাভেল টিম সঙ্গে সঙ্গে মেসেজে বুকিং কনফার্ম করবে।",
        "Choose your travel dates and group size on any package and click the WhatsApp booking button. Our team confirms availability and itineraries directly with you.",
      ),
    },
    {
      q: T("প্যাকেজে কী কী সেবা অন্তর্ভুক্ত থাকে?", "What services are included in the packages?"),
      a: T(
        "প্রতিটি প্যাকেজ পাতায় যাতায়াত (এসি বাস/ট্রেন/লঞ্চ), হোটেল বা রিসোর্ট, নির্দিষ্ট বেলার স্বাস্থ্যসম্মত খাবার, লোকাল ট্রান্সপোর্ট ও গাইডের স্পষ্ট তালিকা দেওয়া থাকে।",
        "Each package clearly outlines transport, resort accommodation, wholesome meals, boat/jeep rides, and certified local guides.",
      ),
    },
    {
      q: T(
        "আমাদের পছন্দমতো আলাদা কাস্টম ট্যুর সাজানো যাবে?",
        "Can you organize custom private trips?",
      ),
      a: T(
        "হ্যাঁ, অবশ্যই! আমাদের 'নিজের মতো ট্রিপ বানান' ফর্মটি পূরণ করে পাঠান অথবা সরাসরি WhatsApp-এ আপনার গ্রুপ সাইজ ও পছন্দের স্থান জানান। আমরা সে অনুযায়ী কাস্টম কোটেশন তৈরি করে দেব।",
        "Yes! Fill in our Custom Trip Planner or chat with us on WhatsApp with your destinations and budget. We'll tailor a private itinerary specifically for you.",
      ),
    },
    {
      q: T("পেমেন্ট পলিসি এবং নিরাপত্তা কেমন?", "What is the payment & safety policy?"),
      a: T(
        "আমরা কোনো হিডেন চার্জ নিই না। প্রাথমিক বুকিং কনফার্মেশনের জন্য অনুমোদিত ব্যাংকিং/বিকাশ চ্যানেলে সামান্য অ্যাডভান্স নেওয়া হয় এবং বাকি পেমেন্ট ট্যুর শুরুর সময় পরিশোধ করা যায়।",
        "We maintain zero hidden charges. A verified advance via official channels confirms your slot, and the balance is paid upon trip initiation.",
      ),
    },
  ];

  // Custom Trip Form State
  const [custom, setCustom] = useState({
    place: "",
    people: "2",
    budget: "",
    date: "",
    phone: "",
    note: "",
  });

  // Photo Gallery Filter and Modal State
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<(typeof galleryPlaces)[number] | null>(null);

  const filteredPhotos =
    galleryFilter === "all"
      ? galleryPlaces
      : galleryPlaces.filter((item) => item.category === galleryFilter);

  const customMessage = T(
    `আসসালামু আলাইকুম! আমি একটি কাস্টমাইজড ট্রিপের পরিকল্পনা করতে চাই:\n\n• গন্তব্য: ${custom.place || "পরামর্শ চাই"}\n• ভ্রমণকারী: ${custom.people} জন\n• বাজেট: ${custom.budget || "আলোচনাসাপেক্ষ"}\n• সম্ভাব্য তারিখ: ${custom.date || "এখনো চূড়ান্ত নয়"}\n• যোগাযোগের ফোন: ${custom.phone || "এই নম্বরেই"}\n• অতিরিক্ত নোট: ${custom.note || "নাই"}`,
    `Hello! I'd like to plan a custom trip:\n\n• Destination: ${custom.place || "Need advice"}\n• Travelers: ${custom.people}\n• Budget: ${custom.budget || "Negotiable"}\n• Estimated Date: ${custom.date || "Flexible"}\n• Phone: ${custom.phone || "This WhatsApp"}\n• Notes: ${custom.note || "None"}`,
  );

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Floating Stats / Trust Ribbon */}
      <section className="relative z-20 mx-auto -mt-10 max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card md:grid-cols-4">
          {[
            { n: 5000, l: T("সন্তুষ্ট ভ্রমণকারী", "Happy Travelers"), s: "+" },
            { n: 14, l: T("নির্বাচিত গন্তব্য", "Curated Destinations"), s: "+" },
            { n: 7, l: T("বছরের অভিজ্ঞতা", "Years Experience"), s: "+" },
            { n: 100, l: T("নিরাপদ ভ্রমণ হার", "Verified Safe Tours"), s: "%" },
          ].map((stat, i) => (
            <div
              key={stat.l}
              className={`text-center py-2 ${
                i < 3 ? "border-b border-border/40 md:border-b-0 md:border-r" : ""
              }`}
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-forest tabular-nums">
                {num(stat.n, lang)}
                {stat.s}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Packages Showcase */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:pt-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {T("সেরা অভিজ্ঞতা", "Curated Experiences")}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
            {T("জনপ্রিয় প্যাকেজ", "Popular Tour Packages")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {T(
              "পাহাড়ের মেঘ, সমুদ্রের ঢেউ, ম্যানগ্রোভ বন আর ঐতিহাসিক প্রত্নতত্ত্ব — এক নজরে সেরা সব ভ্রমণ গন্তব্য।",
              "Hand-picked journeys across misty peaks, coastal horizons, haors, and UNESCO heritage wonders.",
            )}
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value;
              navigate({
                to: "/packages",
                search: val ? { q: val } : undefined,
              });
            }}
            className="mx-auto mt-7 flex max-w-xl items-center rounded-full border border-border/80 bg-card p-2 shadow-soft transition-all focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20"
          >
            <Search className="ml-3.5 h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              name="q"
              placeholder={T(
                "স্থান বা অঞ্চল খুঁজুন (যেমন: সাজেক, সুন্দরবন, কক্সবাজার)...",
                "Search destination (e.g. Sajek, Sundarbans, Cox's Bazar)...",
              )}
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-xs"
            >
              {T("খুঁজুন", "Search")}
            </button>
          </form>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg) => (
            <PackageCard key={pkg.slug} p={pkg} />
          ))}
        </div>

        {/* View All Packages Link */}
        <div className="mt-12 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-7 py-3 text-sm font-semibold text-forest shadow-xs transition-all hover:border-primary hover:bg-secondary"
          >
            <span>{T("সকল প্যাকেজ ও বিস্তারিত দেখুন", "View All Packages & Places")}</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mx-auto max-w-6xl px-4 pt-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {T("আমাদের প্রতিশ্রুতি", "Our Distinction")}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
            {T("কেন সবুজ পথ", "Why Travel with Shobuj Poth")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {T(
              "দায়িত্বশীল ভ্রমণ, স্থানীয় ক্ষমতায়ন এবং সর্বোচ্চ সেবার মেলবন্ধন।",
              "Reliable hospitality, local empowerment, and thoughtful itineraries.",
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-forest">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Trip Section ("নিজের মতো ট্রিপ বানান") - Flagship Concierge Section */}
      <section id="custom-trip" className="mx-auto max-w-6xl px-4 pt-28 scroll-mt-24">
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-elevated">
          <div className="grid lg:grid-cols-12 items-stretch">
            {/* Left Column: Visual & Concierge Info */}
            <div className="relative p-8 sm:p-10 lg:p-12 lg:col-span-5 bg-forest text-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>{T("প্রিমিয়াম কনসিয়ার্জ সার্ভিস", "Premium Concierge Planning")}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  {T("নিজের মতো করে ট্রিপ সাজান", "Design Your Tailored Private Tour")}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {T(
                    "নির্দিষ্ট কোনো তারিখে বন্ধু, পরিবার বা অফিস টিমের সাথে বিশেষ ট্রিপে যেতে চান? নিচের ফর্মটি পূরণ করুন, আমাদের বিশেষজ্ঞ ট্রাভেল টিম আপনার বাজেট অনুযায়ী সম্পূর্ণ প্ল্যান তৈরি করে দেবে।",
                    "Traveling with family, colleagues or friends on custom dates? Let us handle accommodations, transport, and routes tailored around your expectations.",
                  )}
                </p>
              </div>

              {/* Concierge Benefits List */}
              <div className="mt-8 space-y-3.5 border-t border-white/15 pt-6 text-xs sm:text-sm text-white/90">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {T(
                      "যেকোনো বাজেট ও দিনক্ষণ নির্বাচন সুবিধা",
                      "Flexible dates and budget ranges",
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {T(
                      "পছন্দের হোটেল, রিসোর্ট বা কটেজ বাছাই",
                      "Curated resort and transport options",
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {T(
                      "সরাসরি ডেডিকেটেড ট্রাভেল কনসালট্যান্ট",
                      "Dedicated trip advisor via WhatsApp",
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 text-xs text-white/60">
                <span>
                  {SITE.phoneDisplay} · {SITE.email}
                </span>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 bg-background/50 flex flex-col justify-center">
              <h4 className="font-display text-2xl font-bold text-forest">
                {T("ভ্রমণের তথ্য দিন", "Trip Specifications")}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {T(
                  "তথ্যগুলো লিখে WhatsApp বাটনে চাপলে সরাসরি মেসেজ প্রস্তুত হয়ে যাবে।",
                  "Fill out your preferences and review your ready-to-send WhatsApp proposal.",
                )}
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("কোথায় যেতে চান?", "Destination / Route")}
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={T(
                          "যেমন: সাজেক, রাঙামাটি, সেন্টমার্টিন...",
                          "e.g. Sajek, Bandarban...",
                        )}
                        value={custom.place}
                        onChange={(e) => setCustom({ ...custom, place: e.target.value })}
                        className="w-full rounded-xl border border-input bg-card py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("কতজন ভ্রমণ করবেন?", "Number of Guests")}
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        min="1"
                        placeholder="2"
                        value={custom.people}
                        onChange={(e) => setCustom({ ...custom, people: e.target.value })}
                        className="w-full rounded-xl border border-input bg-card py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("বাজেট (আনুমানিক)", "Budget (Approximate)")}
                    </label>
                    <input
                      type="text"
                      placeholder={T("যেমন: ২০,০০০ টাকা / জন", "e.g. ৳15,000 / person")}
                      value={custom.budget}
                      onChange={(e) => setCustom({ ...custom, budget: e.target.value })}
                      className="w-full rounded-xl border border-input bg-card py-2.5 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {T("সম্ভাব্য ভ্রমণের তারিখ", "Tentative Travel Date")}
                    </label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={custom.date}
                        onChange={(e) => setCustom({ ...custom, date: e.target.value })}
                        className="w-full rounded-xl border border-input bg-card py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("বিশেষ চাহিদা বা নোট (ঐচ্ছিক)", "Special Requests / Notes (Optional)")}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={T(
                      "যেমন: এসি বাস, কাপল রুম, রিভার ভিউ কটেজ...",
                      "e.g. River view cottage, private AC microbus...",
                    )}
                    value={custom.note}
                    onChange={(e) => setCustom({ ...custom, note: e.target.value })}
                    className="w-full rounded-xl border border-input bg-card py-2 px-3.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={waLink(customMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-sm font-semibold text-whatsapp-foreground shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{T("WhatsApp-এ প্ল্যান পাঠান", "Send Plan on WhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pure Nature Photography Gallery Section ("ছবিতে প্রকৃতি" - Just Pictures with Place Names) */}
      <section className="mx-auto max-w-6xl px-4 pt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-1">
              <Camera className="h-3.5 w-3.5" />
              <span>{T("প্রকৃতির আলোকচিত্র", "Nature Photography Gallery")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
              {T("ছবিতে প্রকৃতি", "Bangladesh in Focus")}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl">
              {T(
                "বাংলাদেশের বিভিন্ন প্রান্তের অসাধারণ সব নিসর্গ ও ঐতিহাসিক স্থানের আলোকচিত্র গ্যালারি।",
                "Authentic visual glimpses capturing the scenic diversity and heritage landscapes of Bangladesh.",
              )}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", bn: "সব স্থান", en: "All Places" },
              { id: "hills", bn: "পাহাড়", en: "Hills" },
              { id: "sea", bn: "সমুদ্র ও দ্বীপ", en: "Coast & Island" },
              { id: "water", bn: "নদী ও হাওর", en: "Rivers & Haors" },
              { id: "forest", bn: "অরণ্য ও বাগান", en: "Forests & Tea" },
              { id: "heritage", bn: "ঐতিহাসিক", en: "Heritage" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryFilter(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  galleryFilter === cat.id
                    ? "bg-forest text-white shadow-xs font-semibold"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {lang === "bn" ? cat.bn : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (No package booking links, pure photography with place names) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.nameEn}
              onClick={() => setActivePhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:shadow-elevated hover:border-primary/40"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={photo.image}
                  alt={lang === "bn" ? photo.name : photo.nameEn}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity group-hover:from-black/85" />

                {/* Location Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm shadow-xs">
                    <MapPin className="h-3 w-3 text-emerald-300" />
                    <span>{lang === "bn" ? photo.location : photo.locationEn}</span>
                  </span>
                </div>

                {/* Zoom Icon on Hover */}
                <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>

                {/* Caption & Title on Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm group-hover:text-emerald-200 transition-colors">
                    {lang === "bn" ? photo.name : photo.nameEn}
                  </h3>
                  <p className="mt-1 text-xs text-white/85 line-clamp-1">
                    {lang === "bn" ? photo.caption : photo.captionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Photo Preview Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-card border border-white/10 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <img
                src={activePhoto.image}
                alt={lang === "bn" ? activePhoto.name : activePhoto.nameEn}
                className="h-full w-full object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-card"
                aria-label="Close photo view"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 bg-card border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{lang === "bn" ? activePhoto.location : activePhoto.locationEn}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-forest mt-0.5">
                  {lang === "bn" ? activePhoto.name : activePhoto.nameEn}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "bn" ? activePhoto.caption : activePhoto.captionEn}
                </p>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="rounded-xl bg-secondary px-5 py-2 text-xs font-semibold text-forest hover:bg-secondary/80 transition self-start sm:self-auto"
              >
                {T("বন্ধ করুন", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 pt-28 pb-10">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {T("প্রয়োজনীয় তথ্য", "Clarifications")}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-forest">
            {T("সাধারণ জিজ্ঞাসা", "Frequently Asked Questions")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {T(
              "বুকিং, ভ্রমণ নিরাপত্তা ও রুট সম্পর্কিত যেকোনো প্রশ্নের সহজ উত্তর।",
              "Clear answers regarding bookings, group safety, and custom logistics.",
            )}
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-colors hover:border-primary/40 open:border-primary/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold text-forest">
                <span>{f.q}</span>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          <span>
            {T("আরও প্রশ্ন আছে? সরাসরি কথা বলুন: ", "Have other queries? Speak with us: ")}
          </span>
          <a
            href={waLink(T("আসসালামু আলাইকুম, কিছু জানতে চাই।", "Hello, I have a travel query."))}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline ml-1"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}
