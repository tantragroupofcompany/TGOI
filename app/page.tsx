import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Companies from "@/components/Companies";
import LeadershipPreview from "@/components/LeadershipPreview";
import ContactPreview from "@/components/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <VisionMission />
      <Companies />
      <LeadershipPreview />
      <ContactPreview />
    </>
  );
}