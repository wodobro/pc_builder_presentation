import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gpu, Zap, Ruler, TrendingDown, Layers, MonitorPlay, Boxes, ArrowRight, Cpu, FireExtinguisher, Coins } from 'lucide-react';
import dimsImg from '@/assets/images/GPU-Dimensions-Case-Clearance.webp';
import verticalImg from '@/assets/images/vertical_gpu_slot.jpg';
import genImg from '@/assets/images/generations2.webp';
import gpu5090Img from '@/assets/images/5090.webp';

export function GPU() {
  const [activeTab, setActiveTab] = useState('guide');

  const gpuTopics = {
    guide: {
      name: 'Buying Guide',
      icon: MonitorPlay,
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
    },
    specs: {
      name: 'Key Specs',
      icon: Layers,
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
    },
    power: {
      name: 'Power & PCIe',
      icon: Zap,
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
    },
    dimensions: {
      name: 'Size & Mounting',
      icon: Ruler,
      color: 'from-[var(--color-purple-4)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-purple-4)',
    },
    tiers: {
      name: 'GPU Tiers',
      icon: Boxes,
      color: 'from-[var(--color-red-3)] to-[var(--color-red-4)]',
      accentColor: 'var(--color-red-3)',
    },
  };

  const keySpecs = [
    {
      icon: Layers,
      title: 'VRAM (Video Memory)',
      description: 'More VRAM = higher resolutions & textures. 8GB minimum for 1080p, 12GB for 1440p, 16GB+ for 4K or content creation. VRAM type matters: GDDR6X > GDDR6.',
      examples: 'RTX 5060: 8GB, RTX 5070 Ti: 12GB, RTX 5090: 24GB',
    },
    {
      icon: Cpu,
      title: 'AI Upscaling',
      description: 'DLSS, nvidia\'s AI upscaling tech, is only available on nvidia graphics cards. Look for DLSS 3 support in nvidia cards for best results.',
      examples: 'DLSS, Frame Generation, AMD FidelityFX Super Resolution',
    },
    {
      icon: Zap,
      title: 'Power Requirements',
      description: 'Check TDP (Thermal Design Power) and real-world power consumption. High-end GPUs can spike 50-100W above TDP. Factor into PSU calculations.',
      examples: 'RTX 5060: 115W, RTX 5080: 320W, RTX 5090: 450W',
    },
    {
      icon: FireExtinguisher,
      title: 'Cooler Design',
      description: 'Larger card, often provide better cooling and lower noise. Consider case airflow and ambient temps.',
      examples: 'look for graphics card slot height',
    },
    {
      icon: Coins,
      title: 'Brands',
      description: 'Brands are the biggest impact for gpu quality and pricing',
      examples: 'Asus > MSI > Gigabyte > Zotac',
    },
  ];

  const pcieInfo = [
    {
      generation: 'PCIe 3.0',
      bandwidth: '~16 GB/s',
      notes: 'Older standard. May bottleneck high-end GPUs slightly (5-10% loss).',
    },
    {
      generation: 'PCIe 4.0',
      bandwidth: '~32 GB/s',
      notes: 'Current standard. Sufficient for all GPUs including RTX 5090.',
    },
    {
      generation: 'PCIe 5.0',
      bandwidth: '~64 GB/s',
      notes: 'RTX 50 series supports it but doesn\'t fully utilize it yet. Future-proofing.',
    },
  ];

  const gpuTiers = {
    nvidia: [
      { tier: 'Entry', models: ['RTX 5060', 'RTX 5060 Ti 8GB'], vram: '8GB' },
      { tier: 'Mid-Range', models: ['RTX 5060 Ti 16GB', 'RTX 5070', 'RTX 5070 Super'], vram: '12-16GB' },
      { tier: 'High-End', models: ['RTX 5070 Ti', 'RTX 5070 Ti Super', 'RTX 5080', 'RTX 5080 Super'], vram: '12-16GB' },
      { tier: 'Enthusiast', models: ['RTX 5090'], vram: '24GB' },
    ],
    amd: [
      { tier: 'Entry', models: ['RX 7600', 'RX 7600 XT'], vram: '8-16GB' },
      { tier: 'Mid-Range', models: ['RX 7700 XT', 'RX 7800 XT'], vram: '12-16GB' },
      { tier: 'High-End', models: ['RX 7900 GRE', 'RX 7900 XT', 'RX 7900 XTX'], vram: '16-24GB' },
    ],
    intel: [
      { tier: 'Entry', models: ['Arc A580', 'Arc A750'], vram: '8GB' },
      { tier: 'Mid-Range', models: ['Arc A770 8GB', 'Arc A770 16GB'], vram: '8-16GB' },
    ],
  };

  const previousGens = {
    nvidia50: ['RTX 5050', 'RTX 5060', 'RTX 5060 Ti', 'RTX 5070', 'RTX 5070 Ti', 'RTX 5080', 'RTX 5080 Ti', 'RTX 5090', 'RTX 5090 Ti'],
    amd6000: ['RX 6500 XT', 'RX 6600', 'RX 6600 XT', 'RX 6650 XT', 'RX 6700 XT', 'RX 6750 XT', 'RX 6800', 'RX 6800 XT', 'RX 6900 XT', 'RX 6950 XT'],
  };

  return (
    <section
      id="gpu"
      className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-20 pb-20 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-full h-full">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/4 left-1/3 absolute bg-[var(--color-purple-3)] blur-[140px] rounded-full w-96 h-96 animate-pulse" />
          <div className="right-1/3 bottom-1/4 absolute bg-[var(--color-red-3)] blur-[140px] rounded-full w-96 h-96 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative flex flex-col gap-6 w-full h-full overflow-visible">
          {/* Header */}
          <div className="flex flex-col gap-2 overflow-visible animate-fadeIn">
            <div className="flex items-center gap-3 overflow-visible">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
                Graphics Cards
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Performance Powerhouse
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Choosing the right GPU for your resolution, performance targets, and budget
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid grid-cols-5 bg-[var(--gray-6)] border border-[var(--gray-5)] w-full h-12">
              {Object.entries(gpuTopics).map(([key, topic]) => {
                const Icon = topic.icon;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white text-xs transition-all duration-300"
                    style={
                      ({
                        ['--tw-gradient-from' as any]: topic.accentColor,
                        ['--tw-gradient-to' as any]: topic.accentColor,
                      } as React.CSSProperties)
                    }
                  >
                    <Icon className="mr-1 w-4 h-4" />
                    {topic.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Buying Guide Tab */}
            <TabsContent value="guide" className="flex-1 mt-6 min-h-0 overflow-hidden">
              <div className="flex gap-4 h-full">
                {/* Iframe */}
                <div className="w-2/3">
                  <Card className="flex flex-col border-[var(--gray-5)] border-2 h-full overflow-hidden">
                    <CardHeader className="flex-shrink-0 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <span className="bg-[var(--corp-purple)] rounded-full w-2 h-2 animate-pulse" />
                            Tom's Hardware GPU Buying Guide
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Comprehensive reviews and recommendations
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Interactive
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 min-h-0">
                      <div className="relative p-0 w-full h-full overflow-hidden">
                        <img
                          src={gpu5090Img}
                          alt="GPU 5090 background"
                          className="absolute inset-0 w-300 h-full object-cover pointer-events-none"
                        />
                        <a
                          href="https://www.tomshardware.com/reviews/gpu-buying-guide,5844.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block right-4 bottom-4 z-10 absolute bg-[var(--color-purple-3)] hover:opacity-90 shadow-lg px-4 py-2 rounded-md text-white"
                        >
                          Open Tom's Hardware GPU Buying Guide
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Generational Comparison */}
                <div className="w-1/3">
                  <Card className="flex flex-col bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                    <CardHeader className="flex-shrink-0 pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                        Generational Comparison
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Performance improvements by generation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-2 min-h-0 overflow-hidden">
                      <div className="flex justify-center items-center bg-white border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                        <img
                          src={genImg}
                          alt="GPU generational performance comparison"
                          className="p-2 w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Key Specs Tab */}
            <TabsContent value="specs" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                    Critical GPU Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {keySpecs.map((spec, idx) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={idx}
                        className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-md transition-all duration-200"
                      >
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-[var(--color-magenta-2)] to-[var(--color-red-2)] shadow rounded-md w-10 h-10 group-hover:scale-105 transition-transform duration-200">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <h4 className="font-semibold group-hover:text-[var(--color-purple-3)] text-sm transition-colors">
                            {spec.title}
                          </h4>
                          <p className="text-[var(--gray-3)] text-xs leading-tight">
                            {spec.description}
                          </p>
                          <div className="pt-1">
                            <Badge variant="outline" className="font-mono text-xs">
                              {spec.examples}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-[var(--color-magenta-2)]/40 border-2">
                <CardContent className="p-4">
                  <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Don't just look at VRAM amount—bandwidth matters too. GDDR6X (4080/4090) has higher bandwidth than GDDR6, improving performance at high resolutions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Power & PCIe Tab */}
            <TabsContent value="power" className="flex flex-col flex-1 gap-2 mt-4 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                    Power Connectors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="gap-2 grid grid-cols-3">
                    <div className="bg-[var(--color-purple-7)] p-2 border border-[var(--color-purple-3)]/30 rounded-lg">
                      <p className="mb-1 font-semibold text-[var(--color-purple-2)] text-sm">Low-End Cards (No Cables)</p>
                      <p className="mb-1 text-[var(--gray-2)] text-xs">
                        Entry-level GPUs (75W or less) draw power entirely from PCIe slot. No additional cables needed.
                      </p>
                      <p className="text-[var(--gray-3)] text-xs">
                        Examples: GTX 1650, RTX 4060 (some models), Arc A380
                      </p>
                    </div>
                    <div className="bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-lg">
                      <p className="mb-1 font-semibold text-sm">Standard Cards (6/8-pin)</p>
                      <p className="mb-1 text-[var(--gray-3)] text-xs">
                        Most mid-range GPUs use one or two 6-pin or 8-pin PCIe connectors.
                      </p>
                      <p className="text-[var(--gray-3)] text-xs">
                        Examples: RTX 4060 Ti, RTX 4070, RX 7800 XT
                      </p>
                    </div>
                    <div className="bg-[var(--color-red-7)] p-2 border border-[var(--color-red-3)]/30 rounded-lg">
                      <p className="mb-1 font-semibold text-[var(--color-red-2)] text-sm">High-End (12VHPWR)</p>
                      <p className="mb-1 text-[var(--gray-2)] text-xs">
                        High-end cards use new 12VHPWR connector. Requires ATX 3.0 PSU or adapter.
                      </p>
                      <p className="text-[var(--gray-3)] text-xs">
                        Examples: high-end models
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Layers className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                    PCIe Generations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-2 space-y-2">
                    {pcieInfo.map((pcie, idx) => (
                      <div
                        key={idx}
                        className="flex-1 items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-lg h-20"
                      >
                        <div className="">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-sm">{pcie.generation}</p>
                            <Badge variant="outline" className="font-mono text-xs">{pcie.bandwidth}</Badge>
                          </div>
                          <p className="text-[var(--gray-3)] text-xs">{pcie.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-[var(--color-red-3)]/40 border-2">
                <CardContent className="p-2">
                  <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> RTX 50 series supports PCIe 5.0 but doesn't fully utilize it yet. PCIe 4.0 is sufficient for current GPUs—don't overpay for 5.0 support.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dimensions & Mounting Tab */}
            <TabsContent value="dimensions" className="flex flex-1 gap-4 mt-6 min-h-0">
              {/* GPU Dimensions */}
              <div className="w-1/2">
                <Card className="flex flex-col bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="flex-shrink-0 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Ruler className="w-4 h-4" style={{ color: 'var(--color-purple-4)' }} />
                      GPU Dimensions
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Check case clearance before buying
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-2 min-h-0 overflow-hidden">
                    <div className="flex justify-center items-center bg-white border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                        <img
                          src={dimsImg}
                          alt="GPU dimension diagram showing length, height, and slots"
                          className="p-2 w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                    </div>
                  </CardContent>
                  <div className="bg-[var(--gray-6)]/30 p-3 border-[var(--gray-5)] border-t text-xs">
                    <p className="mb-2 text-[var(--gray-3)] leading-tight">
                      <strong>Key measurements:</strong>
                    </p>
                    <ul className="space-y-0.5 text-[var(--gray-3)]">
                      <li>• Length: 250-350mm typical (check case clearance)</li>
                      <li>• Height: 2-3.5 slot (affects adjacent PCIe slots)</li>
                      <li>• Thickness: Standard vs wide cooler designs</li>
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Vertical GPU Mount */}
              <div className="w-1/2">
                <Card className="flex flex-col bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="flex-shrink-0 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Gpu className="w-4 h-4" style={{ color: 'var(--color-purple-4)' }} />
                      Vertical GPU Mounting
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Showcase your GPU with vertical brackets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-2 min-h-0 overflow-hidden">
                    <div className="flex justify-center items-center bg-white border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                      <img
                        src={verticalImg}
                        alt="Vertical GPU mounting bracket example"
                        className="p-2 w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </CardContent>
                  <div className="bg-[var(--gray-6)]/30 p-3 border-[var(--gray-5)] border-t text-xs">
                    <p className="mb-2 text-[var(--gray-3)] leading-tight">
                      <strong>Considerations:</strong>
                    </p>
                    <ul className="space-y-0.5 text-[var(--gray-3)]">
                      <li>• Requires PCIe riser cable (check Gen 3/4 support)</li>
                      <li>• May block case fans or reduce airflow</li>
                      <li>• Shows off GPU backplate & RGB lighting</li>
                      <li>• Check case compatibility before buying</li>
                    </ul>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* GPU Tiers Tab (consolidated as Reference GPUs) */}
            <TabsContent value="tiers" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="bg-[var(--gray-4)] rounded-full w-2 h-2" />
                    Reference GPUs
                  </CardTitle>
                    <CardDescription className="text-xs">
                      RTX 50 series (NVIDIA) / RX 7000/6000 series (AMD) / Intel Arc
                    </CardDescription>
                    <div className="flex items-center gap-2 text-[var(--gray-3)] text-xs">
                      <ArrowRight className="w-4 h-4" />
                      <span>is better</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* NVIDIA RTX 30 — simple badge list */}
                  <div>
                    <Badge className="bg-green-600 mb-2 text-white">NVIDIA RTX 50</Badge>
                    <div className="flex flex-wrap gap-1">
                      {gpuTiers.nvidia.flatMap((t) => t.models).map((model, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AMD RX 7000 — simple badge list */}
                  <div>
                    <Badge className="bg-red-600 mb-2 text-white">AMD Radeon RX 7000</Badge>
                    <div className="flex flex-wrap gap-1">
                      {gpuTiers.amd.flatMap((t) => t.models).map((model, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Intel flattened as badges to match styling */}
                  <div>
                    <Badge className="bg-blue-600 mb-2 text-white">Intel Arc</Badge>
                    <div className="flex flex-wrap gap-1">
                      {gpuTiers.intel.flatMap(t => t.models).map((model, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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