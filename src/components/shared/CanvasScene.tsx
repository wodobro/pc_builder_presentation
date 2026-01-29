import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useState, useEffect, useRef, useMemo } from 'react';

export function CanvasScene({ 
  sceneId, 
  isActive, 
  children, 
  cameraPosition = [0, 0, 10], // Simplified typing (R3F accepts arrays)
  fov = 60 
}) {
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);
  
  // Memoize position to prevent unnecessary re-renders of the camera
  const pos = useMemo(() => 
    Array.isArray(cameraPosition) ? new Vector3(...cameraPosition) : cameraPosition, 
    [cameraPosition]
  );

  useEffect(() => {
    if (!isActive) setIsInteracting(false);
  }, [isActive]);

  useEffect(() => {
    const handleRelease = () => setIsInteracting(false);
    
    // Using 'window' for the release ensures we catch it even if 
    // the user drags the mouse outside the browser window.
    window.addEventListener('mouseup', handleRelease);
    window.addEventListener('touchend', handleRelease);
    
    return () => {
      window.removeEventListener('mouseup', handleRelease);
      window.removeEventListener('touchend', handleRelease);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 transition-opacity duration-500 pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      // This is the trigger that "activates" the 3D layer
      onMouseDown={() => setIsInteracting(true)}
      onTouchStart={() => setIsInteracting(true)}
    >
      <Canvas
        className='pointer-events-none'
        shadows
        camera={{ position: pos, fov }}
        gl={{ alpha: true, preserveDrawingBuffer: false }}
        frameloop={isActive ? 'always' : 'demand'}
        
        // Tells R3F to use our div for the raycaster/pointer events
        eventSource={containerRef}
      >
        {children}
      </Canvas>
    </div>
  );
}