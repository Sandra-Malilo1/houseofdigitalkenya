import React from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  ExternalLink, 
  ArrowRight, 
  Code2, 
  Smartphone, 
  Globe, 
  Users, 
  Award, 
  Zap, 
  Clock, 
  ChevronRight,
  Terminal
} from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon?: React.ReactNode;
  image?: string;
  link?: string;
  status?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export default function App() {
  const featuredProjects: Project[] = [
   {
  title: "Rafiki MicroFinance Bank",
  category: "Banking & Financial Services",
  description:
    "A modern digital banking experience designed to simplify financial services, improve customer accessibility, and deliver seamless interactions through an intuitive, responsive interface.",
  tags: ["React", "Tailwind CSS", "Node.js","Wordpress"],
  icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
  image: "/assets/images/rafiki.jpg",
  link: "https://rafikibank.co.ke/",
},
    {
      title: "Eatsbyteks", 
      category: "Recipe", 
      description: "A vibrant artisanal snack brand bringing the bold flavors of Kenya's coastal cuisine to health-conscious consumers worldwide.", 
      tags: ["Next.js", "Tailwind", "Typescript", "Supabase"], 
      icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
      image: "/assets/images/eatsbyteks.jpeg", 
      link: "https://eatsbyteks-next-hr52.vercel.app/" 

    },
     { 
    title: "LoveAfrica StayCation", 
    category: "Sustainability", 
    description: "AI-drA curated booking platform showcasing authentic African staycations, connecting travelers with eco-friendly lodges, cultural homestays, and unique local experiences across East Africa.",
    tags: ["Nestjs", "`Supabase", "RestAPI", "TypeScript"], 
    icon: <Code2 className="w-5 h-5" />,
    status: "In Development",
    image: "/assets/images/loveafrica.PNG", 
     link: "https://sundowners-txt-sigma.vercel.app/" 
  },
     {
      title: "Malivere Restaurant", 
      category: "Food and Delivery", 
      description: "A modern food delivery platform connecting Nairobi's finest restaurants with customers through real-time tracking, seamless payments, and lightning-fast delivery.", 
      tags: ["Next.js", "Tailwind", "Node.js"], 
      icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
      image: "/assets/images/mal.jpg", // Replace with your actual filename
      link: "https://restaurant-frontend-gilt-iota.vercel.app/" 

    },

  { 
    title: "Maternal Hub", 
    category: "HealthTech", 
    description: "A comprehensive digital health solution empowering expecting mothers with real-time tracking and expert access.", 
    tags: ["React", "TailwindCss", "JavaScript"], 
    icon: <Smartphone className="w-8 h-8 text-cyan-400" />,
    image: "/assets/images/mart.jpg", // Replace with your actual filename
    link: "https://magnificent-peony-f9d546.netlify.app/" 
  },
  { 
    title: "AfriArts Kenya", 
    category: "E-commerce", 
    description: "A borderless marketplace connecting traditional African artists directly with global art collectors.", 
    tags: ["HTML", "Css", "JavaScript"], 
    icon: <Globe className="w-8 h-8 text-fuchsia-400" />,
    image: "/assets/images/arts.jpg", // Replace with your actual filename
    link: "https://tubular-phoenix-e6d5e4.netlify.app/" 
  },
  { 
    title: "CyberTrove Africa", 
    category: "Cybersecurity", 
    description: "High-performance tech agency portfolio with fluid UX, complex WebGL animations, and CMS integration.", 
    tags: ["React", "Framer Motion", "TailwindCss"], 
    icon: <Terminal className="w-8 h-8 text-emerald-400" />,
    image: "/assets/images/cyber.PNG", // Replace with your actual filename
    link: "https://cybertroveafrica.com/" 
  },
 
];


const upcomingProjects: Project[] = [
  

    { 
      title: "SmartFarm IoT", 
      category: "AgriTech", 
      description: "Real-time crop monitoring dashboard connecting with physical soil sensors.", 
      tags: ["React", "Python", "AWS IoT"], 
      icon: <Zap className="w-5 h-5" />,
      status: "Prototyping",
     
    },
    { 
      title: "FinFlow Mobile", 
      category: "FinTech", 
      description: "Cross-border payment application targeting emerging markets.", 
      tags: ["React Native", "Go", "PostgreSQL"], 
      icon: <Smartphone className="w-5 h-5" />,
      status: "Planning",
     
    },
  ];

  const testimonials: Testimonial[] = [
    { 
      name: "Lynvix Ochieng", 
      role: "CEO", 
      company: "Swahili Coastal Crunch",
      initials: "LO",
      quote: "The team's ability to translate our complex business needs into a seamless, beautiful user experience was unprecedented. An absolute pleasure to work with." 
    },
    { 
      name: "Kelvin Saitoti", 
      role: "CEO", 
      company: "CyberTrove Africa",
      initials: "KS",
      quote: "Our marketplace launch was flawless. The vision, execution, and attention to detail were beyond anything we expected. We saw a 200% increase in user retention." 
    },
    { 
      name: "Christopher Otula", 
      role: "CTO", 
      company: "ArtsAfrica Kenya",
      initials: "DC",
      quote: "Technically outstanding. They didn't just write code; they engineered a robust, scalable solution that sets us up for the next five years of growth." 
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-24 bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      {/* Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Work.</span>
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeUp}
              className="text-zinc-400 text-base md:text-lg leading-relaxed"
            >
              A selection of my recent projects, showcasing digital solutions built with modern technologies, scalable architectures, and beautiful user interfaces.
            </motion.p>
          </div>
          <motion.a 
            
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all text-sm font-medium cursor-pointer"
          >
            View GitHub Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }} variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative bg-zinc-900/40 backdrop-blur-md p-8 rounded-[2rem] border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-500 shadow-xl"
            >
              {/* Graphic Placeholder / Image */}
              <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl mb-8 flex items-center justify-center border border-zinc-700/30 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                {project.image ? (
                  <>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </div>
                  </>
                )}

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 p-2.5 bg-zinc-950/80 backdrop-blur-md rounded-full border border-zinc-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-500 hover:text-zinc-950 hover:border-cyan-500 z-20">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500">{project.category}</span>
              </div>
              
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed min-h-[60px]">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1.5 bg-zinc-950/50 text-zinc-300 rounded-full border border-zinc-800/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-Column Layout for Upcoming & Reviews */}
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Upcoming Projects Pipeline (Left Column) */}
          <div className="lg:col-span-5">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">In the Pipeline</h3>
              </div>
              <p className="text-zinc-400 mb-10 text-sm leading-relaxed">
                A sneak peek at what's brewing in the lab. These projects are currently in various stages of research and active development.
              </p>

              <div className="space-y-6">
                {upcomingProjects.map((project, i) => (
                  <motion.a 
                    key={project.title}
                    href={project.link || "#"}
                    target={project.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="group flex gap-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors cursor-pointer block"
                  >
                    <div className="mt-1 p-3 bg-zinc-950 rounded-xl border border-zinc-800 h-fit flex items-center justify-center overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-5 h-5 object-cover rounded-sm" />
                      ) : (
                        project.icon
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-zinc-200">{project.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 mb-3">{project.description}</p>
                      <div className="flex gap-2 text-xs text-zinc-600 font-medium">
                        {project.tags.join(" • ")}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Client Reviews (Right Column) */}
          <div className="lg:col-span-7">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <div className="flex items-center gap-3 mb-8 lg:ml-4">
                <div className="p-2 bg-fuchsia-500/10 rounded-lg">
                  <Star className="w-6 h-6 text-fuchsia-400" />
                </div>
                <h3 className="text-2xl font-bold">Client Feedback</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:ml-4">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.01 }}
                    className="p-8 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 rounded-3xl border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Decorative quote mark */}
                    <div className="absolute top-4 right-6 text-8xl font-serif text-zinc-800/30 select-none pointer-events-none">
                      "
                    </div>
                    
                    <div className="flex text-yellow-500 mb-6 gap-1">
                      {[...Array(5)].map((_,idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-zinc-300 mb-8 text-base leading-relaxed relative z-10 font-light">
                      "{t.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 border border-zinc-700">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-100 tracking-wide">{t.name}</div>
                        <div className="text-zinc-500 text-sm">{t.role}, {t.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}