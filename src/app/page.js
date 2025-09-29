"use client";

import HomeSection from "./home/HomeSection";
import About from "./About/About";
import Services from "./Services/Services";
import Skills from "./Skills/Skills";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Experience from "./Experiances/Experiances";
import Education from "./Education/Education";
import ProjectWorks from "./ProjectWorks/ProjectsWorks";
import Blog from "./Blog/Blog";


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Complete Home Section with integrated sidebar navigation */}
      <HomeSection />
      
      {/* Other Sections */}
      <section id="about">
        <About />
      </section>
      
      <section id="services">
        <Services />
      </section>
      
      <section id="skills">
        <Skills />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <ProjectWorks />
      </section>
      
      <section id="blog">
        <Blog />
      </section>
          
      
      <section id="contact">
        <Contact />
      </section>
      
      <Footer />
    </div>
  );
}