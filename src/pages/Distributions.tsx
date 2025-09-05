import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";

interface Distribution {
  id: string;
  date: string;
  offer: string;
  totalAmount: number;
  perShare: number;
  investors: number;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  paymentDate: string;
  type: "Dividend" | "Interest" | "Capital Return" | "Profit Share";
}

const mockDistributions: Distribution[] = [
  {
    id: "DIST-001",
    date: "2024-01-15",
    offer: "Tech Growth Fund Series A",
    totalAmount: 125000,
    perShare: 2.50,
    investors: 45,
    status: "Completed",
    paymentDate: "2024-01-20",
    type: "Dividend",
  },
  {
    id: "DIST-002",
    date: "2024-01-10",
    offer: "Real Estate Opportunity Fund",
    totalAmount: 200000,
    perShare: 4.00,
    investors: 67,
    status: "In Progress",
    paymentDate: "2024-01-25",
    type: "Interest",
  },
  {
    id: "DIST-003",
    date: "2024-01-05",
    offer: "Green Energy Infrastructure",
    totalAmount: 350000,
    perShare: 3.75,
    investors: 89,
    status: "Scheduled",
    paymentDate: "2024-02-01",
    type: "Profit Share",
  },
  {
    id: "DIST-004",
    date: "2023-12-20",
    offer: "Healthcare Innovation Fund",
    totalAmount: 75000,
    perShare: 1.50,
    investors: 28,
    status: "Cancelled",
    paymentDate: "2024-01-05",
    type: "Dividend",
  },
  {
    id: "DIST-005",
    date: "2023-12-15",
    offer: "Emerging Markets Bond Fund",
    totalAmount: 180000,
    perShare: 2.25,
    investors: 42,
    status: "Completed",
    paymentDate: "2023-12-31",
    type: "Capital Return",
  },
];

const distributionColumns: ColumnDef<Distribution>[] = [
  {
    accessorKey: "id",
    header: "Distribution ID",
  },
  {
    accessorKey: "offer",
    header: "Offer",
    cell: ({ row }) => (
      <div className="font-medium max-w-48 truncate">{row.getValue("offer")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const variants = {
        Dividend: "bg-success/10 text-success",
        Interest: "bg-primary/10 text-primary",
        "Capital Return": "bg-warning/10 text-warning",
        "Profit Share": "bg-accent/10 text-accent",
      };
      return (
        <Badge variant="secondary" className={variants[type as keyof typeof variants]}>
          {type}
        </Badge>
      );
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
    accessorKey: "perShare",
    header: "Per Share",
    cell: ({ row }) => {
      const amount = row.getValue("perShare") as number;
      return <span className="font-medium">${amount.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "investors",
    header: "Investors",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("investors")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Scheduled: "bg-muted text-muted-foreground",
        "In Progress": "bg-primary/10 text-primary",
        Completed: "bg-success/10 text-success",
        Cancelled: "bg-destructive/10 text-destructive",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Declaration Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("paymentDate"));
      return date.toLocaleDateString();
    },
  },
];

export default function Distributions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Distributions</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage profit distributions and payments to investors.
          </p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Distribution
        </Button>
      </div>

      <DataTable
        columns={distributionColumns}
        data={mockDistributions}
        title="Distributions"
        searchKey="offer"
      />
    </div>
  );
}