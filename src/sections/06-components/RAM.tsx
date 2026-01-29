import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemoryStick, Zap, Settings, AlertTriangle, Map, Timer } from 'lucide-react';
import ramSlotsImg from '@/assets/images/ram_slots.webp';

export function RAM() {
  const [activeTab, setActiveTab] = useState('comparison');

  const ramTopics = {
    comparison: {
      name: 'DDR4 vs DDR5',
      icon: MemoryStick,
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
    },
    timings: {
      name: 'Speed & Timings',
      icon: Timer,
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
    },
    xmp: {
      name: 'XMP Profiles',
      icon: Zap,
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
    },
    configuration: {
      name: 'Configuration',
      icon: Settings,
      color: 'from-[var(--color-purple-4)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-purple-4)',
    },
    placement: {
      name: 'Slot Placement',
      icon: Map,
      color: 'from-[var(--color-red-3)] to-[var(--color-red-4)]',
      accentColor: 'var(--color-red-3)',
    },
  };

  const ddrComparison = [
    {
      type: 'DDR4',
      generations: 'Intel 6th-14th Gen, AMD Ryzen 1000-5000',
      speeds: '2133-3600 MHz (common)',
      typicalSpeed: 'DDR4-3200',
      timings: 'CL14-CL18',
      voltage: '1.2V - 1.35V',
      pros: ['Mature & stable', 'Lower cost', 'Wide availability', 'Proven compatibility'],
      cons: ['Lower bandwidth', 'Legacy platform', 'Lower capacity modules'],
    },
    {
      type: 'DDR5',
      generations: 'Intel 12th Gen+, AMD Ryzen 7000+',
      speeds: '4800-8000 MHz (common)',
      typicalSpeed: 'DDR5-6000',
      timings: 'CL30-CL40',
      voltage: '1.1V - 1.35V',
      pros: ['Higher bandwidth', 'Future-proof', 'Higher capacity', 'On-die ECC'],
      cons: ['Higher cost', 'Looser timings', '4-stick stability issues'],
    },
  ];

  const timingExplanations = [
    {
      term: 'CL (CAS Latency)',
      description: 'Number of clock cycles between memory request and data availability. Lower = faster. Example: CL16 @ 3200MHz ≈ CL32 @ 6400MHz in real latency.',
    },
    {
      term: 'tRCD',
      description: 'RAS to CAS delay. Time between row activation and column access. Part of primary timings (e.g., 16-18-18-38).',
    },
    {
      term: 'tRP',
      description: 'Row Precharge time. Time to close one row and open another. Affects random access performance.',
    },
    {
      term: 'MHz vs MT/s',
      description: 'DDR = Double Data Rate. DDR4-3200 transfers data at 3200 MT/s but runs at 1600 MHz. Marketing uses MT/s as "MHz".',
    },
  ];

  return (
    <section
      id="ram"
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
                Memory (RAM)
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Speed & Capacity
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Understanding DDR generations, speeds, timings, and optimal configurations
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid grid-cols-5 bg-[var(--gray-6)] border border-[var(--gray-5)] w-full h-12">
              {Object.entries(ramTopics).map(([key, topic]) => {
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

            {/* DDR4 vs DDR5 Tab */}
            <TabsContent value="comparison" className="flex flex-1 gap-4 mt-6 min-h-0">
              <div className="flex flex-col flex-1 gap-3 pr-2 overflow-y-auto custom-scrollbar">
                {ddrComparison.map((ddr, idx) => (
                  <Card key={idx} className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{ddr.type}</CardTitle>
                        <Badge className="font-mono text-xs">{ddr.typicalSpeed}</Badge>
                      </div>
                      <CardDescription className="text-xs">{ddr.generations}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="gap-3 grid grid-cols-3 text-xs">
                        <div>
                          <p className="mb-0.5 text-[var(--gray-3)]">Speed Range</p>
                          <p className="font-mono font-semibold">{ddr.speeds}</p>
                        </div>
                        <div>
                          <p className="mb-0.5 text-[var(--gray-3)]">Typical Timings</p>
                          <p className="font-mono font-semibold">{ddr.timings}</p>
                        </div>
                        <div>
                          <p className="mb-0.5 text-[var(--gray-3)]">Voltage</p>
                          <p className="font-mono font-semibold">{ddr.voltage}</p>
                        </div>
                      </div>

                      <Separator className="bg-[var(--gray-5)]" />

                      <div className="gap-3 grid grid-cols-2">
                        <div>
                          <p className="mb-1 font-semibold text-[var(--gray-3)] text-xs">Advantages</p>
                          <div className="space-y-0.5">
                            {ddr.pros.map((pro, i) => (
                              <div key={i} className="flex items-start gap-1 text-xs">
                                <span className="mt-0.5 text-green-500">✓</span>
                                <span>{pro}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 font-semibold text-[var(--gray-3)] text-xs">Drawbacks</p>
                          <div className="space-y-0.5">
                            {ddr.cons.map((con, i) => (
                              <div key={i} className="flex items-start gap-1 text-[var(--gray-3)] text-xs">
                                <span className="mt-0.5 text-orange-400">−</span>
                                <span>{con}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Speed & Timings Tab */}
            <TabsContent value="timings" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                    Understanding RAM Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {timingExplanations.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="flex-shrink-0 font-mono text-xs">
                          {item.term}
                        </Badge>
                        <p className="flex-1 text-[var(--gray-3)] text-xs leading-tight">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                    Reading RAM Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-[var(--gray-6)]/50 p-4 border-[var(--color-purple-3)]/30 border-2 rounded-lg">
                      <p className="mb-2 font-mono font-bold text-lg">DDR5-6000 CL30-36-36-76</p>
                      <div className="gap-x-4 gap-y-2 grid grid-cols-2 text-xs">
                        <div className="flex gap-2">
                          <span className="font-semibold text-[var(--color-purple-3)]">DDR5-6000</span>
                          <span className="text-[var(--gray-3)]">→ 6000 MT/s transfer rate</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-[var(--color-magenta-2)]">CL30</span>
                          <span className="text-[var(--gray-3)]">→ CAS Latency (primary)</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-[var(--color-red-2)]">36-36-76</span>
                          <span className="text-[var(--gray-3)]">→ tRCD-tRP-tRAS timings</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-[var(--color-magenta-2)]/40 border-2">
                <CardContent className="p-4">
                  <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> For DDR5, prioritize speed (6000+ MT/s) over tight timings. Real-world difference between CL30 and CL36 is minimal at high speeds.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* XMP Profiles Tab */}
            <TabsContent value="xmp" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                    What is XMP/EXPO?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <p className="text-[var(--gray-2)] leading-relaxed">
                      <strong>XMP (Intel)</strong> and <strong>EXPO (AMD)</strong> are pre-configured overclocking profiles stored on RAM modules. 
                      RAM runs at JEDEC standard (slow) speeds by default—XMP/EXPO unlocks advertised performance.
                    </p>
                    <div className="gap-3 grid grid-cols-2">
                      <div className="bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] rounded-lg">
                        <p className="mb-1 font-semibold">Without XMP/EXPO</p>
                        <p className="text-[var(--gray-3)]">DDR5-6000 kit runs at 4800 MT/s (JEDEC default)</p>
                      </div>
                      <div className="bg-[var(--color-purple-7)] p-3 border border-[var(--color-purple-3)]/30 rounded-lg">
                        <p className="mb-1 font-semibold text-[var(--color-purple-2)]">With XMP/EXPO Enabled</p>
                        <p className="text-[var(--gray-3)]">Runs at full 6000 MT/s with optimized timings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                    How to Enable XMP/EXPO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { step: '1', text: 'Enter BIOS/UEFI (press DEL or F2 during boot)' },
                      { step: '2', text: 'Navigate to overclocking or AI Tweaker section' },
                      { step: '3', text: 'Find "XMP" (Intel) or "EXPO" (AMD) setting' },
                      { step: '4', text: 'Enable XMP/EXPO (may show as "Profile 1" or "Profile 2")' },
                      { step: '5', text: 'Save settings and exit (F10)' },
                      { step: '6', text: 'Verify in Windows: Task Manager → Performance → Memory' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-lg">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-[var(--color-red-2)] to-[var(--color-red-3)] rounded-full w-6 h-6">
                          <span className="font-bold text-white text-xs">{item.step}</span>
                        </div>
                        <p className="flex-1 pt-0.5 text-xs">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--color-red-7)] border-[var(--color-red-3)]/30 border-2">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="flex-shrink-0 mt-0.5 w-4 h-4 text-[var(--color-red-2)]" />
                    <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                      <strong>Important:</strong> XMP/EXPO is technically overclocking. If system becomes unstable, disable XMP or try lower profile. DDR5 may require manual tuning for full stability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="configuration" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="w-4 h-4" style={{ color: 'var(--color-purple-4)' }} />
                    2 Sticks vs 4 Sticks (Critical for DDR5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-[var(--color-red-7)] p-4 border-[var(--color-red-3)]/40 border-2 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="flex-shrink-0 w-5 h-5 text-[var(--color-red-2)]" />
                      <div>
                        <p className="mb-1 font-semibold text-[var(--color-red-2)]">DDR5 Warning: Avoid 4 Sticks</p>
                        <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                          Many DDR5 motherboards cannot run 4 sticks at advertised speeds. Memory controllers struggle with 4-DIMM configurations at high frequencies (6000+ MT/s).
                          You may be forced to run at slower speeds (5200-5600 MT/s) or face instability.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="gap-3 grid grid-cols-2">
                    <div className="bg-[var(--color-purple-7)] p-3 border border-[var(--color-purple-3)]/30 rounded-lg">
                      <p className="mb-2 font-semibold text-[var(--color-purple-2)]">✓ Recommended: 2 Sticks</p>
                      <ul className="space-y-1 text-[var(--gray-2)] text-xs">
                        <li>• Runs at full advertised speed</li>
                        <li>• Better stability & compatibility</li>
                        <li>• Easier memory training</li>
                        <li>• Example: 2x32GB = 64GB total</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] rounded-lg">
                      <p className="mb-2 font-semibold text-[var(--gray-3)]">⚠ Avoid: 4 Sticks (DDR5)</p>
                      <ul className="space-y-1 text-[var(--gray-3)] text-xs">
                        <li>• May not reach rated speed</li>
                        <li>• Stability issues common</li>
                        <li>• Longer memory training</li>
                        <li>• Example: 4x16GB = 64GB total</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[var(--gray-6)]/50 p-3 border border-[var(--gray-5)] rounded-lg text-xs">
                    <p className="mb-1 font-semibold">DDR4 Exception</p>
                    <p className="text-[var(--gray-3)]">
                      DDR4 handles 4 sticks better, but may still require speed reduction. Check motherboard QVL (Qualified Vendor List) for 4-DIMM support.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Timer className="w-4 h-4" style={{ color: 'var(--color-purple-4)' }} />
                    DDR5 Memory Training
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <p className="text-[var(--gray-2)] leading-relaxed">
                      DDR5 performs <strong>memory training</strong> on first boot or after RAM changes. The system tests timings and voltages to find stable settings.
                    </p>
                    <div className="space-y-2 bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] rounded-lg">
                      <p className="font-semibold">What to Expect:</p>
                      <ul className="space-y-1 text-[var(--gray-3)]">
                        <li>• First boot may take 2-5 minutes (or longer)</li>
                        <li>• System may restart several times automatically</li>
                        <li>• Monitor will stay black during training</li>
                        <li>• This is NORMAL—do not interrupt!</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--color-purple-7)] p-3 border border-[var(--color-purple-3)]/30 rounded-lg">
                      <p className="mb-1 font-semibold text-[var(--color-purple-2)]">Patience Required</p>
                      <p className="text-[var(--gray-2)]">
                        Memory training is slower with 4 sticks and high-speed kits (6400+ MT/s). Allow up to 10 minutes on first boot.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Slot Placement Tab */}
            <TabsContent value="placement" className="flex-1 mt-6 min-h-0">
              <Card className="flex flex-col bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                <CardHeader className="flex-shrink-0 pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Map className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                    Correct RAM Slot Usage
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Always check your motherboard manual for optimal configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 overflow-hidden">
                  <div className="flex justify-center items-center bg-white p-4 border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                    <img
                      src={ramSlotsImg}
                      alt="Diagram showing correct RAM slot placement on motherboard"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </CardContent>
                <div className="bg-[var(--gray-6)]/30 p-4 border-[var(--gray-5)] border-t">
                  <p className="text-[var(--gray-3)] text-xs leading-relaxed">
                    <strong>Typical configuration:</strong> For 2 sticks, use slots A2 and B2 (2nd and 4th slots from CPU). 
                    This enables dual-channel mode for maximum performance. Consult your motherboard manual—some boards differ!
                  </p>
                </div>
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