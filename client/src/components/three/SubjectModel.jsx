import { forwardRef, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* Organic rock/crystal shell made of surface particles */
function ModelParticles({ count = 6000 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const noise = 0.6 + Math.random() * 0.5 + Math.sin(theta * 3) * 0.15 + Math.cos(phi * 4) * 0.1;
      const r = 1.6 * noise;

      arr[i3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.35;
      arr[i3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const SubjectModel = forwardRef(function SubjectModel(_, ref) {
  const innerRef = useRef();
  const shellRef = useRef();

  const setRef = (node) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.08;
      shellRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={setRef} position={[0, 0, 0]}>
      {/* Main organic body — dark crystalline rock */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.5, 5]} />
        <MeshDistortMaterial
          color="#050505"
          emissive="#111111"
          emissiveIntensity={0.05}
          metalness={1}
          roughness={0.35}
          distort={0.45}
          speed={1.5}
        />
      </mesh>

      {/* Inner darker core */}
      <mesh scale={0.85}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0.5} />
      </mesh>

      {/* Specular highlight shell */}
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.04}
          wireframe
        />
      </mesh>

      {/* Surface particle cloud — Tenbin grainy silhouette */}
      <ModelParticles count={8000} />
    </group>
  );
});

export default SubjectModel;
