import { SectionLabel } from "@/components/shared/SectionLabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function Schedule() {
  const topics = [
    { id: 1, title: "Market Reality", description: "Current state of PC hardware market and pricing" },
    { id: 2, title: "Component Overview", description: "A quick overview of the components within the PC" },
    { id: 3, title: "Planning Your Build", description: "Budget considerations and compatibility checks" },
    { id: 4, title: "Component Deep Dive", description: "We will cover all computer parts u will need one by one" },
    { id: 5, title: "Workstations", description: "What if u have too much money too spare" },
    { id: 6, title: "Servers", description: "A quick look into how we can apply what we have learned on home servers" },
    { id: 7, title: "Next Time ? Build Session ?", description: "Let us know!" },
    { id: 8, title: "Q&A Session", description: "Your questions answered" }
  ];

  return (
    <section 
      id="schedule" 
      className="relative flex justify-center items-center bg-gradient-to-br from-gray-7 to-gray-8 px-6 w-full h-screen snap-start"
    >
      
      <div className="w-full max-w-4xl">
        <h2 className="mb-12 font-bold text-gray-1 text-4xl md:text-5xl text-center">
          What We're Covering Today
        </h2>
        
        <div className="gap-4 grid md:grid-cols-2">
          {topics.map((topic, index) => (
            <Card 
              key={topic.id} 
              className="bg-corp-white/95 hover:shadow-lg border-gray-6 hover:border-red-3 transition-all duration-300"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start gap-3 text-gray-1">
                  <span className="inline-flex justify-center items-center bg-red-3 mt-0.5 rounded-full w-6 h-6 font-semibold text-white text-sm">{index + 1}</span>
                  <span className="text-lg">{topic.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="ml-9 text-gray-3 text-sm">
                  {topic.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
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
