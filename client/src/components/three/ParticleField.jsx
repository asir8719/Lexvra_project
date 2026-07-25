import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createStarfield(count) {
  const positions = new Float32Array(count * 3);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Dense background starfield
    const spread = 30;
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread - 4;

    // Extra density in vertical light beam (top-center glow)
    if (Math.random() < 0.35) {
      positions[i3] *= 0.25;
      positions[i3 + 1] = 2 + Math.random() * 12;
      positions[i3 + 2] = -2 + (Math.random() - 0.5) * 3;
    }

    // Cluster near center (model aura)
    if (Math.random() < 0.2) {
      const r = 1.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.4;
      positions[i3 + 2] = r * Math.cos(phi);
    }

    opacities[i] = 0.15 + Math.random() * 0.85;
  }

  return { positions, opacities };
}

export default function ParticleField({ count = 35000 }) {
  const pointsRef = useRef();
  const { positions, opacities } = useMemo(() => createStarfield(count), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.008;

    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(t * 0.3 + i) * 0.0004;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-opacity" count={count} array={opacities} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
