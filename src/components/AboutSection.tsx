import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, Variants } from "framer-motion";

interface StableSectionMarker3DProps {
  color?: string;
  mousePos?: { x: number; y: number };
}

const StableSectionMarker3D: React.FC<StableSectionMarker3DProps> = ({ 
  color = "#00E5FF", 
  mousePos = { x: 0, y: 0 } 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();

    // 3D Octahedron coordinates
    const vertices = [
      { x: 0, y: 1.1, z: 0 },
      { x: 0, y: -1.1, z: 0 },
      { x: 1.1, y: 0, z: 0 },
      { x: -1.1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1.1 },
      { x: 0, y: 0, z: -1.1 }
    ];

    const faces = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
    ];

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Rotation tracking with mouse coordinates
      angleX += 0.005 + mousePos.y * 0.02;
      angleY += 0.01 + mousePos.x * 0.02;

      // Rotate vectors in 3D space
      const rotated = vertices.map(v => {
        const y1 = v.y * Math.cos(angleX) - v.z * Math.sin(angleX);
        const z1 = v.y * Math.sin(angleX) + v.z * Math.cos(angleX);
        const x2 = v.x * Math.cos(angleY) + z1 * Math.sin(angleY);
        const z2 = -v.x * Math.sin(angleY) + z1 * Math.cos(angleY);
        return { x: x2, y: y1, z: z2 };
      });

      const scale = Math.min(width, height) * 0.35;
      const projected = rotated.map(v => {
        return {
          x: v.x * scale + width / 2,
          y: v.y * scale + height / 2,
          z: v.z
        };
      });

      // Painter's algorithm (depth sorting)
      const facesWithDepth = faces.map((face, index) => {
        const z = (rotated[face[0]].z + rotated[face[1]].z + rotated[face[2]].z) / 3;
        return { face, z, index };
      });
      facesWithDepth.sort((a, b) => b.z - a.z);

      facesWithDepth.forEach(({ face }) => {
        const p0 = projected[face[0]];
        const p1 = projected[face[1]];
        const p2 = projected[face[2]];

        const v0 = rotated[face[0]];
        const v1 = rotated[face[1]];
        const v2 = rotated[face[2]];
        const ab = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
        const ac = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z };
        const nx = ab.y * ac.z - ab.z * ac.y;
        const ny = ab.z * ac.x - ab.x * ac.z;
        const nz = ab.x * ac.y - ab.y * ac.x;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

        const normal = { x: nx / len, y: ny / len, z: nz / len };
        const light = { x: 0.5, y: -0.8, z: 0.6 };
        const dot = normal.x * light.x + normal.y * light.y + normal.z * light.z;
        const intensity = Math.max(0.15, (dot + 1) / 2);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();

        ctx.fillStyle = `rgba(${hexToRgb(color, intensity)})`;
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    const hexToRgb = (hex: string, intensity: number) => {
      let cleanHex = hex.replace("#", "");
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split("").map(c => c + c).join("");
      }
      const num = parseInt(cleanHex, 16);
      const r = Math.floor(((num >> 16) & 255) * intensity);
      const g = Math.floor(((num >> 8) & 255) * intensity);
      const b = Math.floor((num & 255) * intensity);
      return `${r}, ${g}, ${b}, 0.45`;
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [color, mousePos]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const IconVision: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconDefining: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m16 2 4 4 2-2" />
    <path d="M5 22h14" />
    <path d="M22 10a10 10 0 1 1-20 0" />
  </svg>
);

const IconStrategy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconDesign: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const IconLaunch: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 22h20L12 2z" strokeLinejoin="miter" />
    <path d="M12 18v-8" />
  </svg>
);

interface ProcessStep {
  title: string;
  role: string;
  description: string;
  icon: React.ReactNode;
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring animations for ambient backdrop spotlight
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Spotlight offset tracking
    rawMouseX.set(e.clientX - rect.left - 200);
    rawMouseY.set(e.clientY - rect.top - 200);

    // Coordinate normalization for 3D axis tilting
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: normX, y: normY });
  };

  // STRONGLY TYPED FRAMER MOTION VARIANTS (Fixes error code 2322)
  const cardStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Explicitly typed as cubic-bezier tuple
      }
    }
  };

  const steps: ProcessStep[] = [
    {
      title: "01. Strategy & Structure",
      role: "Mapping Your Real Objectives",
      description: "We don't start with code. We study your target market, map your actual business objectives, and structure a custom plan that optimizes user flow from first-click to conversion.",
      icon: <IconStrategy className="w-10 h-10 text-cyan-400" />
    },
    {
      title: "02. Premium Craftsmanship",
      role: "High-Fidelity Interface Design",
      description: "Our design system integrates modern layouts, customized visuals, and flawless responsive sizing across all screen types to position your company as a leader in your industry.",
      icon: <IconDesign className="w-10 h-10 text-pink-400" />
    },
    {
      title: "03. Seamless Deployment",
      role: "Optimizing Performance & Speed",
      description: "Every asset is polished, optimized for rapid load times, and seamlessly published to global networks, delivering a stable and lightning-fast experience to your clients.",
      icon: <IconLaunch className="w-10 h-10 text-emerald-400" />
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 md:py-36 overflow-hidden min-h-screen bg-zinc-950 text-white font-sans selection:bg-cyan-500 selection:text-black"
    >
      {/* Interactive spotlight glow using spring dynamics */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0 hidden md:block"
      />

      {/* Static atmosphere glow layouts */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-[140px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-[150px] transform translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Float element bracket container */}
      <motion.div 
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-12 left-12 w-20 h-20 z-10 hidden md:block border border-zinc-800/80 rounded-xl bg-zinc-900/30 p-2 backdrop-blur-xs cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        <StableSectionMarker3D color="#00e5ff" mousePos={mousePos} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-28 max-w-3xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono tracking-widest uppercase text-cyan-400 mb-4 block"
          >
            [ WHO WE ARE ]
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              About House  Of Digital Kenya
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed border-t border-b border-zinc-800/80 py-6 font-light">
            House  Of Digital  Kenya combines custom designs and reliable technology to build high-end websites that help your business grow.
          </p>
        </motion.div>

        {/* Dynamic Zigzag Core Highlights */}
        <div className="space-y-24 max-w-5xl mx-auto mb-36">
          
          {/* Section 1: Our Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center border-l border-zinc-800 p-6 md:p-8 bg-zinc-900/10 rounded-r-2xl border-y border-r border-zinc-800/50 backdrop-blur-xs hover:bg-zinc-900/20 transition-all duration-300"
          >
            <div className="md:col-span-8 text-center md:text-left order-2 md:order-1 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] tracking-tight">
                Our Vision
              </h3>
              <p className="text-zinc-200 leading-relaxed text-base md:text-lg font-medium">
                We craft easy-to-use digital experiences that help your company succeed.
              </p>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
                Your online presence should be unforgettable. We design clean, responsive pages that look stunning on desktops and mobile devices alike, turning regular visitors into loyal customers.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconVision
                  className="w-16 h-16 md:w-20 md:h-20 text-[#00F5A0] drop-shadow-[0_0_15px_rgba(0,245,160,0.2)]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Section 2: What Defines Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center border-r border-zinc-800 p-6 md:p-8 bg-zinc-900/10 rounded-l-2xl border-y border-l border-zinc-800/50 backdrop-blur-xs hover:bg-zinc-900/20 transition-all duration-300"
          >
            <div className="md:col-span-4 flex justify-center md:justify-start order-2 md:order-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconDefining
                  className="w-16 h-16 md:w-20 md:h-20 text-[#FFC371] drop-shadow-[0_0_15px_rgba(255,195,113,0.2)]"
                />
              </motion.div>
            </div>
            <div className="md:col-span-8 order-1 md:order-2 space-y-5 text-center md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] tracking-tight">
                What Defines Our Work
              </h3>
              <ul className="space-y-3 text-zinc-400 text-xs md:text-sm inline-block text-left md:text-right">
                {[
                  "Clean visual strategy focused entirely on user comfort and clear text.",
                  "Perfect layouts optimized seamlessly across phones, tablets, and computers.",
                  "Fast page loading speeds designed to keep your target audience fully engaged.",
                  "Long-term support to update and manage your website as your business grows.",
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    whileHover={{ x: -4 }}
                    className="flex items-start md:flex-row-reverse gap-3 cursor-pointer transition-colors hover:text-white"
                  >
                    <span className="mt-1.5 w-2 h-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-sm rotate-45 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Workflow Section */}
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto mb-36 space-y-12"
        >
          <div className="text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-pink-400 uppercase">[ CREATIVE WORKFLOW ]</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">Our Simplified Execution Path</h3>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">We remove the stress and confusion from website development. Here is exactly how we deliver results.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection Controls */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="relative w-full text-left p-5 rounded-xl transition-all duration-300 flex items-center gap-4 group focus:outline-none"
                >
                  {/* Absolute layoutId highlight */}
                  {activeStep === index && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="absolute inset-0 border border-zinc-800/40 rounded-xl pointer-events-none" />
                  
                  <div className={`p-2 rounded-lg bg-zinc-950 relative z-10 transition-opacity duration-300 ${activeStep === index ? "opacity-100" : "opacity-50 group-hover:opacity-85"}`}>
                    {step.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Stage 0{index + 1}</div>
                    <h4 className="font-bold text-sm text-white tracking-tight">{step.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Step Panel Visual */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl min-h-[280px] flex flex-col justify-between backdrop-blur-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-mono text-[70px] font-black text-zinc-800/15 select-none pointer-events-none">
                  0{activeStep + 1}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                      {steps[activeStep].role}
                    </div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      {steps[activeStep].title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-lg">
                      {steps[activeStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 pt-6">
                  {steps.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-400"
                        initial={{ width: "0%" }}
                        animate={{ width: activeStep === idx ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Operational Beliefs Block */}
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto space-y-12"
        >
          <div className="text-center">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">[ WORK ETHOS ]</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-2 tracking-tight">Our Operational Beliefs</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-900/60 transition-colors duration-300 cursor-pointer shadow-lg hover:border-zinc-700"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold mb-4">
                S
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Simplicity</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                We believe great design means eliminating clutter. Your clients should find exactly what they need instantly, with no friction.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-900/60 transition-colors duration-300 cursor-pointer shadow-lg hover:border-zinc-700"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold mb-4">
                P
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Precision</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every layout width, line height, button margin, and transition delay is calibrated perfectly so your brand feels remarkably professional.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-900/60 transition-colors duration-300 cursor-pointer shadow-lg hover:border-zinc-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold mb-4">
                E
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Evolution</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Websites are alive. We engineer sustainable, scalable structures that allow your digital assets to easily adapt as your client base expands.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}