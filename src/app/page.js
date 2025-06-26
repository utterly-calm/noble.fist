"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  Code,
  Database,
  Cloud,
  Users,
  Award,
  Zap,
  Target,
  Globe,
} from "lucide-react";

// --- Data Configuration ---
const portfolioData = {
  name: "Vipul Sharma",
  initials: "VS",
  title: "Technology Lead / Technology Architect",
  tagline:
    "14+ Years of Full-Stack Excellence • Canadian Experience • Remote Ready",
  contact: {
    linkedin: "https://www.linkedin.com/in/utterly-calm",
    github: "https://github.com/utterly-calm",
    location: "Chandigarh, India",
  },
  summary: {
    p1: "Accomplished Technology Lead / Technology Architect with 14+ years of comprehensive full-stack development experience, including 2+ years of hands-on Canadian experience.",
    p2: "I specialize in architecting and developing robust solutions using modern technologies like React.js, Next.js, Node.js, and cloud platforms. My expertise spans from leading complex enterprise projects to mentoring development teams and delivering high-quality, scalable solutions.",
  },
  stats: [
    { value: "14+", label: "Years Experience", icon: <Target /> },
    { value: "50+", label: "Projects Led", icon: <Users /> },
    { value: "5+", label: "Fortune 500 Clients", icon: <Zap /> },
    { value: "100%", label: "Project Success", icon: <Award /> },
  ],
  skills: {
    frontend: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "Sitecore JSS",
      "React Native",
      "Angular",
      "HTML5/CSS3",
      "Tailwind CSS",
    ],
    backend: [
      "Node.js",
      "PHP",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "Loopback.js",
    ],
    frameworks: ["Zend Framework", "Laravel", "Yii2", "CodeIgniter", "CakePHP"],
    databases: [
      "MongoDB",
      "MySQL",
      "DynamoDB",
      "Firebase",
      "Doctrine",
      "Mongoose",
    ],
    cloud: ["AWS", "Azure", "AWS Cognito", "IAM", "API Gateway", "S3"],
    tools: ["Git", "JIRA", "Webpack", "Jest", "Mocha", "VSTS"],
  },
  experiences: [
    {
      company: "Nordic Semiconductor",
      role: "Technology Lead / Technology Architect",
      period: "May 2025 - Present",
      location: "via Infosys Limited",
      description:
        "Designing and implementing architecture for user login and registration systems using Microsoft Azure.",
      tech: ["Azure", "Security Architecture", "IoT Solutions"],
    },
    {
      company: "Littelfuse, Inc.",
      role: "Technology Lead",
      period: "Aug 2024 - May 2025",
      location: "via Infosys Limited",
      description:
        "Improved Next.js performance focusing on Lighthouse reports, optimized Coveo Search Engine integration, and led scalable React.js component development.",
      tech: ["Next.js", "React.js", "Performance Optimization", "Coveo Search"],
    },
    {
      company: "Assurant, Inc.",
      role: "Technology Lead / Architect",
      period: "Mar 2022 - May 2024",
      location: "via Infosys Limited",
      description:
        "Led architectural discussions for React.js and Node.js solutions in AWS and Azure, directing end-to-end project delivery.",
      tech: ["React.js", "Node.js", "AWS", "Azure", "Architecture"],
    },
    {
      company: "Molina Healthcare",
      role: "Technology Lead",
      period: "Mar 2021 - Mar 2022",
      location: "via Infosys Limited",
      description:
        "Engineered frontend architecture using React.js and Sitecore JSS, focusing on server-side rendering and performance.",
      tech: ["React.js", "Sitecore JSS", "SSR", "Healthcare"],
    },
  ],
  projects: [
    {
      title: "IoT User Management System",
      company: "Nordic Semiconductor",
      description:
        "Architecting secure user authentication and registration systems for IoT device management platform.",
      tech: ["Azure", "Security", "IoT", "Architecture"],
      status: "In Progress",
    },
    {
      title: "Performance Optimization Suite",
      company: "Littelfuse",
      description:
        "Comprehensive Next.js performance improvements achieving 40% faster load times through Lighthouse optimization.",
      tech: ["Next.js", "Performance", "Lighthouse", "SEO"],
      status: "Completed",
    },
    {
      title: "Enterprise React Components Library",
      company: "Assurant",
      description:
        "Built reusable React component library used across multiple projects, improving development efficiency by 60%.",
      tech: ["React.js", "Component Library", "AWS", "TypeScript"],
      status: "Completed",
    },
    {
      title: "Healthcare Portal Architecture",
      company: "Molina Healthcare",
      description:
        "Designed and implemented SSR-optimized healthcare portal serving millions of users with React.js and Sitecore.",
      tech: ["React.js", "Sitecore JSS", "SSR", "Healthcare"],
      status: "Completed",
    },
  ],
};

// --- Innovation: Performant Canvas-based Animated Background ---
const InteractiveBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 80;

    class Particle {
      constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
        this.baseX = this.x;
        this.baseY = this.y;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.weight;
        let directionY = forceDirectionY * force * this.weight;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 1.5 + 1;
        let color = "rgba(0, 255, 255, 0.5)";
        let weight = Math.random() * 1.5 + 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            (particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y);
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacityValue})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
});

// --- Main Page Sections ---

const Section = ({ id, children, className = "" }) => (
  <motion.section
    id={id}
    className={`py-24 px-6 relative ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="max-w-6xl mx-auto">{children}</div>
  </motion.section>
);

const SectionTitle = ({ children }) => (
  <motion.div
    className="text-center mb-16"
    variants={{
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      {children}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
  </motion.div>
);

const Hero = ({ onScrollDown }) => (
  <section
    id="hero"
    className="relative h-screen flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
    <InteractiveBackground />
    <motion.div
      className="relative z-10 text-center max-w-4xl mx-auto px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight">
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          {portfolioData.name.split(" ")[0].toUpperCase()}
        </span>
        <br />
        <span className="text-white">
          {portfolioData.name.split(" ")[1].toUpperCase()}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-cyan-400 font-light tracking-[0.2em] mb-6">
        {portfolioData.title.toUpperCase()}
      </p>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        {portfolioData.tagline}
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["React.js", "Next.js", "Node.js", "AWS", "Azure"].map(
          (tech, index) => (
            <motion.div
              key={tech}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-sm font-medium backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              {tech}
            </motion.div>
          )
        )}
      </div>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
          }}
          className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white flex items-center gap-2"
        >
          Let&apos;s Connect
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
        <motion.a
          href="#about"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(0, 255, 255, 0.1)",
          }}
          className="px-8 py-4 border border-cyan-500/50 rounded-full font-semibold text-cyan-400"
        >
          Explore My Work
        </motion.a>
      </motion.div>
    </motion.div>
    <motion.button
      onClick={onScrollDown}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 1.5,
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <ChevronDown className="w-8 h-8 text-cyan-400" />
    </motion.button>
  </section>
);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const About = () => (
  <Section id="about" className="bg-black">
    <SectionTitle>About Me</SectionTitle>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div className="space-y-6" variants={cardVariants} custom={0}>
        <p className="text-lg text-gray-300 leading-relaxed">
          {portfolioData.summary.p1}
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          {portfolioData.summary.p2}
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 text-cyan-400">
            <MapPin className="w-5 h-5" />
            <span>{portfolioData.contact.location}</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <Globe className="w-5 h-5" />
            <span>Canadian Employer-Specific Work Permit</span>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 gap-6">
        {portfolioData.stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            custom={i + 1}
            className={`text-center p-6 bg-gradient-to-br rounded-lg border ${
              i % 2 === 0
                ? "from-cyan-500/10 to-purple-500/10 border-cyan-500/20"
                : "from-purple-500/10 to-pink-500/10 border-purple-500/20"
            }`}
          >
            <div className="text-cyan-400 mb-3 w-8 h-8 mx-auto">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const Experience = () => (
  <Section id="experience" className="bg-gray-900/70 backdrop-blur-sm">
    <SectionTitle>Experience</SectionTitle>
    <div className="space-y-8">
      {portfolioData.experiences.map((exp, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          className="group relative p-8 bg-gradient-to-br from-black/50 to-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {exp.company}
              </h3>
              <p className="text-cyan-400 font-semibold">{exp.role}</p>
            </div>
            <div className="text-left md:text-right mt-2 md:mt-0 flex-shrink-0">
              <p className="text-purple-400 font-medium">{exp.period}</p>
              <p className="text-gray-400 text-sm">{exp.location}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Skills = () => {
  const icons = {
    frontend: <Code className="w-6 h-6 text-cyan-400 mr-3" />,
    backend: <Database className="w-6 h-6 text-purple-400 mr-3" />,
    frameworks: <Zap className="w-6 h-6 text-pink-400 mr-3" />,
    databases: <Database className="w-6 h-6 text-green-400 mr-3" />,
    cloud: <Cloud className="w-6 h-6 text-blue-400 mr-3" />,
    tools: <Award className="w-6 h-6 text-yellow-400 mr-3" />,
  };
  return (
    <Section id="skills" className="bg-black">
      <SectionTitle>Technical Expertise</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(portfolioData.skills).map(
          ([category, skillList], i) => (
            <motion.div
              key={category}
              custom={i}
              variants={cardVariants}
              className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                {icons[category]}
                <h3 className="text-xl font-bold text-white capitalize">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </Section>
  );
};

const Projects = () => (
  <Section id="projects" className="bg-gray-900/70 backdrop-blur-sm">
    <SectionTitle>Featured Projects</SectionTitle>
    <div className="grid md:grid-cols-2 gap-8">
      {portfolioData.projects.map((project, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          className="group relative p-8 bg-gradient-to-br from-black/50 to-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                {project.company}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === "Completed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}
            >
              {project.status}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Contact = () => {
  const contactMethods = [
    // {
    //   icon: <Mail />,
    //   title: "Email",
    //   value: portfolioData.contact.email,
    //   href: `mailto:${portfolioData.contact.email}`,
    //   color: "text-cyan-400",
    //   borderColor: "hover:border-cyan-500/50",
    // },
    {
      icon: <Linkedin />,
      title: "LinkedIn",
      value: "Connect Professionally",
      href: portfolioData.contact.linkedin,
      color: "text-purple-400",
      borderColor: "hover:border-purple-500/50",
    },
    // {
    //   icon: <Phone />,
    //   title: "Phone",
    //   value: portfolioData.contact.phone,
    //   href: `tel:${portfolioData.contact.phone}`,
    //   color: "text-pink-400",
    //   borderColor: "hover:border-pink-500/50",
    // },
  ];
  return (
    <Section id="contact" className="bg-black">
      <SectionTitle>Let&apos;s Connect</SectionTitle>
      <p className="text-center text-xl text-gray-300 max-w-4xl mx-auto mb-16">
        Ready to bring your next project to life? I&apos;m currently open to new
        opportunities and would love to discuss how we can collaborate to build
        something amazing.
      </p>
      <div className="grid md:grid-cols-1 gap-8 mb-12">
        {contactMethods.map((method, i) => (
          <motion.a
            key={method.title}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={cardVariants}
            className={`group flex flex-col items-center p-8 bg-gray-900/50 rounded-xl border border-gray-700/50 ${method.borderColor} transition-colors duration-300`}
          >
            <div
              className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300 ${method.color}`}
            >
              {method.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {method.title}
            </h3>
            <p className="text-gray-400 text-center">{method.value}</p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-black border-t border-gray-800">
    <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} {portfolioData.name}. Built with
        Next.js and a passion for great technology.
      </p>
    </div>
  </footer>
);

const Header = ({ isScrolled, activeSection }) => {
  const navItems = ["About", "Experience", "Skills", "Projects", "Contact"];
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          {portfolioData.initials}
        </a>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm uppercase tracking-wider transition-colors duration-300 hover:text-cyan-400 relative ${
                activeSection === item.toLowerCase()
                  ? "text-cyan-400"
                  : "text-gray-300"
              }`}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                  layoutId="underline"
                />
              )}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [
        "hero",
        "about",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const currentSection = sections.find((id) => {
        const element = document.getElementById(id);
        return (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        );
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-cyan-500/30">
      <Header isScrolled={isScrolled} activeSection={activeSection} />
      <main>
        <Hero onScrollDown={() => scrollToSection("about")} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
