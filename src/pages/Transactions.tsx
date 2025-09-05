import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  investor: string;
  offer: string;
  type: "Investment" | "Redemption" | "Distribution" | "Transfer";
  amount: number;
  status: "Completed" | "Pending" | "Failed" | "Processing";
  method: "Wire Transfer" | "ACH" | "Check" | "Digital";
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    investor: "John Smith",
    offer: "Tech Growth Fund Series A",
    type: "Investment",
    amount: 50000,
    status: "Completed",
    method: "Wire Transfer",
    reference: "WT-2024-001",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    investor: "Sarah Johnson",
    offer: "Real Estate Opportunity Fund",
    type: "Redemption",
    amount: 25000,
    status: "Pending",
    method: "ACH",
    reference: "ACH-2024-002",
  },
  {
    id: "TXN-003",
    date: "2024-01-13",
    investor: "Michael Brown",
    offer: "Green Energy Infrastructure",
    type: "Distribution",
    amount: 15000,
    status: "Completed",
    method: "Wire Transfer",
    reference: "WT-2024-003",
  },
  {
    id: "TXN-004",
    date: "2024-01-12",
    investor: "Emily Davis",
    offer: "Healthcare Innovation Fund",
    type: "Investment",
    amount: 75000,
    status: "Processing",
    method: "Digital",
    reference: "DIG-2024-004",
  },
  {
    id: "TXN-005",
    date: "2024-01-11",
    investor: "David Wilson",
    offer: "Emerging Markets Bond Fund",
    type: "Transfer",
    amount: 30000,
    status: "Failed",
    method: "Check",
    reference: "CHK-2024-005",
  },
  {
    id: "TXN-006",
    date: "2024-01-10",
    investor: "Tech Innovations LLC",
    offer: "Tech Growth Fund Series A",
    type: "Investment",
    amount: 100000,
    status: "Completed",
    method: "Wire Transfer",
    reference: "WT-2024-006",
  },
];

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString();
    },
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
      <div className="text-sm text-muted-foreground max-w-48 truncate">
        {row.getValue("offer")}
      </div>
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Completed: "bg-success/10 text-success",
        Pending: "bg-warning/10 text-warning",
        Failed: "bg-destructive/10 text-destructive",
        Processing: "bg-primary/10 text-primary",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("method")}</div>
    ),
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <div className="text-sm font-mono text-muted-foreground">
        {row.getValue("reference")}
      </div>
    ),
  },
];

export default function Transactions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <ArrowUpDown className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Track and manage all financial transactions across your platform.
          </p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <DataTable
        columns={transactionColumns}
        data={mockTransactions}
        title="Transactions"
        searchKey="investor"
      />
    </div>
  );
}