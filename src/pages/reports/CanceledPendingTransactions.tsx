import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

interface CanceledTransaction {
  id: string;
  originalDate: string;
  cancelDate: string;
  investor: string;
  offer: string;
  type: "Investment" | "Redemption" | "Distribution" | "Transfer";
  amount: number;
  reason: string;
  canceledBy: string;
  refundStatus: "Pending" | "Completed" | "Not Required";
}

const mockCanceledData: CanceledTransaction[] = [
  {
    id: "TXN-007",
    originalDate: "2024-01-10",
    cancelDate: "2024-01-12",
    investor: "Michael Brown",
    offer: "Healthcare Innovation Fund",
    type: "Investment",
    amount: 45000,
    reason: "Investor requested cancellation within cooling-off period",
    canceledBy: "investor",
    refundStatus: "Completed",
  },
  {
    id: "TXN-008",
    originalDate: "2024-01-08",
    cancelDate: "2024-01-10",
    investor: "Sarah Wilson",
    offer: "Green Energy Infrastructure",
    type: "Redemption",
    amount: 25000,
    reason: "Insufficient funds for processing",
    canceledBy: "system",
    refundStatus: "Not Required",
  },
  {
    id: "TXN-009",
    originalDate: "2024-01-05",
    cancelDate: "2024-01-07",
    investor: "David Johnson",
    offer: "Tech Growth Fund Series A",
    type: "Investment",
    amount: 75000,
    reason: "Failed KYC verification",
    canceledBy: "compliance",
    refundStatus: "Completed",
  },
  {
    id: "TXN-010",
    originalDate: "2024-01-03",
    cancelDate: "2024-01-05",
    investor: "Emma Davis",
    offer: "Real Estate Opportunity Fund",
    type: "Transfer",
    amount: 30000,
    reason: "Duplicate transaction detected",
    canceledBy: "system",
    refundStatus: "Pending",
  },
  {
    id: "TXN-011",
    originalDate: "2023-12-28",
    cancelDate: "2023-12-30",
    investor: "Robert Taylor",
    offer: "Emerging Markets Bond Fund",
    type: "Distribution",
    amount: 12000,
    reason: "Administrative error in calculation",
    canceledBy: "admin",
    refundStatus: "Completed",
  },
];

const canceledColumns: ColumnDef<CanceledTransaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "investor",
    header: "Investor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("investor")}</div>
    ),
  },
  {
    accessorKey: "offer",
    header: "Offer",
    cell: ({ row }) => (
      <div className="text-sm max-w-48 truncate">{row.getValue("offer")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const variants = {
        Investment: "bg-success/10 text-success",
        Redemption: "bg-warning/10 text-warning",
        Distribution: "bg-primary/10 text-primary",
        Transfer: "bg-muted text-muted-foreground",
      };
      return (
        <Badge variant="secondary" className={variants[type as keyof typeof variants]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return <span className="font-medium">${amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "originalDate",
    header: "Original Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("originalDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "cancelDate",
    header: "Cancel Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("cancelDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "canceledBy",
    header: "Canceled By",
    cell: ({ row }) => {
      const canceledBy = row.getValue("canceledBy") as string;
      const variants = {
        investor: "bg-primary/10 text-primary",
        system: "bg-accent/10 text-accent",
        compliance: "bg-warning/10 text-warning",
        admin: "bg-success/10 text-success",
      };
      return (
        <Badge variant="secondary" className={variants[canceledBy as keyof typeof variants]}>
          {canceledBy}
        </Badge>
      );
    },
  },
  {
    accessorKey: "refundStatus",
    header: "Refund Status",
    cell: ({ row }) => {
      const status = row.getValue("refundStatus") as string;
      const variants = {
        Pending: "bg-warning/10 text-warning",
        Completed: "bg-success/10 text-success",
        "Not Required": "bg-muted text-muted-foreground",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground max-w-64 truncate">
        {row.getValue("reason")}
      </div>
    ),
  },
];

export default function CanceledPendingTransactions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
              <X className="h-4 w-4 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Canceled Pending Transactions</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Review all canceled and failed transactions requiring attention.
          </p>
        </div>
        <Button variant="outline" className="shadow-card">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <DataTable
        columns={canceledColumns}
        data={mockCanceledData}
        title="Canceled Transactions"
        searchKey="investor"
      />
    </div>
  );
}