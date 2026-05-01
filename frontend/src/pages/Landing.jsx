import {
  HeroSection,
  FeatureSection,
  DemoSection,
  CTASection,
} from '../components';

export default function LandingPage() {
  return (
    <div className="min-w-full">
      <HeroSection />
      <DemoSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
}
