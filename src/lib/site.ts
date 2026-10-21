import sajek from "@/assets/sajek.jpg";
import cox from "@/assets/coxsbazar.jpg";
import sylhet from "@/assets/sylhet.jpg";
import sundarban from "@/assets/sundarban.jpg";
import bandarban from "@/assets/bandarban.jpg";
import stmartin from "@/assets/stmartin.jpg";
import rangamati from "@/assets/rangamati.jpg";
import kuakata from "@/assets/kuakata.jpg";

export type Lang = "bn" | "en";
export type L = { bn: string; en: string };

// Change name & WhatsApp number here (digits only, with country code)
export const SITE = {
  name: { bn: "সবুজ পথ", en: "Shobuj Poth" } as L,
  whatsapp: "8801XXXXXXXXX",
  phoneDisplay: "+880 1XXX-XXXXXX",
  email: "hello@shobujpoth.com",
  address: { bn: "ধানমন্ডি, ঢাকা", en: "Dhanmondi, Dhaka" } as L,
};

export const heroSlides = [sajek, cox, sylhet, sundarban, bandarban];

export type Pkg = {
  slug: string;
  image: string;
  title: L;
  short: L;
  days: number;
  price: number;
  badge?: L;
  types: ("couple" | "family" | "group" | "student")[];
  itinerary: L[];
  includes: L[];
  excludes: L[];
};

const inc = (bn: string, en: string): L => ({ bn, en });

export const packages: Pkg[] = [
  { slug: "coxs-bazar", image: cox, days: 3, price: 8500, badge: inc("জনপ্রিয়", "Popular"), types: ["couple", "family", "group"],
    title: inc("কক্সবাজার", "Cox's Bazar"), short: inc("পৃথিবীর দীর্ঘতম সৈকতে সূর্যাস্ত, ইনানী ও হিমছড়ি", "Sunsets on the world's longest beach, Inani & Himchari"),
    itinerary: [inc("ঢাকা থেকে যাত্রা, হোটেল চেক-ইন, সৈকতে সূর্যাস্ত", "Depart Dhaka, hotel check-in, beach sunset"), inc("মেরিন ড্রাইভ, হিমছড়ি ও ইনানী বিচ", "Marine Drive, Himchari & Inani beach"), inc("বার্মিজ মার্কেট, ফেরা", "Burmese market, return")],
    includes: [inc("এসি বাস যাতায়াত", "AC bus transport"), inc("হোটেল (২ রাত)", "Hotel (2 nights)"), inc("সকালের নাস্তা", "Breakfast"), inc("গাইড", "Guide")],
    excludes: [inc("দুপুর ও রাতের খাবার", "Lunch & dinner"), inc("ব্যক্তিগত খরচ", "Personal expenses")] },
  { slug: "saint-martin", image: stmartin, days: 3, price: 11500, badge: inc("সিট সীমিত", "Limited seats"), types: ["couple", "group", "student"],
    title: inc("সেন্টমার্টিন", "Saint Martin"), short: inc("নীল পানি, প্রবাল আর নারকেল গাছের দ্বীপ", "Turquoise water, coral and coconut palms"),
    itinerary: [inc("টেকনাফ থেকে জাহাজে দ্বীপে", "Ship from Teknaf to the island"), inc("ছেঁড়াদ্বীপ ভ্রমণ, রাতে বারবিকিউ", "Chera Dwip trip, BBQ night"), inc("সকালে সৈকত, ফেরা", "Morning beach, return")],
    includes: [inc("বাস ও জাহাজের টিকেট", "Bus & ship tickets"), inc("রিসোর্ট (২ রাত)", "Resort (2 nights)"), inc("সব বেলার খাবার", "All meals"), inc("বারবিকিউ", "BBQ")],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")] },
  { slug: "sajek", image: sajek, days: 2, price: 6500, badge: inc("জনপ্রিয়", "Popular"), types: ["couple", "group", "student"],
    title: inc("সাজেক ভ্যালি", "Sajek Valley"), short: inc("মেঘের ওপর ঘুম ভাঙা সকাল", "Wake up above a sea of clouds"),
    itinerary: [inc("খাগড়াছড়ি থেকে চান্দের গাড়িতে সাজেক", "Jeep from Khagrachari to Sajek"), inc("কংলাক পাহাড়ে সূর্যোদয়, ফেরা", "Konglak sunrise, return")],
    includes: [inc("বাস ও চান্দের গাড়ি", "Bus & jeep"), inc("কটেজ (১ রাত)", "Cottage (1 night)"), inc("৪ বেলা খাবার", "4 meals")],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")] },
  { slug: "bandarban", image: bandarban, days: 3, price: 7800, types: ["group", "student"],
    title: inc("বান্দরবান", "Bandarban"), short: inc("নীলগিরি, নীলাচল আর পাহাড়ি নদী", "Nilgiri, Nilachal and hill rivers"),
    itinerary: [inc("নীলাচল ও মেঘলা", "Nilachal & Meghla"), inc("নীলগিরি ও শৈলপ্রপাত", "Nilgiri & Shoilo Propat"), inc("স্বর্ণমন্দির, ফেরা", "Golden Temple, return")],
    includes: [inc("এসি বাস ও জিপ", "AC bus & jeep"), inc("হোটেল (২ রাত)", "Hotel (2 nights)"), inc("সব বেলার খাবার", "All meals")],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")] },
  { slug: "sundarbans", image: sundarban, days: 3, price: 12500, types: ["family", "group"],
    title: inc("সুন্দরবন", "Sundarbans"), short: inc("লঞ্চে ম্যানগ্রোভ বনের গভীরে তিন দিন", "Three days on a launch through the mangroves"),
    itinerary: [inc("খুলনা থেকে লঞ্চে যাত্রা, করমজল", "Launch from Khulna, Karamjal"), inc("কটকা, জামতলা সৈকত, হরিণ দেখা", "Kotka, Jamtola beach, deer spotting"), inc("হিরণ পয়েন্ট, ফেরা", "Hiron Point, return")],
    includes: [inc("লঞ্চে থাকা", "Stay on launch"), inc("সব বেলার খাবার", "All meals"), inc("বন বিভাগের অনুমতি", "Forest permits"), inc("গার্ড ও গাইড", "Guard & guide")],
    excludes: [inc("খুলনা পর্যন্ত যাতায়াত", "Travel to Khulna")] },
  { slug: "sylhet-sreemangal", image: sylhet, days: 3, price: 7200, types: ["couple", "family"],
    title: inc("সিলেট-শ্রীমঙ্গল", "Sylhet & Sreemangal"), short: inc("চা বাগান, রাতারগুল আর সাদা পাথর", "Tea gardens, Ratargul and Sada Pathor"),
    itinerary: [inc("শ্রীমঙ্গল চা বাগান, লাউয়াছড়া", "Sreemangal tea estates, Lawachara"), inc("রাতারগুল জলাবন", "Ratargul swamp forest"), inc("সাদা পাথর, ফেরা", "Sada Pathor, return")],
    includes: [inc("ট্রেন/বাস", "Train/bus"), inc("রিসোর্ট (২ রাত)", "Resort (2 nights)"), inc("নাস্তা", "Breakfast"), inc("লোকাল গাড়ি", "Local transport")],
    excludes: [inc("দুপুর ও রাতের খাবার", "Lunch & dinner")] },
  { slug: "rangamati", image: rangamati, days: 2, price: 5500, types: ["family", "couple"],
    title: inc("রাঙামাটি", "Rangamati"), short: inc("কাপ্তাই লেকে নৌকা আর ঝুলন্ত সেতু", "Boating on Kaptai lake & the hanging bridge"),
    itinerary: [inc("ঝুলন্ত সেতু, রাজবন বিহার", "Hanging bridge, Rajban Vihara"), inc("কাপ্তাই লেকে নৌভ্রমণ, ফেরা", "Kaptai lake boat trip, return")],
    includes: [inc("এসি বাস", "AC bus"), inc("হোটেল (১ রাত)", "Hotel (1 night)"), inc("নৌকা ভাড়া", "Boat hire")],
    excludes: [inc("খাবার", "Meals")] },
  { slug: "kuakata", image: kuakata, days: 3, price: 6900, types: ["family", "student"],
    title: inc("কুয়াকাটা", "Kuakata"), short: inc("এক সৈকতে সূর্যোদয় ও সূর্যাস্ত", "Sunrise and sunset on one beach"),
    itinerary: [inc("লঞ্চে যাত্রা", "Overnight launch"), inc("সূর্যোদয়, ফাতরার বন, লেবুর চর", "Sunrise, Fatrar forest, Lebur Char"), inc("সূর্যাস্ত, ফেরা", "Sunset, return")],
    includes: [inc("লঞ্চ কেবিন", "Launch cabin"), inc("হোটেল (১ রাত)", "Hotel (1 night)"), inc("নাস্তা", "Breakfast")],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")] },
];

export const typeLabels: Record<Pkg["types"][number], L> = {
  couple: inc("কাপল", "Couple"), family: inc("ফ্যামিলি", "Family"), group: inc("গ্রুপ", "Group"), student: inc("স্টুডেন্ট", "Student"),
};

const bnDigits = "০১২৩৪৫৬৭৮৯";
export const num = (n: number, lang: Lang) => {
  const s = n.toLocaleString("en-IN");
  return lang === "bn" ? s.replace(/\d/g, (d) => bnDigits.charAt(+d)) : s;
};

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function bookingMessage(p: Pkg, people: number, date: string, lang: Lang) {
  const total = p.price * people;
  if (lang === "bn")
    return `আসসালামু আলাইকুম! আমি "${p.title.bn}" প্যাকেজ বুক করতে চাই।\nদিন: ${p.days}\nজনপ্রতি: ৳${p.price}\nকতজন: ${people}\nতারিখ: ${date || "এখনো ঠিক হয়নি"}\nমোট: ৳${total}`;
  return `Hello! I'd like to book the "${p.title.en}" package.\nDays: ${p.days}\nPer person: ৳${p.price}\nPeople: ${people}\nDate: ${date || "Not decided yet"}\nTotal: ৳${total}`;
}
