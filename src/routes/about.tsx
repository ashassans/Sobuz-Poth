import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import img from "@/assets/sylhet.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "আমাদের কথা | সবুজ পথ" },
      { name: "description", content: "Who we are — a small team of nature lovers running trips across Bangladesh." },
      { property: "og:title", content: "আমাদের কথা | সবুজ পথ" },
      { property: "og:description", content: "A small team of nature lovers running trips across Bangladesh." },
    ],
  }),
  component: About,
});

function About() {
  const { lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  return (
    <main className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-32 md:grid-cols-2">
      <img src={img} alt="" className="rounded-3xl shadow-soft" />
      <div>
        <h1 className="text-5xl font-bold text-forest">{T("আমাদের কথা", "About us")}</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {T("আমরা একদল প্রকৃতিপ্রেমী। পাহাড়, সমুদ্র আর বনের সৌন্দর্য সবার কাছে নিরাপদে ও সাশ্রয়ে পৌঁছে দেওয়াই আমাদের লক্ষ্য। প্রতিটি ট্যুর আমরা নিজেরা ঘুরে, দেখে সাজাই।",
            "We're a group of nature lovers. Our goal is to bring the beauty of Bangladesh's hills, seas and forests to everyone — safely and affordably. Every tour is one we've walked ourselves.")}
        </p>
      </div>
    </main>
  );
}
