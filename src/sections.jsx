/* global React, window */

function Marquee() {
  const words = ["Frontend", "Three.js", "React", "Angular", "WebGL", "Design Systems", "Motion", "TypeScript", "Node", "Creative Code"];
  const loop = [...words, ...words];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((w,i) => (
          <span key={i}>{w} <span className="sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="block" data-screen-label="03 About" id="about">
      <div className="section-head">
        <div className="section-tag"><span className="num">/ 03</span><span>About</span><span>Practice</span></div>
        <h2 className="section-title">Engineer first. <span className="it">Designer</span> always.</h2>
      </div>
      <div className="about-grid">
        <p className="about-lead">
          Nine years building interfaces that earn their keep — from Google-scale internal tooling to manufacturing floors to influencer marketplaces. I care about <em>frame budgets</em>, the cadence of a good transition, and what a component’s API says about the team that wrote it.
        </p>
        <div className="about-side">
          <p>
            I spend most of my time in the seam between product and performance — type that renders well at every scale, state machines that survive real users, and the kind of motion that tells you what just happened without saying so.
          </p>
          <p>
            Outside the day job: creative coding, a growing collection of generative posters, and the slow-burn hunt for problems that reward a senior engineer who still likes to sketch.
          </p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="n">09<em>+</em></div><div className="l">Years shipping</div></div>
        <div className="stat"><div className="n">40<em>+</em></div><div className="l">Production releases</div></div>
        <div className="stat"><div className="n">03</div><div className="l">Excellence awards</div></div>
        <div className="stat"><div className="n">14</div><div className="l">Teams supported</div></div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="block" data-screen-label="04 Experience" id="experience">
      <div className="section-head">
        <div className="section-tag"><span className="num">/ 04</span><span>Experience</span><span>2016 — Now</span></div>
        <h2 className="section-title">A <span className="it">decade</span>, in layers.</h2>
      </div>
      <div className="timeline">
        <div className="timeline-years">FIVE COMPANIES · FIVE INDUSTRIES · ONE CRAFT</div>
        <div className="timeline-list">
          {window.EXPERIENCE.map(e => (
            <div className="tl-item" key={e.when}>
              <div className="tl-when">{e.when}</div>
              <div className="tl-role">{e.role}<span className="co">{e.co}</span></div>
              <div className="tl-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="block" data-screen-label="05 Skills" id="skills">
      <div className="section-head">
        <div className="section-tag"><span className="num">/ 05</span><span>Stack</span><span>Daily drivers</span></div>
        <h2 className="section-title">Tools I <span className="it">reach</span> for.</h2>
      </div>
      <div className="skills-grid">
        {window.SKILLS.map(s => (
          <div className="skill-col" key={s.head}>
            <h4>{s.head}</h4>
            <ul>
              {s.items.map(i => <li key={i}><span className="dot"></span>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="block" data-screen-label="06 Awards" id="awards">
      <div className="section-head">
        <div className="section-tag"><span className="num">/ 06</span><span>Recognition</span><span>Selected</span></div>
        <h2 className="section-title">Receipts, <span className="it">kept</span>.</h2>
      </div>
      <div className="awards">
        {window.AWARDS.map(a => (
          <div className="award" key={a.ttl}>
            <div className="ribbon"></div>
            <div className="yr">{a.yr}</div>
            <h3 className="ttl">{a.ttl} <em>{a.it}</em></h3>
            <p>{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = React.useState(false);
  const email = "krishnatejam987@gmail.com";

  const handleClick = async (e) => {
    // Let mailto: fire naturally, but also copy to clipboard as a fallback
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <section className="contact" data-screen-label="07 Contact" id="contact">
      <h2>
        <span>Let’s</span><br/>
        <span className="it">make</span> <span className="outline">something</span><br/>
        <span>remarkable.</span>
      </h2>
      <a
        className="contact-email"
        href={`mailto:${email}`}
        onClick={handleClick}
        data-cursor-hover
      >
        {copied ? "Copied to clipboard ✓" : `${email} →`}
      </a>
      <div className="contact-meta">
        <a href="tel:+919966269426" data-cursor-hover>+91 · 99 6626 9426</a>
        <a href="https://leetcode.com/u/krishna4mi/" target="_blank" rel="noreferrer" data-cursor-hover>LeetCode — krishna4mi</a>
        <a href="https://maps.google.com/?q=Hyderabad" target="_blank" rel="noreferrer" data-cursor-hover>Hyderabad, IN</a>
      </div>
      <footer className="foot">
        <div>© 2026 Krishna Teja Medam</div>
        <div>v 1.0</div>
      </footer>
    </section>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="dot"></span>
        <span>KTM / Portfolio 2026</span>
      </div>
      <div className="nav-links">
        <a href="#work" data-n="01" data-cursor-hover>Work</a>
        <a href="#about" data-n="02" data-cursor-hover>About</a>
        <a href="#experience" data-n="03" data-cursor-hover>Experience</a>
        <a href="#awards" data-n="04" data-cursor-hover>Awards</a>
      </div>
      <a href="#contact" className="nav-cta" data-cursor-hover>Say hello →</a>
    </nav>
  );
}

Object.assign(window, { Marquee, About, Experience, Skills, Awards, Contact, Nav });
