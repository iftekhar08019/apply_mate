import BannerSection from "./components/banner-section";
import FeatureSection from "./components/feature-section";
import HowItWorks from "./components/how-it-works";
import PromotionalSection from "./components/promotional-section";
import DemoSection from "./components/demo-section";
import FAQSection from "@/app/components/FAQ";
import Testimonials from "./components/Testimonials";
import UserInfo from "@/app/components/tests/user-info";

export default function Home() {
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900">
        <BannerSection />
        <UserInfo/>
        <FeatureSection />
        <HowItWorks />
        <PromotionalSection />
        <DemoSection />
        <FAQSection />
        <Testimonials />
      </section>
    </>
  );
}