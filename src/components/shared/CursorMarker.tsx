import React, { useEffect, useState } from 'react';

type Props = {
  /** Keyboard key to toggle marker (default: 'm') */
  toggleKey?: string;
  /** Button label shown on-screen */
  buttonLabel?: string;
  /** Start visible */
  initial?: boolean;
};

export default function CursorMarker({ toggleKey = 'm', buttonLabel = 'Toggle Marker', initial = false }: Props) {
  const [active, setActive] = useState<boolean>(initial);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === toggleKey.toLowerCase()) {
        setActive(a => !a);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [toggleKey]);

  return (
    <>
      <button
        onClick={() => setActive(a => !a)}
        aria-pressed={active}
        className="right-6 bottom-6 z-[9998] fixed bg-gray-800 shadow-md px-4 py-3 rounded-lg text-white text-sm"
      >
        {buttonLabel} {active ? '•' : ''}
      </button>

      {active && (
        <div
          style={{
            position: 'fixed',
            top: pos.y,
            left: pos.x,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.95)',
              boxShadow: '0 0 18px rgba(239, 68, 68, 0.85)',
              border: '3px solid rgba(255,255,255,0.95)',
            }}
          />
        </div>
      )}
    </>
  );
}
