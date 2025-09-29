import BannerSection from "./components/banner-section";
import PromotionalSection from "./components/promotional-section";
import ProblemStrip from "./components/feature-section";
import DemoSection from "./components/demo-section";


export default function Home() {
  return (
    <>
      <BannerSection />
      <PromotionalSection />
      <ProblemStrip/>
      <DemoSection />
    </>
  );
}
