import React from "react";
import Features from "./features";
import HeroSection from './herosection';
import Footer from "../../components/molecules/Footer";

export default function UnAuthenticated() {
  return (
    <React.Fragment>
      <HeroSection />
      <Features />
      <Footer />
    </React.Fragment>
  );
}
