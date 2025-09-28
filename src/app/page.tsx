import BannerSection from "./components/banner-section";
import { ModeToggle } from "./components/mode-toggle";
import PromotionalSection from "./components/promotional-section";
import ProblemStrip from "./components/feature-section";


export default function Home() {
  return (
    <>
      <ModeToggle/>
      <BannerSection />
      <PromotionalSection />
      <ProblemStrip/>
    </>

  );
}
