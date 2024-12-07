import React from "react";
import Hero from "./Hero";
import Stats from "./Stats";
import WhyUs from "./WhyUs";
import FAQ from "./FAQ";
import Courses from "./Courses";
import Contact from "./Contact";

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <WhyUs />
      <Courses />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;
