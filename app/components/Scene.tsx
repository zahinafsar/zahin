"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  Bounds,
} from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/model.compressed.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const albedo = new THREE.MeshBasicMaterial({
          map: mat.map ?? null,
          color: mat.map ? 0xffffff : mat.color,
          transparent: mat.transparent,
          opacity: mat.opacity,
          side: mat.side,
          alphaMap: mat.alphaMap ?? null,
          vertexColors: mat.vertexColors,
        });
        mesh.material = albedo;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.8) * 0.015;
    const targetY = state.pointer.x * 0.15;
    const targetX = -state.pointer.y * 0.08;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/model.compressed.glb");

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#ff6b3d" />
      <pointLight position={[0, -1.5, 0]} intensity={6} color="#ff6b3d" distance={6} decay={2} />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Model />
        </Bounds>
        <Environment preset="city" />
      </Suspense>

    </Canvas>
  );
}
