import sajek from "@/assets/sajek.jpg";
import cox from "@/assets/coxsbazar.jpg";
import sylhet from "@/assets/sylhet.jpg";
import sundarban from "@/assets/sundarban.jpg";
import bandarban from "@/assets/bandarban.jpg";
import stmartin from "@/assets/stmartin.jpg";
import rangamati from "@/assets/rangamati.jpg";
import kuakata from "@/assets/kuakata.jpg";
import sonargaon from "@/assets/images/sonargaon_1792587146969.jpg";
import bagerhat from "@/assets/images/bagerhat_1792587147425.jpg";
import paharpur from "@/assets/images/paharpur_1792587147975.jpg";
import jaflong from "@/assets/images/jaflong_1792587164131.jpg";
import tanguarHaor from "@/assets/images/tanguar_haor_1792587164340.jpg";
import mahasthangarh from "@/assets/images/mahasthangarh_1792587164880.jpg";

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
  region: L;
  days: number;
  price: number;
  badge?: L;
  types: ("couple" | "family" | "group" | "student")[];
  itinerary: L[];
  includes: L[];
  excludes: L[];
};

const inc = (bn: string, en: string): L => ({ bn, en });

export const regions: L[] = [
  inc("চট্টগ্রাম", "Chittagong"),
  inc("সিলেট", "Sylhet"),
  inc("রাজশাহী", "Rajshahi"),
  inc("খুলনা", "Khulna"),
  inc("ঢাকা", "Dhaka"),
  inc("বরিশাল", "Barisal"),
];

export const packages: Pkg[] = [
  {
    slug: "coxs-bazar",
    image: cox,
    days: 3,
    price: 8500,
    region: inc("কক্সবাজার / চট্টগ্রাম", "Cox's Bazar / Chittagong"),
    badge: inc("জনপ্রিয়", "Popular"),
    types: ["couple", "family", "group"],
    title: inc("কক্সবাজার", "Cox's Bazar"),
    short: inc(
      "পৃথিবীর দীর্ঘতম সৈকতে সূর্যাস্ত, ইনানী ও হিমছড়ি",
      "Sunsets on the world's longest beach, Inani & Himchari",
    ),
    itinerary: [
      inc(
        "ঢাকা থেকে যাত্রা, হোটেল চেক-ইন, সৈকতে সূর্যাস্ত",
        "Depart Dhaka, hotel check-in, beach sunset",
      ),
      inc("মেরিন ড্রাইভ, হিমছড়ি ও ইনানী বিচ", "Marine Drive, Himchari & Inani beach"),
      inc("বার্মিজ মার্কেট, ফেরা", "Burmese market, return"),
    ],
    includes: [
      inc("এসি বাস যাতায়াত", "AC bus transport"),
      inc("হোটেল (২ রাত)", "Hotel (2 nights)"),
      inc("সকালের নাস্তা", "Breakfast"),
      inc("গাইড", "Guide"),
    ],
    excludes: [
      inc("দুপুর ও রাতের খাবার", "Lunch & dinner"),
      inc("ব্যক্তিগত খরচ", "Personal expenses"),
    ],
  },
  {
    slug: "saint-martin",
    image: stmartin,
    days: 3,
    price: 11500,
    region: inc("সেন্টমার্টিন / চট্টগ্রাম", "Saint Martin / Chittagong"),
    badge: inc("সিট সীমিত", "Limited seats"),
    types: ["couple", "group", "student"],
    title: inc("সেন্টমার্টিন", "Saint Martin"),
    short: inc(
      "নীল পানি, প্রবাল আর নারকেল গাছের দ্বীপ",
      "Turquoise water, coral and coconut palms",
    ),
    itinerary: [
      inc("টেকনাফ থেকে জাহাজে দ্বীপে", "Ship from Teknaf to the island"),
      inc("ছেঁড়াদ্বীপ ভ্রমণ, রাতে বারবিকিউ", "Chera Dwip trip, BBQ night"),
      inc("সকালে সৈকত, ফেরা", "Morning beach, return"),
    ],
    includes: [
      inc("বাস ও জাহাজের টিকেট", "Bus & ship tickets"),
      inc("রিসোর্ট (২ রাত)", "Resort (2 nights)"),
      inc("সব বেলার খাবার", "All meals"),
      inc("বারবিকিউ", "BBQ"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "sajek",
    image: sajek,
    days: 2,
    price: 6500,
    region: inc("রাঙামাটি / চট্টগ্রাম", "Rangamati / Chittagong"),
    badge: inc("জনপ্রিয়", "Popular"),
    types: ["couple", "group", "student"],
    title: inc("সাজেক ভ্যালি", "Sajek Valley"),
    short: inc("মেঘের ওপর ঘুম ভাঙা সকাল", "Wake up above a sea of clouds"),
    itinerary: [
      inc("খাগড়াছড়ি থেকে চান্দের গাড়িতে সাজেক", "Jeep from Khagrachari to Sajek"),
      inc("কংলাক পাহাড়ে সূর্যোদয়, ফেরা", "Konglak sunrise, return"),
    ],
    includes: [
      inc("বাস ও চান্দের গাড়ি", "Bus & jeep"),
      inc("কটেজ (১ রাত)", "Cottage (1 night)"),
      inc("৪ বেলা খাবার", "4 meals"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "bandarban",
    image: bandarban,
    days: 3,
    price: 7800,
    region: inc("বান্দরবান / চট্টগ্রাম", "Bandarban / Chittagong"),
    types: ["group", "student"],
    title: inc("বান্দরবান", "Bandarban"),
    short: inc("নীলগিরি, নীলাচল আর পাহাড়ি নদী", "Nilgiri, Nilachal and hill rivers"),
    itinerary: [
      inc("নীলাচল ও মেঘলা", "Nilachal & Meghla"),
      inc("নীলগিরি ও শৈলপ্রপাত", "Nilgiri & Shoilo Propat"),
      inc("স্বর্ণমন্দির, ফেরা", "Golden Temple, return"),
    ],
    includes: [
      inc("এসি বাস ও জিপ", "AC bus & jeep"),
      inc("হোটেল (২ রাত)", "Hotel (2 nights)"),
      inc("সব বেলার খাবার", "All meals"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "sundarbans",
    image: sundarban,
    days: 3,
    price: 12500,
    region: inc("খুলনা", "Khulna"),
    types: ["family", "group"],
    title: inc("সুন্দরবন", "Sundarbans"),
    short: inc(
      "লঞ্চে ম্যানগ্রোভ বনের গভীরে তিন দিন",
      "Three days on a launch through the mangroves",
    ),
    itinerary: [
      inc("খুলনা থেকে লঞ্চে যাত্রা, করমজল", "Launch from Khulna, Karamjal"),
      inc("কটকা, জামতলা সৈকত, হরিণ দেখা", "Kotka, Jamtola beach, deer spotting"),
      inc("হিরণ পয়েন্ট, ফেরা", "Hiron Point, return"),
    ],
    includes: [
      inc("লঞ্চে থাকা", "Stay on launch"),
      inc("সব বেলার খাবার", "All meals"),
      inc("বন বিভাগের অনুমতি", "Forest permits"),
      inc("গার্ড ও গাইড", "Guard & guide"),
    ],
    excludes: [inc("খুলনা পর্যন্ত যাতায়াত", "Travel to Khulna")],
  },
  {
    slug: "sylhet-sreemangal",
    image: sylhet,
    days: 3,
    price: 7200,
    region: inc("সিলেট", "Sylhet"),
    types: ["couple", "family"],
    title: inc("সিলেট-শ্রীমঙ্গল", "Sylhet & Sreemangal"),
    short: inc("চা বাগান, রাতারগুল আর সাদা পাথর", "Tea gardens, Ratargul and Sada Pathor"),
    itinerary: [
      inc("শ্রীমঙ্গল চা বাগান, লাউয়াছড়া", "Sreemangal tea estates, Lawachara"),
      inc("রাতারগুল জলাবন", "Ratargul swamp forest"),
      inc("সাদা পাথর, ফেরা", "Sada Pathor, return"),
    ],
    includes: [
      inc("ট্রেন/বাস", "Train/bus"),
      inc("রিসোর্ট (২ রাত)", "Resort (2 nights)"),
      inc("নাস্তা", "Breakfast"),
      inc("লোকাল গাড়ি", "Local transport"),
    ],
    excludes: [inc("দুপুর ও রাতের খাবার", "Lunch & dinner")],
  },
  {
    slug: "rangamati",
    image: rangamati,
    days: 2,
    price: 5500,
    region: inc("রাঙামাটি / চট্টগ্রাম", "Rangamati / Chittagong"),
    types: ["family", "couple"],
    title: inc("রাঙামাটি", "Rangamati"),
    short: inc("কাপ্তাই লেকে নৌকা আর ঝুলন্ত সেতু", "Boating on Kaptai lake & the hanging bridge"),
    itinerary: [
      inc("ঝুলন্ত সেতু, রাজবন বিহার", "Hanging bridge, Rajban Vihara"),
      inc("কাপ্তাই লেকে নৌভ্রমণ, ফেরা", "Kaptai lake boat trip, return"),
    ],
    includes: [
      inc("এসি বাস", "AC bus"),
      inc("হোটেল (১ রাত)", "Hotel (1 night)"),
      inc("নৌকা ভাড়া", "Boat hire"),
    ],
    excludes: [inc("খাবার", "Meals")],
  },
  {
    slug: "kuakata",
    image: kuakata,
    days: 3,
    price: 6900,
    region: inc("পটুয়াখালী / বরিশাল", "Patuakhali / Barisal"),
    types: ["family", "student"],
    title: inc("কুয়াকাটা", "Kuakata"),
    short: inc("এক সৈকতে সূর্যোদয় ও সূর্যাস্ত", "Sunrise and sunset on one beach"),
    itinerary: [
      inc("লঞ্চে যাত্রা", "Overnight launch"),
      inc("সূর্যোদয়, ফাতরার বন, লেবুর চর", "Sunrise, Fatrar forest, Lebur Char"),
      inc("সূর্যাস্ত, ফেরা", "Sunset, return"),
    ],
    includes: [
      inc("লঞ্চ কেবিন", "Launch cabin"),
      inc("হোটেল (১ রাত)", "Hotel (1 night)"),
      inc("নাস্তা", "Breakfast"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "sonargaon",
    image: sonargaon,
    days: 1,
    price: 2500,
    region: inc("নারায়ণগঞ্জ / ঢাকা", "Narayanganj / Dhaka"),
    badge: inc("ঐতিহাসিক ডে-ট্যুর", "Historic Day-Tour"),
    types: ["family", "student", "group", "couple"],
    title: inc("সোনারগাঁ ও পানাম নগর", "Sonargaon & Panam Nagar"),
    short: inc(
      "প্রাচীন রাজধানী, পানাম নগর ও লোকশিল্প জাদুঘর",
      "Ancient capital, Panam Nagar & Folk Art Museum",
    ),
    itinerary: [
      inc(
        "ঢাকা থেকে যাত্রা, পানাম নগরের ঐতিহাসিক স্থাপত্য দর্শন",
        "Depart Dhaka, explore ancient Panam Nagar architecture",
      ),
      inc(
        "সোনারগাঁ লোক ও কারুশিল্প ফাউন্ডেশন ও জাদুঘর পরিদর্শন",
        "Folk Art & Crafts Foundation and museum visit",
      ),
      inc(
        "মেঘনা নদীর তীর ঘুরে সন্ধ্যায় ঢাকায় ফেরা",
        "Explore Meghna riverside, return to Dhaka in evening",
      ),
    ],
    includes: [
      inc("রিজার্ভ এসি মাইক্রোবাস যাতায়াত", "Reserved AC microbus transport"),
      inc("ঐতিহ্যবাহী দুপুরের খাবার", "Traditional Bengali lunch"),
      inc("জাদুঘর ও পানাম নগর এন্ট্রি টিকেট", "Museum & Panam Nagar entry tickets"),
      inc("অভিজ্ঞ ট্যুর গাইড", "Experienced tour guide"),
    ],
    excludes: [inc("ব্যক্তিগত কেনাকাটা ও অন্যান্য খরচ", "Personal shopping & other expenses")],
  },
  {
    slug: "bagerhat",
    image: bagerhat,
    days: 2,
    price: 5800,
    region: inc("বাগেরহাট / খুলনা", "Bagerhat / Khulna"),
    badge: inc("ইউনেস্কো ঐতিহ্য", "UNESCO Heritage"),
    types: ["family", "group", "student"],
    title: inc("ঐতিহাসিক বাগেরহাট", "Historic Bagerhat"),
    short: inc(
      "ষাট গম্বুজ মসজিদ, খান জাহান আলীর মাজার ও ঘোড়াদিঘী",
      "Sixty Dome Mosque, Khan Jahan Ali Shrine & Ghoradighi",
    ),
    itinerary: [
      inc(
        "ঢাকা থেকে পদ্মা সেতু হয়ে বাগেরহাট আগমন, হোটেল চেক-ইন",
        "Depart Dhaka via Padma Bridge to Bagerhat, hotel check-in",
      ),
      inc(
        "ষাট গম্বুজ মসজিদ, জাদুঘর, সিংগাইর মসজিদ ও ঘোড়াদিঘী দর্শন",
        "Sixty Dome Mosque, museum, Singair Mosque & Ghoradighi",
      ),
      inc(
        "হযরত খান জাহান আলী (রহ.) মাজার ও দীঘি পরিদর্শন, ঢাকায় ফেরা",
        "Khan Jahan Ali shrine & lake visit, return to Dhaka",
      ),
    ],
    includes: [
      inc("ঢাকা-বাগেরহাট এসি বাস", "Dhaka-Bagerhat AC bus"),
      inc("হোটেল (১ রাত)", "Hotel (1 night)"),
      inc("সকল বেলার খাবার", "All meals"),
      inc("স্মৃতিস্তম্ভ প্রবেশ টিকেট ও গাইড", "Monument entry tickets & guide"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "paharpur",
    image: paharpur,
    days: 2,
    price: 6200,
    region: inc("নওগাঁ / রাজশাহী", "Naogaon / Rajshahi"),
    badge: inc("ইউনেস্কো ঐতিহ্য", "UNESCO Heritage"),
    types: ["student", "family", "group"],
    title: inc("পাহাড়পুর বৌদ্ধ বিহার", "Paharpur Buddhist Vihara"),
    short: inc(
      "সোমপুর মহাবিহারের হাজার বছরের ইতিহাস ও পোড়ামাটির ফলক",
      "Thousand-year history & terracotta art of Somapura Mahavihara",
    ),
    itinerary: [
      inc(
        "ঢাকা থেকে ট্রেনে জয়পুরহাট/নওগাঁ যাত্রা, হোটেলে বিশ্রাম",
        "Train from Dhaka to Joypurhat/Naogaon, check into hotel",
      ),
      inc(
        "পাহাড়পুর সোমপুর মহাবিহার, স্তূপ ও প্রত্নতাত্ত্বিক জাদুঘর পরিদর্শন",
        "Somapura Mahavihara, stupa & archaeological museum visit",
      ),
      inc(
        "জগদ্দল বৌদ্ধ বিহার ও কুশুম্বা মসজিদ দর্শন, ঢাকায় ফেরা",
        "Jagaddala Buddhist Vihara & Kusumba Mosque visit, return to Dhaka",
      ),
    ],
    includes: [
      inc("ট্রেন টিকেট ও রিজার্ভ লোকাল ট্রান্সপোর্ট", "Train tickets & reserved local transport"),
      inc("হোটেল (১ রাত)", "Hotel (1 night)"),
      inc("সব বেলার স্বাস্থ্যসম্মত খাবার", "All meals"),
      inc("প্রত্নতত্ত্ব বিশেষজ্ঞ গাইড", "Archaeology guide"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
  {
    slug: "jaflong",
    image: jaflong,
    days: 2,
    price: 6800,
    region: inc("সিলেট", "Sylhet"),
    badge: inc("পাহাড় ও নদী", "Hills & River"),
    types: ["group", "student", "couple"],
    title: inc("জাফলং ও বিছনাকান্দি", "Jaflong & Bisnakandi"),
    short: inc(
      "পিয়াইন নদীর স্বচ্ছ জল, মেঘালয়ের সবুজ পাহাড় ও চা বাগান",
      "Clear waters of Piyain river, Meghalaya hills & tea gardens",
    ),
    itinerary: [
      inc(
        "সিলেট থেকে জাফলং, পিয়াইন নদীতে নৌভ্রমণ ও জিরো পয়েন্ট",
        "Travel from Sylhet to Jaflong, Piyain river boat ride & Zero Point",
      ),
      inc(
        "সংগ্রামপুঞ্জি চা বাগান, খাসিয়া পল্লী ও বিছনাকান্দি ঘুরে ফেরা",
        "Sangrampunji tea estate, Khasia village & Bisnakandi, return",
      ),
    ],
    includes: [
      inc("এসি বাস ও লোকাল মাইক্রোবাস", "AC bus & local microbus"),
      inc("রিসোর্ট (১ রাত)", "Resort (1 night)"),
      inc("পিয়াইন নদী ও বিছনাকান্দি নৌকা ভ্রমণ", "Boat trips in Piyain & Bisnakandi"),
      inc("৪ বেলা সুস্বাদু দেশি খাবার", "4 meals of local cuisine"),
    ],
    excludes: [inc("ব্যক্তিগত কেনাকাটা", "Personal shopping")],
  },
  {
    slug: "tanguar-haor",
    image: tanguarHaor,
    days: 2,
    price: 8900,
    region: inc("সুনামগঞ্জ / সিলেট", "Sunamganj / Sylhet"),
    badge: inc("প্রিমিয়াম হাউসবোট", "Premium Houseboat"),
    types: ["couple", "group", "family"],
    title: inc("টাঙ্গুয়ার হাওর", "Tanguar Haor"),
    short: inc(
      "হাওরের অথৈ নীল জল, ওয়াচটাওয়ার ও মেঘালয় সীমান্ত পাহাড়",
      "Endless azure haor waters, watchtower & border hills",
    ),
    itinerary: [
      inc(
        "তাহেরপুর ঘাট থেকে প্রিমিয়াম হাউসবোটে চড়া, ওয়াচটাওয়ার ভ্রমণ",
        "Board premium houseboat from Taherpur, visit watchtower",
      ),
      inc(
        "নীলাদ্রি লেক, যাদুকাটা নদী, বারেকের টিলা ও শিমুল বাগান ঘুরে ফেরা",
        "Niladri Lake, Jadukata river, Barek Tila & Shimul Bagan, return",
      ),
    ],
    includes: [
      inc("অভিজাত হাউসবোটে থাকা (১ রাত)", "Premium houseboat accommodation (1 night)"),
      inc(
        "হাওরের তাজা মাছ, হাঁসের মাংস ও সব বেলার খাবার",
        "Fresh haor fish, duck curry & all meals",
      ),
      inc("নিরাপত্তা লাইফ জ্যাকেট", "Safety life jackets"),
      inc("লোকাল গাইড ও সাইটসিয়িং", "Local guide & sightseeing"),
    ],
    excludes: [inc("ঢাকা-সুনামগঞ্জ যাতায়াত টিকেট", "Dhaka-Sunamganj bus tickets")],
  },
  {
    slug: "mahasthangarh",
    image: mahasthangarh,
    days: 2,
    price: 5400,
    region: inc("বগুড়া / রাজশাহী", "Bogura / Rajshahi"),
    badge: inc("প্রাচীন পুণ্ড্রনগর", "Ancient Pundranagara"),
    types: ["family", "student", "group"],
    title: inc("মহাস্থানগড় ও বগুড়া", "Mahasthangarh & Bogura"),
    short: inc(
      "আড়াই হাজার বছরের প্রাচীন দুর্গনগরী, জাদুঘর ও বিখ্যাত দই",
      "2,500-year-old ancient fortified citadel, museum & Bogura curd",
    ),
    itinerary: [
      inc(
        "ঢাকা থেকে বগুড়া যাত্রা, মহাস্থানগড় প্রাচীন দুর্গ প্রাচীর পরিদর্শন",
        "Travel from Dhaka to Bogura, ancient citadel walls visit",
      ),
      inc(
        "ভাসু বিহার, গোকুল মেধ (বেহুলার বাসর ঘর) ও ঐতিহ্যবাহী দই আস্বাদন, ফেরা",
        "Vasu Vihara, Gokul Medh & traditional Bogura curd tasting, return",
      ),
    ],
    includes: [
      inc("এসি বাস যাতায়াত", "AC bus transport"),
      inc("হোটেল (১ রাত)", "Hotel (1 night)"),
      inc("সব বেলার খাবার ও বিখ্যাত বগুড়ার দই", "All meals & famous Bogura curd"),
      inc("প্রত্নতাত্ত্বিক গাইড ও এন্ট্রি পাস", "Archaeological guide & entry pass"),
    ],
    excludes: [inc("ব্যক্তিগত খরচ", "Personal expenses")],
  },
];

export const typeLabels: Record<Pkg["types"][number], L> = {
  couple: inc("কাপল", "Couple"),
  family: inc("ফ্যামিলি", "Family"),
  group: inc("গ্রুপ", "Group"),
  student: inc("স্টুডেন্ট", "Student"),
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
