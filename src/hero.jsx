/* global React, THREE, gsap, window */
const { useEffect, useRef } = React;

function HeroCanvas({ accent = "#E86C2A" }) {
  const ref = useRef(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5.0);
    camera.lookAt(0, 1.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const accentColor = new THREE.Color(accent);

    // Lights
    const key = new THREE.DirectionalLight(accentColor, 3.0);
    key.position.set(3, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7A9BC7, 1.8);
    rim.position.set(-3, 2, -2);
    scene.add(rim);
    const fill = new THREE.AmbientLight(0xF1ECE3, 0.4);
    scene.add(fill);
    const ground = new THREE.HemisphereLight(0xF1ECE3, 0x1E1A16, 0.5);
    scene.add(ground);

    // Placeholder character (stylized figure, shown until GLTF loads)
    const placeholder = new THREE.Group();
    scene.add(placeholder);

    // Character root group (will receive loaded GLTF)
    const charRoot = new THREE.Group();
    charRoot.position.set(0, -1.2, 0);
    scene.add(charRoot);

    let mixer = null;
    let action = null;
    let loadedModel = null;

    // Load Xbot — a realistic rigged humanoid from Three.js examples (Mixamo-style)
    const loader = new THREE.GLTFLoader();
    const url = "https://threejs.org/examples/models/gltf/Xbot.glb";

    loader.load(url, (gltf) => {
      loadedModel = gltf.scene;
      loadedModel.scale.setScalar(1.0);
      loadedModel.position.set(0, 0, 0);

      // Tasteful material pass — give the character studio-lit look
      loadedModel.traverse((obj) => {
        if (obj.isMesh && obj.material) {
          const m = obj.material.clone();
          if (m.color) {
            const name = (obj.name || "").toLowerCase();
            if (name.includes("body") || name.includes("shirt") || name.includes("torso")) {
              m.color.set(accent);
            } else if (name.includes("head") || name.includes("face")) {
              m.color.set(0xE8D4B8);
            }
          }
          if ("metalness" in m) m.metalness = 0.15;
          if ("roughness" in m) m.roughness = 0.75;
          obj.material = m;
        }
      });

      charRoot.add(loadedModel);

      // Entrance animation via GSAP
      if (window.gsap) {
        loadedModel.position.y = -1;
        window.gsap.to(loadedModel.position, { y: 0, duration: 1.4, ease: "expo.out" });
        window.gsap.from(loadedModel.rotation, { y: -Math.PI * 0.5, duration: 1.8, ease: "expo.out" });
      }

      // Animations — Xbot ships with Idle, Walking, Running, Dance, Death, etc.
      mixer = new THREE.AnimationMixer(loadedModel);
      const clips = gltf.animations || [];
      const preferred = ["Idle", "idle", "Dance", "Walking", "Walk"];
      let clip = null;
      for (const name of preferred) {
        clip = clips.find(c => c.name === name);
        if (clip) break;
      }
      if (!clip && clips.length) clip = clips[0];
      if (clip) {
        action = mixer.clipAction(clip);
        action.play();
      }
    }, undefined, (err) => {
      console.warn("GLTF load failed, keeping placeholder", err);
      // Fallback: simple figure
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 20),
        new THREE.MeshStandardMaterial({ color: 0xE8D4B8, roughness: 0.6 })
      );
      head.position.set(0, 1.65, 0);
      charRoot.add(head);
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.35, 0.9, 12),
        new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.6 })
      );
      body.position.set(0, 0.95, 0);
      charRoot.add(body);
    });

    // Floating geometric "ideas" around the character
    const ideaGroup = new THREE.Group();
    const ideas = [];
    const ideaShapes = [
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.TorusGeometry(0.1, 0.035, 6, 16),
      new THREE.OctahedronGeometry(0.11),
      new THREE.BoxGeometry(0.14, 0.14, 0.14),
      new THREE.TetrahedronGeometry(0.13),
    ];
    ideaShapes.forEach((g, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? accentColor : 0xF1ECE3,
        emissive: i % 2 === 0 ? accentColor : 0x000000,
        emissiveIntensity: i % 2 === 0 ? 0.5 : 0,
        roughness: 0.4,
        metalness: 0.2,
        wireframe: i === 1,
      });
      const m = new THREE.Mesh(g, mat);
      const angle = (i / ideaShapes.length) * Math.PI * 2;
      const radius = 1.6 + (i % 2) * 0.25;
      m.userData = { angle, radius, speed: 0.15 + i * 0.06, y: 1.1 + Math.sin(i) * 0.4, bob: Math.random() };
      ideaGroup.add(m);
      ideas.push(m);
    });
    scene.add(ideaGroup);

    // Subtle floor ring
    const ringGeom = new THREE.RingGeometry(0.7, 0.9, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.8;
    scene.add(ring);

    // Mouse tracking
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;
    const render = () => {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      if (mixer) mixer.update(dt);

      // Character follows cursor (subtle body sway)
      charRoot.rotation.y = mouse.x * 0.4;
      charRoot.position.x = mouse.x * 0.12;

      // Ideas orbit
      ideaGroup.rotation.y = t * 0.2 + mouse.x * 0.3;
      ideas.forEach((o) => {
        const d = o.userData;
        o.position.x = Math.cos(d.angle + t * d.speed * 0.4) * d.radius;
        o.position.z = Math.sin(d.angle + t * d.speed * 0.4) * d.radius * 0.7;
        o.position.y = d.y + Math.sin(t * d.speed + d.bob * 6) * 0.2;
        o.rotation.x = t * d.speed;
        o.rotation.y = t * d.speed * 0.7;
      });

      // Ring pulse
      ring.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [accent]);

  return <div ref={ref} className="hero-canvas" aria-hidden="true" />;
}

function Hero({ accent }) {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!window.gsap) return;
    const ctx = window.gsap.context(() => {
      window.gsap.from(".hero-kicker > *", { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.2 });
      window.gsap.from(".hero-name .char", { y: 120, opacity: 0, duration: 1.2, stagger: 0.03, ease: "expo.out", delay: 0.4 });
      window.gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 1, ease: "expo.out", delay: 1.1 });
      window.gsap.from(".hero-footer > div", { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: "expo.out", delay: 1.3 });
      window.gsap.from(".hero-scroll", { opacity: 0, duration: 1, delay: 1.8 });
    }, titleRef);
    return () => ctx.revert();
  }, []);

  // Split the name into spans for GSAP character-by-character reveal
  const firstName = "Krishna".split("");
  const lastName = "Medam".split("");

  return (
    <section className="hero" data-screen-label="01 Hero" ref={titleRef}>
      <HeroCanvas accent={accent} />
      <div className="hero-vignette" />
      <div className="hero-inner">
        <div className="hero-kicker">
          <span className="hero-eyebrow-label">Portfolio · 2026</span>
          <span className="hero-role-label">Senior Frontend Engineer — 9 yrs</span>
        </div>
        <h1 className="hero-name">
          <span className="line">
            {firstName.map((c, i) => <span key={i} className="char">{c}</span>)}
          </span>
          <span className="line line-2">
            <span className="char it">Teja</span>{" "}
            {lastName.map((c, i) => <span key={i} className="char">{c}</span>)}
          </span>
        </h1>
        <p className="hero-sub">
          Full-stack engineer building interfaces that think — shipping product across<br/>
          <em>Google · Dell · Deloitte</em>. Currently at GlobalLogic.
        </p>
      </div>
      <div className="hero-footer">
        <div><span>Based</span><strong>Hyderabad, IN · Remote</strong></div>
        <div><span>Stack</span><strong>React · Angular · Three.js · Node</strong></div>
        <div><span>Available</span><strong>Q2 2026 — Select engagements</strong></div>
        <div><span>Contact</span><strong>krishnatejam987@gmail.com</strong></div>
      </div>
      <div className="hero-scroll"><span>↓</span> Scroll to explore</div>
    </section>
  );
}

Object.assign(window, { Hero, HeroCanvas });
