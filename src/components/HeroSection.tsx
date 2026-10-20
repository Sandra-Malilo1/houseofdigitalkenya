import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";


export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Web Design");
  
  // Scroll progress for navbar animation
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(9, 9, 11, 0.9)", "rgba(9, 9, 11, 0.98)"]);
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(39, 39, 42, 0.5)", "rgba(39, 39, 42, 1)"]);


  // Animation variants for clean, crisp sequential entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
  };


  // Synced exactly to your Navbar's navigation link structure
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];


  // Client-friendly, business-focused content
  const mockContent: Record<string, any> = {
    "Web Design": {
      title: "Beautiful, Custom Websites",
      desc: "We build stunning websites designed to capture attention, build trust, and turn your visitors into loyal customers.",
      metrics: [
        { label: "Mobile Responsive", val: "100%" },
        { label: "User Engagement", val: "+120%" }
      ],
      features: ["Custom tailored design", "Search Engine Optimized", "Lightning fast speeds"]
    },
    "Branding": {
      title: "Memorable Brand Identity",
      desc: "Stand out from the competition with a cohesive, professional brand that tells your unique story.",
      metrics: [
        { label: "Brand Recognition", val: "High" },
        { label: "Design Assets", val: "Included" }
      ],
      features: ["Custom Logo Design", "Color & Typography Setup", "Complete Brand Guidelines"]
    },
    "Marketing": {
      title: "Digital Growth Strategies",
      desc: "Increase your reach and drive more sales with targeted digital campaigns that connect with your ideal audience.",
      metrics: [
        { label: "Traffic Growth", val: "3x" },
        { label: "ROI Focused", val: "Yes" }
      ],
      features: ["Social Media Integration", "Lead Generation Focus", "Performance Tracking"]
    }
  };


  return (
    <div id="hero" className="relative w-full min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
      
      {/* High-Contrast, Professional Navigation Bar - FIXED with scroll animation (no blur to prevent glitch) */}
      <motion.header 
        style={{ backgroundColor, borderColor }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300"
      >
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center font-black text-black text-sm">
              W
            </div>
            <span className="text-md font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200">
              House Of Digital <span className="text-zinc-400 font-normal">Kenya</span>
            </span>
          </a>


          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
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
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-100 text-black hover:bg-white transition-colors duration-200"
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
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
                  className="text-base font-medium text-zinc-300 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-zinc-800 my-2" />
              <button className="w-full py-3 rounded-lg text-sm font-semibold bg-zinc-100 text-black">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hero Workspace Section - Added padding-top to account for fixed navbar */}
      <section className="relative z-10 flex-1 w-full flex items-center justify-center py-16 md:py-24 mt-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
          
          {/* Left Side: Elegant Editorial Column */}
          <motion.div 
            className="flex-1 text-center lg:text-left max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge - Solid and Clean */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold tracking-wide uppercase text-zinc-300 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Premium Digital Agency
            </motion.div>


            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Elevate Your Brand's{" "}
              <span className="text-cyan-400 font-black">Digital Presence</span>
            </motion.h1>


            <motion.p
              variants={itemVariants}
              className="text-base text-zinc-400 mt-6 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
            >
              At <strong className="text-zinc-200 font-semibold">House Of Digital kenya</strong>, we create beautiful, easy-to-use websites and digital strategies designed to grow your business, attract more clients, and drive real results.
            </motion.p>


            {/* Structured Action Controls */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-zinc-100 hover:bg-white text-black font-semibold px-7 py-3 rounded-lg text-sm transition-colors duration-200 shadow-md"
              >
                Start Your Project
              </motion.button>


              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-semibold px-7 py-3 rounded-lg text-sm bg-zinc-900/50 transition-colors duration-200"
              >
                View Our Services
              </motion.button>
            </motion.div>
          </motion.div>


          {/* Right Side: Professional Interactive Showcase Card */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="w-full max-w-lg border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Window Controls (Browser Mockup Header) */}
              <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-3 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-zinc-900 text-zinc-500 text-[10px] sm:text-xs font-medium px-4 py-1 rounded-full flex items-center gap-2 border border-zinc-800">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    secure.house.of.digital.kenya
                  </div>
                </div>
              </div>


              {/* Interactive Workspace Navigation Tabs */}
              <div className="bg-zinc-900/50 border-b border-zinc-800 p-2 flex gap-1">
                {Object.keys(mockContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2.5 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>


              {/* Tab Display Canvas */}
              <div className="p-6 md:p-8 min-h-[260px] flex flex-col justify-between bg-gradient-to-b from-zinc-900 to-zinc-950">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                        {mockContent[activeTab].title}
                      </h3>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed">
                        {mockContent[activeTab].desc}
                      </p>
                    </div>


                    {/* Client-Friendly Features List */}
                    <div className="space-y-2.5 pt-2">
                      {mockContent[activeTab].features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>


                {/* Business Value Metrics Section */}
                <div className="mt-8 pt-5 border-t border-zinc-800/50 grid grid-cols-2 gap-4">
                  {mockContent[activeTab].metrics.map((metric: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{metric.label}</div>
                      <div className="text-xl font-bold text-white tracking-tight">{metric.val}</div>
                    </div>
                  ))}
                </div>


              </div>


            </div>
          </div>


        </div>
      </section>
    </div>
  );
}