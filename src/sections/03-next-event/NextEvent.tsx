import { useState, useEffect, useRef } from "react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function NextEvent() {
  const [boxAnimated, setBoxAnimated] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and trigger animations when section enters viewport
            setBoxAnimated(false);
            setShowNumber(false);
            setShowDetails(false);
            
            setTimeout(() => setBoxAnimated(true), 300);
            setTimeout(() => setShowNumber(true), 1000);
            setTimeout(() => setShowDetails(true), 1500);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="next-event" 
      className="relative flex justify-center items-center bg-[var(--gray-7)] px-6 w-full h-screen snap-start"
    >
      
      <div className="space-y-8 text-center">
        {/* Animated Date Box */}
        <div className="flex flex-col items-center gap-4">
          <div 
            className={`
              w-32 h-32 border-4 rounded-lg
              flex items-center justify-center
              transition-all duration-700 ease-out
              ${boxAnimated ? 'rotate-0 opacity-100 scale-100 border-red-3' : 'rotate-180 opacity-0 scale-50 border-transparent'}
            `}
          >
            <span 
              className={`
                text-7xl font-black text-red-3
                transition-all duration-500 delay-200
                ${showNumber ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
              `}
            >
              5
            </span>
          </div>
          
          {/* Month */}
          <h2 
            className={`
              text-3xl font-bold text-gray-2 uppercase tracking-wider
              transition-all duration-500
              ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            xxx 2026
          </h2>
        </div>

        {/* Event Details Card */}
        <div 
          className={`
            transition-all duration-700 delay-300
            ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <Card className="bg-[var(--corp-white)] mx-auto border-[var(--gray-6)] max-w-2xl">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-2 text-red-3">
                  <Calendar className="w-6 h-6" />
                  <span className="font-semibold text-sm uppercase tracking-wide">Next Event</span>
                </div>
                
                <h3 className="font-black text-gray-1 text-4xl md:text-5xl">
                  xxx 2026
                </h3>
                
                <p className="text-gray-3 text-lg">
                  Organized by <span className="font-semibold text-gray-1">redacted</span> and <span className="font-semibold text-gray-1">Redacted</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
