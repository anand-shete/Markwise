import {
  HeroSection,
  FeatureSection,
  DemoSection,
} from '../components';

export default function LandingPage() {
  return (
    <div className="min-w-full">
      <HeroSection />
      <DemoSection />
      <FeatureSection />
    </div>
  );
}
