import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { Projects } from "@/components/sections/Projects";
import { Founder } from "@/components/sections/Founder";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Stats />
        <Projects />
        <Founder />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
