import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockDocuments = [
  {
    id: "DOC-001",
    name: "Investment Agreement.pdf",
    type: "Investment Agreement",
    uploadDate: "2024-01-15",
    size: "2.4 MB"
  },
  {
    id: "DOC-002",
    name: "KYC_Documentation.pdf", 
    type: "KYC Documents",
    uploadDate: "2024-01-10",
    size: "1.8 MB"
  },
  {
    id: "DOC-003",
    name: "Accreditation_Letter.pdf",
    type: "Accreditation",
    uploadDate: "2024-01-08",
    size: "950 KB"
  },
  {
    id: "DOC-004",
    name: "Bank_Statements.pdf",
    type: "Financial Documents",
    uploadDate: "2024-01-05",
    size: "3.2 MB"
  }
];

export default function DocumentsTab() {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Document upload initiated...",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Documents</h3>
          <p className="text-sm text-muted-foreground">
            All uploaded documents for this account
          </p>
        </div>
        <Button onClick={handleUpload} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4">
        {mockDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(doc.name)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}