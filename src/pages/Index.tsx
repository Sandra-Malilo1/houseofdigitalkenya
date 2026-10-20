
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DevSection from "@/components/DevSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      
      <HeroSection />
      <AboutSection />
      <DevSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
