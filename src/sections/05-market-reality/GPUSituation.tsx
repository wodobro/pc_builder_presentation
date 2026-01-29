import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GPUSituation = () => {
  return (
    <Card className="h-[60vh]">
      <CardHeader>
        <CardTitle>GPU Situation & NVIDIA</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">NVIDIA's stock performance impacting GPU prices.</p>
        <div className="flex justify-center items-center bg-muted rounded-md h-[40vh]">
          <p className="text-muted-foreground">NVIDIA Stock Graph Placeholder</p>
        </div>
      </CardContent>
    </Card>
  );
};
