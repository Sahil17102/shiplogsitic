"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Vector2 } from "three";

type UnrealBloomProps = {
  strength?: number;
  radius?: number;
  threshold?: number;
};

export function UnrealBloom({
  strength = 0.88,
  radius = 0.46,
  threshold = 0.12,
}: UnrealBloomProps) {
  const { camera, gl, scene, size } = useThree();

  const pipeline = useMemo(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new Vector2(1, 1), strength, radius, threshold);
    const outputPass = new OutputPass();

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);

    return { bloomPass, composer, outputPass, renderPass };
  }, [camera, gl, scene, radius, strength, threshold]);

  useEffect(() => {
    pipeline.composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    pipeline.composer.setSize(size.width, size.height);
  }, [pipeline, size.height, size.width]);

  useFrame((_, delta) => {
    pipeline.composer.render(delta);
  }, 1);

  useEffect(
    () => () => {
      pipeline.bloomPass.dispose();
      pipeline.outputPass.dispose();
      pipeline.renderPass.dispose();
      pipeline.composer.dispose();
    },
    [pipeline],
  );

  return null;
}
