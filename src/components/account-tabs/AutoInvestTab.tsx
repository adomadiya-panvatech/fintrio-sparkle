import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const mockOffers = [
  { id: "OFFER-001", name: "Tech Growth Fund Series A", type: "Equity" },
  { id: "OFFER-002", name: "Real Estate Income Fund", type: "Real Estate" },
  { id: "OFFER-003", name: "Green Energy Investment", type: "Infrastructure" },
  { id: "OFFER-004", name: "Healthcare Innovation Fund", type: "Healthcare" },
];

export default function AutoInvestTab() {
  const { toast } = useToast();
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);

  const handleOfferToggle = (offerId: string) => {
    setSelectedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const handleSave = () => {
    toast({
      title: "Auto Investment Updated",
      description: "Auto investment preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto Investment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="autoInvest">Enable Auto Investment</Label>
            <p className="text-sm text-muted-foreground">
              Automatically invest in selected offers when they become available
            </p>
          </div>
          <Switch
            id="autoInvest"
            checked={autoInvestEnabled}
            onCheckedChange={setAutoInvestEnabled}
          />
        </div>

        {autoInvestEnabled && (
          <div className="space-y-4">
            <div>
              <Label>Select Offers for Auto Investment</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Choose which offers to automatically invest in
              </p>
            </div>

            <div className="space-y-3">
              {mockOffers.map((offer) => (
                <div key={offer.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={offer.id}
                    checked={selectedOffers.includes(offer.id)}
                    onCheckedChange={() => handleOfferToggle(offer.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={offer.id} className="font-medium cursor-pointer">
                      {offer.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{offer.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedOffers.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Auto Investment Summary</h4>
                <p className="text-sm text-muted-foreground">
                  Auto investment enabled for {selectedOffers.length} offer(s)
                </p>
              </div>
            )}
          </div>
        )}

        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}