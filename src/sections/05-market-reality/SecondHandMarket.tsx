import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const secondHandData = [
    { part: 'PART_NAME_1', newPrice: 'PART_PRICE_1_NEW', usedPrice: 'PART_PRICE_1_USED' },
    { part: 'PART_NAME_2', newPrice: 'PART_PRICE_2_NEW', usedPrice: 'PART_PRICE_2_USED' },
    { part: 'PART_NAME_3', newPrice: 'PART_PRICE_3_NEW', usedPrice: 'PART_PRICE_3_USED' },
];

export const SecondHandMarket = () => {
  return (
    <Card className="h-[60vh]">
      <CardHeader>
        <CardTitle>Second-Hand Market</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Price comparison of new vs. second-hand components.</p>
        <div className="space-y-2">
            {secondHandData.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                    <span>{item.part}</span>
                    <div className="flex space-x-2">
                        <span className="text-muted-foreground line-through">{item.newPrice}</span>
                        <span className="font-semibold text-primary">{item.usedPrice}</span>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
