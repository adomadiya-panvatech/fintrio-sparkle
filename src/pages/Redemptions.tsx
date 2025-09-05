import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, Plus } from "lucide-react";

interface Redemption {
  id: string;
  date: string;
  investor: string;
  offer: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  status: "Pending" | "Approved" | "Processing" | "Completed" | "Rejected";
  requestDate: string;
  reason: string;
}

const mockRedemptions: Redemption[] = [
  {
    id: "RED-001",
    date: "2024-01-15",
    investor: "John Smith",
    offer: "Tech Growth Fund Series A",
    shares: 1000,
    pricePerShare: 25.00,
    totalAmount: 25000,
    status: "Completed",
    requestDate: "2024-01-10",
    reason: "Portfolio Rebalancing",
  },
  {
    id: "RED-002",
    date: "2024-01-14",
    investor: "Sarah Johnson",
    offer: "Real Estate Opportunity Fund",
    shares: 500,
    pricePerShare: 50.00,
    totalAmount: 25000,
    status: "Processing",
    requestDate: "2024-01-12",
    reason: "Liquidity Needs",
  },
  {
    id: "RED-003",
    date: "2024-01-13",
    investor: "Michael Brown",
    offer: "Healthcare Innovation Fund",
    shares: 750,
    pricePerShare: 20.00,
    totalAmount: 15000,
    status: "Approved",
    requestDate: "2024-01-08",
    reason: "Emergency Expenses",
  },
  {
    id: "RED-004",
    date: "2024-01-12",
    investor: "Emily Davis",
    offer: "Green Energy Infrastructure",
    shares: 300,
    pricePerShare: 100.00,
    totalAmount: 30000,
    status: "Pending",
    requestDate: "2024-01-11",
    reason: "Investment Opportunity",
  },
  {
    id: "RED-005",
    date: "2024-01-11",
    investor: "David Wilson",
    offer: "Emerging Markets Bond Fund",
    shares: 2000,
    pricePerShare: 15.00,
    totalAmount: 30000,
    status: "Rejected",
    requestDate: "2024-01-09",
    reason: "Lock-up Period Active",
  },
];

const redemptionColumns: ColumnDef<Redemption>[] = [
  {
    accessorKey: "id",
    header: "Redemption ID",
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
    accessorKey: "shares",
    header: "Shares",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("shares")}</span>
    ),
  },
  {
    accessorKey: "pricePerShare",
    header: "Price/Share",
    cell: ({ row }) => {
      const price = row.getValue("pricePerShare") as number;
      return <span className="font-medium">${price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return <span className="font-medium">${amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Pending: "bg-warning/10 text-warning",
        Approved: "bg-primary/10 text-primary",
        Processing: "bg-accent/10 text-accent",
        Completed: "bg-success/10 text-success",
        Rejected: "bg-destructive/10 text-destructive",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground max-w-32 truncate">
        {row.getValue("reason")}
      </div>
    ),
  },
];

export default function Redemptions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Redemptions</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Process and manage investor redemption requests.
          </p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Process Redemption
        </Button>
      </div>

      <DataTable
        columns={redemptionColumns}
        data={mockRedemptions}
        title="Redemptions"
        searchKey="investor"
      />
    </div>
  );
}