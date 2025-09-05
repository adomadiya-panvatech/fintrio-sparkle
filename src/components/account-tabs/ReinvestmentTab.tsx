import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function ReinvestmentTab() {
  const { toast } = useToast();
  const [autoReinvest, setAutoReinvest] = useState(true);
  const [reinvestmentPercentage, setReinvestmentPercentage] = useState(75);

  const handleSave = () => {
    toast({
      title: "Reinvestment Settings Updated",
      description: "Distribution reinvestment preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reinvestment Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="autoReinvest">Automatic Reinvestment</Label>
            <p className="text-sm text-muted-foreground">
              Automatically reinvest a portion of distributions
            </p>
          </div>
          <Switch
            id="autoReinvest"
            checked={autoReinvest}
            onCheckedChange={setAutoReinvest}
          />
        </div>

        {autoReinvest && (
          <div className="space-y-2">
            <Label htmlFor="percentage">Reinvestment Percentage</Label>
            <div className="flex items-center gap-2">
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                value={reinvestmentPercentage}
                onChange={(e) => setReinvestmentPercentage(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {reinvestmentPercentage}% of distributions will be automatically reinvested, 
              {100 - reinvestmentPercentage}% will be paid out.
            </p>
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Current Settings Summary</h4>
          <div className="space-y-1 text-sm">
            <p>Status: {autoReinvest ? "Enabled" : "Disabled"}</p>
            {autoReinvest && (
              <>
                <p>Reinvestment: {reinvestmentPercentage}%</p>
                <p>Cash Distribution: {100 - reinvestmentPercentage}%</p>
              </>
            )}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}