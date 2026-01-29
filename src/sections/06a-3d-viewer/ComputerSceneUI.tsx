import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';

export function ComputerSceneUI() {

    const [highlighted, setHighlighted] = useState(null);
    const [selected, setSelected] = useState(null);

    // Memoize static component list so hover doesn't recreate the array
    const components = useMemo(
        () => [
            { id: 'cpu', name: 'CPU' },
            { id: 'gpu', name: 'GPU' },
            { id: 'ram', name: 'RAM' },
            { id: 'storage', name: 'Storage' },
            { id: 'motherboard', name: 'Motherboard' },
            { id: 'psu', name: 'PSU' },
            { id: 'case', name: 'Case' },
            { id: 'cooling', name: 'Cooling' },
            { id: 'fans', name: 'Fans' },
        ],
        []
    );

      // Memoize highlight styles so they're stable across hovers
      const highlightStyles = useMemo(() => ({
        cpu: { 
            top: '38vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw + 19vh)',
            width: '10vh',
            height: '10vh', 
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        gpu: { 
            top: '54vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw + 3vh)',
            width: '30vh',
            height: '5vh',
            background: 'var(--color-red-3)', 
            border: '2px solid var(--color-red-5)',
        },
        ram: { 
            top: '34vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw + 30vh)',
            width: '6vh',
            height: '17vh', 
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        storage: [
            { 
                top: '50vh',
                left: 'calc((100vw - 75vh) / 2 + 3vw + 7vh)',
                width: '20vh',
                height: '5vh', 
                background: 'var(--color-red-3)',
                border: '2px solid var(--color-red-5)',
            },
            {
                top: '62vh',
                left: 'calc((100vw - 75vh) / 2 + 3vw + 12vh)',
                width: '20vh',
                height: '4vh',
                background: 'var(--color-red-3)',
                border: '2px solid var(--color-red-5)',
            }
        ],
        motherboard: { 
            top: '30vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw + 7vh)',
            width: '30vh',
            height: '40vh', 
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        psu: {
            top: '75vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw)',
            width: '30vh',
            height: '15vh',
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        case: {
            top: '18vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw)',
            width: '75vh',
            height: '75vh',
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        cooling: { 
            top: '20vh',
            left: 'calc((100vw - 75vh) / 2 + 3vw + 12vh)',
            width: '40vh',
            height: '10vh',
            background: 'var(--color-red-3)',
            border: '2px solid var(--color-red-5)',
        },
        fans: [
            {
                top: '28vh',
                left: 'calc((100vw - 75vh) / 2 + 3vw + 2vh)',
                width: '10vh',
                height: '20vh',
                background: 'var(--color-red-3)',
                border: '2px solid var(--color-red-5)',
            },
            {
                top: '24vh',
                left: 'calc((100vw - 75vh) / 2 + 3vw + 56vh)',
                width: '14vh',
                height: '60vh',
                background: 'var(--color-red-3)',
                border: '2px solid var(--color-red-5)',
            }
        ],
      }), []);

    const getHighlightStyles = (id) => {
        const styles = highlightStyles[id];
        if (!styles) return [];
        return Array.isArray(styles) ? styles : [styles];
    };

    const overlays = useMemo(() => (
        <div className="z-15 absolute inset-0 pointer-events-none">
            {components.map((component) => {
                const active = highlighted === component.id || selected === component.id;
                const styles = getHighlightStyles(component.id);
                return styles.map((style, idx) => (
                    <div
                        key={`${component.id}-${idx}`}
                        className={
                            `absolute transition-opacity duration-300 rounded-md 
                            ${active ? 'opacity-50' : 'opacity-0'}`
                        }
                        style={style}
                    />
                ));
            })}
        </div>
    ), [components, highlighted, selected]);

    return (
        <>
            {overlays}

            <div className="z-40 absolute inset-0 flex gap-8 mx-auto w-full pointer-events-none">
                <div className="space-y-2 mt-20 p-7 w-1/4 pointer-events-auto">
                    <h2 className="mb-4 font-bold text-black text-2xl">
                        Inspect Components
                    </h2>

                    {components.map((component) => (
                        <Button
                            key={component.id}
                            variant={'secondary'}
                            className={`justify-start w-full ${selected === component.id ? 'pointer-events-auto' : ''}`}
                            onMouseEnter={() => { if (selected === null) setHighlighted(component.id); }}
                            onMouseLeave={() => { if (selected === null) setHighlighted(null); }}
                            onClick={() => setSelected((prev) => (prev === component.id ? null : component.id))}
                            style={
                                selected === component.id
                                    ? { background: 'var(--color-red-3)', borderColor: 'var(--color-red-3)', color: 'var(--color-foreground, #fff)' }
                                    : (highlighted === component.id && selected === null)
                                        ? { outline: '2px solid var(--color-red-3)', outlineOffset: '2px' }
                                        : undefined
                            }
                        >
                            {component.name}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
}