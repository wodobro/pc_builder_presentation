import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { CheckCircle2 } from 'lucide-react';
import ifixitImg from '@/assets/images/ifixit.jpg';

export function BuildTools() {
  const requiredItems = [
    'Phillips Head Screwdriver (#2)',
    'Anti-Static Wrist Strap',
    'Isopropyl Alcohol (90%+)',
    'Cable Ties / Velcro Straps',
    'USB Drive (8GB+ for Windows)',
    'Hdmi & DisplayPort Cables',
    'periferal Devices (Keyboard, Mouse)',
    'display Monitor',
  ];

  return (
    <section
      id="build-tools"
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
                Build Tools
              </h2>
              <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
                Assembly Kit
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              Everything you need to safely assemble your PC build
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Content */}
          <div className="flex flex-1 items-center gap-10 min-h-0">
            {/* Left - Large Image */}
            <div className="flex-1 h-full">
              <div className="relative flex justify-center items-center bg-white shadow-2xl border-[var(--gray-5)] border-2 rounded-xl w-full h-full overflow-hidden">
                  <div className="flex justify-center items-center rounded-md w-full h-full overflow-hidden">
                  <img
                    src={ifixitImg}
                    alt="iFixit Toolkit"
                       className="block max-w-full max-h-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right - Required Items List */}
            <div className="flex flex-col flex-1 justify-center">
              <h3 className="mb-6 font-bold text-[var(--gray-1)] text-3xl">Required Items</h3>
              <div className="space-y-3">
                {requiredItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[var(--gray-6)]/50 hover:bg-[var(--gray-6)]/70 backdrop-blur-sm p-4 border border-[var(--gray-5)] hover:border-[var(--color-purple-4)] rounded-lg transition-all duration-200"
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                      animation: 'fadeIn 0.5s ease-out',
                    }}
                  >
                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-[var(--color-purple-3)]" />
                    <span className="text-[var(--gray-2)] text-lg">{item}</span>
                  </div>
                ))}
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
      `}</style>
    </section>
  );
}