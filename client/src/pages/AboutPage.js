import React from 'react';
import About from '../components/About';
import { SEO } from '../components/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About ADORN"
        description="ADORN is an ISO-certified brand specializing in structured cabling and Extra-Low Voltage (ELV) infrastructure solutions for commercial, industrial, residential, and data center projects across the UAE, GCC, and international markets."
        url="/about"
      />
      <About />
    </>
  );
}
