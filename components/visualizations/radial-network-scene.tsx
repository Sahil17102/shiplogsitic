"use client";

import { useEffect, useMemo, useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { UnrealBloom } from "./unreal-bloom";

const RAY_COUNT = 2200;
const ORIGIN_Y = -4.72;

const particleVertexShader = `
  attribute vec3 color;
  attribute float pointScale;
  attribute float phase;

  uniform float pixelRatio;
  uniform float time;

  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    float pulse = 1.0 + sin(time * 0.7 + phase) * 0.08;
    gl_PointSize = pointScale * pixelRatio * pulse * (10.0 / max(-viewPosition.z, 0.01));
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const particleFragmentShader = `
  precision highp float;

  varying vec3 vColor;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float halo = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
    float core = 1.0 - smoothstep(0.0, 0.18, distanceFromCenter);
    float alpha = halo * 0.68 + core * 0.62;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.9), alpha);
  }
`;

function seededRandom(seedValue: number) {
  let seed = seedValue >>> 0;

  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createNetworkGeometry() {
  const random = seededRandom(74821);
  const origin = new THREE.Vector3(0, ORIGIN_Y, 0);
  const sideColor = new THREE.Color("#635bff");
  const crownColor = new THREE.Color("#ff327f");
  const originTint = new THREE.Color("#ad86ff");

  const linePositions = new Float32Array(RAY_COUNT * 6);
  const lineColors = new Float32Array(RAY_COUNT * 6);
  const pointPositions = new Float32Array(RAY_COUNT * 3);
  const pointColors = new Float32Array(RAY_COUNT * 3);
  const pointScales = new Float32Array(RAY_COUNT);
  const phases = new Float32Array(RAY_COUNT);
  const baseEndpoints = new Float32Array(RAY_COUNT * 3);

  for (let index = 0; index < RAY_COUNT; index += 1) {
    const angle = 0.012 + random() * (Math.PI - 0.024);
    const verticality = Math.pow(Math.sin(angle), 0.72);
    const radius = 4.25 + Math.pow(random(), 0.64) * 5.35;
    const depth = (random() - 0.5) * 4.6;
    const horizontalStretch = 1.13 + random() * 0.08;
    const endpoint = new THREE.Vector3(
      Math.cos(angle) * radius * horizontalStretch,
      origin.y + Math.sin(angle) * radius,
      depth,
    );

    const endpointColor = sideColor.clone().lerp(crownColor, verticality);
    endpointColor.offsetHSL((random() - 0.5) * 0.025, 0.02, (random() - 0.5) * 0.035);
    const startColor = originTint.clone().lerp(endpointColor, 0.2);

    const lineOffset = index * 6;
    linePositions.set([origin.x, origin.y, origin.z, endpoint.x, endpoint.y, endpoint.z], lineOffset);
    lineColors.set(
      [
        startColor.r * 0.86,
        startColor.g * 0.86,
        startColor.b * 0.86,
        endpointColor.r * 1.34,
        endpointColor.g * 1.34,
        endpointColor.b * 1.34,
      ],
      lineOffset,
    );

    const pointOffset = index * 3;
    pointPositions.set([endpoint.x, endpoint.y, endpoint.z], pointOffset);
    pointColors.set(
      [endpointColor.r * 1.48, endpointColor.g * 1.48, endpointColor.b * 1.48],
      pointOffset,
    );
    baseEndpoints.set([endpoint.x, endpoint.y, endpoint.z], pointOffset);
    pointScales[index] = 4.2 + random() * 2.7;
    phases[index] = random() * Math.PI * 2;
  }

  const lineGeometry = new THREE.BufferGeometry();
  const linePositionAttribute = new THREE.BufferAttribute(linePositions, 3);
  linePositionAttribute.setUsage(THREE.DynamicDrawUsage);
  lineGeometry.setAttribute("position", linePositionAttribute);
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  lineGeometry.computeBoundingSphere();

  const pointGeometry = new THREE.BufferGeometry();
  const pointPositionAttribute = new THREE.BufferAttribute(pointPositions, 3);
  pointPositionAttribute.setUsage(THREE.DynamicDrawUsage);
  pointGeometry.setAttribute("position", pointPositionAttribute);
  pointGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));
  pointGeometry.setAttribute("pointScale", new THREE.BufferAttribute(pointScales, 1));
  pointGeometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
  pointGeometry.computeBoundingSphere();

  return {
    baseEndpoints,
    lineGeometry,
    linePositions,
    phases,
    pointGeometry,
    pointPositions,
  };
}

function RadialNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const network = useMemo(createNetworkGeometry, []);
  const particleUniforms = useMemo(
    () => ({
      pixelRatio: { value: Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio, 1.75) },
      time: { value: 0 },
    }),
    [],
  );

  useEffect(
    () => () => {
      network.lineGeometry.dispose();
      network.pointGeometry.dispose();
    },
    [network],
  );

  useFrame(({ clock, gl }) => {
    const elapsed = clock.getElapsedTime();
    const breathing = 1 + Math.sin(elapsed * 0.48) * 0.007;

    for (let index = 0; index < RAY_COUNT; index += 1) {
      const pointOffset = index * 3;
      const lineOffset = index * 6 + 3;
      const phase = network.phases[index];
      const sway = Math.sin(elapsed * 0.24 + phase) * 0.005;
      const lift = Math.sin(elapsed * 0.38 + phase * 1.37) * 0.018;
      const depthDrift = Math.cos(elapsed * 0.2 + phase) * 0.022;
      const x = network.baseEndpoints[pointOffset] * (breathing + sway);
      const y =
        ORIGIN_Y +
        (network.baseEndpoints[pointOffset + 1] - ORIGIN_Y) * breathing +
        lift;
      const z = network.baseEndpoints[pointOffset + 2] + depthDrift;

      network.pointPositions[pointOffset] = x;
      network.pointPositions[pointOffset + 1] = y;
      network.pointPositions[pointOffset + 2] = z;
      network.linePositions[lineOffset] = x;
      network.linePositions[lineOffset + 1] = y;
      network.linePositions[lineOffset + 2] = z;
    }

    network.lineGeometry.attributes.position.needsUpdate = true;
    network.pointGeometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(elapsed * 0.11) * 0.0026;
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.pixelRatio.value = gl.getPixelRatio();
      particleMaterialRef.current.uniforms.time.value = elapsed;
    }
  });

  return (
    <Float
      speed={0.28}
      rotationIntensity={0.018}
      floatIntensity={0.055}
      floatingRange={[-0.018, 0.018]}
    >
      <group ref={groupRef}>
        <lineSegments geometry={network.lineGeometry}>
          <lineBasicMaterial
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.48}
            transparent
            vertexColors
          />
        </lineSegments>
        <points geometry={network.pointGeometry}>
          <shaderMaterial
            ref={particleMaterialRef}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fragmentShader={particleFragmentShader}
            transparent
            uniforms={particleUniforms}
            vertexShader={particleVertexShader}
            vertexColors
          />
        </points>
      </group>
    </Float>
  );
}

export function RadialNetworkScene() {
  return (
    <>
      <RadialNetwork />
      <UnrealBloom radius={0.44} strength={0.82} threshold={0.1} />
    </>
  );
}
