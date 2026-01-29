import React, { useState } from 'react';
import sataImg from '@/assets/images/sata.jpg';
import rgbImg from '@/assets/images/rgb_vs_argb_header.png';
import usbGensImg from '@/assets/images/usb_generations.jpg';
import usbGen1Img from '@/assets/images/usb1.jpg';
import usbGen2Img from '@/assets/images/usb2.jpg';
import pin24Img from '@/assets/images/24-Pin-Power.webp';
import cpuPowerImg from '@/assets/images/cpu_power_cable_connector.webp';
import frontendImg from '@/assets/images/front-panel-connector_combined.webp';
import fanHeaderImg from '@/assets/images/fan_header.avif';
import overlayImg from '@/assets/images/image14.gif';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function Motherboard() {
  const [selectedSize, setSelectedSize] = useState('atx');
  const [activeTab, setActiveTab] = useState('sizes');
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayConnector, setOverlayConnector] = useState(null);

  const specs = {
    eatx: {
      label: "E-ATX",
      width: 330,
      height: 305,
      ram: 8,
      pcie: 6,
      pcieSpacing: 30,
      desc: "Maximum expandability",
      ramX: 50,
      ramY: 20,
      ram2X: 220,
      ram2Y: 20,
    },
    atx: {
      label: "ATX",
      width: 244,
      height: 305,
      ram: 4,
      ramX: 160,
      ramY: 20,
      pcie: 4,
      pcieSpacing: 40,
      desc: "Standard full-size",
    },
    micro: {
      label: "Micro-ATX",
      width: 244,
      height: 244,
      ram: 4,
      ramX: 160,
      ramY: 20,
      pcie: 2,
      pcieSpacing: 40,
      desc: "Compact powerhouse",
    },
    mini: {
      label: "Mini-ITX",
      width: 170,
      height: 170,
      ram: 2,
      ramX: 130,
      ramY: 6,
      pcie: 1,
      pcieSpacing: 0,
      desc: "Ultra-compact build",
    },
    nano: {
      label: "Nano-ITX",
      width: 120,
      height: 120,
      ram: 1,
      ramX: 100,
      ramY: 6,
      pcie: 0,
      pcieSpacing: 0,
      desc: "Minimal footprint",
    },
  };

  const connectorImages = [
    { id: 'sata', src: sataImg, title: 'SATA Connectors', desc: 'Storage device connections for HDDs and SSDs', overlaySrc: overlayImg },
    { id: 'rgb', src: rgbImg, title: 'RGB vs ARGB Headers', desc: 'Lighting control for RGB and addressable RGB devices', overlaySrc: overlayImg },
    { id: 'usb', images: [usbGensImg, usbGen1Img, usbGen2Img], title: 'USB Connectors', desc: 'USB generations and headers' },
    { id: 'power', images: [pin24Img, cpuPowerImg], title: 'Power Connectors', desc: 'Main and CPU power connectors' },
    { id: 'frontend', src: frontendImg, title: 'Front Panel Connector', desc: 'Power button, reset, LEDs, and audio headers', overlaySrc: overlayImg },
    { id: 'fan', src: fanHeaderImg, title: 'Fan Headers', desc: 'PWM and DC fan control connectors', overlaySrc: overlayImg },
  ];

  const MotherboardVisual = ({ spec, size }) => {
    const scale = 1.5;
    const ramHeight = (size === 'nano' ? 88 : 133) * scale;

    return (
      <div className="relative flex justify-center items-center transition-all duration-500">
        <div
          className="relative bg-gradient-to-br from-[var(--gray-5)] to-[var(--gray-4)] shadow-2xl hover:shadow-[0_0_30px_rgba(110,63,237,0.3)] border-[var(--corp-purple)] border-2 rounded-lg transition-all duration-500"
          style={{ width: `${spec.width * scale}px`, height: `${spec.height * scale}px` }}
        >
          {/* Rulers: top (width) and left (height) */}
          {(() => {
            const pixelWidth = spec.width * scale;
            const pixelHeight = spec.height * scale;
            const tickIntervalMm = 50; // mm between major ticks
            const ticksH = Math.max(1, Math.floor(spec.width / tickIntervalMm));
            const ticksV = Math.max(1, Math.floor(spec.height / tickIntervalMm));

            return (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: -28,
                    left: 0,
                    width: pixelWidth,
                    height: 24,
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {[...Array(ticksH + 1)].map((_, i) => (
                      <div
                        key={`tick-h-${i}`}
                        style={{
                          position: 'absolute',
                          left: `${(i * pixelWidth) / ticksH}px`,
                          top: 6,
                          width: 1,
                          height: 12,
                          background: 'var(--gray-5)',
                          opacity: 0.9,
                        }}
                      />
                    ))}
                    <div style={{ position: 'absolute', right: 4, top: 2 }} className="text-[var(--gray-3)] text-xs">{spec.width} mm</div>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: -36,
                    top: 0,
                    width: 36,
                    height: pixelHeight,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {[...Array(ticksV + 1)].map((_, i) => (
                      <div
                        key={`tick-v-${i}`}
                        style={{
                          position: 'absolute',
                          top: `${(i * pixelHeight) / ticksV}px`,
                          left: 18,
                          width: 12,
                          height: 1,
                          background: 'var(--gray-5)',
                          opacity: 0.9,
                        }}
                      />
                    ))}
                    <div style={{ position: 'absolute', left: 2, top: '50%', transform: 'rotate(-90deg) translateY(-50%)' }} className="text-[var(--gray-3)] text-xs">{spec.height} mm</div>
                  </div>
                </div>
              </>
            );
          })()}
          {/* PCIe Slots */}
          <div className="absolute flex flex-col justify-end p-4 pl-4 w-min h-full">
            {[...Array(spec.pcie)].map((_, i) => (
              <div
                key={i}
                className="bg-[var(--corp-purple)] opacity-80 shadow-[0_0_8px_rgba(110,63,237,0.6)] rounded-full"
                style={{
                  marginTop: `${11 * scale}px`,
                  width: `${120 * scale}px`,
                  height: `${11 * scale}px`,
                  animationDelay: `${i * 0.1}s`,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            ))}
          </div>

          {/* RAM Slots (primary area for up to 4, secondary area for >4) */}
          <>
            <div 
              className={`flex flex-row gap-2 w-min absolute`}
              style={{
                height: `${ramHeight}px`,
                top: `${spec.ramY * scale}px`,
                left: `${spec.ramX * scale}px`,
              }}
            >
              {[...Array(Math.min(spec.ram, 4))].map((_, i) => (
                <div
                  key={`ram-prim-${i}`}
                  className="bg-gradient-to-b from-[var(--color-magenta-2)] to-[var(--color-magenta-3)] shadow-[0_0_6px_rgba(168,36,101,0.5)] rounded-sm w-4 h-full"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animation: 'fadeIn 1s ease-out',
                  }}
                />
              ))}
            </div>

            {spec.ram > 4 && (
              <div 
                className={`flex flex-row gap-2 w-min absolute`}
                style={{
                  height: `${ramHeight}px`,
                  top: `${spec.ram2Y * scale}px`,
                  left: `${spec.ram2X * scale}px`,
                }}
              >
                {[...Array(spec.ram - 4)].map((_, i) => (
                  <div
                    key={`ram-sec-${i}`}
                    className="flex-1 bg-gradient-to-b from-[var(--color-magenta-2)] to-[var(--color-magenta-3)] shadow-[0_0_6px_rgba(168,36,101,0.5)] rounded-sm w-4 h-full"
                    style={{
                      animationDelay: `${(i + 4) * 0.15}s`,
                      animation: 'fadeIn 1s ease-out',
                    }}
                  />
                ))}
              </div>
            )}
          </>

          {/* CPU Socket */}
          <div className="top-1/3 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center items-center bg-[var(--gray-6)] shadow-[0_0_15px_rgba(227,25,55,0.4)] border-[var(--corp-red)] border-2 rounded-lg w-16 h-16">
              <div className="gap-0.5 grid grid-cols-3 bg-[var(--gray-5)] p-1 rounded w-10 h-10">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-[var(--corp-red)] opacity-70 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative circuit traces */}
          <svg className="absolute inset-0 opacity-20 w-full h-full pointer-events-none">
            <pattern id={`circuit-${size}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="var(--corp-purple)" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="2" fill="var(--corp-purple)" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#circuit-${size})`} />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section id="motherboard" className="relative flex flex-row justify-center items-center gap-10 bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-6)] px-20 pt-20 pb-20 w-full h-screen overflow-hidden snap-start pointer-events-auto">
      <div className="w-full h-full">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="top-1/4 left-1/4 absolute bg-[var(--corp-purple)] blur-[120px] rounded-full w-96 h-96" />
          <div className="right-1/4 bottom-1/4 absolute bg-[var(--corp-red)] blur-[120px] rounded-full w-96 h-96" />
        </div>

        <div className="relative flex flex-col gap-6 w-full h-full">
          {/* Header */}
          <div className="flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-center gap-3">
              <h2 className="bg-clip-text bg-gradient-to-r from-[var(--corp-purple)] to-[var(--corp-red)] font-bold text-transparent text-5xl tracking-tight">
                Motherboards
              </h2>
              <Badge variant="outline" className="border-[var(--corp-purple)] text-[var(--corp-purple)] text-xs">
                The Foundation
              </Badge>
            </div>
            <p className="max-w-2xl text-[var(--gray-3)] text-sm">
              Explore form factors, connectors, and interactive board layouts
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--corp-purple)] to-transparent opacity-30" />

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="grid grid-cols-3 bg-[var(--gray-6)] border border-[var(--gray-5)] w-full h-12">
              <TabsTrigger 
                value="sizes" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-purple-3)] data-[state=active]:to-[var(--color-purple-4)] data-[state=active]:text-white transition-all duration-300"
              >
                Form Factors
              </TabsTrigger>
              <TabsTrigger 
                value="connectors"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-purple-3)] data-[state=active]:to-[var(--color-purple-4)] data-[state=active]:text-white transition-all duration-300"
              >
                Connectors
              </TabsTrigger>
              <TabsTrigger 
                value="layout"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--color-purple-3)] data-[state=active]:to-[var(--color-purple-4)] data-[state=active]:text-white transition-all duration-300"
              >
                Interactive Layout
              </TabsTrigger>
            </TabsList>

            {/* Form Factors Tab */}
            <TabsContent value="sizes" className="flex flex-1 gap-6 mt-6 overflow-hidden">
              {/* Size Selection Cards */}
              <div className="flex flex-col gap-3 pr-2 w-88 overflow-y-auto custom-scrollbar">
                {Object.entries(specs).map(([key, spec]) => (
                  <Card
                    key={key}
                    className={`flex flex-col justify-start items-start flex-1 cursor-pointer transition-all duration-300 border-2 p-0 ${
                      selectedSize === key
                        ? 'border-[var(--corp-purple)] bg-gradient-to-br from-[var(--color-purple-7)] to-[var(--gray-7)] shadow-[0_0_20px_rgba(110,63,237,0.2)]'
                        : 'border-[var(--gray-5)] hover:border-[var(--color-purple-5)] bg-[var(--gray-7)]'
                    }`}
                    onClick={() => setSelectedSize(key)}
                  >
                    <CardHeader className="p-2 pl-4">
                      <CardTitle className="flex justify-between items-center text-lg">
                        {spec.label}
                      </CardTitle>
                      <CardDescription className="p-0 text-xs">{spec.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-2 pl-4 w-full h-full">
                      <div className="items-center gap-0 grid grid-cols-3 h-full text-xs">
                        <div className="flex flex-col">
                          <span className="text-[var(--gray-3)]">Dimensions</span>
                          <span className="font-mono font-semibold text-[var(--foreground)]">{spec.width}×{spec.height}mm</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[var(--gray-3)]">RAM Slots</span>
                          <span className="font-mono font-semibold text-[var(--foreground)]">{spec.ram}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[var(--gray-3)]">PCIe Slots</span>
                          <span className="font-mono font-semibold text-[var(--foreground)]">{spec.pcie}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Visual Comparison */}
              <div className="relative flex flex-1 justify-center items-center bg-[var(--gray-7)] p-8 border border-[var(--gray-5)] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(110,63,237,0.05),transparent_70%)]" />
                <MotherboardVisual spec={specs[selectedSize]} size={selectedSize} />
                <div className="bottom-6 left-6 absolute bg-[var(--gray-6)]/90 backdrop-blur-sm px-4 py-2 border border-[var(--gray-5)] rounded-lg">
                  <p className="font-medium text-[var(--gray-2)] text-sm">{specs[selectedSize].label}</p>
                  <p className="mt-0.5 text-[var(--gray-3)] text-xs">{specs[selectedSize].desc}</p>
                </div>
              </div>
            </TabsContent>

            {/* Connectors Tab */}
            <TabsContent value="connectors" className="flex-1 mt-6 overflow-hidden">
              <div className="gap-4 grid grid-cols-3 pr-2 h-65% overflow-y-auto custom-scrollbar">
                {connectorImages.map((connector, idx) => (
                  <Card
                    key={connector.id}
                    className="group bg-[var(--gray-7)] hover:shadow-[0_0_20px_rgba(110,63,237,0.15)] border-[var(--gray-5)] border-2 hover:border-[var(--corp-purple)] overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${idx * 0.05}s`, animation: 'fadeIn 0.5s ease-out' }}
                    onClick={() => { setOverlayConnector(connector); setOverlayOpen(true); }}
                  >
                    <div className="relative bg-[var(--gray-6)] aspect-video overflow-hidden">
                      <img
                        src={connector.src ?? (connector.images && connector.images[0])}
                        alt={connector.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-7)] via-transparent to-transparent opacity-60" />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Interactive Layout Tab */}
            <TabsContent value="layout" className="flex-1 mt-6 overflow-hidden">
              <Card className="bg-[var(--gray-7)] border-[var(--gray-5)] border-2 w-full h-full overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div style={{ height: '100%', overscrollBehavior: 'contain' }}>
                    <div style={{ height: '100%', overflow: 'auto', overscrollBehavior: 'contain' }}>
                      <iframe
                        src="https://mobomaps.com/board-viewer.html?board=asus-b850-max-gaming-wifi-w&dispSlots=1"
                        className="border-0 w-full h-full"
                        title="ASUS B850 Max Gaming WiFi Motherboard Layout"
                        loading="lazy"
                        scrolling="yes"
                        style={{ display: 'block', height: '100%' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {/* Connector overlay modal */}
          {overlayOpen && overlayConnector && (
            <div
              className="z-50 fixed inset-0 flex justify-center items-center p-6"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setOverlayOpen(false)}
            >
              <Card
                className="relative w-full max-w-8xl h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="top-4 right-4 absolute">
                  <Button variant="ghost" onClick={() => setOverlayOpen(false)}>✕</Button>
                </div>

                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{overlayConnector.title}</CardTitle>
                  <CardDescription className="text-xs">{overlayConnector.desc}</CardDescription>
                </CardHeader>

                <CardContent className="p-0 h-[calc(100%-4rem)]">
                  <div className="flex w-full h-full">
                    {overlayConnector.images ? (
                      <div className="flex flex-wrap justify-center items-start gap-4 bg-[var(--gray-6)] p-4 w-full h-full overflow-auto">
                        {overlayConnector.images.map((imgSrc, i) => (
                          <div key={`merged-${i}`} className="flex flex-1 justify-center items-center bg-[var(--gray-7)] p-2 min-w-[240px] max-w-[45%]">
                            <img src={imgSrc} alt={`${overlayConnector.title} ${i + 1}`} className="max-w-full max-h-[60vh] object-contain" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center items-center bg-[var(--gray-6)] w-1/2 overflow-hidden">
                          <img src={overlayConnector.src} alt={overlayConnector.title} className="max-w-full max-h-full object-contain" />
                        </div>

                        {overlayConnector.overlaySrc ? (
                          <div className="flex justify-center items-center bg-[var(--gray-7)] border-[var(--gray-5)] border-l w-1/2 overflow-hidden">
                            <img src={overlayConnector.overlaySrc} alt={`${overlayConnector.title} overlay`} className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.1);
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
          background: var(--corp-purple);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-purple-4);
        }
      `}</style>
    </section>
  );
}