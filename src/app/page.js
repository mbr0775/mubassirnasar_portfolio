"use client";

import Navbar from "./home/Navbar";
import HomeSection from "./home/HomeSection";
import About from "./About/About";
import FeaturedProjects from "./FeaturedProjects/FeaturedProjects";
import Achievements from "./Achievements/Achievements";
import Footer from "./Footer/Footer";
import Contact from "./Contact/Contact";
import Skills from "./Skills/Skills";
import Ventures from "./Ventures/Ventures";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section id="home">
        <HomeSection />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <FeaturedProjects />
      </section>
      <section id="ventures">
        <Ventures />
      </section>
      <section id="achievements">
        <Achievements />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}