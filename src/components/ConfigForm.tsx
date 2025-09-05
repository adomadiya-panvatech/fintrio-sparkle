import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

interface ConfigFormProps {
  title: string;
  description: string;
  fields: FormField[];
  onBack?: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "switch" | "number" | "email";
  placeholder?: string;
  options?: string[];
  defaultValue?: string | boolean | number;
  required?: boolean;
}

export function ConfigForm({ title, description, fields, onBack }: ConfigFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach(field => {
      initial[field.name] = field.defaultValue ?? "";
    });
    return initial;
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Configuration Saved",
        description: `${title} has been updated successfully.`,
      });
    }, 500);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="min-h-24"
          />
        );

      case "select":
        return (
          <Select value={value} onValueChange={(v) => handleInputChange(field.name, v)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={field.name}
              checked={value}
              onCheckedChange={(checked) => handleInputChange(field.name, checked)}
            />
            <Label htmlFor={field.name} className="text-sm text-muted-foreground">
              {field.placeholder}
            </Label>
          </div>
        );

      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
      </div>

      <Card className="max-w-2xl shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Configuration Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="shadow-elegant">
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
              <Button type="button" variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}