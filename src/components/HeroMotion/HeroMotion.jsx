"use client";

import { useEffect, useRef, useState } from "react";
import "./HeroMotion.css";

export default function HeroMotion() {
  const panel = useRef(null);
  const video = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const move = (event) => {
      if (!fine.matches || reduced.matches) return;
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const reset = () => { target.x = 0; target.y = 0; };
    const render = () => {
      current.x += (target.x - current.x) * 0.065;
      current.y += (target.y - current.y) * 0.065;
      panel.current?.style.setProperty("--tilt-x", `${-current.y * 7}deg`);
      panel.current?.style.setProperty("--tilt-y", `${current.x * 9}deg`);
      panel.current?.style.setProperty("--light-x", `${50 + current.x * 30}%`);
      frame = requestAnimationFrame(render);
    };
    const preference = () => {
      reset();
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        video.current?.pause();
        setPaused(true);
        panel.current?.style.setProperty("--tilt-x", "0deg");
        panel.current?.style.setProperty("--tilt-y", "0deg");
      } else {
        if (fine.matches) render();
        video.current?.play().then(() => setPaused(false)).catch(() => setPaused(true));
      }
    };
    preference();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", preference);
    };
  }, []);

  const toggle = () => {
    if (video.current.paused) {
      video.current.play().then(() => setPaused(false)).catch(() => setPaused(true));
    } else {
      video.current.pause();
      setPaused(true);
    }
  };

  return (
    <div className="hero-motion-stage">
      <div className="hero-motion-panel" ref={panel}>
        <div className="hero-motion-screen">
          <video ref={video} muted loop playsInline preload="auto" poster="/motion/ostra-panther.jpg" aria-label="Black and white halftone animation of a running panther">
            <source src="/motion/ostra-panther.mp4" type="video/mp4" />
          </video>
          <div className="hero-motion-reflection" aria-hidden="true" />
          <button className="hero-motion-toggle" onClick={toggle} aria-label={paused ? "Play animation" : "Pause animation"}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}
