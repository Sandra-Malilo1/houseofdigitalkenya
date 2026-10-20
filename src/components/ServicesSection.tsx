import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";


// --- Types & Interfaces ---
interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {}


interface ServiceFeature {
  name: string;
  desc: string;
}


interface ServiceItem {
  id: "design" | "development" | "it";
  title: string;
  description: string;
  features: ServiceFeature[];
}


interface StableSectionMarker3DProps {
  color: string;
}


const IconPalette: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <path d="M4.88 2.23a6 6 0 0 1 7.12 1.67c1.47 1.47 2.1 3.29 1.67 5.2a6 6 0 0 1-5.2 1.67c-1.91-.43-3.73-.78-5.2-1.67a6 6 0 0 1-1.67-7.12z" />
    <path d="M12 2v10" /><path d="M16 16h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2" />
  </svg>
);


const IconCode: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);


const IconServer: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);


const ServicesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [openFeature, setOpenFeature] = useState<string | null>(null);
  
  // Interactive Motion Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 200);
    mouseY.set(e.clientY - rect.top - 200);
  };


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);


  const services: ServiceItem[] = [
    {
      id: "design", title: "Web Design", description: "Crafting visually stunning and user-centric designs that captivate audiences.",
      features: [{ name: "UI/UX Design", desc: "Research-driven UX principles." }, { name: "Brand Identity", desc: "Developing cohesive branding." }, { name: "Responsive Layouts", desc: "Seamless cross-device adaptability." }, { name: "Design Systems", desc: "Reusable component libraries." }]
    },
    {
      id: "development", title: "Web Development", description: "Building robust, scalable, and high-performance applications.",
      features: [{ name: "React & Next.js", desc: "Modern, fast, SEO-friendly apps." }, { name: "Full-Stack Solutions", desc: "End-to-end maintainable systems." }, { name: "API Integration", desc: "Enhancing functionality." }, { name: "3D Web Experiences", desc: "Immersive interactive elements." }]
    },
    {
      id: "it", title: "IT Services", description: "Comprehensive solutions including cloud infrastructure and consulting.",
      features: [{ name: "Cloud Hosting", desc: "Scalability and high availability." }, { name: "DevOps", desc: "CI/CD automated pipelines." }, { name: "Security", desc: "System monitoring and hardening." }, { name: "Technical Support", desc: "Ongoing assistance." }]
    }
  ];


  const serviceColors = {
    design: { icon: IconPalette, ring: "ring-[#00F5A0]", text: "text-[#00F5A0]", bg: "bg-[#00F5A0]/5", iconBg: "bg-[#00F5A0]/10" },
    development: { icon: IconCode, ring: "ring-[#FF5F6D]", text: "text-[#FF5F6D]", bg: "bg-[#FF5F6D]/5", iconBg: "bg-[#FF5F6D]/10" },
    it: { icon: IconServer, ring: "ring-[#FFC371]", text: "text-[#FFC371]", bg: "bg-[#FFC371]/5", iconBg: "bg-[#FFC371]/10" }
  };


  return (
    <section 
      id="services" 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-950 text-white font-sans selection:bg-cyan-500 selection:text-black"
    >
      {/* Interactive spotlight glow - reduced size for better performance */}
      <motion.div style={{ x: springX, y: springY }} className="absolute w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0 hidden md:block" />


      {/* Atmospheric backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-[150px] pointer-events-none" />


      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 mb-4 block">[ CAPABILITIES ]</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Our Services</h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed border-t border-b border-zinc-800/80 py-6 font-light">Comprehensive digital solutions tailored to elevate your online presence.</p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const { icon: Icon, ring, text, bg, iconBg } = serviceColors[service.id];
            return (
              <motion.div 
                key={service.id} 
                whileHover={{ y: -8 }} 
                className="relative p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl transition-all duration-500 group"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 mb-6 rounded-xl ${iconBg} flex items-center justify-center border border-transparent group-hover:${ring}`}>
                    <Icon className={`w-6 h-6 ${text}`} />
                  </div>
                  <h3 className={`text-xl font-extrabold mb-4 text-white ${text}`}>{service.title}</h3>
                  <p className="text-zinc-400 mb-8 text-sm leading-relaxed font-light">{service.description}</p>
                  <ul className="space-y-4 border-t border-zinc-800/40 pt-6">
                    {service.features.map((feature) => (
                      <li key={feature.name} className="relative flex flex-col">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-zinc-200 font-medium text-sm">{feature.name}</span>
                          <button onClick={() => setOpenFeature(openFeature === feature.name ? null : feature.name)} className="text-xs text-zinc-500 hover:text-white transition-colors">{openFeature === feature.name ? "Hide ▲" : "Explain ▼"}</button>
                        </div>
                        <AnimatePresence>
                          {openFeature === feature.name && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="mt-2.5 p-3.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 text-xs leading-relaxed">{feature.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default ServicesSection;