'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function PepeClownModel() {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/blendFiles/PepeIsBack.glb');

    useEffect(() => {
        if (scene) {
            // Centrer le modèle
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            scene.position.sub(center);
            
            // Ajuster l'échelle - ÉNORME maintenant
            const size = box.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z);
            if (maxSize > 0.5) {
                const scale = 25 / maxSize; // Échelle énorme
                scene.scale.setScalar(scale);
            } else {
                // Si le modèle est déjà petit, on l'agrandit énormément
                scene.scale.setScalar(40);
            }
            
            // Rotation pour qu'il soit visible de face (pas en mode plat)
            scene.rotation.y = Math.PI; // Rotation de 180 degrés
            scene.rotation.x = 0; // Pas de rotation sur X
        }
    }, [scene]);

    useFrame((state) => {
        if (meshRef.current) {
            // Animation de rotation douce
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            
            // Animation de rebond
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <primitive 
            ref={meshRef}
            object={scene} 
        />
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ff6b6b" />
        </mesh>
    );
}

export default function PepeClown3D() {
    return (
        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 60 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ 
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                {/* Éclairage simple */}
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                
                <Suspense fallback={<LoadingFallback />}>
                    <PepeClownModel />
                </Suspense>
                
                <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
} 