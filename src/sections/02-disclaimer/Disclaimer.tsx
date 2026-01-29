import { SectionLabel } from "@/components/shared/SectionLabel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MessageSquare, User } from "lucide-react";

export function Disclaimer() {
  return (
    <section 
      id="disclaimer" 
      className="relative flex justify-center items-center bg-gray-7 px-6 w-full h-screen snap-start"
    >     
      <div className="space-y-6 w-full max-w-3xl">
        <h2 className="mb-12 font-bold text-gray-1 text-4xl md:text-5xl text-center">
          Welcome!
        </h2>
        
        <Card className="bg-corp-white border-gray-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-1">
              <Camera className="w-5 h-5 text-red-3" />
              Recording Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-3">
            <p>This session is being recorded.</p>
          </CardContent>
        </Card>

        <Card className="bg-corp-white border-gray-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-1">
              <MessageSquare className="w-5 h-5 text-red-3" />
              Questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-3">
            <p>Submit your questions via chat. 
            Questions will be handled at a suitable time during the presentation.</p>
          </CardContent>
        </Card>

        <Card className="bg-corp-white border-gray-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-1">
              <User className="w-5 h-5 text-red-3" />
              Today's Chat Moderator
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <span className="bg-[image:var(--grad-a)] bg-clip-text p-1 overflow-visible text-transparent text-xl">Stefan van Oss</span>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
