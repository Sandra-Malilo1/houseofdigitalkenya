import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Mail, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-white hover:border-white/50 hover:bg-white/10" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-fuchsia-400 hover:border-fuchsia-400/50 hover:bg-fuchsia-400/10" },
  ];

  const quickLinks = ["Home", "About Us", "Our Services", "Portfolio", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative bg-[#09090b] text-zinc-300 font-sans border-t border-zinc-800/50 overflow-hidden pt-24 pb-8">
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20"
        >
          
          {/* Column 1: Brand & Bio */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col">
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-white">
              House  Of Digital  Kenya
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
              We design and engineer digital experiences that bloom with purpose, precision, and performance. Elevating brands across the continent and beyond.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-auto">
              {socialLinks.map(({ icon: Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className={`w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-300 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-zinc-400 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal & Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 mb-8">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-zinc-400 text-sm hover:text-violet-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-sm text-zinc-400">
              <a href="mailto:hello@coordeX.africa" className="hover:text-white transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@house.of digital kenya
              </a>
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6">Stay in the loop</h4>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter for insights on web development, design trends, and agency news. No spam, ever.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-5 py-4 rounded-2xl focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm pr-14"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 p-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors flex items-center justify-center group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
            
            {/* Success Message */}
            {isSubscribed && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-emerald-400 text-xs mt-3 font-medium flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Thanks for subscribing!
              </motion.p>
            )}
          </motion.div>

        </motion.div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} House  Of Digital  Kenya. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors p-2"
          >
            Back to top
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </motion.div>

      </div>
    </footer>
  );
}