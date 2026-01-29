import { useMemo } from 'react';
import { PresentationControls, Environment, ContactShadows, useGLTF, Float } from '@react-three/drei';
import vengeanceModel from '@/assets/models/vengeance2.glb';
import { CanvasScene } from '@/components/shared/CanvasScene';

export function RAMShortages({ isActive }) {
    function Model(props) {
        const { scene } = useGLTF(vengeanceModel);
        return (
            <Float>
                <primitive object={scene} {...props} rotation={[0.4, 1, 0]} scale={2} />
            </Float>
        );
    }

    useGLTF.preload(vengeanceModel);

    // Memoize the rendered Model element so hover/re-renders don't recreate it
    const memoizedModel = useMemo(() => <Model />, []);

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
            <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={10} blur={5} far={5} />
        </>
    ), [isActive, memoizedModel]);

    return (
        <>
            {/* Canvas stays mounted, only fades in/out */}
            <CanvasScene sceneId="market" isActive={isActive}>
                {memoizedCanvas}
            </CanvasScene>
        </>
    );
};
