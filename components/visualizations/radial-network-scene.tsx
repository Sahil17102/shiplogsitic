"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { UnrealBloom } from "./unreal-bloom";

const RAY_COUNT = 420;
const ORIGIN_Y = -4.72;

const particleVertexShader = `
  attribute vec3 color;
  attribute float pointScale;

  uniform float pixelRatio;

  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_PointSize = pointScale * pixelRatio * (10.0 / max(-viewPosition.z, 0.01));
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const particleFragmentShader = `
  precision highp float;

  varying vec3 vColor;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float halo = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
    float core = 1.0 - smoothstep(0.0, 0.2, distanceFromCenter);
    float alpha = halo * 0.38 + core * 0.82;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.28), alpha);
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
        endpointColor.r * 1.08,
        endpointColor.g * 1.08,
        endpointColor.b * 1.08,
      ],
      lineOffset,
    );

    const pointOffset = index * 3;
    pointPositions.set([endpoint.x, endpoint.y, endpoint.z], pointOffset);
    pointColors.set(
      [endpointColor.r * 1.2, endpointColor.g * 1.2, endpointColor.b * 1.2],
      pointOffset,
    );
    pointScales[index] = 4 + random() * 2.25;
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  lineGeometry.computeBoundingSphere();

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  pointGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));
  pointGeometry.setAttribute("pointScale", new THREE.BufferAttribute(pointScales, 1));
  pointGeometry.computeBoundingSphere();

  return {
    lineGeometry,
    pointGeometry,
  };
}

function RadialNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const network = useMemo(createNetworkGeometry, []);
  const particleUniforms = useMemo(
    () => ({
      pixelRatio: { value: Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio, 1.75) },
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

  useFrame(({ gl, pointer }) => {
    if (groupRef.current) {
      const targetRotationX = -pointer.y * 0.012;
      const targetRotationY = pointer.x * 0.026;
      const targetPositionX = pointer.x * 0.045;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.045;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.045;
      groupRef.current.position.x += (targetPositionX - groupRef.current.position.x) * 0.045;
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.pixelRatio.value = gl.getPixelRatio();
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={network.lineGeometry}>
        <lineBasicMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.64}
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
  );
}

export function RadialNetworkScene() {
  return (
    <>
      <RadialNetwork />
      <UnrealBloom radius={0.18} strength={0.26} threshold={0.48} />
    </>
  );
}
