"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { UnrealBloom } from "./unreal-bloom";

const RAY_COUNT = 760;
const ORIGIN_Y = -4.84;

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
    float alpha = 1.0 - smoothstep(0.05, 0.5, distanceFromCenter);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha * 0.78);
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
  const originColor = new THREE.Color("#766bff");
  const sideColor = new THREE.Color("#9c54ef");
  const crownColor = new THREE.Color("#ff4d9a");

  const linePositions = new Float32Array(RAY_COUNT * 6);
  const lineColors = new Float32Array(RAY_COUNT * 6);
  const pointPositions = new Float32Array(RAY_COUNT * 3);
  const pointColors = new Float32Array(RAY_COUNT * 3);
  const pointScales = new Float32Array(RAY_COUNT);

  for (let index = 0; index < RAY_COUNT; index += 1) {
    const angle = 0.004 + random() * (Math.PI - 0.008);
    const verticality = Math.pow(Math.sin(angle), 0.68);
    const radius = 4.5 + Math.pow(random(), 0.52) * 8.6;
    const horizontalStretch = 1.14 + random() * 0.16;
    const endpoint = new THREE.Vector3(
      Math.cos(angle) * radius * horizontalStretch,
      origin.y + Math.sin(angle) * radius,
      (random() - 0.5) * 3.2,
    );

    const endpointColor = sideColor.clone().lerp(crownColor, verticality);
    endpointColor.offsetHSL((random() - 0.5) * 0.018, 0.015, (random() - 0.5) * 0.025);

    const lineOffset = index * 6;
    linePositions.set([origin.x, origin.y, origin.z, endpoint.x, endpoint.y, endpoint.z], lineOffset);
    lineColors.set(
      [
        originColor.r,
        originColor.g,
        originColor.b,
        endpointColor.r,
        endpointColor.g,
        endpointColor.b,
      ],
      lineOffset,
    );

    const pointOffset = index * 3;
    pointPositions.set([endpoint.x, endpoint.y, endpoint.z], pointOffset);
    pointColors.set([endpointColor.r, endpointColor.g, endpointColor.b], pointOffset);
    pointScales[index] = 1.4 + random() * 1.2;
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

  return { lineGeometry, pointGeometry };
}

function RadialNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const network = useMemo(createNetworkGeometry, []);
  const particleUniforms = useMemo(
    () => ({
      pixelRatio: {
        value: Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio, 1.75),
      },
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

  useFrame(({ clock, gl, pointer }) => {
    if (groupRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 0.32) * 0.007;
      const targetRotationX = -pointer.y * 0.008 + pulse;
      const targetRotationY = pointer.x * 0.018;
      const targetPositionX = pointer.x * 0.035;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.035;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.035;
      groupRef.current.position.x += (targetPositionX - groupRef.current.position.x) * 0.035;
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
          opacity={0.7}
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
      <UnrealBloom radius={0.12} strength={0.18} threshold={0.56} />
    </>
  );
}
