"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { RadialNetworkScene } from "./radial-network-scene";
import { SunriseBackdrop } from "./sunrise-backdrop";

export function RadialNetworkCanvas() {
  return (
    <div className="relative isolate h-[470px] w-full overflow-hidden sm:h-[540px] md:h-[640px]">
      <SunriseBackdrop />
      <Canvas
        camera={{ fov: 44, far: 70, near: 0.1, position: [0, 0.08, 12] }}
        className="!absolute inset-0 z-10"
        dpr={[1, 1.75]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: true,
          depth: true,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.04;
        }}
      >
        <AdaptiveDpr />
        <RadialNetworkScene />
      </Canvas>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-[linear-gradient(90deg,transparent,#786cff_16%,#d04eea_50%,#786cff_84%,transparent)] opacity-75"
      />
    </div>
  );
}
