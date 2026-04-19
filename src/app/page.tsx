import { AmbientBackground } from "@/features/home/components/Background";
import { CollabExamples } from "@/features/home/components/CollabExamples";
import { CreativeMatch } from "@/features/home/components/CreativeMatch";
import { Features } from "@/features/home/components/Features";
import { FinalCta } from "@/features/home/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/features/home/components/Hero";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { RealSessions } from "@/features/home/components/RealSessions";
import { ValueStrip } from "@/features/home/components/ValueStrip";
import { WhyBetter } from "@/features/home/components/WhyBetter";

export default function Page() {
  return (
    <main className="relative">
      <AmbientBackground />
      <Header />
      <Hero />
      <RealSessions />
      <ValueStrip />
      <HowItWorks />
      <CreativeMatch />
      <Features />
      <CollabExamples />
      <WhyBetter />
      <FinalCta />
      <Footer />
    </main>
  );
}

