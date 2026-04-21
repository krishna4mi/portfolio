/* global React, window */
const { useState, useRef, useEffect } = React;

// Visual mockups drawn as SVG so hover preview is instant (no network, no images)
function ProjectMockup({ kind, palette }) {
  const [bg, accent, tone] = palette;
  if (kind === "grid") {
    // Trading desk — candlesticks + order book
    const bars = Array.from({ length: 40 }, (_, i) => {
      const h = 20 + Math.abs(Math.sin(i*0.6) * 40) + Math.random()*15;
      const y = 110 - h/2;
      const up = i % 3 !== 1;
      return <g key={i}>
        <line x1={10+i*8.5} x2={10+i*8.5} y1={y-8} y2={y+h+8} stroke={up?accent:tone} strokeWidth="1"/>
        <rect x={7+i*8.5} y={y} width="6" height={h} fill={up?accent:tone}/>
      </g>;
    });
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        <g opacity=".2">
          {Array.from({length:8},(_,i)=><line key={i} x1="0" x2="360" y1={20+i*25} y2={20+i*25} stroke="#fff" strokeWidth=".3"/>)}
        </g>
        {bars}
        <rect x="260" y="10" width="90" height="200" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.1)"/>
        {Array.from({length:14},(_,i)=>(
          <g key={i}>
            <rect x="264" y={16+i*13} width={40+Math.random()*30} height="8" fill={i<7?accent:tone} opacity=".45"/>
            <text x="308" y={23+i*13} fill="#fff" fontSize="7" fontFamily="monospace" opacity=".8">{(42100+Math.random()*200|0)}</text>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "editor") {
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        <rect x="0" y="0" width="360" height="28" fill="rgba(0,0,0,.25)"/>
        <circle cx="14" cy="14" r="4" fill={accent}/>
        <circle cx="28" cy="14" r="4" fill="#fff" opacity=".2"/>
        <circle cx="42" cy="14" r="4" fill="#fff" opacity=".2"/>
        <text x="180" y="18" fontSize="9" fill={tone} textAnchor="middle" fontFamily="serif" fontStyle="italic">paperlane · a quiet place to write</text>
        <text x="30" y="66" fontSize="22" fill={tone} fontFamily="serif" fontWeight="300">On the grammar of</text>
        <text x="30" y="92" fontSize="22" fill={accent} fontFamily="serif" fontStyle="italic">interfaces.</text>
        {Array.from({length:6},(_,i)=>(
          <rect key={i} x="30" y={110+i*14} width={280-i*18} height="6" rx="1" fill={tone} opacity={i===2?.9:.35}/>
        ))}
        <rect x="30" y="210" width="30" height="4" fill={accent}/>
      </svg>
    );
  }
  if (kind === "orb") {
    // Dependency graph
    const nodes = Array.from({ length: 28 }, () => ({ x: 20 + Math.random()*320, y: 20 + Math.random()*180, r: 2 + Math.random()*4 }));
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        {nodes.map((a,i) => nodes.slice(i+1, i+4).map((b,j) => (
          <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={tone} strokeWidth=".4" opacity=".4"/>
        )))}
        {nodes.map((n,i) => <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i%5===0?accent:tone} opacity={i%5===0?1:.7}/>)}
        <circle cx="180" cy="110" r="18" fill="none" stroke={accent} strokeWidth="1"/>
        <circle cx="180" cy="110" r="30" fill="none" stroke={accent} strokeWidth=".4" opacity=".5"/>
      </svg>
    );
  }
  if (kind === "mobile") {
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        <rect x="130" y="15" width="100" height="190" rx="12" fill="rgba(255,255,255,.04)" stroke={tone} strokeWidth="1"/>
        <rect x="140" y="28" width="80" height="40" rx="3" fill={accent} opacity=".9"/>
        <text x="148" y="45" fontSize="9" fill={bg} fontFamily="monospace">JOB #2241</text>
        <text x="148" y="58" fontSize="7" fill={bg} fontFamily="monospace" opacity=".7">METER REPLACE · 28 MIN</text>
        {Array.from({length:5},(_,i)=>(
          <g key={i}>
            <rect x="140" y={78+i*22} width="80" height="18" rx="2" fill="rgba(255,255,255,.05)" stroke={tone} strokeWidth=".4"/>
            <circle cx="148" cy={87+i*22} r="3" fill={i<2?accent:tone} opacity={i<2?1:.4}/>
            <rect x="156" y={83+i*22} width="50" height="3" fill={tone} opacity=".6"/>
            <rect x="156" y={89+i*22} width="30" height="2" fill={tone} opacity=".3"/>
          </g>
        ))}
        <text x="30" y="40" fontSize="8" fill={tone} fontFamily="monospace" opacity=".6">OFFLINE · 12d</text>
        <text x="30" y="55" fontSize="8" fill={accent} fontFamily="monospace">SYNC QUEUE 41</text>
        <text x="260" y="40" fontSize="8" fill={tone} fontFamily="monospace" opacity=".6" textAnchor="start">BATT 74%</text>
      </svg>
    );
  }
  if (kind === "tokens") {
    const swatches = [accent, tone, "#FFFFFF", "#B7ADFF", "#82D8C6", "#F6C667"];
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        <text x="30" y="40" fontSize="9" fill={tone} fontFamily="monospace" letterSpacing="1">--color.core</text>
        {swatches.map((c,i)=>(
          <g key={i}>
            <rect x={30+i*52} y="54" width="44" height="44" rx="2" fill={c}/>
            <text x={32+i*52} y="112" fontSize="6" fill={tone} fontFamily="monospace" opacity=".7">00{i+1}</text>
          </g>
        ))}
        <text x="30" y="142" fontSize="9" fill={tone} fontFamily="monospace" letterSpacing="1">--scale.type</text>
        {[8,11,15,20,28,40].map((s,i)=>(
          <text key={i} x={30+i*52} y="180" fontSize={s} fill={i===3?accent:tone} fontFamily="serif" fontWeight="300">Aa</text>
        ))}
      </svg>
    );
  }
  if (kind === "poster") {
    const dots = [];
    for (let y=0;y<22;y++) for (let x=0;x<36;x++) {
      const cx = x*10+8, cy = y*10+8;
      const dx = cx-180, dy = cy-110;
      const d = Math.sqrt(dx*dx+dy*dy);
      const r = Math.max(.3, 4 - d/28 + Math.sin((x+y)*.6)*0.8);
      dots.push(<circle key={`${x}-${y}`} cx={cx} cy={cy} r={r} fill={d<60?accent:tone} opacity={d<60?1:.6}/>);
    }
    return (
      <svg viewBox="0 0 360 220" style={{ background: bg, width: "100%", height: "100%" }}>
        {dots}
      </svg>
    );
  }
  return null;
}

function ProjectRow({ p, onHover }) {
  const rowRef = useRef(null);
  const visualRef = useRef(null);

  const onMove = (e) => {
    if (!visualRef.current || !rowRef.current) return;
    const r = rowRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // position visual near cursor
    visualRef.current.style.left = `${Math.max(200, Math.min(r.width - 380, x - 180))}px`;
    visualRef.current.style.top = `${y}px`;
    visualRef.current.style.right = "auto";
  };

  return (
    <article
      ref={rowRef}
      className="project-row"
      onMouseMove={onMove}
      data-cursor-hover
    >
      <div className="project-num">/ {p.n}</div>
      <h3 className="project-title">
        {p.title} <em>{p.titleIt}</em>
      </h3>
      <div className="project-meta">
        <div className="project-year">{p.year}</div>
        <div className="project-tags">
          {p.tags.map(t => <span key={t}>{t}</span>)}
        </div>
        <div style={{ color: "var(--fg-dim)", maxWidth: "34ch", textAlign: "right", textTransform: "none", letterSpacing: 0, fontFamily: "var(--sans)", lineHeight: 1.6, fontSize: 13 }}>
          {p.desc}
        </div>
      </div>
      <div ref={visualRef} className="project-visual">
        <ProjectMockup kind={p.kind} palette={p.palette} />
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="block" data-screen-label="02 Projects" id="work">
      <div className="section-head">
        <div className="section-tag"><span className="num">/ 02</span><span>Selected Work</span><span>2022 — 2025</span></div>
        <h2 className="section-title">A portfolio of <span className="it">shipped</span> craft.</h2>
      </div>
      <div className="projects">
        {window.PROJECTS.map(p => <ProjectRow key={p.n} p={p} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Projects, ProjectMockup });
