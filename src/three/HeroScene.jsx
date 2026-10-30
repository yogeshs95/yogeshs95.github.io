import {
  useFrame,
  useLoader,
  useThree,
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
   TWINKLE
========================================================= */

function Twinkle({
  position,
  scale = 0.06,
  speed = 2,
}) {
  const ref = useRef();


  useFrame((state) => {
    if (!ref.current) return;

    const time =
      state.clock.elapsedTime * speed;

    const pulse =
      0.45 +
      ((Math.sin(time) + 1) / 2) * 0.55;

    ref.current.scale.setScalar(
      scale * pulse
    );

    ref.current.rotation.z =
      time * 0.12;
  });


  return (
    <group
      ref={ref}
      position={position}
    >
      <mesh>
        <planeGeometry args={[1, 0.1]} />

        <meshBasicMaterial
          color="#f0d3a1"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <planeGeometry args={[0.1, 1]} />

        <meshBasicMaterial
          color="#fff4df"
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   CAMERA GLITTER
========================================================= */

function CameraGlitter({
  scrollProgressRef,
}) {
  const groupRef = useRef();
  const pointsRef = useRef();

  const { size } = useThree();

  const isMobile =
    size.width <= 800;

  const particleCount =
    isMobile ? 45 : 80;


  const positions = useMemo(() => {
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
        1.4 +
        Math.random() *
        2;

      data[i * 3] =
        Math.cos(angle) *
        radius;

      data[i * 3 + 1] =
        (Math.random() - 0.5) *
        3.6;

      data[i * 3 + 2] =
        (Math.random() - 0.5) *
        2.2;
    }

    return data;
  }, [particleCount]);


  useFrame((state) => {
    if (!groupRef.current) return;

    const time =
      state.clock.elapsedTime;

    const progress =
      scrollProgressRef?.current || 0;

    const baseX =
      isMobile ? 0 : 0.35;

    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        baseX +
          progress *
            (isMobile ? 0.2 : 0.7),
        0.035
      );

    groupRef.current.position.y =
      Math.sin(time * 0.35) *
        0.025 -
      progress * 0.1;

    groupRef.current.position.z =
      -progress * 0.8;

    if (pointsRef.current) {
      pointsRef.current.material.opacity =
        0.4 +
        Math.sin(time * 1.7) *
          0.06;
    }
  });


  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
    >
      <points ref={pointsRef}>
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
          color="#dfbc82"
          size={
            isMobile
              ? 0.028
              : 0.034
          }
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>


      <Twinkle
        position={[
          -1.7,
          1.1,
          0.3,
        ]}
        scale={0.065}
        speed={1.8}
      />

      <Twinkle
        position={[
          1.65,
          1,
          0.2,
        ]}
        scale={0.05}
        speed={2.2}
      />

      <Twinkle
        position={[
          -1.5,
          -1,
          0.25,
        ]}
        scale={0.045}
        speed={1.5}
      />

      <Twinkle
        position={[
          1.7,
          -0.9,
          -0.1,
        ]}
        scale={0.055}
        speed={2.5}
      />
    </group>
  );
}


/* =========================================================
   MODERN CAMERA
========================================================= */

function Camera3D({
  scrollProgressRef,
}) {
  const introRef = useRef();
  const cameraRef = useRef();

  const { size } = useThree();

  const isMobile =
    size.width <= 800;


  useEffect(() => {
    if (!introRef.current) return;

    gsap.set(
      introRef.current.position,
      {
        z: -2,
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
        delay: 0.3,
      });

    animation.to(
      introRef.current.position,
      {
        z: 0,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
      }
    );

    animation.to(
      introRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.4,
        ease: "power3.out",
      },
      "<"
    );

    return () =>
      animation.kill();
  }, []);


  useFrame((state) => {
    if (!cameraRef.current) return;

    const time =
      state.clock.elapsedTime;

    const progress =
      scrollProgressRef?.current || 0;


    const rotationY =
      state.pointer.x *
        (isMobile
          ? 0.045
          : 0.09);

    const rotationX =
      -state.pointer.y *
      (isMobile
        ? 0.015
        : 0.035);


    cameraRef.current.rotation.y =
      THREE.MathUtils.lerp(
        cameraRef.current.rotation.y,
        rotationY,
        0.035
      );

    cameraRef.current.rotation.x =
      THREE.MathUtils.lerp(
        cameraRef.current.rotation.x,
        rotationX,
        0.035
      );

    cameraRef.current.rotation.z =
      Math.sin(
        time * 0.4
      ) * 0.003;


    /*
      MOBILE EXACT CENTER
    */

    const baseX =
      isMobile ? 0 : 0.3;


    cameraRef.current.position.x =
      THREE.MathUtils.lerp(
        cameraRef.current.position.x,
        baseX +
          progress *
            (isMobile
              ? 0.15
              : 0.65),
        0.04
      );


    cameraRef.current.position.y =
      Math.sin(
        time * 0.7
      ) * 0.02;


    cameraRef.current.position.z =
      -progress * 0.9;


    const targetScale =
      (isMobile
        ? 0.86
        : 1) *
      (1 -
        progress * 0.12);


    const smoothScale =
      THREE.MathUtils.lerp(
        cameraRef.current.scale.x,
        targetScale,
        0.04
      );


    cameraRef.current.scale.setScalar(
      smoothScale
    );
  });


  return (
    <group ref={introRef}>
      <group
        ref={cameraRef}
        position={[
          0,
          0,
          0,
        ]}
      >

        {/* BODY */}

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


        {/* GRIP */}

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
              0.22,
              0.22,
              0.09,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#18191a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>


        {/* SHUTTER */}

        <mesh
          position={[
            -0.85,
            0.93,
            0.28,
          ]}
        >
          <cylinderGeometry
            args={[
              0.1,
              0.1,
              0.055,
              32,
            ]}
          />

          <meshStandardMaterial
            color="#a0a2a4"
            metalness={0.9}
            roughness={0.2}
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
            0.73,
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
              0.36,
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
            0.98,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              0.68,
              0.68,
              0.14,
              64,
            ]}
          />

          <meshStandardMaterial
            color="#111213"
            metalness={0.28}
            roughness={0.82}
          />
        </mesh>


        {/* SECOND LENS BARREL */}

        <mesh
          position={[
            0.25,
            0,
            1.18,
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
            1.37,
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


        {/* GLASS */}

        <mesh
          position={[
            0.25,
            0,
            1.43,
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
          />
        </mesh>


        {/* INNER GLASS */}

        <mesh
          position={[
            0.25,
            0,
            1.44,
          ]}
        >
          <circleGeometry
            args={[
              0.39,
              64,
            ]}
          />

          <meshPhysicalMaterial
            color="#041017"
            roughness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.02}
            transparent
            opacity={0.88}
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

  desktopPosition,
  mobilePosition,

  rotation,

  desktopScale,
  mobileScale,

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
  const introRef = useRef();
  const frameRef = useRef();

  const photoMaterialRef =
    useRef();


  const {
    size,
    viewport,
  } = useThree();


  const isMobile =
    size.width <= 800;


  const basePosition =
    isMobile
      ? mobilePosition
      : desktopPosition;


  const baseScale =
    isMobile
      ? mobileScale
      : desktopScale;


  /*
    IMPORTANT FIX

    Current Canvas viewport च्या
    बाहेर photo जाऊ शकणार नाही.
  */

  const safetyMargin =
    isMobile
      ? 0.85
      : 1.25;


  const safeXLimit =
    Math.max(
      1.2,
      viewport.width / 2 -
        safetyMargin
    );


  const isHovered =
    hoveredId === id;


  const isDimmed =
    hoveredId !== null &&
    hoveredId !== id;


  useEffect(() => {
    if (!introRef.current) return;

    gsap.set(
      introRef.current.scale,
      {
        x: 0.3,
        y: 0.3,
        z: 0.3,
      }
    );

    const animation =
      gsap.to(
        introRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.1,
          delay: introDelay,
          ease: "back.out(1.2)",
        }
      );

    return () =>
      animation.kill();
  }, [introDelay]);


  useFrame((state) => {
    if (!frameRef.current) return;


    const progress =
      scrollProgressRef?.current || 0;


    const scrollStrength =
      isMobile
        ? 0.18
        : 0.35;


    /*
      Requested position
    */

    const requestedX =
      basePosition[0] +
      disperse[0] *
        progress *
        scrollStrength;


    /*
      Clamp = screen बाहेर जाऊ देणार नाही.
    */

    const targetX =
      THREE.MathUtils.clamp(
        requestedX,
        -safeXLimit,
        safeXLimit
      );


    const targetY =
      basePosition[1] +
      Math.sin(
        state.clock.elapsedTime *
          speed
      ) *
        0.06;


    const targetZ =
      basePosition[2] +
      (isHovered
        ? 0.5
        : 0);


    frameRef.current.position.x =
      THREE.MathUtils.lerp(
        frameRef.current.position.x,
        targetX,
        0.07
      );


    frameRef.current.position.y =
      THREE.MathUtils.lerp(
        frameRef.current.position.y,
        targetY,
        0.07
      );


    frameRef.current.position.z =
      THREE.MathUtils.lerp(
        frameRef.current.position.z,
        targetZ,
        0.07
      );


    const targetScale =
      baseScale *
      (isHovered
        ? 1.1
        : 1);


    const smoothScale =
      THREE.MathUtils.lerp(
        frameRef.current.scale.x,
        targetScale,
        0.07
      );


    frameRef.current.scale.setScalar(
      smoothScale
    );


    if (
      photoMaterialRef.current
    ) {
      photoMaterialRef.current.opacity =
        THREE.MathUtils.lerp(
          photoMaterialRef.current.opacity,
          isDimmed
            ? 0.38
            : 1,
          0.07
        );
    }
  });


  return (
    <group ref={introRef}>

      <group
        ref={frameRef}
        position={basePosition}
        rotation={rotation}
        scale={baseScale}
      >

        {/* GOLD FRAME */}

        <mesh>
          <boxGeometry
            args={[
              1.42,
              1.9,
              0.08,
            ]}
          />

          <meshStandardMaterial
            color="#9c7545"
            metalness={0.8}
            roughness={0.26}
          />
        </mesh>


        {/* DARK INNER */}

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


        {/* PHOTO */}

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


        {/* TOUCH AREA */}

        <mesh
          position={[
            0,
            0,
            0.11,
          ]}

          onPointerOver={(
            event
          ) => {
            event.stopPropagation();

            setHoveredId(id);
          }}

          onPointerOut={(
            event
          ) => {
            event.stopPropagation();

            setHoveredId(null);
          }}

          onPointerDown={(
            event
          ) => {
            event.stopPropagation();

            onSelect(index);
          }}

          onClick={(
            event
          ) => {
            event.stopPropagation();

            onSelect(index);
          }}
        >
          <planeGeometry
            args={[
              1.55,
              2,
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
  ] = useState(null);


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
  ] = textures;


  useEffect(() => {
    textures.forEach(
      (texture) => {
        texture.colorSpace =
          THREE.SRGBColorSpace;

        texture.minFilter =
          THREE.LinearMipmapLinearFilter;

        texture.magFilter =
          THREE.LinearFilter;

        texture.needsUpdate =
          true;
      }
    );
  }, [textures]);


  return (
    <>

      {/* LIGHTING */}

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


      {/* GLITTER */}

      <CameraGlitter
        scrollProgressRef={
          scrollProgressRef
        }
      />


      {/* CAMERA */}

      <Camera3D
        scrollProgressRef={
          scrollProgressRef
        }
      />


      {/* LEFT WEDDING */}

      <PhotoFrame
        id="wedding"
        index={0}
        texture={
          weddingTexture
        }

        desktopPosition={[
          -2.15,
          1.3,
          -0.9,
        ]}

        mobilePosition={[
          -1.4,
          1.1,
          -0.65,
        ]}

        rotation={[
          -0.04,
          0.18,
          -0.08,
        ]}

        desktopScale={0.43}
        mobileScale={0.32}

        speed={0.8}
        introDelay={0.7}

        disperse={[
          -1.3,
          0.5,
          -0.5,
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


      {/* RIGHT PORTRAIT */}

      <PhotoFrame
        id="portrait"
        index={1}
        texture={
          portraitTexture
        }

        desktopPosition={[
          2.15,
          1.2,
          -0.8,
        ]}

        mobilePosition={[
          1.4,
          1.05,
          -0.65,
        ]}

        rotation={[
          0.03,
          -0.18,
          0.07,
        ]}

        desktopScale={0.44}
        mobileScale={0.32}

        speed={1}
        introDelay={0.9}

        disperse={[
          1.3,
          0.5,
          -0.5,
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


      {/* RIGHT BOTTOM EVENT */}

      <PhotoFrame
        id="event"
        index={2}
        texture={
          eventTexture
        }

        desktopPosition={[
          2.05,
          -1.2,
          -0.55,
        ]}

        mobilePosition={[
          1.35,
          -1,
          -0.55,
        ]}

        rotation={[
          -0.03,
          -0.14,
          -0.06,
        ]}

        desktopScale={0.39}
        mobileScale={0.29}

        speed={0.7}
        introDelay={1.05}

        disperse={[
          1.2,
          -0.5,
          -0.5,
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