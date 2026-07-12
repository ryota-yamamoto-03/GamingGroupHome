import BootScreen from "@/components/BootScreen";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import {
  LivingSection,
  RoomSection,
  FreeSpaceSection,
} from "@/components/RoomViewer";
import FloorPlan from "@/components/FloorPlan";
import DayTimeline from "@/components/DayTimeline";
import Facilities from "@/components/Facilities";
import Staff from "@/components/Staff";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BootScreen />
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Concept />
        <LivingSection />
        <RoomSection />
        <FreeSpaceSection />
        <FloorPlan />
        <DayTimeline />
        <Facilities />
        <Staff />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
