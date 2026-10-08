import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import {
  useScroll,
  Float,
  RoundedBox,
  Line,
  Trail,
  Sparkles,
  Environment,
  Lightformer,
  MeshDistortMaterial,
  useCursor
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { easing } from 'maath';
import { PORTFOLIO_PROJECTS } from '../data/companyInfo';

export const TOTAL_PAGES = 8;

// Random spherical distribution generator
function sampleSphere(buffer, radius) {
  for (let i = 0; i < buffer.length; i += 3) {
    const u = 2 * Math.PI * Math.random();
    const v = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    buffer[i] = r * Math.sin(v) * Math.cos(u);
    buffer[i + 1] = r * Math.sin(v) * Math.sin(u);
    buffer[i + 2] = r * Math.cos(v);
  }
  return buffer;
}

// Section 3D parallax binder
function SectionWrapper({ index, z = 0, children }) {
  const groupRef = useRef();
  const scroll = useScroll();
  const viewportHeight = useThree((s) => s.viewport.height);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const progress = scroll.offset * (TOTAL_PAGES - 1) - index;
    const proximity = Math.max(0, 1 - Math.abs(progress));
    easing.damp3(groupRef.current.scale, 0.75 + proximity * 0.25, 0.2, delta);
    groupRef.current.rotation.y = progress * 0.3;
    groupRef.current.position.z = z - (1 - proximity) * 1.8;
  });

  return (
    <group position={[0, -index * viewportHeight, 0]}>
      <group ref={groupRef}>{children}</group>
    </group>
  );
}

// 00 - HERO: Distorted organic tech orb
function HeroOrb() {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.25;
    if (materialRef.current) {
      easing.damp(materialRef.current, 'distort', hovered ? 0.62 : 0.38, 0.2, delta);
      easing.dampC(materialRef.current.color, hovered ? '#22d3ee' : '#8b5cf6', 0.25, delta);
      easing.damp(materialRef.current, 'emissiveIntensity', hovered ? 0.8 : 0.35, 0.2, delta);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1.7, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#8b5cf6"
        emissive="#3b0a64"
        emissiveIntensity={0.35}
        distort={0.38}
        speed={2.2}
        roughness={0.15}
        metalness={0.85}
      />
    </mesh>
  );
}

// 00 - HERO: Wireframe orbiting rings
function WireframeRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const scroll = useScroll();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.18 + scroll.offset * 4;
      ring1.current.rotation.y = t * 0.12;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.14 - scroll.offset * 3;
      ring2.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={ring1} scale={2.6}>
        <torusGeometry args={[1.1, 0.012, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} scale={3.2}>
        <torusGeometry args={[1.1, 0.008, 8, 96]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// 01 - ABOUT: Multi-ring spinning gyroscope
function Gyroscope() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const core = useRef();
  const speed = useRef({ v: 1 });
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    easing.damp(speed.current, 'v', hovered ? 3.4 : 1, 0.25, delta);
    const sp = speed.current.v;
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.5 * sp;
      ring1.current.rotation.y += delta * 0.2 * sp;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.7 * sp;
      ring2.current.rotation.z += delta * 0.3 * sp;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta * 0.4 * sp;
      ring3.current.rotation.z -= delta * 0.6 * sp;
    }
    if (core.current) {
      core.current.rotation.y += delta * 0.8 * sp;
    }
  });

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={ring1}>
        <torusGeometry args={[1.7, 0.035, 16, 96]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.35, 0.035, 16, 96]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1, 0.035, 16, 96]} />
        <meshStandardMaterial
          color="#f472b6"
          emissive="#f472b6"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#f5f3ff"
          emissive="#a78bfa"
          emissiveIntensity={1.6}
          metalness={0.6}
          roughness={0.1}
          flatShading
        />
      </mesh>
    </group>
  );
}

// 02 - SERVICES: Floating interactive primitives
function FloatingShape({ position, color, children }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1.6 : 0.35);
      meshRef.current.rotation.y += delta * (hovered ? 2.2 : 0.5);
      easing.damp3(meshRef.current.scale, hovered ? 1.3 : 1, 0.18, delta);
    }
    if (materialRef.current) {
      easing.damp(materialRef.current, 'emissiveIntensity', hovered ? 1 : 0.3, 0.2, delta);
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {children}
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Texture Loader Hook
function useTextureLoader(url) {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      url,
      (tex) => {
        if (active) {
          tex.colorSpace = THREE.SRGBColorSpace;
          setTexture(tex);
        }
      },
      undefined,
      () => {}
    );
    return () => {
      active = false;
    };
  }, [url]);
  return texture;
}

// 06 - PORTFOLIO: 3D Tilt Project Cards
function ProjectCard({ position, rotation, color, image, onClick }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const texture = useTextureLoader(image);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetRot = hovered
      ? [-state.pointer.y * 0.45, state.pointer.x * 0.45, 0]
      : rotation;
    const targetPos = hovered
      ? [position[0], position[1] + 0.15, position[2] + 0.7]
      : position;

    easing.dampE(groupRef.current.rotation, targetRot, 0.2, delta);
    easing.damp3(groupRef.current.position, targetPos, 0.2, delta);

    if (materialRef.current) {
      easing.damp(materialRef.current, 'emissiveIntensity', hovered ? 0.7 : 0.18, 0.2, delta);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <RoundedBox args={[2.2, 3, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.18}
          metalness={0.6}
          roughness={0.25}
        />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2, 2.8]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      )}
      <mesh position={[-0.75, 1.15, 0.13]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// 07 - FAQ & INSIGHTS: Particle Galaxy
function ParticleCore({ count = 2400 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => sampleSphere(new Float32Array(count * 3), 3.4), [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#7dd3fc"
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#22d3ee"
          emissiveIntensity={2.2}
        />
      </mesh>
    </group>
  );
}

// 08 - CONTACT: Monumental Torus Knot
function TorusKnotCore() {
  const meshRef = useRef();
  const materialRef = useRef();
  const spinBoost = useRef(0);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    spinBoost.current = THREE.MathUtils.damp(spinBoost.current, 0, 1.5, delta);
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (0.3 + spinBoost.current);
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (materialRef.current) {
      easing.damp(materialRef.current, 'emissiveIntensity', hovered ? 0.9 : 0.25, 0.2, delta);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.3, -1.5]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        spinBoost.current += 6;
      }}
    >
      <torusKnotGeometry args={[1.3, 0.38, 256, 48]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#c4b5fd"
        emissive="#8b5cf6"
        emissiveIntensity={0.25}
        metalness={1}
        roughness={0.18}
      />
    </mesh>
  );
}

// Dynamic Glowing Energy Line that winds through all 9 sections
function DynamicEnergyBeam() {
  const scroll = useScroll();
  const viewportHeight = useThree((s) => s.viewport.height);
  const viewportWidth = useThree((s) => s.viewport.width);

  const headRef = useRef();
  const lightGroupRef = useRef();

  const curve = useMemo(() => {
    const points = [];
    const count = TOTAL_PAGES;
    for (let i = 0; i < count; i++) {
      const dir = i % 2 === 0 ? 1 : -1;
      points.push(new THREE.Vector3(dir * viewportWidth * 0.28, -i * viewportHeight + viewportHeight * 0.2, -1.4));
      points.push(new THREE.Vector3(-dir * viewportWidth * 0.16, -i * viewportHeight - viewportHeight * 0.3, -0.9));
    }
    // Terminal point rests squarely at Section 08 (Contact & Footer)
    points.push(new THREE.Vector3(0, -(TOTAL_PAGES - 1) * viewportHeight, -1.2));
    return new THREE.CatmullRomCurve3(points);
  }, [viewportHeight, viewportWidth]);

  const dashedPoints = useMemo(() => curve.getPoints(360), [curve]);
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 600, 0.022, 8, false), [curve]);

  useEffect(() => () => tubeGeometry.dispose(), [tubeGeometry]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uProgress;
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float t = vUv.x;
            if (t > uProgress + 0.001) discard;
            vec3 violet = vec3(0.545, 0.361, 0.965);
            vec3 hot = vec3(1.0, 0.96, 0.9);
            float headGlow = smoothstep(uProgress - 0.05, uProgress, t);
            float tail = smoothstep(uProgress - 0.4, uProgress - 0.08, t);
            float pulse = 0.5 + 0.5 * sin(t * 140.0 - uTime * 7.0);
            vec3 col = mix(violet, hot, headGlow);
            col += violet * pulse * 0.3 * tail;
            float alpha = mix(0.07, 1.0, tail);
            gl_FragColor = vec4(col * (1.0 + headGlow * 2.5), alpha);
          }
        `
      }),
    []
  );

  useFrame((state) => {
    const progress = THREE.MathUtils.clamp(scroll.offset, 0.001, 1);
    shaderMaterial.uniforms.uProgress.value = progress;
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;

    const currentPt = curve.getPoint(progress);
    if (headRef.current) {
      headRef.current.position.copy(currentPt);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.18;
      headRef.current.scale.setScalar(pulse);
    }
    if (lightGroupRef.current) {
      lightGroupRef.current.position.copy(currentPt);
    }
  });

  return (
    <group>
      <Line
        points={dashedPoints}
        color="#8b5cf6"
        transparent
        opacity={0.12}
        lineWidth={1}
        dashed
        dashSize={0.08}
        gapSize={0.14}
      />
      <mesh geometry={tubeGeometry} material={shaderMaterial} />
      <Trail width={3} length={9} color="#ffffff" attenuation={(t) => t * t}>
        <mesh ref={headRef}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#fff7ed" toneMapped={false} />
        </mesh>
      </Trail>
      <group ref={lightGroupRef}>
        <pointLight intensity={14} distance={8} color="#c4b5fd" />
        <Sparkles count={24} scale={1.5} size={3} speed={0.6} color="#e9d5ff" opacity={0.9} />
      </group>
    </group>
  );
}

// Master Scene Component
export default function Scene({ onScrollContainerReady, onSelectProject }) {
  const scroll = useScroll();
  const viewportHeight = useThree((s) => s.viewport.height);
  const viewportWidth = useThree((s) => s.viewport.width);
  const lightsRef = useRef();

  useEffect(() => {
    if (scroll.el && onScrollContainerReady) {
      onScrollContainerReady(scroll.el);
    }
  }, [scroll.el, onScrollContainerReady]);

  useFrame((state, delta) => {
    const offset = scroll.offset;
    const targetY = -offset * viewportHeight * (TOTAL_PAGES - 1);

    easing.damp3(
      state.camera.position,
      [state.pointer.x * 0.7, targetY - state.pointer.y * 0.35, 10],
      0.28,
      delta
    );
    state.camera.lookAt(0, targetY, 0);

    if (lightsRef.current) {
      lightsRef.current.position.y = targetY;
    }

    document.documentElement.style.setProperty('--scroll', offset.toFixed(4));
  });

  const w = (factor) => viewportWidth * factor;

  return (
    <>
      <ambientLight intensity={0.3} />
      <group ref={lightsRef}>
        <pointLight position={[6, 2, 6]} intensity={60} color="#8b5cf6" />
        <pointLight position={[-6, -2, 4]} intensity={45} color="#22d3ee" />
      </group>

      <Environment resolution={64}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer color="#8b5cf6" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer color="#22d3ee" intensity={2} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </group>
      </Environment>

      {/* Background stardust sparkles across all sections */}
      <Sparkles
        count={320}
        scale={[viewportWidth * 1.6, viewportHeight * TOTAL_PAGES, 10]}
        position={[0, (-viewportHeight * (TOTAL_PAGES - 1)) / 2, -2]}
        size={1.6}
        speed={0.25}
        color="#a78bfa"
        opacity={0.5}
      />

      {/* Dynamic travelling spline */}
      <DynamicEnergyBeam />

      {/* 01 - HOME */}
      <SectionWrapper index={0}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
          <HeroOrb />
        </Float>
        <WireframeRings />
        <Sparkles count={90} scale={[8, 5, 6]} size={2.4} speed={0.35} color="#22d3ee" opacity={0.7} />
      </SectionWrapper>

      {/* 02 - ABOUT */}
      <SectionWrapper index={1}>
        <group position={[w(0.2), 0, 0]}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
            <Gyroscope />
          </Float>
        </group>
      </SectionWrapper>

      {/* 03 - SERVICES */}
      <SectionWrapper index={2}>
        <group position={[w(0.2), 0, 0]}>
          <FloatingShape position={[-1.5, 1.3, 0]} color="#22d3ee">
            <icosahedronGeometry args={[0.75, 0]} />
          </FloatingShape>
          <FloatingShape position={[1.5, 1.3, 0]} color="#8b5cf6">
            <torusKnotGeometry args={[0.45, 0.16, 128, 32]} />
          </FloatingShape>
          <FloatingShape position={[-1.5, -1.3, 0]} color="#f472b6">
            <octahedronGeometry args={[0.8, 0]} />
          </FloatingShape>
          <FloatingShape position={[1.5, -1.3, 0]} color="#facc15">
            <torusGeometry args={[0.55, 0.2, 32, 64]} />
          </FloatingShape>
        </group>
      </SectionWrapper>

      {/* 04 - SOLUTIONS */}
      <SectionWrapper index={3}>
        <group position={[-w(0.22), 0, 0]}>
          <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh>
              <dodecahedronGeometry args={[1.2, 0]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#0891b2"
                emissiveIntensity={0.4}
                wireframe
              />
            </mesh>
          </Float>
        </group>
      </SectionWrapper>

      {/* 05 - INDUSTRIES & TECH */}
      <SectionWrapper index={4}>
        <group position={[w(0.22), 0, 0]}>
          <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
            <mesh>
              <octahedronGeometry args={[1.4, 0]} />
              <meshStandardMaterial
                color="#ec4899"
                emissive="#9d174d"
                emissiveIntensity={0.35}
                wireframe
              />
            </mesh>
          </Float>
        </group>
      </SectionWrapper>

      {/* 06 - PORTFOLIO */}
      <SectionWrapper index={5} z={0.5}>
        <ProjectCard
          position={[w(0.04), -0.28, 0]}
          rotation={[0, 0.35, -0.04]}
          color={PORTFOLIO_PROJECTS[0].color}
          image={PORTFOLIO_PROJECTS[0].image}
          onClick={() => onSelectProject && onSelectProject(PORTFOLIO_PROJECTS[0])}
        />
        <ProjectCard
          position={[w(0.19), -0.08, 0.4]}
          rotation={[0, 0, 0.03]}
          color={PORTFOLIO_PROJECTS[1].color}
          image={PORTFOLIO_PROJECTS[1].image}
          onClick={() => onSelectProject && onSelectProject(PORTFOLIO_PROJECTS[1])}
        />
        <ProjectCard
          position={[w(0.34), -0.28, 0]}
          rotation={[0, -0.35, 0.04]}
          color={PORTFOLIO_PROJECTS[2].color}
          image={PORTFOLIO_PROJECTS[2].image}
          onClick={() => onSelectProject && onSelectProject(PORTFOLIO_PROJECTS[2])}
        />
      </SectionWrapper>

      {/* 07 - FAQ & INSIGHTS */}
      <SectionWrapper index={6}>
        <ParticleCore />
      </SectionWrapper>

      {/* 08 - CONTACT (FINAL SECTION) */}
      <SectionWrapper index={7}>
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7}>
          <TorusKnotCore />
        </Float>
        <Sparkles count={120} scale={[9, 6, 6]} size={2} speed={0.3} color="#f472b6" opacity={0.6} />
      </SectionWrapper>

      {/* Post Processing */}
      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.25} luminanceSmoothing={0.7} mipmapBlur />
        <Noise opacity={0.05} />
        <Vignette offset={0.15} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
