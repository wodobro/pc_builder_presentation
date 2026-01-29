import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Award, Cable, AlertTriangle, BarChart3, Gauge } from 'lucide-react';
import badgeImg from '@/assets/images/80-PLUS-Badge-Group.png';
import meltedImg from '@/assets/images/MeltedCable.jpg';
import psuBackImg from '@/assets/images/psu_back_connectors.jpg';

export function PSU() {
  const [activeTab, setActiveTab] = useState('ratings');

  const psuTopics = {
    ratings: {
      name: 'Efficiency Ratings',
      icon: Award,
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
    },
    wattage: {
      name: 'Wattage Planning',
      icon: Gauge,
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
    },
    connectors: {
      name: 'Modular Connectors',
      icon: Cable,
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
    },
    testing: {
      name: 'PSU Testing',
      icon: BarChart3,
      color: 'from-[var(--color-purple-4)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-purple-4)',
    },
    issues: {
      name: 'Common Issues',
      icon: AlertTriangle,
      color: 'from-[var(--color-red-3)] to-[var(--color-red-4)]',
      accentColor: 'var(--color-red-3)',
    },
  };

  const efficiencyRatings = [
    {
      name: '80 Plus',
      efficiency: '80%',
      description: 'Basic certification, minimal efficiency requirements',
      color: 'bg-gray-400',
    },
    {
      name: '80 Plus Bronze',
      efficiency: '82-85%',
      description: 'Entry-level efficiency, good for budget builds',
      color: 'bg-amber-700',
    },
    {
      name: '80 Plus Silver',
      efficiency: '85-88%',
      description: 'Mid-range efficiency, less common',
      color: 'bg-gray-300',
    },
    {
      name: '80 Plus Gold',
      efficiency: '87-90%',
      description: 'Excellent efficiency, sweet spot for most builds',
      color: 'bg-yellow-500',
    },
    {
      name: '80 Plus Platinum',
      efficiency: '89-92%',
      description: 'Premium efficiency, lower heat & power bills',
      color: 'bg-gray-200',
    },
    {
      name: '80 Plus Titanium',
      efficiency: '90-94%',
      description: 'Top-tier efficiency, diminishing returns vs cost',
      color: 'bg-slate-400',
    },
    {
      name: '80 Plus Ruby',
      efficiency: '94-97%',
      description: 'Highest-tier efficiency, Very expensive & rare',
      color: 'bg-red-3',
    },
  ];

  const wattageConsiderations = [
    {
      icon: Gauge,
      title: 'Peak vs Average Power',
      description: 'Online calculators show average usage. GPU/CPU can spike 50-100W+ above average during transients. Add 20-30% headroom to calculated wattage.',
    },
    {
      icon: Zap,
      title: 'Efficiency Sweet Spot',
      description: 'PSUs are most efficient at 50-80% load. Running a 1000W PSU at 300W wastes electricity. Match wattage to actual needs, not maximum theoretical.',
    },
    {
      icon: Award,
      title: 'Quality Over Wattage',
      description: 'A quality 750W Gold PSU beats a cheap 850W Bronze. Focus on efficiency rating, brand reputation (Seasonic, Corsair, EVGA), and reviews.',
    },
  ];

  return (
    <section
      id="psu"
      className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-20 pb-20 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-full h-full">

        <div className="relative flex flex-col gap-6 w-full h-full overflow-visible">
          {/* Header */}
          <div className="flex flex-col gap-2 overflow-visible animate-fadeIn">
            <div className="flex items-center gap-3 overflow-visible">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
                Power Supplies
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                The Heart of Your Build
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Choose the right PSU for reliability, efficiency, and future upgrades
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid grid-cols-5 bg-[var(--gray-6)] border border-[var(--gray-5)] w-full h-12">
              {Object.entries(psuTopics).map(([key, topic]) => {
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

            {/* Efficiency Ratings Tab */}
            <TabsContent value="ratings" className="flex flex-1 gap-4 mt-6 min-h-0">
              {/* Ratings List */}
              <div className="w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                      80 Plus Certification Levels
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Higher ratings = better efficiency & less heat
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pr-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100% - 5rem)' }}>
                    {efficiencyRatings.map((rating, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-[var(--gray-6)]/30 p-3 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-lg transition-all duration-200"
                      >
                        <div className={`w-12 h-12 rounded-lg ${rating.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold text-sm">{rating.name}</h4>
                            <Badge variant="outline" className="font-mono text-xs">{rating.efficiency}</Badge>
                          </div>
                          <p className="text-[var(--gray-3)] text-xs leading-tight">
                            {rating.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Rating Icons Image */}
              <div className="w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="bg-[var(--color-purple-3)] rounded-full w-2 h-2" />
                      Certification Badges
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Look for these on PSU packaging
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                    <div className="flex justify-center items-center bg-[var(--gray-6)] border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                      <img
                        src={badgeImg}
                        alt="80 Plus certification badges"
                        className="p-4 w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Wattage Planning Tab */}
            <TabsContent value="wattage" className="flex flex-col flex-1 gap-4 mt-6 pr-2 min-h-0 overflow-y-auto custom-scrollbar">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                    Understanding Power Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {wattageConsiderations.map((consideration, idx) => {
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
                </CardContent>
              </Card>

              {/* Wattage Examples */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="bg-[var(--color-magenta-2)] rounded-full w-2 h-2" />
                    Recommended Wattage by Build Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { type: 'Budget Build', parts: 'i3/R5 + RTX 4060', calculated: '350W', recommended: '500-550W', color: 'bg-green-500' },
                      { type: 'Mid-Range', parts: 'i5/R7 + RTX 4070', calculated: '450W', recommended: '650-750W', color: 'bg-yellow-500' },
                      { type: 'High-End', parts: 'i7/R9 + RTX 4080', calculated: '600W', recommended: '850W', color: 'bg-orange-500' },
                      { type: 'Enthusiast', parts: 'i9/R9X + RTX 4090', calculated: '750W', recommended: '1000W+', color: 'bg-red-500' },
                    ].map((build, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-lg">
                        <div className={`w-2 h-12 ${build.color} rounded-full`} />
                        <div className="flex-1 gap-2 grid grid-cols-4 text-xs">
                          <div>
                            <p className="font-semibold">{build.type}</p>
                            <p className="text-[var(--gray-3)]">{build.parts}</p>
                          </div>
                          <div>
                            <p className="text-[var(--gray-3)]">Calculated</p>
                            <p className="font-mono font-semibold">{build.calculated}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[var(--gray-3)]">Recommended PSU</p>
                            <p className="font-mono font-semibold text-[var(--color-purple-3)]">{build.recommended}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tip */}
              <Card className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-[var(--color-magenta-2)]/40 border-2">
                <CardContent className="p-4">
                  <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Add 20-30% headroom to online calculator results. PSUs last 7-10 years—buy for future GPU upgrades, not just current needs.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Modular Connectors Tab */}
            <TabsContent value="connectors" className="flex flex-1 gap-4 mt-6 min-h-0">
              <div className="w-full">
                <Card className="flex flex-col bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="flex-shrink-0 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Cable className="w-4 h-4" style={{ color: 'var(--color-red-3)' }} />
                      Modular PSU Connectors
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Understanding the back panel of a modular PSU
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-0 overflow-hidden">
                    <div className="flex justify-center items-center bg-[var(--gray-6)] p-4 border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                      <img
                        src={psuBackImg}
                        alt="Modular PSU back panel showing connector types"
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

            {/* PSU Testing Tab */}
            <TabsContent value="testing" className="flex-1 mt-6 min-h-0 overflow-hidden">
              <Card className="flex flex-col border-[var(--gray-5)] border-2 h-full overflow-hidden">
                <CardHeader className="flex-shrink-0 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="bg-[var(--corp-purple)] rounded-full w-2 h-2 animate-pulse" />
                        LTT Labs PSU Testing
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        Comprehensive PSU reviews and test results
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Interactive Database
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0">
                  <div className="w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                    <div style={{ height: '100%', overflow: 'auto', overscrollBehavior: 'contain' }}>
                      <iframe
                        src="https://www.lttlabs.com/products/power-supplies/lian-li-sp850"
                        className="border-0 w-full h-full"
                        title="LTT Labs PSU Testing Database"
                        loading="lazy"
                        scrolling="yes"
                        style={{ display: 'block', height: '100%' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Common Issues Tab */}
            <TabsContent value="issues" className="flex flex-1 gap-4 mt-6 min-h-0">
              <div className="flex flex-col gap-4 w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="w-4 h-4 text-[var(--color-red-3)]" />
                      12VHPWR Connector Issues
                    </CardTitle>
                    <CardDescription className="text-xs">
                      RTX 40-series power connector concerns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-xs">
                      <div className="bg-[var(--color-red-7)] p-2 border border-[var(--color-red-3)]/30 rounded-lg">
                        <p className="mb-1 font-semibold text-[var(--color-red-2)]">Known Problem</p>
                        <p className="text-[var(--gray-3)] leading-tight">
                          Melted 12VHPWR connectors reported on RTX 4090 cards. Caused by improper seating, excessive bending, or manufacturing defects.
                        </p>
                      </div>
                      <div className="bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-lg">
                        <p className="mb-1 font-semibold">Prevention Tips</p>
                        <ul className="space-y-0.5 text-[var(--gray-3)]">
                          <li>• Ensure connector fully seated (clicks)</li>
                          <li>• Avoid sharp bends near connector</li>
                          <li>• Use native 12VHPWR cables when possible</li>
                          <li>• Regularly inspect for discoloration</li>
                        </ul>
                      </div>
                      <div className="bg-[var(--color-purple-7)] p-2 border border-[var(--color-purple-3)]/30 rounded-lg">
                        <p className="mb-1 font-semibold text-[var(--color-purple-2)]">Recommended Solution</p>
                        <p className="text-[var(--gray-3)] leading-tight">
                          Use ATX 3.0 PSUs with native 12VHPWR cables. Newer revisions (12V-2x6) address many issues. Avoid cheap adapters.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-1/2">
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="bg-[var(--color-red-3)] rounded-full w-2 h-2" />
                      Burned Connector Example
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Visual reference of connector damage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-5rem)]">
                    <div className="flex justify-center items-center bg-[var(--gray-6)] border border-[var(--gray-5)] rounded-lg w-full h-full overflow-hidden">
                      <img
                        src={meltedImg}
                        alt="Example of burned 12VHPWR connector"
                        className="p-4 w-full h-full object-contain"
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