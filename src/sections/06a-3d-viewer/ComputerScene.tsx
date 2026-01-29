import { useMemo, useRef } from 'react';
import { Vector3, type Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import vengeanceModel from '@/assets/models/desktop.glb';
import { CanvasScene } from '@/components/shared/CanvasScene';

// ============ 3D SCENES ============

// Computer Model Scene (your existing ThreeDViewer converted)
function FloatWrapper({ children, enabled = false }) {
  const ref = useRef<Group | null>(null);
  const amp = useRef<number>(0);
  const scl = useRef<number>(0);
  const posx = useRef<number>(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const target = enabled ? 0.45 : 0;
    const targetX = enabled ? 5 : 0;
    const scaleTarget = enabled ? 1.0 : 2.0;
    // smooth lerp toward target amplitude
    amp.current += (target - amp.current) * Math.min(1, delta * 4);
    scl.current += (scaleTarget - scl.current) * Math.min(1, delta * 4);
    posx.current += (targetX - posx.current) * Math.min(1, delta * 4);
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 0.5) * amp.current;
      ref.current.rotation.y = Math.sin(t * 0.6) * amp.current * 0.25;
      ref.current.rotation.x = Math.sin(t * 0.6) * amp.current * 0.25;
      ref.current.position.x = posx.current;
      ref.current.scale.x = scl.current * 0.5;
      ref.current.scale.y = scl.current * 0.5;
      ref.current.scale.z = scl.current * 0.5;
    }
  });

  return <group ref={ref}>{children}</group>;
}

export function ComputerScene({ isActive, enableFloat = false }) {
  function Model(props) {
    const { scene } = useGLTF(vengeanceModel);
    return (
      <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
    );
  }

  useGLTF.preload(vengeanceModel);

  // Memoize the rendered Model element so hover/re-renders don't recreate it
  // Wrap in FloatWrapper to allow smooth enabling/disabling of float
  const memoizedModel = useMemo(() => (
    <FloatWrapper enabled={enableFloat}>
      <Model />
    </FloatWrapper>
  ), [enableFloat]);

  // Memoize canvas children so changes to UI hover don't recreate scene children
  const memoizedCanvas = useMemo(() => (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <PresentationControls
        enabled={isActive}
        global={false}
        snap={true}
        zoom={1}
        speed={1}
      >
        {isActive ? memoizedModel : null}
      </PresentationControls>
      <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={5} far={5} />
    </>
  ), [isActive, memoizedModel]);

  return (
    <>
      {/* Canvas stays mounted, only fades in/out */}
      <CanvasScene sceneId="components" isActive={isActive}>
        {memoizedCanvas}
      </CanvasScene>
    </>
  );
}