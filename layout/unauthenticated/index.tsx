import React from "react";
import Features from "./features";
import HeroSection from './herosection';

import Footer from "components/molecules/Footer";
import Contact from "components/molecules/Contact";

export default function UnAuthenticated() {
  return (
    <React.Fragment>
      <HeroSection />
      <Features />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}
