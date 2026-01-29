import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { 
  ListChecks, 
  Calculator, 
  ShoppingCart, 
  Wrench, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  ExternalLink,
  Cpu,
  MonitorPlay
} from 'lucide-react';

export function Planning() {
  const [activePhase, setActivePhase] = useState('research');

  const planningPhases = {
    research: {
      name: 'Research & Planning',
      tagline: 'Define Your Build',
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
      icon: ListChecks,
      steps: [
        {
          icon: MonitorPlay,
          title: 'Define Use Case',
          description: 'Gaming? Content creation? Work? Your primary use determines CPU/GPU balance and RAM requirements.',
        },
        {
          icon: DollarSign,
          title: 'Set Realistic Budget',
          description: 'Most entry point systems will start at around 800 euros now. Don\'t forget peripherals, monitor, and OS.',
        },
        {
          icon: Cpu,
          title: 'Platform Selection',
          description: 'Intel vs AMD, DDR4 vs DDR5. Your CPU choice locks in motherboard socket and RAM type for years.',
        },
        {
          icon: AlertTriangle,
          title: 'Compatibility Check',
          description: 'Case size vs GPU length, cooler clearance, PSU wattage, motherboard form factor. Use PCPartPicker for validation.',
        },
      ],
    },
    selection: {
      name: 'Component Selection',
      tagline: 'Choose Your Parts',
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
      icon: ShoppingCart,
      steps: [
        {
          icon: Calculator,
          title: 'Price Comparison',
          description: 'Tools like PCPartPicker track prices across retailers. However, these are based on the american market. Use Tweakers instead! Parts can vary €50-100+ between stores.',
        },
        {
          icon: Clock,
          title: 'Wait for Deals',
          description: 'Black Friday, often bring 15-30% discounts. Do not buy during new release windows, as scalpers will affect the price. Set price alerts on key components.',
        },
        {
          icon: Wrench,
          title: 'Future-Proofing',
          description: 'Only future proof if u intend to buy an upgrade within the year! Consider PCIe 4.0/5.0, DDR5 RAM, and motherboard features for longevity.',
        },
        {
          icon: AlertTriangle,
          title: 'Avoid Bottlenecks',
          description: 'Don\'t pair a high-end GPU with a budget CPU or vice versa. Balance your build for optimal performance.',
        },
      ],
    },
  };

  const planningTools = [
    {
      name: 'PC Part Picker',
      url: 'https://pcpartpicker.com',
      description: 'Compatibility checker & price tracker',
      color: 'var(--color-purple-3)',
    },
    {
      name: 'BuildCores',
      url: 'https://buildcores.com',
      description: 'Pre-configured build guides',
      color: 'var(--color-magenta-2)',
    },
  ];

  const retailers = [
    {
      name: 'Megekko',
      url: 'https://www.megekko.nl',
      description: 'Netherlands PC parts retailer',
      color: 'var(--color-red-3)',
    },
    {
      name: 'Alternate',
      url: 'https://www.alternate.nl',
      description: 'Tech & gaming hardware',
      color: 'var(--color-purple-4)',
    },
  ];

  const PhaseSelector = () => (
    <div className="gap-4 grid grid-cols-2 mb-6">
      {Object.entries(planningPhases).map(([key, phase]) => {
        const Icon = phase.icon;
        return (
          <Card
            key={key}
            className={`cursor-pointer border-2 transition-all duration-300 ${
              activePhase === key
                ? 'border-white/40 shadow-[0_0_30px_rgba(110,63,237,0.2)]'
                : 'border-[var(--gray-5)] hover:border-[var(--color-purple-4)]'
            }`}
            onClick={() => setActivePhase(key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${phase.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{phase.name}</h3>
                  <p className="text-[var(--gray-3)] text-xs truncate">{phase.tagline}</p>
                </div>
                {activePhase === key && (
                  <div
                    className="rounded-full w-2 h-2 animate-pulse"
                    style={{ backgroundColor: phase.accentColor }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <section
      id="planning"
      className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-26 pb-20 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-full h-full">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/4 left-1/3 absolute bg-[var(--color-purple-3)] blur-[140px] rounded-full w-96 h-96 animate-pulse" />
          <div className="right-1/3 bottom-1/4 absolute bg-[var(--color-magenta-2)] blur-[140px] rounded-full w-96 h-96 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative flex flex-col gap-6 w-full h-full overflow-visible">
          {/* Header */}
          <div className="flex flex-col gap-2 overflow-visible animate-fadeIn">
            <div className="flex items-center gap-3 overflow-visible">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
                Planning Your Build
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Build Strategy
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Strategic approach to planning, budgeting, and sourcing your PC components
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Phase Selector */}
          <PhaseSelector />

          {/* Detailed View */}
          <div className="flex flex-1 gap-6 min-h-0">
            {/* Left Column - Tools & Retailers */}
            <div className="flex flex-col gap-4 w-1/5">
              {/* Planning Tools */}
              <Card className="border-[var(--gray-5)] border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                    Planning Tools
                  </CardTitle>
                  <CardDescription className="text-xs">Essential websites for build planning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {planningTools.map((tool, idx) => (
                    <Card
                      key={idx}
                      className="group bg-[var(--gray-6)]/30 hover:bg-[var(--gray-6)]/50 p-4 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] transition-all duration-200 cursor-pointer"
                      onClick={() => window.open(tool.url, '_blank')}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="flex items-center gap-2 mb-1 font-semibold group-hover:text-[var(--color-purple-3)] text-sm transition-colors">
                            {tool.name}
                            <ExternalLink className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-opacity" />
                          </h4>
                          <p className="text-[var(--gray-3)] text-xs">{tool.description}</p>
                        </div>
                        <div
                          className="flex flex-shrink-0 justify-center items-center rounded-md w-8 h-8"
                          style={{ backgroundColor: `${tool.color}20` }}
                        >
                          <ListChecks className="w-4 h-4" style={{ color: tool.color }} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Retailers */}
              <Card className="border-[var(--gray-5)] border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="bg-[var(--color-red-3)] rounded-full w-2 h-2" />
                    Buy Components
                  </CardTitle>
                  <CardDescription className="text-xs">Trusted retailers in the Netherlands</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {retailers.map((retailer, idx) => (
                    <Card
                      key={idx}
                      className="group bg-[var(--gray-6)]/30 hover:bg-[var(--gray-6)]/50 p-4 border border-[var(--gray-5)] hover:border-[var(--color-red-4)] transition-all duration-200 cursor-pointer"
                      onClick={() => window.open(retailer.url, '_blank')}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="flex items-center gap-2 mb-1 font-semibold group-hover:text-[var(--color-red-3)] text-sm transition-colors">
                            {retailer.name}
                            <ExternalLink className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-opacity" />
                          </h4>
                          <p className="text-[var(--gray-3)] text-xs">{retailer.description}</p>
                        </div>
                        <div
                          className="flex flex-shrink-0 justify-center items-center rounded-md w-8 h-8"
                          style={{ backgroundColor: `${retailer.color}20` }}
                        >
                          <ShoppingCart className="w-4 h-4" style={{ color: retailer.color }} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Phase Details */}
            <div className="flex flex-col gap-4 pr-2 w-3/7 overflow-y-auto custom-scrollbar">
              {/* Phase Header */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${planningPhases[activePhase].color} shadow-lg`}
                    >
                      {React.createElement(planningPhases[activePhase].icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{planningPhases[activePhase].name}</h3>
                      <p className="text-[var(--gray-3)] text-xs">{planningPhases[activePhase].tagline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steps Section */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span
                      className="rounded-full w-2 h-2"
                      style={{ backgroundColor: planningPhases[activePhase].accentColor }}
                    />
                    Key Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {planningPhases[activePhase].steps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={idx}
                        className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-md transition-all duration-200"
                        style={{
                          animationDelay: `${idx * 0.06}s`,
                          animation: 'fadeIn 0.45s ease-out',
                        }}
                      >
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${planningPhases[activePhase].color} shadow transition-transform duration-200 group-hover:scale-105`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-purple-3)] text-xs transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-[var(--gray-3)] text-xs leading-tight">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

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