import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function CertificateCard({ textureUrl, position, onClick }: any) {
  const mesh = useRef<any>();
  const [texture] = useLoader(TextureLoader, [textureUrl]);

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.003; // auto spin
  });

  return (
    <mesh ref={mesh} position={position} onClick={onClick} scale={[1.6, 1.2, 0.1]}>
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
