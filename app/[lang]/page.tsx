import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { Projects } from "@/components/sections/Projects";
import { Founder } from "@/components/sections/Founder";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale;
  return (
    <>
      <Navbar lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Intro lang={lang} />
        <Stats lang={lang} />
        <Projects lang={lang} />
        <Founder lang={lang} />
        <Services lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
