import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function KYCTab() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    idType: "passport",
    idNumber: "P123456789",
  });
  const [uploadedFile, setUploadedFile] = useState<string | null>("passport_copy.pdf");

  const handleFileUpload = () => {
    toast({
      title: "ID Document Uploaded",
      description: "Identity document has been uploaded successfully.",
    });
    setUploadedFile("new_id_document.pdf");
  };

  const handleSave = () => {
    toast({
      title: "KYC Updated",
      description: "KYC details have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="idType">ID Type</Label>
            <Select value={formData.idType} onValueChange={(value) => setFormData({ ...formData, idType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="ssn">Social Security Number</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Identity Document</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6">
            {uploadedFile ? (
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile}</p>
                  <p className="text-sm text-muted-foreground">Document uploaded successfully</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload identity document
                </p>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={handleFileUpload}
              className="mt-4 w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadedFile ? "Replace Document" : "Upload Document"}
            </Button>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}