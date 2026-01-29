import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Maximize2, Wind, Zap, Cpu, Box } from 'lucide-react';

export function Case() {
  const [selectedCase, setSelectedCase] = useState('mid-tower');

  const caseTypes = {
    'full-tower': {
      name: 'Full Tower',
      description: 'Maximum space, maximum possibilities',
      motherboards: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
      psuTypes: ['ATX', 'ATX 3.0'],
      maxGpuLength: "Large ",
      coolerHeight: "90-130",
      fanSlots: '10-14',
      storageSlots: '8-12',
      color: 'from-[var(--color-purple-3)] to-[var(--color-purple-4)]',
      accentColor: 'var(--color-purple-3)',
    },
    'mid-tower': {
      name: 'Mid Tower',
      description: 'Perfect balance of size and capability',
      motherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      psuTypes: ['ATX', 'ATX 3.0'],
      maxGpuLength: 380,
      coolerHeight: 170,
      fanSlots: '6-9',
      storageSlots: '4-6',
      color: 'from-[var(--color-purple-2)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-purple-2)',
    },
    'mini-tower': {
      name: 'Mini Tower / mATX',
      description: 'Compact without compromise',
      motherboards: ['Micro-ATX', 'Mini-ITX'],
      psuTypes: ['ATX', 'SFX'],
      maxGpuLength: 320,
      coolerHeight: 155,
      fanSlots: '4-6',
      storageSlots: '2-4',
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
    },
    'sff': {
      name: 'Small Form Factor',
      description: 'Minimalist builds, maximum density',
      motherboards: ['Mini-ITX'],
      psuTypes: ['SFX', 'SFX-L'],
      maxGpuLength: 280,
      coolerHeight: 130,
      fanSlots: '2-4',
      storageSlots: '2-3',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-2)',
    },
  };

  const constraints = [
    {
      icon: Box,
      title: 'Motherboard Size',
      description: 'Case determines which form factors fit',
      gradient: 'from-[var(--color-purple-3)] to-[var(--color-purple-4)]',
    },
    {
      icon: Zap,
      title: 'PSU Form Factor',
      description: 'ATX, SFX, or SFX-L compatibility',
      gradient: 'from-[var(--color-magenta-2)] to-[var(--color-magenta-3)]',
    },
    {
      icon: Cpu,
      title: 'Cooler Clearance',
      description: 'Height limits for air coolers and radiators',
      gradient: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
    },
    {
      icon: Maximize2,
      title: 'GPU Length',
      description: 'Maximum graphics card dimensions',
      gradient: 'from-[var(--color-purple-4)] to-[var(--color-magenta-2)]',
    },
    {
      icon: Wind,
      title: 'Airflow & Fans',
      description: 'Fan mounting points and cooling capacity',
      gradient: 'from-[var(--color-red-3)] to-[var(--color-red-4)]',
    },
  ];

  const shorthandMap: Record<string, string> = {
    'full-tower': 'FT',
    'mid-tower': 'MT',
    'mini-tower': 'mATX',
    sff: 'SFF',
  };



  return (
    <section 
      id="case" 
      className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-26 pb-10 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-auto h-full">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/3 right-1/4 absolute bg-[var(--color-purple-3)] blur-[150px] rounded-full w-96 h-96 animate-pulse" />
          <div className="bottom-1/3 left-1/4 absolute bg-[var(--color-red-3)] blur-[150px] rounded-full w-96 h-96 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative flex flex-col gap-6 w-full h-full">
          {/* Header */}
          <div className="flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-center gap-3">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] font-bold text-transparent text-5xl tracking-tight">
                PC Cases
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                The Foundation
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Your case choice determines motherboard size, PSU type, cooling capacity, and GPU clearance
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Main Content */}
          <div className="gap-6 grid grid-cols-[1fr_20rem] grid-rows-[auto_auto] min-h-0">
            {/* Center Column - Specs Display (top-left) */}
            <div className="flex flex-col flex-1 gap-4 col-start-1 row-start-1 w-full h-min">
              <Card className="relative flex-1 border-[var(--gray-5)] border-2 w-120 overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${caseTypes[selectedCase].color} opacity-10 transition-all duration-700`}
                />
                <CardHeader className="z-10 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] to-[var(--color-red-3)] font-bold text-transparent text-3xl">
                        {caseTypes[selectedCase].name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {caseTypes[selectedCase].description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="z-10 relative space-y-6">
                  {/* Motherboard Compatibility */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-semibold text-[var(--gray-2)] text-sm">
                      <Box className="w-4 h-4" style={{ color: caseTypes[selectedCase].accentColor }} />
                      Supported Motherboards
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {caseTypes[selectedCase].motherboards.map(mb => (
                        <Badge 
                          key={mb} 
                          className="px-4 py-2 border-2 font-medium text-gray-3 text-sm hover:scale-105 transition-all duration-300"
                          style={{ 
                            borderColor: caseTypes[selectedCase].accentColor,
                            background: `${caseTypes[selectedCase].accentColor}20`
                          }}
                        >
                          {mb}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Row - Compact Shorthand Buttons (beneath center) */}
              <div
                className="gap-3 grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))] col-start-1 row-start-2 p-2 w-full"
              >
                {Object.entries(caseTypes).map(([key, specs], idx) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCase(key)}
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                      animation: 'fadeIn 0.45s ease-out',
                      borderColor: selectedCase === key ? specs.accentColor : undefined,
                      background: selectedCase === key ? `${specs.accentColor}20` : undefined,
                    }}
                    className={`
                      w-full px-3 py-1 text-sm rounded-md border-2
                      transition-all duration-300 shadow-sm
                      flex items-center justify-center
                      hover:scale-105
                      ${selectedCase === key
                        ? 'scale-[1.02] shadow-[0_0_18px_rgba(110,63,237,0.18)]'
                        : 'bg-[var(--gray-7)]'}
                    `}
                  >
                    {shorthandMap[key] ?? specs.name}
                  </button>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] mt-2 border-[var(--color-purple-3)]/30 border-2 w-120">
                <CardContent className="p-4">
                  <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Choose your case first! It's the most permanent decision 
                    and constrains all other component selections.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Constraints (top-right) */}
            <div className="flex flex-col gap-3 col-start-2 row-start-1 pr-2 w-80 overflow-y-auto custom-scrollbar">
              <Card className="bg-gradient-to-br from-[var(--color-red-7)] to-[var(--gray-7)] border-[var(--color-red-3)]/30 border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[var(--color-red-3)]" />
                    <CardTitle className="text-base">Key Constraints</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Your case dictates these critical limits
                  </CardDescription>
                </CardHeader>
              </Card>
              
              {constraints.map((constraint, idx) => {
                const Icon = constraint.icon;
                return (
                  <Card
                    key={constraint.title}
                    className="group bg-[var(--gray-7)] border-[var(--gray-5)] border-2 hover:border-[var(--color-purple-4)] transition-all duration-300"
                    style={{ 
                      animationDelay: `${idx * 0.1 + 0.3}s`,
                      animation: 'fadeIn 0.6s ease-out'
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${constraint.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold group-hover:text-[var(--color-purple-3)] text-sm transition-colors">
                            {constraint.title}
                          </h4>
                          <p className="mt-1 text-[var(--gray-3)] text-xs leading-relaxed">
                            {constraint.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--gray-6);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--color-purple-3), var(--color-red-3));
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, var(--color-purple-4), var(--color-red-4));
        }
      `}</style>
    </section>
  );
}