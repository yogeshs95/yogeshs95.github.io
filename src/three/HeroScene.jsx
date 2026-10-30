import {
  useFrame,
  useLoader,
} from "@react-three/fiber";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as THREE from "three";
import gsap from "gsap";


/* =========================================================
   CAMERA GLITTER PARTICLES
========================================================= */

function CameraGlitter({
  scrollProgressRef,
}) {

  const groupRef =
    useRef();

  const pointsRef =
    useRef();


  const particleCount =
    85;


  const positions =
    useMemo(() => {

      const data =
        new Float32Array(
          particleCount * 3
        );


      for (
        let i = 0;
        i < particleCount;
        i++
      ) {

        const angle =
          Math.random() *
          Math.PI *
          2;


        const radius =
          1.8 +
          Math.random() *
          2.3;


        const x =
          Math.cos(angle) *
          radius;


        const y =
          (
            Math.random() -
            0.5
          ) *
          4.2;


        const z =
          (
            Math.random() -
            0.5
          ) *
          2.6;


        data[
          i * 3
        ] =
          x;


        data[
          i * 3 + 1
        ] =
          y;


        data[
          i * 3 + 2
        ] =
          z;

      }


      return data;

    }, []);


  useFrame(
    (state) => {

      if (
        !groupRef.current
      ) {
        return;
      }


      const time =
        state.clock.elapsedTime;


      const progress =
        scrollProgressRef?.current ||
        0;


      groupRef.current.rotation.z =
        Math.sin(
          time * 0.18
        ) *
        0.025;


      groupRef.current.rotation.y =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          state.pointer.x *
            0.035,
          0.025
        );


      groupRef.current.rotation.x =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          -state.pointer.y *
            0.018,
          0.025
        );


      groupRef.current.position.x =
        0.4 +
        progress *
          1.45;


      groupRef.current.position.y =
        Math.sin(
          time * 0.35
        ) *
        0.03 -
        progress *
          0.15;


      groupRef.current.position.z =
        -progress *
        1.35;


      if (
        pointsRef.current
      ) {

        pointsRef.current.material.opacity =
          0.48 +
          Math.sin(
            time * 1.8
          ) *
          0.08;

      }

    }
  );


  return (

    <group
      ref={groupRef}
      position={[
        0.4,
        0,
        0,
      ]}
    >

      <points
        ref={pointsRef}
      >

        <bufferGeometry>

          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={
              positions.length / 3
            }
            itemSize={3}
          />

        </bufferGeometry>


        <pointsMaterial
          color="#e7c38d"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />

      </points>


      {/* -----------------------------------------------
          A FEW LARGER TWINKLES
      ----------------------------------------------- */}

      <Twinkle
        position={[
          -2.05,
          1.3,
          0.5,
        ]}
        scale={0.085}
        speed={1.8}
      />


      <Twinkle
        position={[
          2,
          1.05,
          0.2,
        ]}
        scale={0.065}
        speed={2.2}
      />


      <Twinkle
        position={[
          -1.8,
          -1.25,
          0.4,
        ]}
        scale={0.055}
        speed={1.55}
      />


      <Twinkle
        position={[
          2.35,
          -0.9,
          -0.25,
        ]}
        scale={0.075}
        speed={2.6}
      />


      <Twinkle
        position={[
          1.55,
          1.75,
          -0.4,
        ]}
        scale={0.045}
        speed={2}
      />

    </group>

  );

}


/* =========================================================
   SINGLE TWINKLE
========================================================= */

function Twinkle({
  position,
  scale,
  speed,
}) {

  const ref =
    useRef();


  useFrame(
    (state) => {

      if (
        !ref.current
      ) {
        return;
      }


      const time =
        state.clock.elapsedTime *
        speed;


      const pulse =
        0.35 +
        (
          Math.sin(time) + 1
        ) *
        0.325;


      ref.current.scale.setScalar(
        scale *
        pulse
      );


      ref.current.rotation.z =
        time *
        0.18;

    }
  );


  return (

    <group
      ref={ref}
      position={position}
    >

      <mesh>

        <planeGeometry
          args={[
            1,
            0.11,
          ]}
        />

        <meshBasicMaterial
          color="#f4d9aa"
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />

      </mesh>


      <mesh>

        <planeGeometry
          args={[
            0.11,
            1,
          ]}
        />

        <meshBasicMaterial
          color="#fff2d8"
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />

      </mesh>

    </group>

  );

}


/* =========================================================
   MODERN REALISTIC CAMERA
========================================================= */

function Camera3D({
  scrollProgressRef,
}) {

  const introRef =
    useRef();

  const cameraRef =
    useRef();


  useEffect(() => {

    if (
      !introRef.current
    ) {
      return;
    }


    gsap.set(
      introRef.current.position,
      {
        z: -2.2,
        y: -0.15,
      }
    );


    gsap.set(
      introRef.current.scale,
      {
        x: 0.72,
        y: 0.72,
        z: 0.72,
      }
    );


    const animation =
      gsap.timeline({
        delay: 0.35,
      });


    animation.to(
      introRef.current.position,
      {
        z: 0,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );


    animation.to(
      introRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    );


    return () => {

      animation.kill();

    };

  }, []);


  useFrame(
    (state) => {

      if (
        !cameraRef.current
      ) {
        return;
      }


      const time =
        state.clock.elapsedTime;


      const progress =
        scrollProgressRef?.current ||
        0;


      const targetRotationY =
        state.pointer.x *
          0.11 +
        progress *
          0.18;


      const targetRotationX =
        -state.pointer.y *
          0.045 -
        progress *
          0.035;


      cameraRef.current.rotation.y =
        THREE.MathUtils.lerp(
          cameraRef.current.rotation.y,
          targetRotationY,
          0.035
        );


      cameraRef.current.rotation.x =
        THREE.MathUtils.lerp(
          cameraRef.current.rotation.x,
          targetRotationX,
          0.035
        );


      cameraRef.current.rotation.z =
        THREE.MathUtils.lerp(
          cameraRef.current.rotation.z,
          Math.sin(
            time * 0.45
          ) * 0.004,
          0.03
        );


      const targetX =
        0.4 +
        progress *
          1.5;


      const targetY =
        Math.sin(
          time * 0.7
        ) *
          0.025 -
        progress *
          0.18;


      const targetZ =
        -progress *
        1.45;


      cameraRef.current.position.x =
        THREE.MathUtils.lerp(
          cameraRef.current.position.x,
          targetX,
          0.04
        );


      cameraRef.current.position.y =
        THREE.MathUtils.lerp(
          cameraRef.current.position.y,
          targetY,
          0.04
        );


      cameraRef.current.position.z =
        THREE.MathUtils.lerp(
          cameraRef.current.position.z,
          targetZ,
          0.04
        );


      const targetScale =
        1 -
        progress *
          0.17;


      const smoothScale =
        THREE.MathUtils.lerp(
          cameraRef.current.scale.x,
          targetScale,
          0.04
        );


      cameraRef.current.scale.setScalar(
        smoothScale
      );

    }
  );


  return (

    <group
      ref={introRef}
    >

      <group
        ref={cameraRef}
        position={[
          0.4,
          0,
          0,
        ]}
      >

        {/* MAIN BODY */}

        <mesh>

          <boxGeometry
            args={[
              2.45,
              1.45,
              0.82,
            ]}
          />

          <meshStandardMaterial
            color="#252729"
            metalness={0.42}
            roughness={0.48}
          />

        </mesh>


        {/* FRONT PLATE */}

        <mesh
          position={[
            0.15,
            0,
            0.43,
          ]}
        >

          <boxGeometry
            args={[
              1.75,
              1.27,
              0.055,
            ]}
          />

          <meshStandardMaterial
            color="#202224"
            metalness={0.5}
            roughness={0.42}
          />

        </mesh>


        {/* HAND GRIP */}

        <mesh
          position={[
            -1.12,
            -0.08,
            0.06,
          ]}
        >

          <boxGeometry
            args={[
              0.5,
              1.45,
              0.94,
            ]}
          />

          <meshStandardMaterial
            color="#171819"
            metalness={0.18}
            roughness={0.72}
          />

        </mesh>


        <mesh
          position={[
            -1.33,
            -0.07,
            0.28,
          ]}
        >

          <boxGeometry
            args={[
              0.11,
              1.12,
              0.52,
            ]}
          />

          <meshStandardMaterial
            color="#101112"
            metalness={0.05}
            roughness={0.9}
          />

        </mesh>


        {/* TOP PLATE */}

        <mesh
          position={[
            -0.15,
            0.84,
            0,
          ]}
        >

          <boxGeometry
            args={[
              1.55,
              0.18,
              0.68,
            ]}
          />

          <meshStandardMaterial
            color="#303235"
            metalness={0.58}
            roughness={0.36}
          />

        </mesh>


        {/* VIEWFINDER */}

        <mesh
          position={[
            0.22,
            1.04,
            -0.02,
          ]}
        >

          <boxGeometry
            args={[
              0.78,
              0.42,
              0.58,
            ]}
          />

          <meshStandardMaterial
            color="#222426"
            metalness={0.42}
            roughness={0.5}
          />

        </mesh>


        <mesh
          position={[
            0.22,
            1.05,
            -0.325,
          ]}
        >

          <planeGeometry
            args={[
              0.39,
              0.2,
            ]}
          />

          <meshPhysicalMaterial
            color="#0b1013"
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />

        </mesh>


        {/* HOT SHOE */}

        <mesh
          position={[
            0.23,
            1.28,
            0,
          ]}
        >

          <boxGeometry
            args={[
              0.32,
              0.045,
              0.35,
            ]}
          />

          <meshStandardMaterial
            color="#77797b"
            metalness={0.85}
            roughness={0.2}
          />

        </mesh>


        {/* MODE DIAL */}

        <mesh
          position={[
            0.82,
            0.98,
            0.02,
          ]}
        >

          <cylinderGeometry
            args={[
              0.23,
              0.23,
              0.09,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#18191a"
            metalness={0.6}
            roughness={0.42}
          />

        </mesh>


        {/* SHUTTER BUTTON */}

        <mesh
          position={[
            -0.85,
            0.93,
            0.28,
          ]}
        >

          <cylinderGeometry
            args={[
              0.11,
              0.11,
              0.055,
              32,
            ]}
          />

          <meshStandardMaterial
            color="#a5a7a8"
            metalness={0.9}
            roughness={0.18}
          />

        </mesh>


        {/* LENS MOUNT */}

        <mesh
          position={[
            0.25,
            0,
            0.51,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <cylinderGeometry
            args={[
              0.72,
              0.72,
              0.16,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#686a6b"
            metalness={0.9}
            roughness={0.16}
          />

        </mesh>


        {/* LENS BARREL */}

        <mesh
          position={[
            0.25,
            0,
            0.72,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <cylinderGeometry
            args={[
              0.69,
              0.72,
              0.34,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#1a1b1c"
            metalness={0.48}
            roughness={0.5}
          />

        </mesh>


        {/* FOCUS RING */}

        <mesh
          position={[
            0.25,
            0,
            0.93,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <cylinderGeometry
            args={[
              0.685,
              0.685,
              0.12,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#111213"
            metalness={0.28}
            roughness={0.82}
          />

        </mesh>


        <mesh
          position={[
            0.25,
            0,
            0.995,
          ]}
        >

          <ringGeometry
            args={[
              0.58,
              0.66,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#343638"
            metalness={0.65}
            roughness={0.38}
          />

        </mesh>


        {/* SECOND BARREL */}

        <mesh
          position={[
            0.25,
            0,
            1.14,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <cylinderGeometry
            args={[
              0.61,
              0.66,
              0.3,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#202122"
            metalness={0.52}
            roughness={0.42}
          />

        </mesh>


        {/* FRONT RING */}

        <mesh
          position={[
            0.25,
            0,
            1.33,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <cylinderGeometry
            args={[
              0.6,
              0.6,
              0.09,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#111213"
            metalness={0.72}
            roughness={0.28}
          />

        </mesh>


        <mesh
          position={[
            0.25,
            0,
            1.385,
          ]}
        >

          <ringGeometry
            args={[
              0.535,
              0.585,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#777a7c"
            metalness={0.95}
            roughness={0.14}
          />

        </mesh>


        {/* FRONT GLASS */}

        <mesh
          position={[
            0.25,
            0,
            1.405,
          ]}
        >

          <circleGeometry
            args={[
              0.525,
              64,
            ]}
          />

          <meshPhysicalMaterial
            color="#071119"
            roughness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.025}
            reflectivity={1}
          />

        </mesh>


        <mesh
          position={[
            0.25,
            0,
            1.415,
          ]}
        >

          <circleGeometry
            args={[
              0.39,
              64,
            ]}
          />

          <meshPhysicalMaterial
            color="#05141c"
            roughness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.02}
            transparent
            opacity={0.88}
          />

        </mesh>


        {/* LENS REFLECTION */}

        <mesh
          position={[
            0.08,
            0.17,
            1.425,
          ]}
          rotation={[
            0,
            0,
            -0.3,
          ]}
        >

          <planeGeometry
            args={[
              0.16,
              0.05,
            ]}
          />

          <meshBasicMaterial
            color="#9cc5d3"
            transparent
            opacity={0.14}
            depthWrite={false}
          />

        </mesh>

      </group>

    </group>

  );

}


/* =========================================================
   PHOTO FRAME
========================================================= */

function PhotoFrame({
  id,
  index,
  texture,
  position,
  rotation,
  scale = 1,
  speed = 1,
  introDelay = 1,
  disperse = [
    0,
    0,
    0,
  ],
  scrollProgressRef,
  hoveredId,
  setHoveredId,
  onSelect,
}) {

  const introRef =
    useRef();

  const frameRef =
    useRef();

  const photoMaterialRef =
    useRef();

  const frameMaterialRef =
    useRef();

  const glowMaterialRef =
    useRef();


  const isHovered =
    hoveredId === id;


  const isDimmed =
    hoveredId !== null &&
    hoveredId !== id;


  useEffect(() => {

    if (
      !introRef.current
    ) {
      return;
    }


    gsap.set(
      introRef.current.position,
      {
        z: -2.5,
        y: 0.8,
      }
    );


    gsap.set(
      introRef.current.scale,
      {
        x: 0.25,
        y: 0.25,
        z: 0.25,
      }
    );


    gsap.set(
      introRef.current.rotation,
      {
        z: -0.25,
      }
    );


    const animation =
      gsap.timeline({
        delay:
          introDelay,
      });


    animation.to(
      introRef.current.position,
      {
        z: 0,
        y: 0,
        duration: 1.25,
        ease: "power3.out",
      }
    );


    animation.to(
      introRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.25,
        ease: "back.out(1.4)",
      },
      "<"
    );


    animation.to(
      introRef.current.rotation,
      {
        z: 0,
        duration: 1.25,
        ease: "power3.out",
      },
      "<"
    );


    return () => {

      animation.kill();

    };

  }, [
    introDelay,
  ]);


  useFrame(
    (state) => {

      if (
        !frameRef.current
      ) {
        return;
      }


      const time =
        state.clock.elapsedTime *
        speed;


      const progress =
        scrollProgressRef?.current ||
        0;


      const scrollX =
        disperse[0] *
        progress;


      const scrollY =
        disperse[1] *
        progress;


      const scrollZ =
        disperse[2] *
        progress;


      const targetX =
        position[0] +
        scrollX;


      const targetY =
        position[1] +
        Math.sin(time) *
          0.1 +
        scrollY;


      const targetZ =
        position[2] +
        scrollZ +
        (
          isHovered
            ? 1
            : 0
        );


      frameRef.current.position.x =
        THREE.MathUtils.lerp(
          frameRef.current.position.x,
          targetX,
          0.06
        );


      frameRef.current.position.y =
        THREE.MathUtils.lerp(
          frameRef.current.position.y,
          targetY,
          0.06
        );


      frameRef.current.position.z =
        THREE.MathUtils.lerp(
          frameRef.current.position.z,
          targetZ,
          0.06
        );


      const targetRotationY =
        rotation[1] +
        state.pointer.x *
          (
            isHovered
              ? 0.16
              : 0.08
          ) +
        progress *
          disperse[0] *
          0.04;


      const targetRotationX =
        rotation[0] -
        state.pointer.y *
          (
            isHovered
              ? 0.08
              : 0.035
          );


      frameRef.current.rotation.y =
        THREE.MathUtils.lerp(
          frameRef.current.rotation.y,
          targetRotationY,
          0.08
        );


      frameRef.current.rotation.x =
        THREE.MathUtils.lerp(
          frameRef.current.rotation.x,
          targetRotationX,
          0.08
        );


      frameRef.current.rotation.z =
        rotation[2] +
        Math.sin(
          time * 0.6
        ) *
          0.02 +
        progress *
          disperse[1] *
          0.03;


      let targetScale =
        scale *
        (
          isHovered
            ? 1.22
            : 1
        );


      targetScale *=
        1 -
        progress *
          0.16;


      const smoothScale =
        THREE.MathUtils.lerp(
          frameRef.current.scale.x,
          targetScale,
          0.08
        );


      frameRef.current.scale.setScalar(
        smoothScale
      );


      let targetOpacity =
        isDimmed
          ? 0.28
          : 1;


      targetOpacity *=
        1 -
        progress *
          0.55;


      if (
        photoMaterialRef.current
      ) {

        photoMaterialRef.current.opacity =
          THREE.MathUtils.lerp(
            photoMaterialRef.current.opacity,
            targetOpacity,
            0.08
          );

      }


      if (
        frameMaterialRef.current
      ) {

        frameMaterialRef.current.opacity =
          THREE.MathUtils.lerp(
            frameMaterialRef.current.opacity,
            targetOpacity,
            0.08
          );

      }


      if (
        glowMaterialRef.current
      ) {

        glowMaterialRef.current.opacity =
          THREE.MathUtils.lerp(
            glowMaterialRef.current.opacity,
            isHovered
              ? 0.48
              : 0,
            0.08
          );

      }

    }
  );


  return (

    <group
      ref={introRef}
    >

      <group
        ref={frameRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >

        <mesh
          position={[
            0,
            0,
            -0.07,
          ]}
        >

          <planeGeometry
            args={[
              1.75,
              2.25,
            ]}
          />

          <meshBasicMaterial
            ref={
              glowMaterialRef
            }
            color="#d69d52"
            transparent
            opacity={0}
            depthWrite={false}
            side={
              THREE.DoubleSide
            }
          />

        </mesh>


        <mesh>

          <boxGeometry
            args={[
              1.42,
              1.9,
              0.08,
            ]}
          />

          <meshStandardMaterial
            ref={
              frameMaterialRef
            }
            color="#a77943"
            metalness={0.85}
            roughness={0.24}
            transparent
            opacity={1}
          />

        </mesh>


        <mesh
          position={[
            0,
            0,
            0.052,
          ]}
        >

          <planeGeometry
            args={[
              1.32,
              1.8,
            ]}
          />

          <meshBasicMaterial
            color="#050505"
          />

        </mesh>


        <mesh
          position={[
            0,
            0,
            0.065,
          ]}
        >

          <planeGeometry
            args={[
              1.23,
              1.7,
            ]}
          />

          <meshBasicMaterial
            ref={
              photoMaterialRef
            }
            map={texture}
            transparent
            opacity={1}
            toneMapped={false}
          />

        </mesh>


        <mesh
          position={[
            0,
            0,
            0.09,
          ]}
          onPointerOver={
            (event) => {

              event.stopPropagation();

              setHoveredId(
                id
              );

            }
          }
          onPointerOut={
            (event) => {

              event.stopPropagation();

              setHoveredId(
                null
              );

            }
          }
          onClick={
            (event) => {

              event.stopPropagation();

              onSelect(
                index
              );

            }
          }
        >

          <planeGeometry
            args={[
              1.45,
              1.95,
            ]}
          />

          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            side={
              THREE.DoubleSide
            }
          />

        </mesh>

      </group>

    </group>

  );

}


/* =========================================================
   HERO SCENE
========================================================= */

function HeroScene({
  onSelectPhoto,
  scrollProgressRef,
}) {

  const [
    hoveredId,
    setHoveredId,
  ] =
    useState(null);


  const textures =
    useLoader(
      THREE.TextureLoader,
      [
        "/images-optimized/wedding.webp",
        "/images-optimized/portrait.webp",
        "/images-optimized/event.webp",
      ]
    );


  const [
    weddingTexture,
    portraitTexture,
    eventTexture,
  ] =
    textures;


  useEffect(() => {

    textures.forEach(
      (texture) => {

        texture.colorSpace =
          THREE.SRGBColorSpace;

        texture.minFilter =
          THREE.LinearMipmapLinearFilter;

        texture.magFilter =
          THREE.LinearFilter;

        texture.generateMipmaps =
          true;

        texture.needsUpdate =
          true;

      }
    );

  }, [
    textures,
  ]);


  useEffect(() => {

    document.body.style.cursor =
      hoveredId !== null
        ? "pointer"
        : "default";


    return () => {

      document.body.style.cursor =
        "default";

    };

  }, [
    hoveredId,
  ]);


  return (

    <>

      {/* SOFT STUDIO LIGHTING */}

      <ambientLight
        intensity={1.15}
        color="#fff8ef"
      />


      <hemisphereLight
        skyColor="#e9edf0"
        groundColor="#17100b"
        intensity={0.75}
      />


      <directionalLight
        position={[
          4,
          5,
          6,
        ]}
        intensity={3}
        color="#fff0dc"
      />


      <pointLight
        position={[
          1,
          1,
          5,
        ]}
        intensity={8}
        distance={10}
        decay={2}
        color="#fff5e8"
      />


      <pointLight
        position={[
          -4,
          2,
          3,
        ]}
        intensity={5}
        distance={9}
        decay={2}
        color="#d9a361"
      />


      <pointLight
        position={[
          4,
          1,
          2,
        ]}
        intensity={3.5}
        distance={9}
        decay={2}
        color="#8fb1c3"
      />


      {/* GLITTER BEHIND / AROUND CAMERA */}

      <CameraGlitter
        scrollProgressRef={
          scrollProgressRef
        }
      />


      <Camera3D
        scrollProgressRef={
          scrollProgressRef
        }
      />


      <PhotoFrame
        id="wedding"
        index={0}
        texture={
          weddingTexture
        }
        position={[
          -2.7,
          1.4,
          -1,
        ]}
        rotation={[
          -0.04,
          0.3,
          -0.1,
        ]}
        scale={0.48}
        speed={0.8}
        introDelay={0.95}
        disperse={[
          -2.4,
          1,
          -1.5,
        ]}
        scrollProgressRef={
          scrollProgressRef
        }
        hoveredId={
          hoveredId
        }
        setHoveredId={
          setHoveredId
        }
        onSelect={
          onSelectPhoto
        }
      />


      <PhotoFrame
        id="portrait"
        index={1}
        texture={
          portraitTexture
        }
        position={[
          3,
          1.25,
          -0.8,
        ]}
        rotation={[
          0.03,
          -0.28,
          0.1,
        ]}
        scale={0.52}
        speed={1}
        introDelay={1.2}
        disperse={[
          2.5,
          1.2,
          -1.8,
        ]}
        scrollProgressRef={
          scrollProgressRef
        }
        hoveredId={
          hoveredId
        }
        setHoveredId={
          setHoveredId
        }
        onSelect={
          onSelectPhoto
        }
      />


      <PhotoFrame
        id="event"
        index={2}
        texture={
          eventTexture
        }
        position={[
          3,
          -1.3,
          -0.4,
        ]}
        rotation={[
          -0.03,
          -0.2,
          -0.08,
        ]}
        scale={0.44}
        speed={0.7}
        introDelay={1.45}
        disperse={[
          2.2,
          -1.5,
          -1,
        ]}
        scrollProgressRef={
          scrollProgressRef
        }
        hoveredId={
          hoveredId
        }
        setHoveredId={
          setHoveredId
        }
        onSelect={
          onSelectPhoto
        }
      />

    </>

  );

}


export default HeroScene;