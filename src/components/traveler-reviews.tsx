import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  Users,
  Calendar,
  MessageSquarePlus,
  Heart,
  Send,
  X,
} from "lucide-react";
import { num } from "@/lib/site";
import { useLang } from "@/lib/lang";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  destination: string;
  destinationBn: string;
  rating: number;
  date: string;
  travelerType: string;
  travelerTypeBn: string;
  commentBn: string;
  commentEn: string;
  likes: number;
}

const defaultReviews: ReviewItem[] = [
  {
    id: "rev-1",
    name: "তানভীর আহমেদ ও পরিবার",
    location: "উত্তরা, ঢাকা",
    destination: "Sajek Valley",
    destinationBn: "সাজেক ভ্যালি",
    rating: 5,
    date: "অক্টোবর ২০২৬",
    travelerType: "Family Trip",
    travelerTypeBn: "পারিবারিক ভ্রমণ",
    commentBn:
      "সবুজ পথ-এর সাথে পরিবার নিয়ে সাজেক ট্যুরটা ছিল অসাধারণ! মেঘের ওপর কটেজ বুকিং থেকে শুরু করে চান্দের গাড়ির দক্ষ ড্রাইভার—সবকিছুতেই প্রফেশনালিজম ছিল। কোনো হিডেন চার্জ ছিল না এবং গাইড ভাই সবসময় সহযোগিতাপূর্ণ ছিলেন।",
    commentEn:
      "Our family trip to Sajek with Shobuj Poth was truly memorable! From the cloud-facing cottage to the skilled jeep driver, everything was handled professionally. Transparent pricing and warm local guidance.",
    likes: 42,
  },
  {
    id: "rev-2",
    name: "ডাঃ সুমাইয়া জাহান",
    location: "ধানমন্ডি, ঢাকা",
    destination: "Tanguar Haor",
    destinationBn: "টাঙ্গুয়ার হাওর",
    rating: 5,
    date: "সেপ্টেম্বর ২০২৬",
    travelerType: "Friends Group",
    travelerTypeBn: "বন্ধুদের গ্রুপ",
    commentBn:
      "টাঙ্গুয়ার হাওরের প্রিমিয়াম হাউসবোটের খাবার আর সার্ভিস ভুলবার মতো না! ফ্রেশ হাওরের মাছ, হাঁসের মাংস এবং নীলাদ্রি লেকের শান্ত বিকেল জীবনভর মনে থাকবে। WhatsApp-এ কথা বলে যেভাবে প্ল্যান করেছিলাম, হুবহু তেমনই পেয়েছি।",
    commentEn:
      "The premium houseboat experience and fresh local food at Tanguar Haor were top-notch! The exact itinerary discussed on WhatsApp was delivered with zero surprises.",
    likes: 38,
  },
  {
    id: "rev-3",
    name: "ইমতিয়াজ ও সাদিয়া",
    location: "জিইসি, চট্টগ্রাম",
    destination: "Sundarbans",
    destinationBn: "সুন্দরবন",
    rating: 5,
    date: "আগস্ট ২০২৬",
    travelerType: "Couple",
    travelerTypeBn: "কাপল ট্যুর",
    commentBn:
      "সুন্দরবনের ম্যানগ্রোভ বনের ভেতর ৩ দিনের ক্রুজ আমাদের জীবনের সেরা অভিজ্ঞতা। বনের গভীরে নিরাপত্তা, খাবার ও দক্ষ বন গাইড সবসময় সাথে ছিলেন। যারা শান্ত প্রাকৃতিক পরিবেশ ভালোবাসেন তাদের জন্য সাজেস্টেড।",
    commentEn:
      "A 3-day serene cruise into the Sundarbans mangrove wilderness. Armed guards, certified guides, and excellent food on the launch gave us complete peace of mind.",
    likes: 29,
  },
  {
    id: "rev-4",
    name: "রাকিবুল হাসান ও বন্ধুদল",
    location: "রাজশাহী বিশ্ববিদ্যালয়",
    destination: "Bandarban",
    destinationBn: "বান্দরবান",
    rating: 5,
    date: "অক্টোবর ২০২৬",
    travelerType: "Student Squad",
    travelerTypeBn: "স্টুডেন্ট গ্রুপ",
    commentBn:
      "স্টুডেন্ট বাজেট হলেও সার্ভিসের মান এক ফোঁটাও কমেনি। নীলগিরির মেঘের দৃশ্য ও নাফাখুম ট্রেইলে লোকাল গাইড ছিলেন অত্যন্ত হেল্পফুল। পরবর্তী সব ট্যুরেই সবুজ পথ আমাদের প্রথম পছন্দ!",
    commentEn:
      "Even within a student budget, the service quality was remarkable. The local guide through Nilgiri and trails was exceptionally supportive. Shobuj Poth is our go-to agency!",
    likes: 34,
  },
  {
    id: "rev-5",
    name: "মাহমুদুর রহমান",
    location: "গুলশান, ঢাকা",
    destination: "Cox's Bazar",
    destinationBn: "কক্সবাজার ও ইনানী",
    rating: 4.9,
    date: "সেপ্টেম্বর ২০২৬",
    travelerType: "Family Trip",
    travelerTypeBn: "পারিবারিক ভ্রমণ",
    commentBn:
      "ইনানীর সি-ভিউ রিসোর্ট ও মেরিন ড্রাইভের অভিজ্ঞতা খুবই মনোরম ছিল। বাচ্চাদের নিয়ে ট্রাভেল করার সময় কোনো ধরণের ভোগান্তি হয়নি। WhatsApp-এ তাৎক্ষণিক রেসপন্স পেয়েছিলাম।",
    commentEn:
      "Inani sea-view resort was wonderful. Traveling with kids was stress-free thanks to prompt coordination over WhatsApp.",
    likes: 25,
  },
  {
    id: "rev-6",
    name: "ফারহানা আনজুম",
    location: "সিলেট সদর",
    destination: "Sylhet & Sreemangal",
    destinationBn: "সিলেট ও শ্রীমঙ্গল",
    rating: 5,
    date: "আগস্ট ২০২৬",
    travelerType: "Couple",
    travelerTypeBn: "কাপল ট্যুর",
    commentBn:
      "শ্রীমঙ্গলের চা বাগানের ভেতর কাঠের কটেজে থাকার অনুভূতি ভাষায় প্রকাশের মতো নয়। সকালের পাহাড়ি কুয়াশা আর সাতকড়ার বিফ দিয়ে দুপুরের খাবার দুর্দান্ত ছিল।",
    commentEn:
      "Staying in the wooden cottages amidst Sreemangal tea estates was magical. Morning mists and authentic local cuisine were unforgettable.",
    likes: 31,
  },
];

export function TravelerReviews() {
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  const [reviews, setReviews] = useState<ReviewItem[]>(defaultReviews);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDestination, setNewDestination] = useState("সাজেক ভ্যালি");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newType, setNewType] = useState("Family Trip");

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sp_traveler_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...defaultReviews]);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName,
      location: newLocation || "বাংলাদেশ",
      destination: newDestination,
      destinationBn: newDestination,
      rating: newRating,
      date: T("এইমাত্র", "Just now"),
      travelerType: newType,
      travelerTypeBn:
        newType === "Family Trip"
          ? "পারিবারিক ভ্রমণ"
          : newType === "Couple"
            ? "কাপল ট্যুর"
            : "বন্ধুদের গ্রুপ",
      commentBn: newComment,
      commentEn: newComment,
      likes: 1,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem("sp_traveler_reviews", JSON.stringify([newRev]));
    } catch {
      // Ignore
    }

    setNewName("");
    setNewLocation("");
    setNewComment("");
    setIsWriteModalOpen(false);
  };

  const destinationsList = [
    { id: "all", labelBn: "সকল রিভিউ", labelEn: "All Reviews" },
    { id: "Sajek", labelBn: "সাজেক", labelEn: "Sajek" },
    { id: "Tanguar", labelBn: "টাঙ্গুয়ার হাওর", labelEn: "Tanguar Haor" },
    { id: "Sundarbans", labelBn: "সুন্দরবন", labelEn: "Sundarbans" },
    { id: "Bandarban", labelBn: "বান্দরবান", labelEn: "Bandarban" },
    { id: "Cox", labelBn: "কক্সবাজার", labelEn: "Cox's Bazar" },
  ];

  const filteredReviews =
    activeFilter === "all"
      ? reviews
      : reviews.filter(
          (r) =>
            r.destination.toLowerCase().includes(activeFilter.toLowerCase()) ||
            r.destinationBn.includes(activeFilter),
        );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:pt-28">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {T("প্রকৃত ভ্রমণকারীদের প্রতিক্রিয়া", "Verified Traveler Testimonials")}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
            {T("ভ্রমণকারীদের অভিজ্ঞতা ও গল্প", "Stories & Reviews")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl">
            {T(
              "আমাদের সাথে বিভিন্ন প্রান্তে ঘুরে আসা ভ্রমণকারীদের প্রকৃত অভিজ্ঞতা ও মন্তব্য।",
              "Genuine experiences shared by travelers who explored Bangladesh with Shobuj Poth.",
            )}
          </p>
        </div>

        {/* CTA to write review */}
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-primary/40 bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-forest shadow-xs transition hover:bg-secondary hover:border-primary"
        >
          <MessageSquarePlus className="h-4 w-4 text-primary" />
          <span>{T("আপনার অভিজ্ঞতা শেয়ার করুন", "Write a Review")}</span>
        </button>
      </div>

      {/* Aggregate Score Strip */}
      <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/50 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-white font-display text-2xl font-bold tabular-nums">
            ৪.৯
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {T(
                "৫০০+ ভেরিফাইড ভ্রমণকারী থেকে গড় ৪.৯/৫ রেটিং",
                "4.9/5 overall average rating from 500+ travelers",
              )}
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {destinationsList.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveFilter(d.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${
                activeFilter === d.id
                  ? "bg-forest text-white shadow-xs font-semibold scale-105"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/40"
              }`}
            >
              {lang === "bn" ? d.labelBn : d.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((rev) => (
          <article
            key={rev.id}
            className="group rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-elevated hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              {/* Top metadata line */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display text-base font-bold text-forest">{rev.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{rev.location}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= Math.round(rev.rating)
                          ? "fill-current"
                          : "text-muted-foreground/30 fill-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Destination Tag */}
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground pb-3 border-b border-border/40">
                <span className="flex items-center gap-1 text-primary font-medium">
                  <MapPin className="h-3 w-3" />
                  <span>{lang === "bn" ? rev.destinationBn : rev.destination}</span>
                </span>
                <span>·</span>
                <span className="text-[11px]">
                  {lang === "bn" ? rev.travelerTypeBn : rev.travelerType}
                </span>
                <span>·</span>
                <span className="text-[11px]">{rev.date}</span>
              </div>

              {/* Review Text */}
              <div className="mt-4 relative">
                <Quote className="h-6 w-6 text-primary/15 absolute -left-1 -top-2" />
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/85 pl-4">
                  {lang === "bn" ? rev.commentBn : rev.commentEn}
                </p>
              </div>
            </div>

            {/* Bottom verified badge */}
            <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{T("যাচাইকৃত ভ্রমণকারী", "Verified Traveler")}</span>
              </span>
              <span className="text-muted-foreground">
                ❤️ {num(rev.likes, lang)} {T("জন সহমত", "likes")}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Write Review Dialog */}
      <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
        <DialogContent className="max-w-md sm:rounded-2xl border border-border/80 bg-card p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-forest">
              {T("আপনার ভ্রমণ অভিজ্ঞতা জানান", "Share Your Tour Experience")}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {T(
                "সবুজ পথ-এর সাথে আপনার যাত্রা কেমন ছিল? আপনার মতামত আমাদের সেবাকে আরও সমৃদ্ধ করবে।",
                "How was your journey with Shobuj Poth? Your feedback helps future travelers decide.",
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddReview} className="space-y-4 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {T("আপনার নাম", "Your Name")} *
              </label>
              <input
                type="text"
                required
                placeholder={T("যেমন: ফারহান কবির", "e.g. Farhan Kabir")}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-2 px-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {T("আপনার শহর", "Your City")}
                </label>
                <input
                  type="text"
                  placeholder={T("যেমন: ঢাকা", "e.g. Dhaka")}
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card py-2 px-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {T("ভ্রমণের স্থান", "Destination")}
                </label>
                <select
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card py-2 px-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="সাজেক ভ্যালি">সাজেক ভ্যালি</option>
                  <option value="টাঙ্গুয়ার হাওর">টাঙ্গুয়ার হাওর</option>
                  <option value="সুন্দরবন">সুন্দরবন</option>
                  <option value="কক্সবাজার">কক্সবাজার</option>
                  <option value="বান্দরবান">বান্দরবান</option>
                  <option value="সিলেট-শ্রীমঙ্গল">সিলেট-শ্রীমঙ্গল</option>
                  <option value="কুয়াকাটা">কুয়াকাটা</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {T("রেটিং (Rating)", "Star Rating")}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="p-1 text-amber-500 hover:scale-110 transition"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= newRating ? "fill-current" : "stroke-current text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-muted-foreground font-semibold ml-2">
                  {num(newRating, lang)}/৫
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {T("আপনার মন্তব্য ও পরামর্শ", "Your Review / Feedback")} *
              </label>
              <textarea
                required
                rows={3}
                placeholder={T(
                  "গাইড, খাবার, গাড়ি বা হোটেলের সার্বিক সেবা কেমন ছিল...",
                  "How was the guide, food, transport or hotel service...",
                )}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-2 px-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary transition"
              >
                {T("বাতিল", "Cancel")}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest/90 transition shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{T("রিভিউ সাবমিট করুন", "Submit Review")}</span>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
