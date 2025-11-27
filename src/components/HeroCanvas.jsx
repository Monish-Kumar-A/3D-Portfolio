import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import useTheme from '../hooks/useTheme'

// Realistic Laptop Model Component
const RealisticLaptop = ({ theme }) => {
  const groupRef = useRef()
  const screenRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const accentColor = theme === 'dark' ? '#00ff88' : '#007bff'
  const bgColor = theme === 'dark' ? '#0d1117' : '#24292f'
  const metalColor = theme === 'dark' ? '#2d3339' : '#57606a'
  const screenGlow = theme === 'dark' ? '#00ff88' : '#007bff'

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group>
          {/* Screen Bezel - Top */}
          <mesh position={[0, 1.025, 0]} castShadow>
            <boxGeometry args={[2.6, 0.05, 0.12]} />
            <meshStandardMaterial 
              color={metalColor}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Screen Bezel - Sides */}
          <mesh position={[-1.275, 0.75, 0]} castShadow>
            <boxGeometry args={[0.05, 1.5, 0.12]} />
            <meshStandardMaterial 
              color={metalColor}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[1.275, 0.75, 0]} castShadow>
            <boxGeometry args={[0.05, 1.5, 0.12]} />
            <meshStandardMaterial 
              color={metalColor}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Screen - Main Panel */}
          <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.5, 0.08]} />
            <meshStandardMaterial 
              color={bgColor}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
          
          {/* Screen Display - Active Display */}
          <mesh ref={screenRef} position={[0, 0.75, 0.051]}>
            <planeGeometry args={[2.3, 1.4]} />
            <meshStandardMaterial
              color={screenGlow}
              emissive={screenGlow}
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Screen Hinge */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 2.6, 16]} />
            <meshStandardMaterial
              color={metalColor}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Keyboard Base - Main Body */}
          <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 0.3, 1.6]} />
            <meshStandardMaterial
              color={metalColor}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Keyboard Bezel */}
          <mesh position={[0, 0, 0.85]} castShadow>
            <boxGeometry args={[2.5, 0.05, 0.1]} />
            <meshStandardMaterial
              color={bgColor}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Trackpad Area */}
          <mesh position={[0, -0.25, 0.5]} castShadow>
            <boxGeometry args={[1.2, 0.05, 0.8]} />
            <meshStandardMaterial
              color={bgColor}
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>

          {/* Keyboard Keys Grid */}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[-1.05 + col * 0.18, 0.05 - row * 0.12, 0.9]}
                castShadow
              >
                <boxGeometry args={[0.12, 0.08, 0.05]} />
                <meshStandardMaterial
                  color={bgColor}
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
            ))
          )}

          {/* Glow Effects */}
          <pointLight
            position={[0, 0.75, 0.1]}
            color={screenGlow}
            intensity={0.5}
            distance={3}
          />
        </group>
      </Float>
    </group>
  )
}

// Tech Icon Orbiting Component - More Realistic
const TechOrbit = ({ radius, angle, speed, label, color, theme }) => {
  const meshRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      const x = Math.cos(time + angle) * radius
      const z = Math.sin(time + angle) * radius
      const y = Math.sin(time * 2 + angle) * 0.3
      meshRef.current.position.set(x, y, z)
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(time * 1.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={meshRef}>
        <mesh castShadow>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <planeGeometry args={[0.4, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

// Tech Orbits Container
const TechOrbits = ({ theme }) => {
  const accentColor = theme === 'dark' ? '#00ff88' : '#007bff'
  const secondaryColor = theme === 'dark' ? '#0088ff' : '#6c757d'
  
  const techItems = [
    { label: 'R', radius: 3.2, angle: 0, speed: 0.25, color: '#61dafb' }, // React
    { label: 'N', radius: 3.5, angle: Math.PI / 4, speed: 0.28, color: '#339933' }, // Node
    { label: 'P', radius: 3.8, angle: Math.PI / 2, speed: 0.3, color: '#3776ab' }, // Python
    { label: 'TF', radius: 4.0, angle: (3 * Math.PI) / 4, speed: 0.27, color: '#ff6f00' }, // TensorFlow
    { label: 'M', radius: 3.5, angle: Math.PI, speed: 0.29, color: '#47a248' }, // MongoDB
    { label: 'JS', radius: 3.2, angle: (5 * Math.PI) / 4, speed: 0.26, color: '#f7df1e' }, // JavaScript
  ]

  return (
    <>
      {techItems.map((item, index) => (
        <TechOrbit
          key={index}
          radius={item.radius}
          angle={item.angle}
          speed={item.speed}
          label={item.label}
          color={item.color}
          theme={theme}
        />
      ))}
    </>
  )
}

// Enhanced Lighting Setup
const Lights = ({ theme }) => {
  const accentColor = theme === 'dark' ? '#00ff88' : '#007bff'
  const secondaryColor = theme === 'dark' ? '#0088ff' : '#6c757d'
  
  return (
    <>
      <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
      <pointLight 
        position={[5, 6, 5]} 
        intensity={1.2} 
        color={accentColor}
        castShadow
      />
      <pointLight 
        position={[-5, 4, 5]} 
        intensity={0.9} 
        color={secondaryColor}
      />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      <directionalLight 
        position={[2, 10, 8]} 
        intensity={0.6}
        color="#ffffff"
        castShadow
      />
    </>
  )
}

// Main Scene Component
const HeroScene = ({ theme }) => {
  return (
    <>
      <Lights theme={theme} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 280, friction: 60 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <RealisticLaptop theme={theme} />
        <TechOrbits theme={theme} />
      </PresentationControls>
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.5}
        scale={12}
        blur={3}
        far={5}
        color={theme === 'dark' ? '#000000' : '#000000'}
      />
    </>
  )
}

// Main HeroCanvas Component
const HeroCanvas = () => {
  const [theme] = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <HeroScene theme={theme} />
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        )}
      </Canvas>
    </div>
  )
}

export default HeroCanvas
