import { useState } from 'react';
import { Button } from '@/components/ui/button';

const components = [
  { id: 'cpu', name: 'CPU' },
  { id: 'gpu', name: 'GPU' },
  { id: 'ram', name: 'RAM' },
  { id: 'storage', name: 'Storage' },
  { id: 'motherboard', name: 'Motherboard' },
  { id: 'psu', name: 'PSU' },
  { id: 'case', name: 'Case' },
  { id: 'cooling', name: 'Cooling' },
];

export const ComponentOverview = () => {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  // ✅ helper now in correct scope
  const getHighlightStyle = (id: string): React.CSSProperties => {
    const styles: Record<string, React.CSSProperties> = {
      cpu: { top: '35%', left: '40%', width: '10%', height: '10%' },
      gpu: { top: '50%', left: '30%', width: '40%', height: '15%' },
      ram: { top: '40%', left: '55%', width: '15%', height: '5%' },
      storage: { bottom: '10%', right: '10%', width: '20%', height: '10%' },
      motherboard: { top: '20%', left: '20%', width: '60%', height: '60%' },
      psu: { bottom: '5%', left: '5%', width: '30%', height: '15%' },
      case: {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: highlighted === 'case' ? 0.1 : 0,
      },
      cooling: { top: '20%', left: '40%', width: '20%', height: '15%' },
    };

    return styles[id] || {};
  };

  return (
    <section
      id="components"
      className="relative flex justify-center items-center bg-background p-8 h-screen text-foreground snap-start"
    >
      <div className="flex gap-8 mx-auto w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="space-y-2 w-1/4">
          <h2 className="mb-4 font-bold text-2xl">PC Components</h2>
          {components.map((component) => (
            <Button
              key={component.id}
              variant={highlighted === component.id ? 'secondary' : 'ghost'}
              className="justify-start w-full"
              onMouseEnter={() => setHighlighted(component.id)}
              onMouseLeave={() => setHighlighted(null)}
            >
              {component.name}
            </Button>
          ))}
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center items-center bg-muted rounded-lg w-3/4 h-[70vh] overflow-hidden">
          <p className="text-muted-foreground">PC Image Placeholder</p>

          {components.map((component) => (
            <div
              key={component.id}
              className={`absolute bg-primary transition-opacity duration-300 ${
                highlighted === component.id ? 'opacity-20' : 'opacity-0'
              }`}
              style={getHighlightStyle(component.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};