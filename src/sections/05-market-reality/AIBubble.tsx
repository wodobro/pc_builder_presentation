import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SectionLabel } from '@/components/shared/SectionLabel';
import nvidiaImg from '@/assets/images/nvidia_stock.png';

export function AIBubble() {
  return (
    <section
      id="ai-bubble"
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
                The AI Gold Rush
              </h2>
              <Badge variant="outline" className="border-[var(--color-red-3)] text-[var(--color-red-3)] text-xs">
                Market Analysis
              </Badge>
            </div>
            <p className="max-w-3xl text-[var(--gray-3)] text-sm">
              NVIDIA's meteoric rise and the question: Is AI a bubble or the next computing revolution?
            </p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30" />

          {/* Image */}
          <div className="flex flex-1 justify-center items-center w-full min-h-0 align-middle">
            <div className="relative flex justify-center items-center shadow-2xl border-[var(--gray-5)] border-2 rounded-xl w-250 h-full overflow-hidden">
              <div className="flex justify-center items-center bg-white rounded-md w-full h-full overflow-hidden">
                <img
                  src={nvidiaImg}
                  alt="NVIDIA Stock Chart"
                  className="block max-w-full max-h-full object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-7)]/60 via-transparent to-transparent" />
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