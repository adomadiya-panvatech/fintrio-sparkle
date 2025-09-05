import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AccreditationTab() {
  const { toast } = useToast();
  const [isAccredited, setIsAccredited] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>("accreditation_document.pdf");

  const handleFileUpload = () => {
    toast({
      title: "File Uploaded",
      description: "Accreditation document has been uploaded successfully.",
    });
    setUploadedFile("new_accreditation_document.pdf");
  };

  const handleSave = () => {
    toast({
      title: "Accreditation Updated",
      description: "Accreditation status has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accreditation Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="accredited">Accredited Investor</Label>
            <p className="text-sm text-muted-foreground">
              Toggle to mark this investor as accredited
            </p>
          </div>
          <Switch
            id="accredited"
            checked={isAccredited}
            onCheckedChange={setIsAccredited}
          />
        </div>

        <div className="space-y-4">
          <Label>Accreditation Documentation</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6">
            {uploadedFile ? (
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile}</p>
                  <p className="text-sm text-muted-foreground">Uploaded successfully</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload accreditation documentation
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