import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { 
  Cpu, 
  Server, 
  Shield, 
  Zap,
  DollarSign,
  AlertCircle
} from 'lucide-react';

import threadripperImg from '@/assets/images/threadripper.jpg';
import eatxImg from '@/assets/images/eatx.jpg';
import noctuaImg from '@/assets/images/Noctua-Threadripper-COOLER-1.jpg';
import eccImg from '@/assets/images/ecc.webp';

export function ThreadripperSection() {
  const [activeTab, setActiveTab] = useState('threadripper');

  const specs = {
    threadripper: {
      name: 'AMD Threadripper',
      tagline: 'Professional Workstation Power',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
      icon: Cpu,
      image: threadripperImg,
      imageTitle: 'Threadripper Processor',
      imageDescription: 'Massive die size and TR5 socket',
      features: [
        {
          icon: Cpu,
          title: 'Extreme Core Count',
          description: 'Up to 96 cores and 192 threads for unparalleled multi-threaded performance in rendering, simulation, and compilation.',
        },
        {
          icon: Zap,
          title: 'PCIe Lanes Galore',
          description: 'Up to 128 PCIe lanes enable multiple GPUs, NVMe drives, and high-speed peripherals without bandwidth constraints.',
        },
        {
          icon: DollarSign,
          title: 'Professional Pricing',
          description: 'Threadripper systems start at €2,500-€3,000 for entry models, scaling to €10,000+ for flagship configurations.',
        },
      ],
    },
    eatx: {
      name: 'EATX Platform',
      tagline: 'Extended ATX Motherboards',
      color: 'from-[var(--color-purple-2)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-magenta-2)',
      icon: Server,
      image: eatxImg,
      imageTitle: 'EATX Motherboard',
      imageDescription: 'TRX50 platform with extensive expansion',
      features: [
        {
          icon: Server,
          title: 'Massive Expansion',
          description: 'Extended ATX motherboards provide more PCIe lanes, memory channels, and expansion slots for professional workloads.',
        },
        {
          icon: Cpu,
          title: 'Multi-Channel Memory',
          description: 'Quad-channel DDR5 support with up to 8 DIMM slots for maximum memory capacity and bandwidth in professional applications.',
        },
        {
          icon: DollarSign,
          title: 'Premium Platform',
          description: 'TRX50 motherboards range from €800-€1,200, providing enterprise-grade features and durability.',
        },
      ],
    },
    ecc: {
      name: 'ECC Memory',
      tagline: 'Error-Correcting Code RAM',
      color: 'from-[var(--color-purple-3)] to-[var(--color-blue-2)]',
      accentColor: 'var(--color-blue-2)',
      icon: Shield,
      image: eccImg,
      imageTitle: 'ECC RAM Module',
      imageDescription: 'Registered ECC DIMM with error correction',
      features: [
        {
          icon: Shield,
          title: 'Data Integrity',
          description: 'Detects and corrects single-bit memory errors in real-time, preventing crashes and data corruption in critical workflows.',
        },
        {
          icon: AlertCircle,
          title: 'Mission-Critical',
          description: 'Essential for servers, scientific computing, financial systems, and any application where data accuracy is non-negotiable.',
        },
        {
          icon: Server,
          title: 'Workstation Standard',
          description: 'Threadripper platforms support ECC memory, making them ideal for professional content creation and engineering work.',
        },
        {
          icon: DollarSign,
          title: 'Premium Cost',
          description: 'ECC RAM typically costs 20-40% more than standard memory, but provides invaluable peace of mind for professionals.',
        },
      ],
    },
    cooling: {
      name: 'Cooling Solutions',
      tagline: 'Taming Threadripper TDP',
      color: 'from-[var(--color-red-3)] to-[var(--color-red-4)]',
      accentColor: 'var(--color-red-4)',
      icon: AlertCircle,
      image: noctuaImg,
      imageTitle: 'Noctua Threadripper Cooler',
      imageDescription: 'Specialized cooling for high TDP CPUs',
      features: [
        {
          icon: AlertCircle,
          title: 'High TDP Requirements',
          description: 'Threadripper CPUs can consume 350W+ under load, requiring specialized cooling solutions designed for the large TR5 socket.',
        },
        {
          icon: Zap,
          title: 'Air vs Liquid',
          description: 'High-end air coolers like Noctua\'s TR5 models compete with 360mm+ AIOs, with custom loops reserved for extreme overclocking.',
        },
        {
          icon: DollarSign,
          title: 'Cooling Investment',
          description: 'Quality Threadripper coolers range from €100-€150 for air, €200-€300 for AIO, and €500+ for custom loops.',
        },
      ],
    },
  };

  const TabSelector = () => (
    <div className="gap-4 grid grid-cols-2 mb-6">
      {Object.entries(specs).map(([key, spec]) => {
        const Icon = spec.icon;
        return (
          <Card
            key={key}
            className={`cursor-pointer border-2 transition-all duration-300 ${
              activeTab === key
                ? 'border-white/40 shadow-[0_0_30px_rgba(237,63,110,0.2)]'
                : 'border-[var(--gray-5)] hover:border-[var(--color-red-4)]'
            }`}
            onClick={() => setActiveTab(key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${spec.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{spec.name}</h3>
                  <p className="text-[var(--gray-3)] text-xs truncate">{spec.tagline}</p>
                </div>
                {activeTab === key && (
                  <div
                    className="rounded-full w-2 h-2 animate-pulse"
                    style={{ backgroundColor: spec.accentColor }}
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
      id="threadripper"
      className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-26 pb-20 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-full h-full">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/4 right-1/3 absolute bg-[var(--color-red-3)] blur-[140px] rounded-full w-96 h-96 animate-pulse" />
          <div className="bottom-1/4 left-1/4 absolute bg-[var(--color-magenta-2)] blur-[140px] rounded-full w-96 h-96 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative flex flex-col gap-6 w-full h-full overflow-visible">
          {/* Header */}
          <div className="flex flex-col gap-2 overflow-visible animate-fadeIn">
            <div className="flex items-center gap-3 overflow-visible">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-red-3)] via-[var(--color-magenta-2)] to-[var(--color-purple-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
                Workstation Territory
              </h2>
              <Badge variant="outline" className="border-[var(--color-red-3)] text-[var(--color-red-3)] text-xs">
                Professional Grade
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              High-end workstation platforms for professionals who demand maximum performance and reliability
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-red-3)] to-transparent opacity-30" />

          {/* Tab Selector */}
          <TabSelector />

          {/* Content Layout */}
          <div className="flex flex-1 gap-6 min-h-0">
            {/* Left Column - Feature Details */}
            <div className="flex flex-col gap-4 pr-2 w-1/2 overflow-y-auto custom-scrollbar">
              {/* Active Tab Header */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${specs[activeTab].color} shadow-lg`}
                    >
                      {React.createElement(specs[activeTab].icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{specs[activeTab].name}</h3>
                      <p className="text-[var(--gray-3)] text-xs">{specs[activeTab].tagline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span
                      className="rounded-full w-2 h-2"
                      style={{ backgroundColor: specs[activeTab].accentColor }}
                    />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {specs[activeTab].features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={idx}
                        className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-red-4)] rounded-md transition-all duration-200"
                        style={{
                          animationDelay: `${idx * 0.06}s`,
                          animation: 'fadeIn 0.45s ease-out',
                        }}
                      >
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${specs[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-red-3)] text-xs transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-[var(--gray-3)] text-xs leading-tight">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Images and Pricing */}
            <div className="flex flex-col gap-4 w-1/2">
              {/* Square Image Card */}
              <Card className="border-[var(--gray-5)] border-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{specs[activeTab].imageTitle}</CardTitle>
                  <CardDescription className="text-xs">
                    {specs[activeTab].imageDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-center items-center bg-gradient-to-br from-[var(--gray-6)] to-[var(--gray-5)] shadow-inner rounded-lg w-full h-full overflow-hidden">
                    <div className="flex justify-center items-center bg-white w-full h-full">
                      <img src={specs[activeTab].image} alt={specs[activeTab].imageTitle} className="w-150 h-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card className="bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] border-[var(--color-red-3)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <DollarSign className="w-5 h-5 text-[var(--color-red-3)]" />
                    Pricing Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeTab === 'threadripper' && (
                    <>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Threadripper 7960X (24-core)</span>
                        <span className="font-semibold text-[var(--color-red-3)] text-sm">€1,500</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Threadripper 7980X (64-core)</span>
                        <span className="font-semibold text-[var(--color-red-3)] text-sm">€5,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Complete System Build</span>
                        <span className="font-semibold text-[var(--color-red-3)] text-sm">€3,000-10,000+</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'eatx' && (
                    <>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">TRX50 EATX Motherboard</span>
                        <span className="font-semibold text-[var(--color-magenta-2)] text-sm">€800-1,200</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">128GB ECC DDR5 (4x32GB)</span>
                        <span className="font-semibold text-[var(--color-magenta-2)] text-sm">€500-700</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Full-Tower EATX Case</span>
                        <span className="font-semibold text-[var(--color-magenta-2)] text-sm">€200-400</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'ecc' && (
                    <>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">32GB ECC DDR5 (2x16GB)</span>
                        <span className="font-semibold text-[var(--color-blue-2)] text-sm">€150-200</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">128GB ECC DDR5 (4x32GB)</span>
                        <span className="font-semibold text-[var(--color-blue-2)] text-sm">€500-700</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">vs Standard Non-ECC</span>
                        <span className="font-semibold text-[var(--color-blue-2)] text-sm">+20-40%</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'cooling' && (
                    <>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Noctua NH-U14S TR5-SP6</span>
                        <span className="font-semibold text-[var(--color-red-4)] text-sm">€120-150</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">360mm AIO (TR5 Compatible)</span>
                        <span className="font-semibold text-[var(--color-red-4)] text-sm">€200-300</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-[var(--gray-5)] rounded-md">
                        <span className="text-sm">Custom Water Loop</span>
                        <span className="font-semibold text-[var(--color-red-4)] text-sm">€500-1,000+</span>
                      </div>
                    </>
                  )}
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
          background: linear-gradient(to bottom, var(--color-red-3), var(--color-magenta-2));
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, var(--color-red-4), var(--color-magenta-3));
        }
      `}</style>
    </section>
  );
}