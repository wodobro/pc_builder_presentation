import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HardDrive, Zap, Rocket, DollarSign, Database, Gauge, ThermometerSnowflake, Boxes } from 'lucide-react';
import hddImg from '@/assets/images/hdd.webp';
import ssdImg from '@/assets/images/ssd.jpg';
import m2Img from '@/assets/images/mdot2.avif';

export function Storage() {
  const [activeTab, setActiveTab] = useState('hdd');

  const storageTypes = {
    hdd: {
      name: 'Hard Disk Drive (HDD)',
      tagline: 'Mass Storage on a Budget',
      color: 'from-[var(--color-gray-4)] to-[var(--color-gray-3)]',
      accentColor: 'var(--color-gray-3)',
      image: hddImg,
      pros: [
        'Lowest cost per GB',
        'Massive capacity (up to 20TB+)',
        'Long-term data reliability',
        'No write cycle limits',
        'Perfect for archives',
      ],
      considerations: [
        {
          icon: Gauge,
          title: 'Sequential Speed',
          description: '100-200 MB/s typical speeds. Fine for media storage, game libraries, and backups. Too slow for OS or active projects.',
        },
        {
          icon: Database,
          title: 'Capacity Sweet Spot',
          description: '2-8TB offers best value. 1TB models often cost nearly as much as SSDs. Consider RAID for redundancy on critical data.',
        },
        {
          icon: ThermometerSnowflake,
          title: 'Mechanical Nature',
          description: 'Moving parts generate noise and vibration. 7200 RPM faster but louder than 5400 RPM. Sensitive to physical shock.',
        },
        {
          icon: Boxes,
          title: 'Use Cases',
          description: 'Ideal for: media libraries, game storage, cold backups, NAS systems. Not recommended for: OS drives, scratch disks, databases.',
        },
      ],
    },
    ssd: {
      name: '2.5" SATA SSD',
      tagline: 'Reliable Performance Upgrade',
      color: 'from-[var(--color-purple-2)] to-[var(--color-purple-3)]',
      accentColor: 'var(--color-purple-3)',
      image: ssdImg,
      pros: [
        'Dramatic speed boost over HDD',
        'No moving parts',
        'Silent operation',
        'Shock resistant',
        'Lower power consumption',
      ],
      considerations: [
        {
          icon: Gauge,
          title: 'SATA Bottleneck',
          description: '~550 MB/s max (SATA III limit). 5-10x faster than HDDs, but slower than NVMe. Still excellent for most workloads.',
        },
        {
          icon: DollarSign,
          title: 'Price vs Performance',
          description: '500GB-2TB most cost-effective. Often similar price to budget NVMe drives. Check M.2 prices before buying.',
        },
        {
          icon: Database,
          title: 'Capacity Considerations',
          description: 'Available up to 8TB, but large capacities expensive. Better as secondary drive than primary in modern builds.',
        },
        {
          icon: Boxes,
          title: 'Best Applications',
          description: 'Perfect for: OS on older systems, game libraries, laptops without M.2, external drives. Secondary storage in new builds.',
        },
      ],
    },
    nvme: {
      name: 'M.2 NVMe SSD',
      tagline: 'Maximum Speed & Efficiency',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
      image: m2Img,
      pros: [
        'Blazing fast (up to 7000 MB/s)',
        'Tiny form factor',
        'No cables needed',
        'PCIe 4.0/5.0 support',
        'Future-proof',
      ],
      considerations: [
        {
          icon: Rocket,
          title: 'Generation Matters',
          description: 'Gen 3: ~3500 MB/s, Gen 4: ~7000 MB/s, Gen 5: ~14000 MB/s. Gen 3 fine for most users. Gen 4+ for pro workloads.',
        },
        {
          icon: ThermometerSnowflake,
          title: 'Heat Management',
          description: 'High-speed drives run hot under sustained load. Use motherboard heatsinks or aftermarket coolers. Some throttle without cooling.',
        },
        {
          icon: Database,
          title: 'Capacity & Pricing',
          description: '500GB-2TB mainstream. 1TB sweet spot for price/performance. Check DRAM cache and TBW ratings for endurance.',
        },
        {
          icon: Boxes,
          title: 'Compatibility Check',
          description: 'Verify M.2 slot type (M key for NVMe). Check PCIe gen support. Some slots share bandwidth with SATA ports.',
        },
      ],
    },
  };

  const ComparisonGrid = () => (
    <div className="gap-4 grid grid-cols-3 mb-6">
      {Object.entries(storageTypes).map(([key, type]) => (
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
                {key === 'hdd' && <HardDrive className="w-6 h-6 text-white" />}
                {key === 'ssd' && <Zap className="w-6 h-6 text-white" />}
                {key === 'nvme' && <Rocket className="w-6 h-6 text-white" />}
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
      id="storage"
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
                Storage Solutions
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Speed vs Capacity
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Balance performance, capacity, and budget for your storage needs
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
                  className={`absolute inset-0 bg-gradient-to-br ${storageTypes[activeTab].color} opacity-10 transition-all duration-700`}
                />
                <CardContent className="relative p-0 h-full">
                  <div className={`absolute inset-0 flex justify-center items-center transition-all ${activeTab === 'nvme' ? 'bg-white p-6' : 'bg-[var(--gray-6)]'}`}>
                    <img
                      src={storageTypes[activeTab].image}
                      alt={storageTypes[activeTab].name}
                      className={
                        activeTab === 'nvme'
                          ? 'max-w-[65%] max-h-[65%] object-contain'
                          : 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                      }
                      onError={(e) => {
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
                          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${storageTypes[activeTab].color} shadow-lg`}
                        >
                          {activeTab === 'hdd' && <HardDrive className="w-6 h-6 text-white" />}
                          {activeTab === 'ssd' && <Zap className="w-6 h-6 text-white" />}
                          {activeTab === 'nvme' && <Rocket className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{storageTypes[activeTab].name}</h3>
                          <p className="text-[var(--gray-3)] text-xs">{storageTypes[activeTab].tagline}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="flex flex-col flex-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
              {/* Pros Section */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <div className="flex items-center gap-2 p-4 border-[var(--gray-5)] border-b font-semibold">
                  <div className='flex items-center gap-2 mr-5'>
                    <span
                      className="rounded-full w-2 h-2"
                      style={{ backgroundColor: storageTypes[activeTab].accentColor }}
                    />
                    Key Advantages
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {storageTypes[activeTab].pros.map((pro, idx) => (
                      <Badge
                        key={idx}
                        className="px-3 py-1.5 border-2 text-gray-3 text-xs hover:scale-105 transition-all duration-300"
                        style={{
                          borderColor: storageTypes[activeTab].accentColor,
                          background: `${storageTypes[activeTab].accentColor}15`,
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
                        style={{ backgroundColor: storageTypes[activeTab].accentColor }}
                      />
                      Important Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {storageTypes[activeTab].considerations.map((consideration, idx) => {
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
                            className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${storageTypes[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
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
                  style={{ borderColor: `${storageTypes[activeTab].accentColor}40` }}
                >
                  <CardContent className="p-4">
                    <p className="text-[var(--gray-2)] text-xs leading-relaxed">
                      {activeTab === 'hdd' && (
                        <>
                          💡 <strong>Pro Tip:</strong> Use HDDs for bulk storage where speed isn't critical. Pair with an SSD/NVMe for OS and active projects for best value.
                        </>
                      )}
                      {activeTab === 'ssd' && (
                        <>
                          💡 <strong>Pro Tip:</strong> SATA SSDs are perfect for upgrading older systems or laptops. Check if your motherboard has M.2 slots before buying—NVMe may be same price.
                        </>
                      )}
                      {activeTab === 'nvme' && (
                        <>
                          💡 <strong>Pro Tip:</strong> Gen 3 NVMe is plenty fast for gaming and most work. Save money unless you do heavy video editing or large file transfers daily.
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