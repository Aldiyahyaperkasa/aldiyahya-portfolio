import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Code2,
  GitBranch,
  Database,
  Layout,
  Terminal,
  ExternalLink,
  Download
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  year: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

// --- Data from CV ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SIOLGA",
    category: "Professional Project",
    year: "2025",
    image: "images/SIOLGA.jpg",
    description: "Sistem Informasi Keolahragaan Kutai Timur. A centralized dashboard for managing athletes, coaches, and sports achievements.",
    longDescription: "SIOLGA was developed to modernize the sports management ecosystem in Kutai Timur. It serves as a comprehensive platform for the Department of Youth and Sports (Dispora) to track athletic progress, manage coaching certifications, and document historical achievements across various sports branches.",
    problem: "Dispora faced challenges in data fragmentation, where athlete records and achievement histories were stored in disparate spreadsheets, making it difficult to generate real-time reports or verify credentials.",
    solution: "I designed a centralized MySQL database and a responsive web dashboard that allows for real-time data entry and monitoring. The system includes role-based access control for administrators and sports branch representatives.",
    tags: ["Web Dev", "Database", "Hosting"],
    codeUrl: "https://github.com/Aldiyahyaperkasa/si-olga"
    // liveUrl: "https://siolga-dispora.kutaitimurkab.go.id"
  },
  {
    id: 2,
    title: "KUDUNGGA RUN",
    category: "Professional Project",
    year: "2025",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1600",
    description: "Event registration system for Night Run Festival. Features integrated QR Code verification and payment validation.",
    longDescription: "Kudungga Run Festival is a major community event requiring a robust registration pipeline. The system handles thousands of participants, ensuring each entry is unique and verified through a secure payment gateway and QR code generation.",
    problem: "Manual registration and payment verification were causing long queues and potential for fraudulent entries during previous events.",
    solution: "Implemented an automated registration system with QR code generation for each participant. Integrated a payment proof upload and admin validation workflow to streamline the check-in process on the day of the event.",
    tags: ["Web Dev", "QR Integration", "Payment"]
  },
  {
    id: 3,
    title: "SANGATTA FESTIVAL RUN",
    category: "Professional Project",
    year: "2025",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1600",
    description: "Registration system for Sangatta Festival Run with admin confirmation and payment proof upload features.",
    longDescription: "A specialized registration platform for the Sangatta Festival Run, focusing on category-based quota management and secure data handling for participants.",
    problem: "The event had strict quotas for different age and distance categories, which were difficult to manage manually, leading to overbooking.",
    solution: "Developed a real-time quota tracking system that automatically closes registration for specific categories once the limit is reached. Included a robust admin panel for managing participant data and verifying payments.",
    tags: ["Web Dev", "Admin Dashboard", "Logic"]
  },
  {
    id: 4,
    title: "BUILDING RENTAL",
    category: "Academic Project",
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    description: "Sistem Informasi Peminjaman Gedung. Managed rental flows, database design with ERD, and status validation.",
    longDescription: "This academic project focused on creating a streamlined workflow for public building rentals. It covers the entire process from initial inquiry to final approval and scheduling.",
    problem: "The existing manual process for building rentals was prone to double-booking and lacked transparency for the public regarding availability.",
    solution: "Designed a system with a public-facing availability calendar and an internal approval workflow. Used ERD modeling to ensure a robust database structure that prevents scheduling conflicts.",
    tags: ["MySQL", "System Analysis", "UI Design"]
  }
];

const SKILLS = [
  { name: "System Analysis", icon: <GitBranch className="w-5 h-5" />, items: ["Context Diagram", "Data Flow Diagram (DFD)", "Flow of Document", "Entity Relationship Diagram (ERD)", "System Design"] },
  { name: "Web Development", icon: <Layout className="w-5 h-5" />, items: ["HTML", "CSS", "Bootstrap", "Tailwind", "JavaScript", "PHP"] },
  // { name: "Programming", icon: <Terminal className="w-5 h-5" />, items: ["JavaScript", "PHP", "C++", "Java"] },
  { name: "Database", icon: <Database className="w-5 h-5" />, items: ["MySQL", "ERD Design", "System Analysis"] },
  { name: "Tools & Others", icon: <Code2 className="w-5 h-5" />, items: ["CPanel", "Microsoft Office", "Git", "UI Design"] },
];

const EXPERIENCE = [
  {
    company: "PT. Kaltim Methanol Industri",
    role: "IT Section",
    period: "Mar 2023 – Jun 2023",
    description: "Collaborated on IT asset management, system analysis, and web application development."
  },
  {
    company: "Kantor BPJS Ketenagakerjaan",
    role: "Staff Administrasi",
    period: "Aug 2021 – May 2022",
    description: "Managed membership reports, company registrations, and data validation for participants."
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-display tracking-tighter"
      >
        Aldi Yahya Perkasa
      </motion.div>
      
      <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase">
        {['Work', 'Skills', 'About', 'Contact'].map((item) => (
          <motion.a 
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2, color: '#F27D26' }}
            className="hover:text-accent transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>

      <button 
        className="md:hidden text-paper"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-ink p-8 flex flex-col gap-6 text-2xl font-display border-b border-white/10"
          >
            {['Work', 'Skills', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs font-bold tracking-[0.5em] uppercase text-accent mb-6"
        >
          Informatics Engineer, Web Developer & System Analyst
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14vw] lg:text-[12vw] font-display leading-[0.8] tracking-tighter uppercase"
        >
          ALDI YAHYA<br />PERKASA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg font-light tracking-widest uppercase opacity-60"
        >
          Bridging Logic & Creativity
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Explore Portfolio</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>
    </section>
  );
};

const ProjectDetailOverlay = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-2xl overflow-y-auto no-scrollbar"
    >
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-8 right-8 z-[110] w-16 h-16 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors group"
      >
        <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden mb-12"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-6">The Challenge</h3>
                <p className="text-2xl font-light leading-relaxed text-paper/80">
                  {project.problem}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-6">The Solution</h3>
                <p className="text-2xl font-light leading-relaxed text-paper/80">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4 block">
                {project.category} — {project.year}
              </span>
              <h2 className="text-7xl font-display tracking-tighter uppercase mb-8">
                {project.title}
              </h2>
              <p className="text-xl font-light leading-relaxed text-paper/60 mb-12">
                {project.longDescription}
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 text-xs uppercase tracking-widest border border-white/10 rounded-full bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex gap-6">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-accent text-ink rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center"
                    >
                      Live Preview
                    </a>
                  )}
                  {project.codeUrl && (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-4 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-center"
                    >
                      View Code
                    </a>
                  )}
                  {!project.liveUrl && !project.codeUrl && (
                    <div className="flex-1 py-4 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-paper/40 text-center italic">
                      Project details are internal/private
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <section id="work" className="relative h-screen w-full overflow-hidden bg-ink flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink z-10" />
          <motion.img
            src={PROJECTS[currentIndex].image}
            alt={PROJECTS[currentIndex].title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <motion.div
            key={`meta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-4"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
              {PROJECTS[currentIndex].category}
            </span>
            <span className="text-xs font-mono opacity-50">{PROJECTS[currentIndex].year}</span>
          </motion.div>
          
          <motion.h2
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[12vw] lg:text-[10vw] font-display leading-[0.85] tracking-tighter mb-8"
          >
            {PROJECTS[currentIndex].title}
          </motion.h2>

          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-lg text-paper/70 font-light leading-relaxed mb-8"
          >
            {PROJECTS[currentIndex].description}
          </motion.p>

          <motion.div 
            key={`tags-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {PROJECTS[currentIndex].tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/20 rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.button
            onClick={() => setSelectedProject(PROJECTS[currentIndex])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-16 h-16 rounded-full border border-paper/30 flex items-center justify-center group-hover:bg-paper group-hover:text-ink transition-all duration-300">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">Project Details</span>
          </motion.button>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 lg:right-12 z-30 flex items-center gap-4">
        <div className="flex items-center gap-2 mr-8">
          {PROJECTS.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1 transition-all duration-500 rounded-full",
                idx === currentIndex ? "w-12 bg-accent" : "w-4 bg-white/20"
              )}
            />
          ))}
        </div>
        <button 
          onClick={prev}
          className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailOverlay 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-ink">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-4 block">Expertise</span>
            <h2 className="text-7xl font-display tracking-tighter uppercase">Capabilities</h2>
          </div>
          <p className="max-w-md text-paper/50 font-light">
            Specialized in building robust web systems and managing IT infrastructure with a focus on efficiency and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {SKILLS.map((skill, idx) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-ink p-10 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                {skill.icon}
              </div>
              <h3 className="text-xl font-display uppercase mb-6">{skill.name}</h3>
              <ul className="space-y-3">
                {skill.items.map(item => (
                  <li key={item} className="text-sm text-paper/60 font-light flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-paper text-ink">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-6xl font-display tracking-tighter uppercase mb-8">
              Fresh Graduate <span className="italic font-serif normal-case text-accent">Cumlaude</span> with a passion for systems.
            </h2>
            <div className="flex gap-4 mt-12">
              <a 
                href="https://drive.google.com/file/d/1cWK-_8vTMYMhYazkl_R8fzcpEdL616x5/view?usp=sharings" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-ink text-paper rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-accent transition-colors"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-2xl font-light leading-relaxed mb-16">
              S1 Teknik Informatika graduate from Sekolah Tinggi Teknologi Bontang (IPK 3.55). Experienced in web system design, database management, and IT solutions.
            </p>
            
            <div className="space-y-12">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 border-b border-ink/10 pb-4">Experience</h4>
              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-sm font-bold uppercase tracking-wider">{exp.period}</div>
                  <div className="md:col-span-2">
                    <h5 className="text-xl font-display uppercase">{exp.role}</h5>
                    <p className="text-accent text-sm font-bold mb-2">{exp.company}</p>
                    <p className="text-ink/60 font-light">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "aldiyahyap@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-ink py-32 px-6">
      <div className="container mx-auto text-center">
        <span className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-8 block">Get in touch</span>
        
        <div className="relative inline-block group">
          <a href={`mailto:${email}`}>
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              className="text-[10vw] font-display tracking-tighter uppercase mb-4 hover:text-accent transition-colors cursor-pointer"
            >
              {email}
            </motion.h2>
          </a>
          <button 
            onClick={copyToClipboard}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-accent font-bold"
          >
            {copied ? "Copied to clipboard!" : "Click to email or hover to copy"}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-16 mt-16">
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/aldiyahyaperkasa" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://wa.me/6281212312668" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
              <Mail className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          
          <div className="text-right">
            <p className="text-xs font-bold tracking-widest uppercase opacity-40 mb-2">Location</p>
            <p className="text-xl font-display">BONTANG, INDONESIA</p>
          </div>
        </div>
        
        <div className="mt-32 text-[10px] uppercase tracking-[0.5em] opacity-20">
          &copy; 2024 ALDI YAHYA PERKASA &mdash; ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="relative no-scrollbar">
      <Navbar />
      <Hero />
      <ProjectCarousel />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
