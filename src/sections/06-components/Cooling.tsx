import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wind, Droplets, Flame, DollarSign, Clock, AlertTriangle, ThermometerSun, Volume2, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import aioImg from '@/assets/images/aio_coolers.avif';
import airImg from '@/assets/images/aircooler.jpeg';
import customImg from '@/assets/images/custom_water_cooling.webp';
import radMain from '@/assets/images/radiator_placement_main.jpg';
import radSecond from '@/assets/images/radiator_placement_second.jpg';
import radOther from '@/assets/images/radiator_placement.jpg';

export function Cooling() {
  const [activeTab, setActiveTab] = useState('air');
  const [aioPopupOpen, setAioPopupOpen] = useState(false);
  const [aioImageIndex, setAioImageIndex] = useState(0);
  const aioImages = [radMain, radSecond, radOther];

  const coolingTypes = {
    air: {
      name: 'Air Cooling',
      tagline: 'Reliable & Cost-Effective',
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
      image: airImg,
      pros: [
        'Long-term reliability',
        'Often matches AIO performance',
        'Lower cost',
        'No pump noise',
        'Zero maintenance',
      ],
      considerations: [
        {
          icon: Gauge,
          title: 'Radiator Size',
          description: 'Larger heatsink surface area = better cooling. Look for tower coolers with 5+ heat pipes.',
        },
        {
          icon: Wind,
          title: 'Fan Configuration',
          description: 'Dual-fan setups (120mm or 140mm) provide best price-to-performance. Push-pull recommended.',
        },
        {
          icon: Volume2,
          title: 'Fan Brand Matters',
          description: 'Premium fans (Noctua, Be Quiet!, Arctic) run significantly quieter than budget options at same RPM.',
        },
        {
          icon: ThermometerSun,
          title: 'Sustained Performance',
          description: 'Can outperform AIOs in long-running tasks due to consistent thermal dissipation without liquid heat saturation.',
        },
      ],
    },
    aio: {
      name: 'AIO (All-in-One)',
      tagline: 'Performance Spikes & Aesthetics',
      color: 'from-[var(--color-magenta-2)] to-[var(--color-red-2)]',
      accentColor: 'var(--color-magenta-2)',
      image: aioImg,
      pros: [
        'High thermal capacity',
        'Best for burst workloads',
        'Clean aesthetics',
        'Flexible mounting',
        'RGB integration',
      ],
      considerations: [
        {
          icon: ThermometerSun,
          title: 'Thermal Capacity',
          description: 'Excels at short performance spikes thanks to liquid thermal mass. Water absorbs heat quickly, but takes time to dissipate.',
        },
        {
          icon: Gauge,
          title: 'Radiator Size',
          description: '240mm minimum, 280mm recommended, 360mm for high-end CPUs. Bigger = better heat dissipation over time.',
        },
        {
          icon: Wind,
          title: 'Fan & Rad Thickness',
          description: 'Check total thickness (radiator + fans). Standard: 25mm fans + 27-30mm rad. Thick rads (>35mm) may not fit all cases.',
        },
        {
          icon: AlertTriangle,
          title: 'Placement Critical',
          description: 'Mount radiator above pump if possible. Top/front exhaust ideal. Avoid tubes-down CPU block mounting to prevent air bubbles.',
        },
      ],
    },
    custom: {
      name: 'Custom Water Cooling',
      tagline: 'Ultimate Performance & Flexibility',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
      image: customImg,
      pros: [
        'Maximum cooling potential',
        'CPU + GPU cooling',
        'Unmatched aesthetics',
        'Highly customizable',
        'Enthusiast showpiece',
      ],
      considerations: [
        {
          icon: DollarSign,
          title: 'Significant Investment',
          description: 'Expect $500-2000+ for quality components: blocks, radiators, pump/res combo, fittings, tubing, coolant. Way more expensive than air or AIO.',
        },
        {
          icon: Clock,
          title: 'Annual Maintenance',
          description: 'Requires yearly drain/flush/refill. Check for leaks regularly. Replace coolant to prevent algae growth and corrosion.',
        },
        {
          icon: Droplets,
          title: 'Multi-Component Cooling',
          description: 'Can integrate CPU, GPU, RAM, VRM, and even M.2 drives into single loop for unified thermal management.',
        },
        {
          icon: AlertTriangle,
          title: 'Leak Risk',
          description: 'Improper installation or aging fittings can leak. Always leak test 24hrs before powering on. Not recommended for beginners.',
        },
      ],
    },
  };

  const ComparisonGrid = () => (
    <div className="gap-4 grid grid-cols-3 mb-6">
      {Object.entries(coolingTypes).map(([key, type]) => (
        <Card
          key={key}
          className={`cursor-pointer border-2 transition-all duration-300 ${
            activeTab === key
              ? 'border-white/40 shadow-[0_0_30px_rgba(110,63,237,0.2)]'
              : 'border-[var(--gray-5)] hover:border-[var(--color-purple-4)]'
          }`}
          onClick={() => setActiveTab(key)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${type.color} shadow-lg`}
              >
                {key === 'air' && <Wind className="w-6 h-6 text-white" />}
                {key === 'aio' && <Droplets className="w-6 h-6 text-white" />}
                {key === 'custom' && <Flame className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{type.name}</h3>
                <p className="text-[var(--gray-3)] text-xs truncate">{type.tagline}</p>
              </div>
              {activeTab === key && (
                <div
                  className="rounded-full w-2 h-2 animate-pulse"
                  style={{ backgroundColor: type.accentColor }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section
      id="cooling"
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
                CPU Cooling
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Thermal Management
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Choose the right cooling solution for your performance needs and budget
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Comparison Grid */}
          <ComparisonGrid />

          {/* Detailed View */}
          <div className="flex flex-1 gap-6 min-h-0">
            {/* Left Column - Image */}
            <div className="w-1/3">
              <Card className="group relative border-[var(--gray-5)] border-2 h-full overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${coolingTypes[activeTab].color} opacity-10 transition-all duration-700`}
                />
                <CardContent className="relative p-0 h-full">
                  <div className="absolute inset-0 flex justify-center items-center bg-[var(--gray-6)]">
                    <img
                      src={coolingTypes[activeTab].image}
                      alt={coolingTypes[activeTab].name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        // Fallback to gradient background if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-7)] via-transparent to-transparent opacity-60" />
                  </div>
                  
                  {/* Type Badge Overlay */}
                  <div className="right-6 bottom-6 left-6 absolute">
                    <div className="bg-[var(--gray-6)]/95 backdrop-blur-md p-4 border border-[var(--gray-5)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${coolingTypes[activeTab].color} shadow-lg`}
                        >
                          {activeTab === 'air' && <Wind className="w-6 h-6 text-white" />}
                          {activeTab === 'aio' && <Droplets className="w-6 h-6 text-white" />}
                          {activeTab === 'custom' && <Flame className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{coolingTypes[activeTab].name}</h3>
                          <p className="text-[var(--gray-3)] text-xs">{coolingTypes[activeTab].tagline}</p>
                        </div>
                        {activeTab === 'aio' && (
                          <div className="ml-4">
                            <Button size="sm" variant="outline" onClick={() => setAioPopupOpen(true)}>
                              View radiator images
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AIO Radiator Images Popup */}
            {aioPopupOpen && activeTab === 'aio' && (
              <div
                className="z-50 fixed inset-0 flex justify-center items-center p-6"
                style={{ background: 'rgba(0,0,0,0.6)' }}
                onClick={() => setAioPopupOpen(false)}
              >
                <Card className="relative w-full max-w-5xl h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="top-4 right-4 absolute">
                    <Button size="icon" variant="ghost" onClick={() => setAioPopupOpen(false)}>✕</Button>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle>Radiator Placement — AIO</CardTitle>
                    <CardDescription className="text-xs">Examples of common radiator placements and orientations</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center bg-[var(--gray-7)] p-0 h-[calc(100%-4rem)]">
                    <div className="relative flex justify-center items-center w-full h-full">
                      <img
                        src={aioImages[aioImageIndex]}
                        alt={`Radiator placement ${aioImageIndex + 1}`}
                        className="max-w-full max-h-[calc(80vh-6rem)] object-contain"
                      />

                      <div className="top-1/2 left-4 absolute -translate-y-1/2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setAioImageIndex((i) => (i - 1 + aioImages.length) % aioImages.length)}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="top-1/2 right-4 absolute -translate-y-1/2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setAioImageIndex((i) => (i + 1) % aioImages.length)}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="bottom-4 left-1/2 absolute flex gap-2 -translate-x-1/2">
                        {aioImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setAioImageIndex(idx)}
                            className={`w-3 h-3 rounded-full ${idx === aioImageIndex ? 'bg-white' : 'bg-white/30'}`}
                            aria-label={`Show image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Right Column - Details */}
            <div className="flex flex-col flex-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
              {/* Pros Section */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                    <div className="flex items-center gap-2 p-4 border-[var(--gray-5)] border-b font-semibold">
                      <div className='flex items-center gap-2 mr-5'>
                          <span
                          className="rounded-full w-2 h-2"
                          style={{ backgroundColor: coolingTypes[activeTab].accentColor }}
                        />
                        Key Advantages
                      </div>
                    <div className="flex flex-wrap gap-2">
                    {coolingTypes[activeTab].pros.map((pro, idx) => (
                      <Badge
                        key={idx}
                        className="px-3 py-1.5 border-2 text-gray-3 text-xs hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: coolingTypes[activeTab].accentColor,
                          background: `${coolingTypes[activeTab].accentColor}15`,
                        }}
                      >
                        {pro}
                      </Badge>
                    ))}
                  </div>
                    </div>
                    
              </Card>

              <div className='flex flex-col gap-2 w-full h-full'>

                {/* Considerations Section */}
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span
                        className="rounded-full w-2 h-2"
                        style={{ backgroundColor: coolingTypes[activeTab].accentColor }}
                      />
                      Important Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {coolingTypes[activeTab].considerations.map((consideration, idx) => {
                      const Icon = consideration.icon;
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
                            className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${coolingTypes[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
                          >
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

                {/* Bottom Tip */}
                <Card
                  className="bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] border-2"
                  style={{ borderColor: `${coolingTypes[activeTab].accentColor}40` }}
                >
                  <CardContent className="p-4">
                    <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                      {activeTab === 'air' && (
                        <>
                          💡 <strong>Pro Tip:</strong> Don't overspend on air coolers. A $40-60 tower cooler with quality fans often performs within 2-3°C of $100+ models.
                        </>
                      )}
                      {activeTab === 'aio' && (
                        <>
                          💡 <strong>Pro Tip:</strong> Larger radiators (280mm/360mm) run quieter at lower fan speeds while maintaining excellent cooling. Factor in case compatibility before buying.
                        </>
                      )}
                      {activeTab === 'custom' && (
                        <>
                          ⚠️ <strong>Important:</strong> Custom loops are for enthusiasts only. Budget $1000+ for quality parts and expect 4-8 hours of build time plus annual maintenance.
                        </>
                      )}
                    </p>
                  </CardContent>
                </Card>

              </div>

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