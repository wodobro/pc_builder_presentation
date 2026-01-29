import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Oct \'25', price: 100 },
  { name: 'Nov \'25', price: 250 },
  { name: 'Dec \'25', price: 400 },
  { name: 'Jan \'26', price: 560 },
];

export const RAMSSDShortages = () => {
  return (
    <Card className="h-[60vh]">
      <CardHeader>
        <CardTitle>RAM & SSD Shortages</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Timeline of price increases for a popular RAM kit.</p>
        <div className="h-[40vh]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-red-4)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-red-4)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              />
              <Area type="monotone" dataKey="price" stroke="var(--color-red-4)" fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
