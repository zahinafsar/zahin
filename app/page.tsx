import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Showreel from "./components/Showreel";
import About from "./components/About";
import Experience from "./components/Experience";
import Recommendations from "./components/Recommendations";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Featured from "./components/Featured";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main id="main" className="relative">
      <Nav />
      <Hero />
      <Showreel />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Featured />
      <Recommendations />
      {/* <Faq /> */}
      <Contact />
      <Footer />
    </main>
  );
}
