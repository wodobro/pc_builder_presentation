import { SectionLabel } from "@/components/shared/SectionLabel";
import devCgiLogo from "@/assets/images/devcgi.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  scrollTo: (id: string) => void;
}

export function Hero({ scrollTo }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative flex justify-center items-center bg-gradient-to-br from-gray-7 to-gray-8 w-full h-screen snap-start"
    >
      
      <div className="space-y-8 text-center">
        <img 
          src={devCgiLogo} 
          alt="Dev@CGI" 
          className="mx-auto mb-12 w-auto h-32"
        />
        
        <div className="space-y-4">
          <h1 className="overflow-visible font-black text-gray-1 text-5xl md:text-8xl leading-tight tracking-tighter">
            BUILDING A PC <br/> 
            <span className="bg-[image:var(--grad-a)] bg-clip-text p-1 overflow-visible text-transparent">IN 2026</span>
          </h1>
          
          <p className="mx-auto max-w-2xl font-light text-gray-4 text-xl md:text-2xl leading-relaxed">
            From market realities to server racks. A comprehensive guide for first-time builders and upgraders in the modern hardware era.
          </p>
        </div>

        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => scrollTo('disclaimer')}
            className="shadow-lg hover:shadow-xl px-8 h-14 text-lg transition-all hover:translate-y-[-2px] duration-300"
          >
            Start the Session
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
