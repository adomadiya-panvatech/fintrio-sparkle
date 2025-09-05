import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Download } from "lucide-react";

interface KYCEntry {
  id: string;
  investor: string;
  email: string;
  submissionDate: string;
  reviewDate: string;
  status: "Pending" | "Under Review" | "Approved" | "Rejected" | "Requires Update";
  reviewer: string;
  documentType: string;
  riskLevel: "Low" | "Medium" | "High";
  notes: string;
}

const mockKYCData: KYCEntry[] = [
  {
    id: "KYC-001",
    investor: "John Smith",
    email: "john.smith@email.com",
    submissionDate: "2024-01-10",
    reviewDate: "2024-01-12",
    status: "Approved",
    reviewer: "compliance@fintrio.com",
    documentType: "Government ID + Proof of Address",
    riskLevel: "Low",
    notes: "All documents verified successfully",
  },
  {
    id: "KYC-002",
    investor: "Tech Innovations LLC",
    email: "contact@techinnovations.com",
    submissionDate: "2024-01-08",
    reviewDate: "2024-01-11",
    status: "Under Review",
    reviewer: "compliance@fintrio.com",
    documentType: "Corporate Documents + Beneficial Ownership",
    riskLevel: "Medium",
    notes: "Waiting for additional beneficial ownership documentation",
  },
  {
    id: "KYC-003",
    investor: "Emily Johnson",
    email: "emily.johnson@email.com",
    submissionDate: "2024-01-05",
    reviewDate: "",
    status: "Pending",
    reviewer: "",
    documentType: "Government ID",
    riskLevel: "Low",
    notes: "Initial submission received, awaiting review",
  },
  {
    id: "KYC-004",
    investor: "Global Ventures Inc",
    email: "info@globalventures.com",
    submissionDate: "2023-12-20",
    reviewDate: "2023-12-25",
    status: "Rejected",
    reviewer: "compliance@fintrio.com",
    documentType: "Corporate Documents",
    riskLevel: "High",
    notes: "Incomplete documentation, high-risk jurisdiction",
  },
  {
    id: "KYC-005",
    investor: "Smith Family Trust",
    email: "trustee@smithfamily.com",
    submissionDate: "2024-01-12",
    reviewDate: "2024-01-14",
    status: "Requires Update",
    reviewer: "compliance@fintrio.com",
    documentType: "Trust Documents + Trustee ID",
    riskLevel: "Medium",
    notes: "Trust deed requires updated signatures",
  },
];

const kycColumns: ColumnDef<KYCEntry>[] = [
  {
    accessorKey: "id",
    header: "KYC ID",
  },
  {
    accessorKey: "investor",
    header: "Investor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("investor")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Pending: "bg-warning/10 text-warning",
        "Under Review": "bg-primary/10 text-primary",
        Approved: "bg-success/10 text-success",
        Rejected: "bg-destructive/10 text-destructive",
        "Requires Update": "bg-accent/10 text-accent",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const risk = row.getValue("riskLevel") as string;
      const variants = {
        Low: "bg-success/10 text-success",
        Medium: "bg-warning/10 text-warning",
        High: "bg-destructive/10 text-destructive",
      };
      return (
        <Badge variant="secondary" className={variants[risk as keyof typeof variants]}>
          {risk}
        </Badge>
      );
    },
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
    cell: ({ row }) => (
      <div className="text-sm max-w-48 truncate">{row.getValue("documentType")}</div>
    ),
  },
  {
    accessorKey: "submissionDate",
    header: "Submission Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submissionDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "reviewDate",
    header: "Review Date",
    cell: ({ row }) => {
      const date = row.getValue("reviewDate") as string;
      return date ? new Date(date).toLocaleDateString() : "Pending";
    },
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("reviewer") || "Unassigned"}</div>
    ),
  },
];

export default function KYCReport() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">KYC Report</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Track and manage Know Your Customer compliance and verification status.
          </p>
        </div>
        <Button variant="outline" className="shadow-card">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <DataTable
        columns={kycColumns}
        data={mockKYCData}
        title="KYC Entries"
        searchKey="investor"
      />
    </div>
  );
}