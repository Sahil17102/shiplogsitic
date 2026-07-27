"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  ["29,000+", "serviceable pin codes", "across India"],
  ["12M+", "shipments coordinated", "through Shipray"],
  ["98.4%", "on-time dispatch", "across active lanes"],
  ["220+", "countries and territories", "connected globally"],
];

function TimeOfDayIcon({ night }: { night: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <g className={night ? "opacity-0 transition-opacity" : "opacity-100 transition-opacity"}>
        <circle cx="10" cy="10" r="4.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1v2.5M10 16.5V19M1 10h2.5M16.5 10H19M3.64 3.64l1.77 1.77M14.59 14.59l1.77 1.77M16.36 3.64l-1.77 1.77M5.41 14.59l-1.77 1.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <path
        d="M8.845 4.197c-.43 1.374-.823 3.886 1.125 5.834 1.948 1.947 4.457 1.553 5.832 1.123A5.918 5.918 0 1 1 8.845 4.197Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className={night ? "opacity-100 transition-opacity" : "opacity-0 transition-opacity"}
      />
    </svg>
  );
}

export function LogisticsBackbone() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nightMode, setNightMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let disposeScene = () => {};

    async function initialize() {
      const THREE = await import("three");
      if (cancelled || !canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 13.2);
      camera.lookAt(0, 0, 0);

      const network = new THREE.Group();
      scene.add(network);

      let seed = 91827;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      const origin = new THREE.Vector3(0, -4.92, 0);
      const routeCount = 420;
      const routes = Array.from({ length: routeCount }, () => {
        const angle = .08 + random() * (Math.PI - .16);
        const radius = 5.2 + random() * 3.85;
        return {
          end: new THREE.Vector3(
            Math.cos(angle) * radius * 1.13,
            origin.y + Math.sin(angle) * radius * 1.03,
            (random() - .5) * 1.05,
          ),
          speed: 0.055 + random() * 0.07,
          offset: random(),
          scale: 0.72 + random() * 1.18,
        };
      });

      const positions: number[] = [];
      const colors: number[] = [];
      const linePalette = [
        new THREE.Color("#FFF8F5"),
        new THREE.Color("#FFF1D6"),
        new THREE.Color("#FFC9DD"),
        new THREE.Color("#E7C5FF"),
        new THREE.Color("#CFAEFF"),
      ];
      const particlePalette = [
        new THREE.Color("#FFFFFF"),
        new THREE.Color("#FFF8F5"),
        new THREE.Color("#FFF1D6"),
        new THREE.Color("#FFDDB6"),
        new THREE.Color("#FFC9DD"),
        new THREE.Color("#FF9CCF"),
        new THREE.Color("#E7C5FF"),
        new THREE.Color("#CFAEFF"),
        new THREE.Color("#F472B6"),
      ];
      let colorSeed = 73129;
      const colorRandom = () => {
        colorSeed = (colorSeed * 1664525 + 1013904223) % 4294967296;
        return colorSeed / 4294967296;
      };
      const particleColors: InstanceType<typeof THREE.Color>[] = [];
      let previousLineColor = -1;
      let previousParticleColor = -1;

      routes.forEach(({ end }, index) => {
        let lineColorIndex = (Math.floor(colorRandom() * linePalette.length) + index) % linePalette.length;
        if (lineColorIndex === previousLineColor) lineColorIndex = (lineColorIndex + 1) % linePalette.length;
        previousLineColor = lineColorIndex;
        const lineColor = linePalette[lineColorIndex];

        let particleColorIndex = (Math.floor(colorRandom() * particlePalette.length) + index) % particlePalette.length;
        if (particleColorIndex === previousParticleColor) particleColorIndex = (particleColorIndex + 1) % particlePalette.length;
        previousParticleColor = particleColorIndex;
        const particleColor = particlePalette[particleColorIndex]
          .clone()
          .offsetHSL((colorRandom() - .5) * .008, 0, (colorRandom() - .5) * .025);
        particleColors.push(particleColor);

        positions.push(origin.x, origin.y, origin.z, end.x, end.y, end.z);
        colors.push(
          lineColor.r * 1.04,
          lineColor.g * 1.04,
          lineColor.b * 1.04,
          lineColor.r,
          lineColor.g,
          lineColor.b,
        );
      });

      const routeGeometry = new THREE.BufferGeometry();
      routeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      routeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      const routeMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const routeLines = new THREE.LineSegments(routeGeometry, routeMaterial);
      network.add(routeLines);

      const tipGeometry = new THREE.SphereGeometry(0.052, 10, 10);
      const tipMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const tips = new THREE.InstancedMesh(tipGeometry, tipMaterial, routeCount);
      const transform = new THREE.Object3D();
      routes.forEach(({ end, scale }, index) => {
        transform.position.copy(end);
        transform.scale.setScalar(scale);
        transform.updateMatrix();
        tips.setMatrixAt(index, transform.matrix);
        tips.setColorAt(index, particleColors[index]);
      });
      tips.instanceMatrix.needsUpdate = true;
      if (tips.instanceColor) tips.instanceColor.needsUpdate = true;
      network.add(tips);

      const parcelGeometry = new THREE.SphereGeometry(0.062, 10, 10);
      const parcelMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const parcels = new THREE.InstancedMesh(parcelGeometry, parcelMaterial, routeCount);
      particleColors.forEach((color, index) => parcels.setColorAt(index, color));
      if (parcels.instanceColor) parcels.instanceColor.needsUpdate = true;
      network.add(parcels);

      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = 256;
      glowCanvas.height = 256;
      const glowContext = glowCanvas.getContext("2d");
      if (glowContext) {
        const glow = glowContext.createRadialGradient(128, 128, 0, 128, 128, 128);
        glow.addColorStop(0, "rgba(255,253,248,.98)");
        glow.addColorStop(.16, "rgba(255,198,216,.82)");
        glow.addColorStop(.34, "rgba(255,211,165,.62)");
        glow.addColorStop(.56, "rgba(230,168,255,.4)");
        glow.addColorStop(.78, "rgba(192,132,252,.18)");
        glow.addColorStop(1, "rgba(139,92,246,0)");
        glowContext.fillStyle = glow;
        glowContext.fillRect(0, 0, 256, 256);
      }
      const glowTexture = new THREE.CanvasTexture(glowCanvas);
      const glowMaterial = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const glowSprite = new THREE.Sprite(glowMaterial);
      glowSprite.position.copy(origin);
      glowSprite.scale.set(8.6, 8.6, 1);
      network.add(glowSprite);

      const pointerTarget = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        const bounds = canvas.getBoundingClientRect();
        pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - .5) * .32;
        pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - .5) * .13;
      };
      const onPointerLeave = () => {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
      };
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);

      const resize = () => {
        const width = Math.max(canvas.clientWidth, 1);
        const height = Math.max(canvas.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      const clock = new THREE.Clock();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const render = () => {
        const elapsed = clock.getElapsedTime();
        network.rotation.y += (pointerTarget.x - network.rotation.y) * .045;
        network.rotation.x += (-pointerTarget.y - network.rotation.x) * .045;
        camera.position.x += (pointerTarget.x * .42 - camera.position.x) * .035;
        camera.position.y += (-pointerTarget.y * .32 - camera.position.y) * .035;
        camera.lookAt(0, 0, 0);

        routes.forEach(({ end, speed, offset, scale }, index) => {
          const progress = reducedMotion ? offset : (offset + elapsed * speed) % 1;
          const eased = 1 - Math.pow(1 - progress, 1.45);
          transform.position.lerpVectors(origin, end, eased);
          transform.scale.setScalar(scale * (.42 + Math.sin(progress * Math.PI) * .78));
          transform.updateMatrix();
          parcels.setMatrixAt(index, transform.matrix);
        });
        parcels.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
      };

      if (reducedMotion) render();
      else renderer.setAnimationLoop(render);

      disposeScene = () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        routeGeometry.dispose();
        routeMaterial.dispose();
        tipGeometry.dispose();
        tipMaterial.dispose();
        parcelGeometry.dispose();
        parcelMaterial.dispose();
        glowTexture.dispose();
        glowMaterial.dispose();
        renderer.dispose();
      };
    }

    void initialize();
    return () => {
      cancelled = true;
      disposeScene();
    };
  }, []);

  return (
    <section className={nightMode ? "bg-[#171d56] text-white" : "bg-[#3f37b6] text-white"}>
      <div
        aria-hidden="true"
        className="h-44 bg-[radial-gradient(ellipse_125%_115%_at_50%_-14%,#ffffff_0%,#ffffff_31%,rgba(255,255,255,.82)_51%,rgba(255,255,255,.42)_72%,rgba(255,255,255,0)_100%)] md:h-60"
      />
      <div className="page-shell border-x border-white/15">
        <div className="border-b border-white/15 px-6 py-20 text-center md:py-28">
          <p className="text-xs font-black uppercase tracking-[.18em] text-indigo-200">Shipray network</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1.04] tracking-[-.055em] md:text-7xl">The backbone of connected commerce.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-indigo-100/65">Every pickup, scan, route and delivery connected through one dependable operating network.</p>
        </div>

        <div className="grid border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label, copy], index) => (
            <div key={label} className="min-h-[190px] border-b border-r border-white/15 px-6 py-9 text-center sm:min-h-[210px] lg:border-b-0">
              <p className={index === 0 ? "text-4xl font-medium tracking-[-.055em] text-white md:text-5xl" : "text-4xl font-medium tracking-[-.055em] text-indigo-300/75 md:text-5xl"}>{value}</p>
              <p className="mx-auto mt-4 max-w-[190px] text-sm font-black leading-5 text-white/90">{label}</p>
              <p className="mx-auto mt-1 max-w-[190px] text-xs leading-5 text-indigo-200/55">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative isolate h-[100svh] min-h-[560px] max-h-[760px] w-full overflow-hidden border-y border-white/15">
        <div className={nightMode ? "absolute inset-0 bg-[radial-gradient(ellipse_at_50%_104%,rgba(255,253,248,.98)_0%,rgba(255,198,216,.9)_15%,rgba(255,211,165,.76)_31%,rgba(230,168,255,.6)_52%,rgba(192,132,252,.38)_69%,rgba(139,92,246,.14)_82%,transparent_94%),radial-gradient(circle_at_15%_30%,rgba(255,244,229,.78),transparent_45%),radial-gradient(circle_at_86%_35%,rgba(248,180,217,.58),transparent_44%),linear-gradient(180deg,#FFFDF8_0%,#FFF4E5_18%,#FFE8C2_36%,#FFD3A5_53%,#FFC6D8_68%,#E6A8FF_82%,#8B5CF6_94%,#5B4FE9_100%)]" : "absolute inset-0 bg-[radial-gradient(ellipse_at_50%_104%,rgba(255,255,255,.98)_0%,rgba(255,201,221,.88)_17%,rgba(255,221,182,.72)_34%,rgba(231,197,255,.58)_54%,rgba(207,174,255,.34)_72%,transparent_93%),radial-gradient(circle_at_18%_24%,rgba(255,253,248,.88),transparent_42%),radial-gradient(circle_at_82%_32%,rgba(255,156,207,.46),transparent_46%),linear-gradient(180deg,#FFFDF8_0%,#FFF4E5_22%,#FFE8C2_42%,#FFD3A5_60%,#F8B4D9_76%,#C084FC_91%,#5B4FE9_100%)]"} />
        <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full cursor-crosshair touch-none" aria-hidden="true" data-engine="three.js" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#fff4e5]/35 to-transparent" />
        <button onClick={() => setNightMode((mode) => !mode)} type="button" aria-label={nightMode ? "Night. Switch to day" : "Day. Switch to night"} className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-lg border border-white/45 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/15 md:right-9 md:top-8">
          <TimeOfDayIcon night={nightMode} />
        </button>
      </div>
    </section>
  );
}
