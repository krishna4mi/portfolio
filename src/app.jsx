/* global React, ReactDOM, window */
const { useEffect, useState, useRef } = React;

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; if (dotRef.current) dotRef.current.style.transform = `translate3d(${x-3}px,${y-3}px,0)`; };
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor-hover], a, button");
      document.body.classList.toggle("cursor-hover", !!t);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    let raf;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx-18}px,${ry-18}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerover", onOver); };
  }, []);
  return <>
    <div ref={dotRef} className="cursor-dot"/>
    <div ref={ringRef} className="cursor-ring"/>
  </>;
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .word-reveal, .section-title, .section-tag, .about-lead, .stat, .tl-item, .skill-col, .award, .project-row, .hero-eyebrow, .hero-footer, .hero-scroll");
    els.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function App() {
  const [tweakVersion, setTV] = useState(0);
  const [tweaks, setTweaks] = useState(window.__TWEAKS__ || {});

  useEffect(() => {
    const onChange = (e) => { setTweaks({ ...e.detail }); setTV(v => v+1); };
    window.addEventListener("tweaks:changed", onChange);
    return () => window.removeEventListener("tweaks:changed", onChange);
  }, []);

  useRevealOnScroll();

  // GSAP ScrollTrigger for section titles and project rows
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    const ctx = window.gsap.context(() => {
      // Section titles
      document.querySelectorAll(".section-title").forEach(el => {
        window.gsap.from(el, {
          y: 80, opacity: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
      // Section tags
      document.querySelectorAll(".section-tag").forEach(el => {
        window.gsap.from(el, {
          x: -20, opacity: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
      // Project rows
      document.querySelectorAll(".project-row").forEach((el, i) => {
        window.gsap.from(el, {
          y: 60, opacity: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
      // Timeline items
      document.querySelectorAll(".tl-item").forEach((el) => {
        window.gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
      // Stats
      document.querySelectorAll(".stat").forEach((el, i) => {
        window.gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, delay: i * 0.08, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
      // Awards
      document.querySelectorAll(".award").forEach((el, i) => {
        window.gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, delay: i * 0.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
      // Skill columns
      document.querySelectorAll(".skill-col").forEach((el, i) => {
        window.gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, delay: i * 0.12, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
      // Contact huge text
      window.gsap.from(".contact h2 span", {
        y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".contact", start: "top 75%" }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {tweaks.showCursor !== false && <Cursor />}
      <div className="grain"></div>
      <window.Nav />
      <window.Hero key={tweakVersion} accent={tweaks.accent || "#E86C2A"} />
      <window.Marquee />
      <window.Projects />
      <window.About />
      <window.Experience />
      <window.Skills />
      <window.Awards />
      <window.Contact />
      <window.Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
