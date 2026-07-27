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
        <path d="M10 17.25A7.25 7.25 0 0 0 17.25 10M10 17.25A7.25 7.25 0 0 1 2.75 10M10 2.75A7.25 7.25 0 0 0 2.75 10M10 2.75A7.25 7.25 0 0 1 17.25 10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16.5 10H19M14.596 14.596 16.364 16.364M10 16.5V19M5.404 14.596 3.636 16.364M3.5 10H1M5.404 5.404 3.636 3.636M10 3.5V1M16.364 3.636 14.596 5.404" stroke="currentColor" strokeWidth="1.5" />
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
  const [nightMode, setNightMode] = useState(false);

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

      const origin = new THREE.Vector3(0, -4.94, 0);
      const routeCount = 480;
      const routes = Array.from({ length: routeCount }, () => {
        const angle = .025 + random() * (Math.PI - .075);
        const radius = 5.15 + random() * 4.05;
        return {
          end: new THREE.Vector3(
            Math.cos(angle) * radius * 1.16,
            origin.y + Math.sin(angle) * radius,
            (random() - .5) * .9,
          ),
          speed: 0.045 + random() * 0.06,
          offset: random(),
          scale: 0.62 + random() * 1.02,
        };
      });

      const positions: number[] = [];
      const colors: number[] = [];
      const linePalette = [
        new THREE.Color("#635BFF"),
        new THREE.Color("#7A35D8"),
        new THREE.Color("#A82DD1"),
        new THREE.Color("#D82CB4"),
        new THREE.Color("#F12D91"),
        new THREE.Color("#FF4D82"),
      ];
      const particlePalette = [
        new THREE.Color("#635BFF"),
        new THREE.Color("#7A35D8"),
        new THREE.Color("#A82DD1"),
        new THREE.Color("#D82CB4"),
        new THREE.Color("#F12D91"),
        new THREE.Color("#FF4D82"),
        new THREE.Color("#FF6795"),
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
        const originColor = new THREE.Color("#B78BFF").lerp(lineColor, .24);

        let particleColorIndex = (Math.floor(colorRandom() * particlePalette.length) + index) % particlePalette.length;
        if (particleColorIndex === previousParticleColor) particleColorIndex = (particleColorIndex + 1) % particlePalette.length;
        previousParticleColor = particleColorIndex;
        const particleColor = particlePalette[particleColorIndex]
          .clone()
          .offsetHSL((colorRandom() - .5) * .008, 0, (colorRandom() - .5) * .025);
        particleColors.push(particleColor);

        positions.push(origin.x, origin.y, origin.z, end.x, end.y, end.z);
        colors.push(
          originColor.r,
          originColor.g,
          originColor.b,
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
        opacity: 0.52,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const routeLines = new THREE.LineSegments(routeGeometry, routeMaterial);
      network.add(routeLines);

      const tipGeometry = new THREE.SphereGeometry(0.052, 10, 10);
      const tipMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.96,
        blending: THREE.NormalBlending,
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
        blending: THREE.NormalBlending,
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
        glow.addColorStop(0, "rgba(178,112,255,.74)");
        glow.addColorStop(.2, "rgba(214,120,238,.46)");
        glow.addColorStop(.45, "rgba(255,125,181,.2)");
        glow.addColorStop(.72, "rgba(255,173,146,.08)");
        glow.addColorStop(1, "rgba(255,173,146,0)");
        glowContext.fillStyle = glow;
        glowContext.fillRect(0, 0, 256, 256);
      }
      const glowTexture = new THREE.CanvasTexture(glowCanvas);
      const glowMaterial = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, blending: THREE.NormalBlending, depthWrite: false });
      const glowSprite = new THREE.Sprite(glowMaterial);
      glowSprite.position.copy(origin);
      glowSprite.scale.set(5.4, 5.4, 1);
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
    <section className="relative overflow-hidden bg-[#f6f9fc] text-[#0a2540]">
      <div className="page-shell">
        <div className="px-1 py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#635bff]">Shipray network</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-.055em] md:text-7xl">The backbone of connected commerce.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#425466]">Every pickup, scan, route and delivery connected through one dependable operating network.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label, copy], index) => (
            <div key={label} className="min-h-[182px] px-1 py-8 text-left sm:px-5 lg:px-1">
              <p className={index === 0 ? "text-4xl font-semibold tracking-[-.05em] text-[#0a2540] md:text-5xl" : "text-4xl font-semibold tracking-[-.05em] text-[#8c9bbb] md:text-5xl"}>{value}</p>
              <p className={index === 0 ? "mt-4 max-w-[230px] text-lg leading-7 text-[#0a2540]" : "mt-4 max-w-[230px] text-lg leading-7 text-[#7a8bab]"}>{label}</p>
              <p className="mt-1 max-w-[230px] text-sm leading-6 text-[#8c9bbb]">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[linear-gradient(90deg,#635bff_0%,#f229c3_17%,#ffd9b7_30%,#dbe3ed_55%,#dbe3ed_100%)]" />
      <div className="relative isolate h-[430px] w-full overflow-hidden md:h-[528px]">
        <div className={nightMode ? "absolute inset-0 bg-[radial-gradient(ellipse_at_50%_102%,rgba(111,66,193,.45)_0%,rgba(84,55,157,.18)_30%,transparent_64%),linear-gradient(180deg,#171d56_0%,#2b2463_100%)]" : "absolute inset-0 bg-[radial-gradient(ellipse_at_50%_102%,rgba(174,104,255,.5)_0%,rgba(226,112,227,.28)_23%,rgba(255,153,170,.12)_42%,transparent_67%),radial-gradient(circle_at_50%_18%,rgba(255,255,255,.6),transparent_56%),linear-gradient(180deg,#fffaf2_0%,#fff5e3_38%,#ffe7c0_73%,#ffd49d_100%)]"} />
        <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full cursor-crosshair touch-none" aria-hidden="true" data-engine="three.js" />
        <button onClick={() => setNightMode((mode) => !mode)} type="button" aria-label={nightMode ? "Night. Switch to sunrise" : "Sunrise. Switch to night"} className={nightMode ? "absolute right-3 top-8 z-20 grid h-10 w-10 place-items-center rounded-md border border-white/25 bg-white/5 text-white transition hover:bg-white/10" : "absolute right-3 top-8 z-20 grid h-10 w-10 place-items-center rounded-md border border-[#f3c6eb] bg-white/35 text-[#ef4dc2] transition hover:bg-white/60"}>
          <TimeOfDayIcon night={nightMode} />
        </button>
      </div>
    </section>
  );
}
