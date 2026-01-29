import { useState, useEffect, useMemo, lazy, Suspense, useRef, createContext, useContext } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { Cpu, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageNumber } from "@/components/shared/PageNumber";
import { DateLabel } from "./components/shared/DateLabel";
import "./index.css";
import { SectionLabel } from "./components/shared/SectionLabel";
import vengeanceModel from '@/assets/models/vengeance2.glb';
import { Vector3 } from "three";
import { ComputerScene } from "./sections/06a-3d-viewer/ComputerScene";
import { RAMShortages } from "./sections/05-market-reality/RAMShortages";
import { set } from "react-hook-form";
import CursorMarker from "./components/shared/CursorMarker";

// Canvas Pool Context
const CanvasPoolContext = createContext(null);

// Lazy load non-3D sections
const Hero = lazy(() => import("./sections/01-hero/Hero").then(m => ({ default: m.Hero })));
const Disclaimer = lazy(() => import("./sections/02-disclaimer/Disclaimer").then(m => ({ default: m.Disclaimer })));
const NextEvent = lazy(() => import("./sections/03-next-event/NextEvent").then(m => ({ default: m.NextEvent })));
const Schedule = lazy(() => import("./sections/04-schedule/Schedule").then(m => ({ default: m.Schedule })));
const ComputerSceneUI = lazy(() => import("./sections/06a-3d-viewer/ComputerSceneUI").then(m => ({ default: m.ComputerSceneUI })));
const MarketGraph = lazy(() => import("./sections/05-market-reality/MarketGraph").then(m => ({ default: m.MarketGraph })));
const AIBubble = lazy(() => import("./sections/05-market-reality/AIBubble").then(m => ({ default: m.AIBubble })));
const CPU = lazy(() => import("./sections/06-components/CPU").then(m => ({ default: m.CPU })));
const GPU = lazy(() => import("./sections/06-components/GPU").then(m => ({ default: m.GPU })));
const RAM = lazy(() => import("./sections/06-components/RAM").then(m => ({ default: m.RAM })));
const Storage = lazy(() => import("./sections/06-components/Storage").then(m => ({ default: m.Storage })));
const Motherboard = lazy(() => import("./sections/06-components/Motherboard").then(m => ({ default: m.Motherboard })));
const PSU = lazy(() => import("./sections/06-components/PSU").then(m => ({ default: m.PSU })));
const Case = lazy(() => import("./sections/06-components/Case").then(m => ({ default: m.Case })));
const Cooling = lazy(() => import("./sections/06-components/Cooling").then(m => ({ default: m.Cooling })));
const Fans = lazy(() => import("./sections/06-components/Fans").then(m => ({ default: m.Fans })));
const Planning = lazy(() => import("./sections/07-planning/Planning").then(m => ({ default: m.Planning })));
const BuildTools = lazy(() => import("./sections/08-build-tools/BuildTools").then(m => ({ default: m.BuildTools })));
const ThreadripperSection = lazy(() => import("./sections/06-components/ThreadRipper").then(m => ({ default: m.ThreadripperSection })));
const ServerSection = lazy(() => import("./sections/06-components/ServerSection").then(m => ({ default: m.ServerSection })));
const Troubleshooting = lazy(() => import("./sections/09-troubleshooting/Troubleshooting").then(m => ({ default: m.Troubleshooting })));
const QRCode = lazy(() => import("./sections/11-qrcode/QRCode").then(m => ({ default: m.QRCode })));
const QA = lazy(() => import("./sections/10-qa/QA").then(m => ({ default: m.QA })));
// const ComponentOverview = lazy(() => import("./sections/06-component-overview/ComponentOverview").then(m => ({ default: m.ComponentOverview })));

// ============ MAIN APP ============

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeScene, setActiveScene] = useState(null); // Track which 3D scene is active
  const [floatEnabled, setfloatEnabled] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define section order for index calculation
  const sections = useMemo(() => [
    'hero',
    'disclaimer',
    'next-event',
    'schedule',
    'market',
    'market-graph',
    'ai-bubble',
    'components',
    'planning',
    'case',
    'cpu',
    'motherboard',
    'ram',
    'storage',
    'gpu',
    'cooling',
    'fans',
    'psu',
    'build-tools',
    'threadripper',
    'servers',
    'qrcode',
    'qa'
  ], []);

  // Calculate numeric index of current section
  const activeIndex = sections.indexOf(activeSection);
  
  // Calculate current page number (1-indexed)
  const currentPage = activeIndex + 1;
  const totalPages = sections.length;

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    const onScroll = () => {
      if (!container) return;
      const scrollPosition = container.scrollTop + (window.innerHeight / 2);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          
          // Update active 3D scene
          if (section === 'components') {
            setActiveScene('components');
            setfloatEnabled(false);
          } else if (section === 'cpu') {
            setActiveScene('components');
            setfloatEnabled(true);
          } else if (section === 'market') {
            setActiveScene('market');
          } else {
            setActiveScene(null);
          }
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', onScroll);
      return () => container.removeEventListener('scroll', onScroll);
    }
  }, [sections]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const cn = (...classes) => classes.filter(Boolean).join(' ');

  // Helper to determine if a section should be rendered (current ±1)
  const shouldRenderSection = (sectionId) => {
    const sectionIndex = sections.indexOf(sectionId);
    return Math.abs(sectionIndex - activeIndex) <= 1;
  };

  return (
    <CanvasPoolContext.Provider value={{ activeScene, setActiveScene }}>
      <div id="scroll-container" className="bg-gray-7 w-screen h-screen overflow-x-hidden overflow-y-scroll font-sans text-gray-2 scroll-smooth snap-mandatory snap-y">
        
        {/* ============ CANVAS POOL - All 3D scenes stay mounted ============ */}
        <ComputerScene isActive={activeScene === 'components'} enableFloat={floatEnabled}/>
        <RAMShortages isActive={activeScene === 'market'} />
        {/* Add more scenes here: */}
        {/* <AnotherScene isActive={activeScene === 'another'} /> */}

        {/* Navigation - Always Loaded */}
        <nav className="top-0 right-0 left-0 z-50 fixed bg-corp-white/80 backdrop-blur-md border-gray-6 border-b">
          <div className="mx-auto px-6 py-3 max-w-7xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 font-bold text-gray-1 text-xl tracking-tight cursor-pointer" onClick={() => scrollTo('hero')}>
                <div className="flex justify-center items-center bg-corp-white shadow-sm rounded-md w-9 h-9 text-red-3">
                  <Cpu size={20} strokeWidth={2.5} />
                </div>
                <span>PCBuilder<span className="text-red-3"> 2026</span></span>
              </div>

              <div className="hidden md:flex space-x-1">
                {[
                  { id: 'disclaimer', label: 'Welcome' },
                  { id: 'next-event', label: 'Next Event' },
                  { id: 'schedule', label: 'Schedule' },
                  { id: 'market', label: 'Market' },
                  { id: 'components', label: 'Parts' },
                  { id: 'planning', label: 'Planning' },
                  { id: 'build-tools', label: 'Build' },
                  { id: 'qrcode', label: 'Resources' },
                  { id: 'qa', label: 'Q&A' }
                ].map((item) => (
                  <Button 
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    onClick={() => scrollTo(item.id)}
                    className={cn("text-gray-3", activeSection === item.id && "text-gray-1 font-semibold bg-gray-7")}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden top-full right-0 left-0 absolute space-y-2 bg-corp-white slide-in-from-top-2 shadow-xl p-4 border-gray-6 border-b animate-in">
              {[
                { id: 'disclaimer', label: 'Welcome' },
                { id: 'next-event', label: 'Next Event' },
                { id: 'schedule', label: 'Schedule' },
                { id: 'market', label: 'Market Reality' },
                { id: 'market-graph', label: 'Market Graph' },
                { id: 'ai-bubble', label: 'AI Bubble' },
                { id: 'components', label: 'Components' },
                { id: 'planning', label: 'Planning' },
                { id: 'case', label: 'Case' },
                { id: 'cpu', label: 'CPU' },
                { id: 'motherboard', label: 'Motherboard' },
                { id: 'ram', label: 'RAM' },
                { id: 'storage', label: 'Storage' },
                { id: 'gpu', label: 'GPU' },
                { id: 'cooling', label: 'Cooling' },
                { id: 'fans', label: 'Fans' },
                { id: 'psu', label: 'PSU' },
                { id: 'build-tools', label: 'Build Tools' },
                { id: 'threadripper', label: 'Threadripper' },
                { id: 'qrcode', label: 'Resources' },
                { id: 'qa', label: 'Q&A' }
              ].map((item) => (
                <Button key={item.id} variant={activeSection === item.id ? "secondary" : "ghost"} className="justify-start w-full" onClick={() => scrollTo(item.id)}>
                  {item.label}
                </Button>
              ))}
            </div>
          )}
        </nav>

        {/* Global Page Number - Updates based on active section */}
        <PageNumber current={currentPage} total={totalPages} />
        <DateLabel label="January 28, 2026" />
        <SectionLabel label="internal" />

        {/* Cursor marker: toggle with `m` or the on-screen button */}
        <CursorMarker toggleKey="m" buttonLabel="Marker (M)" />

        {/* ============ SECTIONS ============ */}
        {shouldRenderSection('hero') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Hero scrollTo={scrollTo} />
          </Suspense>
        ) : (
          <div id="hero" className="w-screen h-screen" />
        )}

        {shouldRenderSection('disclaimer') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Disclaimer />
          </Suspense>
        ) : (
          <div id="disclaimer" className="w-screen h-screen" />
        )}

        {shouldRenderSection('next-event') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <NextEvent />
          </Suspense>
        ) : (
          <div id="next-event" className="w-screen h-screen" />
        )}

        {shouldRenderSection('schedule') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Schedule />
          </Suspense>
        ) : (
          <div id="schedule" className="w-screen h-screen" />
        )}

        {shouldRenderSection('market') ? (
          <section id="market" className="relative h-screen snap-start pointer-events-auto">
            {/* The 3D content and UI are rendered by ComputerScene above */}
          </section>
        ) : (
          <div id="market" className="w-screen h-screen" />
        )}

        {shouldRenderSection('market-graph') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <MarketGraph />
          </Suspense>
        ) : (
          <div id="market-graph" className="w-screen h-screen" />
        )}

        {shouldRenderSection('ai-bubble') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <AIBubble />
          </Suspense>
        ) : (
          <div id="ai-bubble" className="w-screen h-screen" />
        )}

        {/* 3D Component Section - Just a placeholder div now, Canvas is in the pool */}
        {shouldRenderSection('components') ? (
          <section id="components" className="relative h-screen snap-start pointer-events-auto">
            <ComputerSceneUI/>
          </section>
        ) : (
          <div id="components" className="w-screen h-screen" />
        )}

        {shouldRenderSection('planning') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Planning />
          </Suspense>
        ) : (
          <div id="planning" className="w-screen h-screen" />
        )}

        {shouldRenderSection('case') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Case />
          </Suspense>
        ) : (
          <div id="case" className="w-screen h-screen" />
        )}

        {shouldRenderSection('cpu') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <CPU />
          </Suspense>
        ) : (
          <div id="cpu" className="w-screen h-screen" />
        )}

        {shouldRenderSection('motherboard') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Motherboard />
          </Suspense>
        ) : (
          <div id="motherboard" className="w-screen h-screen" />
        )}

        {shouldRenderSection('ram') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <RAM />
          </Suspense>
        ) : (
          <div id="ram" className="w-screen h-screen" />
        )}

        {shouldRenderSection('storage') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Storage />
          </Suspense>
        ) : (
          <div id="storage" className="w-screen h-screen" />
        )}

        {shouldRenderSection('gpu') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <GPU />
          </Suspense>
        ) : (
          <div id="gpu" className="w-screen h-screen" />
        )}

        {shouldRenderSection('cooling') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Cooling />
          </Suspense>
        ) : (
          <div id="cooling" className="w-screen h-screen" />
        )}

        {shouldRenderSection('fans') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Fans />
          </Suspense>
        ) : (
          <div id="fans" className="w-screen h-screen" />
        )}

        {shouldRenderSection('psu') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <PSU />
          </Suspense>
        ) : (
          <div id="psu" className="w-screen h-screen" />
        )}

        {shouldRenderSection('build-tools') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <BuildTools />
          </Suspense>
        ) : (
          <div id="build-tools" className="w-screen h-screen" />
        )}

        {shouldRenderSection('threadripper') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <ThreadripperSection />
          </Suspense>
        ) : (
          <div id="threadripper" className="w-screen h-screen" />
        )}

        {shouldRenderSection('servers') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <ServerSection />
          </Suspense>
        ) : (
          <div id="servers" className="w-screen h-screen" />
        )}

        {shouldRenderSection('qrcode') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <QRCode />
          </Suspense>
        ) : (
          <div id="qrcode" className="w-screen h-screen" />
        )}

        {shouldRenderSection('qa') ? (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <QA />
          </Suspense>
        ) : (
          <div id="qa" className="w-screen h-screen" />
        )}

        {/* TODO: Add remaining sections:
          - 07-planning-build
          - 08-build-tools
          - 09-first-boot
          - 10-troubleshooting
          - 11-qrcode
          - 12-qa
        */}

      </div>
    </CanvasPoolContext.Provider>
  );
}

export default App;