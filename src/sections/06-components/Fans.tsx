import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Wind, Volume2, Gauge, Grid3x3, Link2, Settings } from 'lucide-react';
import comparisonImg from '@/assets/images/120vs140.jpg';
import lianliImg from '@/assets/images/vb_lianli_fan_connect.png';
import hubImg from '@/assets/images/fan-hub.webp';

export function Fans() {
  const [activeTab, setActiveTab] = useState('basics');

  const fanTopics = {
    basics: {
      name: 'Fan Basics',
      icon: Wind,
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
    },
    noise: {
      name: 'Noise & Performance',
      icon: Volume2,
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
    },
    comparison: {
      name: 'Fan Database',
      icon: Gauge,
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
    },
    management: {
      name: 'Fan Management',
      icon: Settings,
      color: 'from-[var(--color-purple-4)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-purple-4)',
    },
  };

  const fanSizeComparison = [
    {
      size: '120mm',
      image: '/path/to/120mm-fan.jpg', // Replace with your actual image path
      pros: ['Universal compatibility', 'More mounting options', 'Cheaper'],
      cons: ['Higher noise at same airflow', 'More fans needed'],
    },
    {
      size: '140mm',
      image: '/path/to/140mm-fan.jpg', // Replace with your actual image path
      pros: ['Quieter operation', 'Better airflow per fan', 'Lower RPM needed'],
      cons: ['More expensive', 'Fewer mounting points'],
    },
  ];

  const considerations = {
    basics: [
      {
        icon: Grid3x3,
        title: 'Fan Count Balance',
        description: 'Aim for slightly positive pressure (more intake than exhaust) to reduce dust. Too many fans = diminishing returns and more noise.',
      },
      {
        icon: Gauge,
        title: 'Size Matters',
        description: '140mm fans move 40-50% more air than 120mm at same RPM. Bigger = quieter for same airflow. Check case mounting support.',
      },
      {
        icon: Wind,
        title: 'Airflow Pattern',
        description: 'Front/bottom intake, rear/top exhaust is standard. Avoid fighting natural convection. Create clear path through case.',
      },
    ],
    noise: [
      {
        icon: Volume2,
        title: 'RPM vs Noise',
        description: 'Noise increases exponentially with RPM. Running fans at 60-70% max speed dramatically reduces noise with minimal performance loss.',
      },
      {
        icon: Gauge,
        title: 'Static Pressure vs Airflow',
        description: 'Static pressure fans for radiators/restrictive intakes. Airflow fans for open mounting. Affects noise profile significantly.',
      },
      {
        icon: Wind,
        title: 'Premium Fan Difference',
        description: 'Quality fans (Noctua, Arctic, Be Quiet!) use better bearings and blade design. 10-15 dB quieter than budget fans at same airflow.',
      },
    ],
    management: [
      {
        icon: Link2,
        title: 'Daisy Chaining',
        description: 'Lian Li and others offer daisy-chain cables. Connect multiple fans in series to single header. Limits: 1A per header (~3-4 fans).',
      },
      {
        icon: Settings,
        title: 'Fan Hubs',
        description: 'Powered hubs handle 6-10+ fans with single motherboard connection. Requires SATA/Molex power. Enables unified PWM control.',
      },
      {
        icon: Grid3x3,
        title: 'PWM vs DC',
        description: 'PWM (4-pin) preferred for precise speed control. DC (3-pin) uses voltage regulation. All modern boards support PWM.',
      },
    ],
  };

  return (
    <section
      id="fans"
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
                Case Fans
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Airflow & Acoustics
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Optimize cooling performance and noise levels with the right fan setup
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid grid-cols-4 bg-[var(--gray-6)] border border-[var(--gray-5)] w-full h-12">
              {Object.entries(fanTopics).map(([key, topic]) => {
                const Icon = topic.icon;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:text-white transition-all duration-300"
                    style={
                      ({
                        ['--tw-gradient-from' as any]: topic.accentColor,
                        ['--tw-gradient-to' as any]: topic.accentColor,
                      } as React.CSSProperties)
                    }
                  >
                    <Icon className="mr-2 w-4 h-4" />
                    {topic.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Fan Basics Tab */}
            <TabsContent value="basics" className="flex flex-1 gap-4 mt-6 min-h-0">
              {/* Fan Size Comparison (single smaller image + pros/cons) */}
              <div className="flex flex-col gap-4 w-3/5">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                      120mm vs 140mm
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="items-start gap-3 grid grid-cols-1 md:grid-cols-2">
                      <div className="flex justify-center">
                        <div className="bg-[var(--gray-6)] border border-[var(--gray-5)] rounded-lg max-w-sm overflow-hidden">
                          <img
                            src={comparisonImg}
                            alt="120mm vs 140mm"
                            className="w-full h-auto object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-row gap-10 space-y-4">
                        {fanSizeComparison.map((fan, idx) => (
                          <div key={idx} className="space-y-2">
                            <p className="mb-1 font-semibold text-sm">{fan.size}</p>
                            <div className="space-y-0.5 text-xs">
                              <p className="font-semibold text-[var(--gray-3)]">Advantages</p>
                              {fan.pros.map((pro, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="mt-0.5 text-green-500 text-xs">✓</span>
                                  <span className="text-xs">{pro}</span>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-0.5 mt-2 text-xs">
                              <p className="font-semibold text-[var(--gray-3)]">Drawbacks</p>
                              {fan.cons.map((con, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="mt-0.5 text-orange-400 text-xs">−</span>
                                  <span className="text-[var(--gray-3)] text-xs">{con}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Considerations */}
              <div className="w-2/5">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-auto">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                      Key Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {considerations.basics.map((consideration, idx) => {
                      const Icon = consideration.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-md transition-all duration-200"
                        >
                          <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-[var(--color-purple-2)] to-[var(--color-purple-3)] shadow rounded-md w-8 h-8 group-hover:scale-105 transition-transform duration-200">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-purple-3)] text-xs transition-colors">
                              {consideration.title}
                            </h4>
                            <p className="text-[var(--gray-3)] text-xs leading-tight">
                              {consideration.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Noise & Performance Tab */}
            <TabsContent value="noise" className="flex flex-1 gap-6 mt-6 min-h-0">
              <div className="flex flex-col flex-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                      Noise Level Understanding
                    </CardTitle>
                    <CardDescription className="text-xs">Balance between cooling and acoustics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Noise Scale */}
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Common dBA Levels</p>
                      <div className="space-y-2">
                        {[
                          { level: '15-20 dBA', desc: 'Whisper quiet - barely audible', color: 'bg-green-500' },
                          { level: '20-25 dBA', desc: 'Very quiet - ideal for silent builds', color: 'bg-green-400' },
                          { level: '25-30 dBA', desc: 'Quiet - comfortable for most users', color: 'bg-yellow-400' },
                          { level: '30-35 dBA', desc: 'Moderate - noticeable under load', color: 'bg-orange-400' },
                          { level: '35+ dBA', desc: 'Loud - distracting for quiet environments', color: 'bg-red-400' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-20 h-2 ${item.color} rounded-full`} />
                            <span className="w-24 font-mono font-semibold text-xs">{item.level}</span>
                            <span className="text-[var(--gray-3)] text-xs">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-[var(--gray-5)]" />

                    {/* Performance Tips */}
                    <div className="space-y-2">
                      {considerations.noise.map((consideration, idx) => {
                        const Icon = consideration.icon;
                        return (
                          <div
                            key={idx}
                            className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-md transition-all duration-200"
                          >
                            <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-[var(--color-magenta-2)] to-[var(--color-red-2)] shadow rounded-md w-8 h-8 group-hover:scale-105 transition-transform duration-200">
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-purple-3)] text-xs transition-colors">
                                {consideration.title}
                              </h4>
                              <p className="text-[var(--gray-3)] text-xs leading-tight">
                                {consideration.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Pro Tip */}
                <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-[var(--color-magenta-2)]/40 border-2">
                  <CardContent className="p-4">
                    <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                      💡 <strong>Pro Tip:</strong> Set fan curves in BIOS to ramp up gradually. 40% speed at idle, 70% at 60°C, 100% only at 80°C+. This keeps noise low while maintaining excellent cooling.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fan Database Tab */}
            <TabsContent value="comparison" className="flex-1 mt-6 min-h-0 overflow-hidden">
              <Card className="flex flex-col border-[var(--gray-5)] border-2 h-full overflow-hidden">
                <CardHeader className="flex-shrink-0 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="bg-[var(--corp-red)] rounded-full w-2 h-2 animate-pulse" />
                        Fan Performance Database
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        Comprehensive fan comparison spreadsheet
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Interactive
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0">
                  <div className="flex justify-center items-center p-6 w-full h-full">
                    <a
                      href="https://docs.google.com/spreadsheets/d/1xrG3jE_l3KeXxGqalMVvrSNNeynwiLx6xj_bmn1zj9w/edit?pli=1&gid=1026757744#gid=1026757744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[var(--color-purple-3)] hover:opacity-90 px-4 py-2 rounded-md text-white"
                    >
                      Open Fan Performance Database
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fan Management Tab */}
            <TabsContent value="management" className="flex flex-1 gap-4 mt-6 min-h-0">
              {/* Daisy Chaining */}
              <div className="w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Link2 className="w-4 h-4" style={{ color: 'var(--color-purple-4)' }} />
                      Daisy Chaining
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Connect multiple fans in series (e.g., Lian Li)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                        <div className="bg-[var(--gray-6)] border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                          <img
                            src={lianliImg}
                            alt="Fan daisy chaining example"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fan Hub */}
              <div className="w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Settings className="w-4 h-4" style={{ color: 'var(--color-magenta-2)' }} />
                      Fan Hub
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Powered hub for 6-10+ fans with external power
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                    <div className="flex justify-center items-center bg-white border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                      <img
                        src={hubImg}
                        alt="Fan hub example"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
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