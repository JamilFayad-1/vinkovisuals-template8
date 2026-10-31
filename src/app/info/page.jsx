"use client";
import "./info.css";
import { useRef } from "react";

import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const InfoPage = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".info-wrapper .revealer p, #info-description p", {
      y: 16, opacity: 0, duration: 0.45, stagger: 0.025,
      ease: "power3.out", delay: 0.1,
    });
  }, { scope: containerRef });

  return (
    <div className="info-page" ref={containerRef}>
      <div className="info-wrapper">
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>Info</p>
              </div>
            </div>
            <div
              className="info-copy"
              id="info-description"
            >
              <p>
                Ostra is a thoughtfully curated marketplace for digital
                design assets, tailored for creatives who value minimalism,
                clarity, and intentionality. Our collection includes everything
                from refined mockups and sleek UI templates to motion elements,
                sound effects, and graphic components—each crafted to elevate
                the way visual stories are told. Whether you're a designer
                shaping a brand, a developer building an interface, or an artist
                exploring new mediums, Ostra offers tools that are as
                functional as they are beautiful, designed to seamlessly
                integrate into modern workflows and creative processes.
              </p>
              <p>
                We believe great design is about more than aesthetics—it's about
                purpose, utility, and the subtle details that create emotional
                resonance. That's why we partner with independent designers and
                studios across the globe who share our commitment to quality and
                simplicity. Every asset we feature is carefully selected to
                ensure it meets our standards for visual precision and
                usability. At Ostra, we aim to be more than just a
                resource—we’re building a creative ecosystem where thoughtful
                design lives, evolves, and empowers creators to do their best
                work with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>What You Get</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Curated digital assets</p>
              </div>
              <div className="revealer">
                <p>Ready to use</p>
              </div>
              <div className="revealer">
                <p>No subscriptions</p>
              </div>
              <div className="revealer">
                <p>Pay once, own forever</p>
              </div>
            </div>
          </div>
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>Contact</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Creator Collaborations</p>
              </div>
              <div className="revealer">
                <p>hello@ostra.example</p>
              </div>
              <br />
              <div className="revealer">
                <p>Customer Support</p>
              </div>
              <div className="revealer">
                <p>hello@ostra.example</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
