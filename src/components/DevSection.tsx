import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Code, Award, Download, Menu, X } from "lucide-react";



interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}



interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  details: string;
}



export default function DevSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const experiences: Experience[] = [
    
    {
      id: 2,
      role: "Full Stack Developer",
      company: "CyberTrove Africa",
      location: "Nairobi, Kenya",
      period: "2025-Present",
      description: [
        "Developed and maintained full-stack web applications for international clients in the FinTech and HealthTech sectors.",
        "Integrated third-party payment gateways (Stripe, M-Pesa) resulting in a 200% increase in seamless transaction success rates.",
        "Architected scalable backend APIs using Node.js and Express."
      ],
      technologies: ["Node.js", "Express", "React", "MongoDB", "PostgreSQL"]
    },
    {
      id: 3,
      role: "Junior Web Developer",
      company: "Elever Kenya",
      location: "Nairobi, Kenya",
      period: "2024- 2025",
      description: [
        "Built responsive landing pages and e-commerce templates for local businesses.",
        "Assisted in database management and optimized SQL queries for faster data retrieval.",
      ],
      technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL", "Bootstrap"]
    }
  ];



  const education: Education[] = [
    {
  id: 1,
  degree: "Backend Engineering Certificate",
  institution: "ALX Africa",
  period: "January 2025 - September 2025",
  details: "Intensive 6-month program covering server-side development, API design, and database architecture. Built production-ready RESTful APIs with Node.js, Express, and PostgreSQL. Completed capstone project: scalable payment integration system handling 10K+ transactions."
},
    {
  id: 2,
  degree: "Diploma in Information Technology",
  institution: "Regional Center for Mapping of Resources for Development (RCMRD)",
  period: "2021 - 2024",
  details: "Comprehensive IT program covering web development, database management, networking, and software engineering. Specialized in full-stack JavaScript development with hands-on projects including e-commerce platforms and GIS-based mapping applications. Graduated with Distinction."
}
  ];



  // Scroll progress for navbar animation
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(9, 9, 11, 0.9)", "rgba(9, 9, 11, 0.98)"]);
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(39, 39, 42, 0.5)", "rgba(39, 39, 42, 1)"]);



  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };



  // Navigation links - same as your Hero section
  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];



  // ⚡️ REPLACE THIS WITH YOUR OWN PHOTO PATH
  const profileImage = "/assets/images/prof2.jpeg";


  return (
    <div className="relative w-full min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
      
      {/* FIXED NAVBAR - Stays visible while scrolling */}
      <motion.header 
        style={{ backgroundColor, borderColor }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300"
      >
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/#hero" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-md bg-zinc-100 flex items-center justify-center font-black text-black text-xs">
              C
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200">
              House  Of Digital <span className="text-zinc-400 font-normal">Kenya</span>
            </span>
          </a>


          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>


          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg text-[10px] font-semibold bg-zinc-100 text-black hover:bg-white transition-colors duration-200"
            >
              Get Started
            </motion.button>
          </div>


          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.header>


      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative z-40 w-full bg-zinc-900 border-b border-zinc-800 absolute top-20 left-0"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-zinc-800 my-2" />
              <button className="w-full py-3 rounded-lg text-xs font-semibold bg-zinc-100 text-black">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Main Content Section - Added mt-20 to account for fixed navbar */}
      <section className="relative py-16 md:py-20 bg-zinc-950 text-zinc-100 font-sans min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-black mt-20">
        {/* Matte, Ultra-Clean Dark Canvas Background */}
        <div className="absolute inset-0 z-0 bg-zinc-950" />


        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          
          {/* Page Header with Profile Image & CV Download */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16"
          >
            <div className="md:w-3/5 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Journey.</span>
              </h1>
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed mb-6">
                I'm a passionate software engineer dedicated to crafting elegant, high-performance digital experiences. Here is a look at my professional background and academic roots.
              </p>
              
              {/* Download CV Button */}
              <div className="flex justify-center md:justify-start">
                <a 
                  href="/resume.pdf" 
                  download="public\Sandra_Malilo_Resume software eng.docx"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-violet-500 rounded-full text-zinc-100 text-sm font-medium transition-all overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Download className="w-4 h-4 group-hover:-translate-y-1 group-hover:text-violet-400 transition-all duration-300 relative z-10" /> 
                  <span className="relative z-10">Download CV</span>
                </a>
              </div>
            </div>


            {/* Profile Image - WITH YOUR OWN PHOTO */}
            <div className="md:w-2/5 flex justify-center">
              <div className="relative group">
                {/* Glowing aura effect behind image */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-700 group-hover:duration-300"></div>
                
                {/* Image Container - Reduced size */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
                  <img 
                    src={profileImage}
                    alt="Sandra Malilo - Software Engineer" 
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>


          <div className="grid md:grid-cols-12 gap-12 md:gap-6">
            
            {/* Work Experience Section */}
            <div className="md:col-span-7">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-center gap-2.5 mb-8"
              >
                <div className="p-2.5 bg-violet-500/10 rounded-xl border border-violet-500/20">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
              </motion.div>


              <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="relative border-l border-zinc-800/80 ml-3 md:ml-5 space-y-10 pb-6"
              >
                {experiences.map((exp) => (
                  <motion.div key={exp.id} variants={fadeUp} className="relative pl-7 md:pl-9">
                    {/* Timeline Node */}
                    <div className="absolute -left-[8px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                    
                    <div className="group relative bg-zinc-900 p-5 md:p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="text-base font-medium text-zinc-400 mt-0.5">
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <span className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-950/50 px-2.5 py-1.5 rounded-full w-fit border border-zinc-800/50">
                            <Calendar className="w-3 h-3" /> {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-zinc-500 px-1">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2.5 mb-5 mt-5 text-zinc-400 text-xs leading-relaxed">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/50 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>


                      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="text-[10px] font-medium px-2.5 py-1 bg-violet-500/5 text-violet-300 rounded-full border border-violet-500/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>


            {/* Education Section */}
            <div className="md:col-span-5">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-center gap-2.5 mb-8"
              >
                <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
              </motion.div>


              <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="relative border-l border-zinc-800/80 ml-3 md:ml-5 space-y-10"
              >
                {education.map((edu) => (
                  <motion.div key={edu.id} variants={fadeUp} className="relative pl-7 md:pl-9">
                    {/* Timeline Node */}
                    <div className="absolute -left-[8px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    
                    <div className="group relative bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl">
                      <h3 className="text-base md:text-lg font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors mb-1.5 leading-tight">
                        {edu.degree}
                      </h3>
                      <div className="text-sm font-medium text-zinc-400 mb-3">
                        {edu.institution}
                      </div>
                      
                      <span className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-950/50 px-2.5 py-1.5 rounded-full w-fit border border-zinc-800/50 mb-3">
                        <Calendar className="w-3 h-3" /> {edu.period}
                      </span>
                      
                      <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3.5">
                        {edu.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>


              {/* Mini Highlight/Stat Card */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="mt-10 ml-3 md:ml-5 p-5 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[50px]" />
                <Award className="w-7 h-7 text-cyan-400 mb-3" />
                <h4 className="text-lg font-bold text-zinc-100 mb-1.5">Continuous Learner</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Always exploring new paradigms. Currently diving deep into Data Analytics and Data Science..
                </p>
              </motion.div>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}