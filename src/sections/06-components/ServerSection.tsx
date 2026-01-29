import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { 
  Server, 
  HardDrive,
  Cpu,
  Network,
  Database,
  Home,
  Building2,
  Zap,
  Shield,
  Archive,
  Boxes
} from 'lucide-react';

import industrialImg from '@/assets/images/home_server_1.jpg';
import diyImg from '@/assets/images/diy_server.jpg';
import nasImg from '@/assets/images/nas.webp';

export function ServerSection() {
  const [activeTab, setActiveTab] = useState('industrial');

  const serverSpecs = {
    industrial: {
      name: 'Industrial Server',
      tagline: 'Enterprise Rack Infrastructure',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
      icon: Building2,
      image: industrialImg,
      imageTitle: 'Enterprise Server Rack',
      imageDescription: 'Full rack with redundant power, networking, and storage',
      components: [
        { name: 'Rack-Mount Servers (1U-4U)', description: 'Multiple redundant compute nodes', icon: Server },
        { name: 'Network Switches', description: '10/25/40GbE networking infrastructure', icon: Network },
        { name: 'Storage Arrays', description: 'SAN/NAS with hot-swappable drives', icon: Database },
        { name: 'Redundant PSUs', description: 'Dual power supplies with battery backup', icon: Zap },
        { name: 'Management Hardware', description: 'KVM switches, monitoring systems', icon: Cpu },
        { name: 'Cooling System', description: 'Dedicated HVAC and airflow management', icon: Archive },
      ],
      notes: [
        'Requires dedicated server room with climate control',
        'Redundancy at every level (N+1 or 2N)',
        'Enterprise support contracts and monitoring',
        'Total cost: €50,000-€500,000+ depending on scale',
      ],
    },
    homeserver: {
      name: 'Home Server',
      tagline: 'Practical Home Infrastructure',
      color: 'from-[var(--color-purple-2)] to-[var(--color-magenta-2)]',
      accentColor: 'var(--color-magenta-2)',
      icon: Home,
      image: diyImg,
      imageTitle: 'Home Server Setup',
      imageDescription: 'Compact, energy-efficient home infrastructure',
      components: [
        { name: 'CPU', description: 'Low-power efficient: Intel i3/i5 or AMD Ryzen 5/7', icon: Cpu },
        { name: 'Motherboard', description: 'mATX/ITX with multiple SATA ports', icon: Server },
        { name: 'RAM', description: '16-32GB DDR4/DDR5 for VMs and services', icon: Boxes },
        { name: 'Storage', description: '2-4 HDDs for data + 1 SSD for OS', icon: HardDrive },
        { name: 'Network Card', description: 'Gigabit ethernet (optional 2.5GbE upgrade)', icon: Network },
        { name: 'Case & PSU', description: 'Quiet case with good airflow, 400-500W PSU', icon: Zap },
      ],
      useCases: [
        {
          title: 'Media Server',
          description: 'Plex/Jellyfin for streaming your media library across devices',
          icon: Archive,
        },
        {
          title: 'Game Server Hosting',
          description: 'Host Minecraft, Valheim, or other multiplayer game servers',
          icon: Server,
        },
        {
          title: 'Home Automation',
          description: 'Home Assistant for smart home control and automation',
          icon: Home,
        },
        {
          title: 'Development Environment',
          description: 'LAMP stack, Docker containers, testing environments',
          icon: Cpu,
        },
        {
          title: 'File Storage & Backup',
          description: 'Centralized storage with automated backups',
          icon: Database,
        },
        {
          title: 'Network Services',
          description: 'Pi-hole (ad blocking), VPN server, DNS server',
          icon: Network,
        },
      ],
      notes: [
        'Total cost: €400-€800 for basic setup',
        'Power consumption: 30-100W idle (much less than gaming PC)',
        'Can run 24/7 quietly in a closet or utility room',
        'Consider UPS for power protection',
      ],
    },
    nas: {
      name: 'NAS Integration',
      tagline: 'Network Attached Storage',
      color: 'from-[var(--color-red-2)] to-[var(--color-red-3)]',
      accentColor: 'var(--color-red-3)',
      icon: Database,
      image: nasImg,
      imageTitle: 'NAS Device',
      imageDescription: 'Dedicated network storage appliance',
      explanation: [
        {
          title: 'What is a NAS?',
          description: 'Network Attached Storage - a dedicated device that provides file storage accessible over your network. Think of it as a personal cloud storage that lives in your home.',
          icon: Database,
        },
        {
          title: 'NAS vs Home Server',
          description: 'A NAS is specialized for storage with a simple OS (like Synology DSM or TrueNAS). A home server is general-purpose and can run any services. NAS is easier but less flexible.',
          icon: Server,
        },
        {
          title: 'Can You Use Both?',
          description: 'YES! Common setup: NAS for bulk storage + Home server for compute tasks. Server mounts NAS storage for media libraries, backups, and large datasets.',
          icon: Network,
        },
        {
          title: 'When to Use a NAS',
          description: 'If you primarily need storage with minimal setup: Synology/QNAP NAS (2-8 bay). If you need compute + storage flexibility: Build a home server with TrueNAS or similar.',
          icon: Shield,
        },
      ],
      nasOptions: [
        { type: 'Pre-built NAS', example: 'Synology DS920+ (4-bay)', price: '€500-€600', icon: Boxes },
        { type: 'DIY NAS Build', example: 'Custom PC with TrueNAS/Unraid', price: '€400-€800', icon: Cpu },
        { type: 'Hybrid Approach', example: 'Home server + NAS for redundancy', price: '€800-€1,400', icon: Network },
      ],
      notes: [
        'NAS is best for pure storage needs with minimal setup',
        'Home server offers more flexibility but requires more configuration',
        'Both can coexist - NAS for storage, server for compute',
        'Consider network speed (1GbE minimum, 2.5/10GbE ideal)',
      ],
    },
  };

  const TabSelector = () => (
    <div className="gap-4 grid grid-cols-3 mb-6">
      {Object.entries(serverSpecs).map(([key, spec]) => {
        const Icon = spec.icon;
        return (
          <Card
            key={key}
            className={`cursor-pointer border-2 transition-all duration-300 ${
              activeTab === key
                ? 'border-white/40 shadow-[0_0_30px_rgba(63,131,237,0.2)]'
                : 'border-[var(--gray-5)] hover:border-[var(--color-blue-4)]'
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
      id="servers"
      className="relative flex flex-row justify-center items-center gap-8 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-8 pt-26 pb-12 w-full h-screen overflow-hidden snap-start pointer-events-auto"
    >
      <div className="w-full h-full">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/4 right-1/3 absolute bg-[var(--color-blue-3)] blur-[140px] rounded-full w-96 h-96 animate-pulse" />
          <div className="bottom-1/4 left-1/4 absolute bg-[var(--color-magenta-2)] blur-[140px] rounded-full w-96 h-96 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative flex flex-col gap-4 w-full h-full overflow-visible">
          {/* Header */}
          <div className="flex flex-col gap-2 overflow-visible animate-fadeIn">
            <div className="flex items-center gap-3 overflow-visible">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-blue-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
                Server Infrastructure
              </h2>
              <Badge variant="outline" className="border-[var(--color-blue-3)] text-[var(--color-blue-3)] text-xs">
                Storage & Services
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              From enterprise data centers to home labs - understanding server infrastructure and storage solutions
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-blue-3)] to-transparent opacity-30" />

          {/* Tab Selector */}
          <TabSelector />

          {/* Content Layout */}
          <div className="flex md:flex-row flex-col flex-1 gap-4 min-h-0">
            {/* Left Column - Details */}
            <div className="flex flex-col gap-4 pr-2 w-full md:w-2/3 overflow-y-auto custom-scrollbar">
              {/* Active Tab Header */}
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${serverSpecs[activeTab].color} shadow-lg`}
                    >
                      {React.createElement(serverSpecs[activeTab].icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{serverSpecs[activeTab].name}</h3>
                      <p className="text-[var(--gray-3)] text-xs">{serverSpecs[activeTab].tagline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Components + Notes Section - Combined for Industrial/Home Server */}
              {(activeTab === 'industrial' || activeTab === 'homeserver') && (
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardContent className="flex md:flex-row flex-col gap-4 p-4">
                    {/* Left: Components */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="flex items-center gap-2 font-semibold text-base">
                          <span
                            className="rounded-full w-2 h-2"
                            style={{ backgroundColor: serverSpecs[activeTab].accentColor }}
                          />
                          {activeTab === 'industrial' ? 'Key Components' : 'Required Components'}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {serverSpecs[activeTab].components.map((component, idx) => {
                          const Icon = component.icon;
                          return (
                            <div
                              key={idx}
                              className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-blue-4)] rounded-md transition-all duration-200"
                              style={{
                                animationDelay: `${idx * 0.06}s`,
                                animation: 'fadeIn 0.45s ease-out',
                              }}
                            >
                              <div
                                className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${serverSpecs[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
                              >
                                <Icon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-blue-3)] text-xs transition-colors">
                                  {component.name}
                                </h4>
                                <p className="text-[var(--gray-3)] text-xs leading-tight">
                                  {component.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Notes */}
                    <div className="flex-shrink-0 md:w-80">
                      <div className="mb-3">
                        <h3 className="flex items-center gap-2 font-semibold text-base">
                          <Shield className="w-4 h-4" style={{ color: serverSpecs[activeTab].accentColor }} />
                          Important Notes
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {serverSpecs[activeTab].notes.map((note, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-md"
                          >
                            <div
                              className="flex-shrink-0 mt-1.5 rounded-full w-1.5 h-1.5"
                              style={{ backgroundColor: serverSpecs[activeTab].accentColor }}
                            />
                            <p className="text-[var(--gray-3)] text-xs leading-tight">{note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
          

              {/* NAS Explanation + Options - Combined */}
              {activeTab === 'nas' && (
                <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2">
                  <CardContent className="flex md:flex-row flex-col gap-4 p-4">
                    {/* Left: Understanding NAS */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="flex items-center gap-2 font-semibold text-base">
                          <span
                            className="rounded-full w-2 h-2"
                            style={{ backgroundColor: serverSpecs[activeTab].accentColor }}
                          />
                          Understanding NAS
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {serverSpecs[activeTab].explanation.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={idx}
                              className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-red-4)] rounded-md transition-all duration-200"
                            >
                              <div
                                className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${serverSpecs[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
                              >
                                <Icon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-red-3)] text-xs transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-[var(--gray-3)] text-xs leading-tight">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: NAS Options + Notes */}
                    <div className="flex-shrink-0 space-y-4 md:w-80">
                      <div>
                        <div className="mb-3">
                          <h3 className="flex items-center gap-2 font-semibold text-base">
                            <span
                              className="rounded-full w-2 h-2"
                              style={{ backgroundColor: serverSpecs[activeTab].accentColor }}
                            />
                            NAS Options
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {serverSpecs[activeTab].nasOptions.map((option, idx) => {
                            const Icon = option.icon;
                            return (
                              <div
                                key={idx}
                                className="group flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] hover:border-[var(--color-red-4)] rounded-md transition-all duration-200"
                              >
                                <div
                                  className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${serverSpecs[activeTab].color} shadow transition-transform duration-200 group-hover:scale-105`}
                                >
                                  <Icon className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="mb-0.5 font-semibold group-hover:text-[var(--color-red-3)] text-xs transition-colors">
                                    {option.type}
                                  </h4>
                                  <p className="mb-1 text-[var(--gray-3)] text-xs">{option.example}</p>
                                  <span className="inline-block bg-[var(--color-red-3)]/20 px-2 py-0.5 rounded font-semibold text-[var(--color-red-3)] text-xs">
                                    {option.price}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <div className="mb-3">
                          <h3 className="flex items-center gap-2 font-semibold text-base">
                            <Shield className="w-4 h-4" style={{ color: serverSpecs[activeTab].accentColor }} />
                            Important Notes
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {serverSpecs[activeTab].notes.map((note, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 bg-[var(--gray-6)]/30 p-2 border border-[var(--gray-5)] rounded-md"
                            >
                              <div
                                className="flex-shrink-0 mt-1.5 rounded-full w-1.5 h-1.5"
                                style={{ backgroundColor: serverSpecs[activeTab].accentColor }}
                              />
                              <p className="text-[var(--gray-3)] text-xs leading-tight">{note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              {/* Square Image Card */}
              <Card className="border-[var(--gray-5)] border-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{serverSpecs[activeTab].imageTitle}</CardTitle>
                  <CardDescription className="text-xs">
                    {serverSpecs[activeTab].imageDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-center items-center bg-white rounded-lg w-full overflow-hidden" style={{ maxHeight: '320px' }}>
                    <div style={{ width: '100%', aspectRatio: '4 / 3' }} className="flex justify-center items-center">
                      <img src={serverSpecs[activeTab].image} alt={serverSpecs[activeTab].imageTitle} className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
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
          background: linear-gradient(to bottom, var(--color-blue-3), var(--color-magenta-2));
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, var(--color-blue-4), var(--color-magenta-3));
        }
      `}</style>
    </section>
  );
}