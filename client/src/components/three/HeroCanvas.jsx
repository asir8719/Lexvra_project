import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import SubjectModel from './SubjectModel';

export default function HeroCanvas({ modelRef }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ background: '#000000' }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 28]} />

        {/* Top-down cinematic light — Tenbin style */}
        <ambientLight intensity={0.08} />
        <directionalLight position={[0, 12, 4]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[2, 6, -3]} intensity={0.4} color="#cccccc" />
        <pointLight position={[0, 8, 2]} intensity={1.2} color="#ffffff" distance={20} />

        <ParticleField count={35000} />
        <SubjectModel ref={modelRef} onLoaded={() => setLoaded(true)} />
      </Suspense>
    </Canvas>
  );
}
