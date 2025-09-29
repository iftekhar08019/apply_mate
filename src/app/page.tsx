import BannerSection from "./components/banner-section";
import FeatureSection from "./components/feature-section";
import HowItWorks from "./components/how-it-works";
import PromotionalSection from "./components/promotional-section";
import DemoSection from "./components/demo-section";


export default function Home() {
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900">

        <BannerSection />
        <FeatureSection />
        <HowItWorks />
      <PromotionalSection />
        <DemoSection />
        </section>
    </>
  );
}
