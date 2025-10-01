import BannerSection from "./components/banner-section";
import { ModeToggle } from "./components/mode-toggle";
import ProblemStrip from "./components/feature-section";
import FAQSection from "@/app/components/FAQ";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <BannerSection />
      <ProblemStrip />
      <FAQSection />
      <Testimonials />
    </>

  );
}
