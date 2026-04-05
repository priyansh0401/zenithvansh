'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.15
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.8}>
                <torusKnotGeometry args={[1, 0.35, 200, 32]} />
                <MeshDistortMaterial
                    color="#7C3AED"
                    metalness={0.9}
                    roughness={0.1}
                    distort={0.2}
                    speed={2}
                />
            </mesh>
        </Float>
    )
}

export default function FloatingModel() {
    return (
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} color="#7C3AED" intensity={80} />
            <pointLight position={[-5, -5, 5]} color="#ffffff" intensity={40} />
            <FloatingShape />
        </Canvas>
    )
}
