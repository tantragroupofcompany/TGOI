import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Companies from "@/components/Companies";
import LeadershipPreview from "@/components/LeadershipPreview";
import ContactPreview from "@/components/ContactPreview";
import { getSiteContent } from "@/lib/content/site";

export default function HomePage() {
  const content = getSiteContent();

  return (
    <>
      <Hero intro={content.heroIntro} />
      <About />
      <VisionMission />
      <Companies companies={content.companies} />
      <LeadershipPreview leaders={content.leaderPreviews} />
      <ContactPreview contact={content.contact} />
    </>
  );
}
