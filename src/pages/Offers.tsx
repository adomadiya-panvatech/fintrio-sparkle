import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Plus } from "lucide-react";

interface Offer {
  id: string;
  name: string;
  type: "Equity" | "Debt" | "Hybrid";
  targetAmount: number;
  raisedAmount: number;
  minimumInvestment: number;
  status: "Active" | "Closed" | "Draft";
  investors: number;
  closingDate: string;
}

const mockOffers: Offer[] = [
  {
    id: "OFF-001",
    name: "Tech Growth Fund Series A",
    type: "Equity",
    targetAmount: 5000000,
    raisedAmount: 3250000,
    minimumInvestment: 25000,
    status: "Active",
    investors: 45,
    closingDate: "2024-03-15",
  },
  {
    id: "OFF-002", 
    name: "Real Estate Opportunity Fund",
    type: "Debt",
    targetAmount: 10000000,
    raisedAmount: 8750000,
    minimumInvestment: 50000,
    status: "Active",
    investors: 67,
    closingDate: "2024-02-28",
  },
  {
    id: "OFF-003",
    name: "Green Energy Infrastructure",
    type: "Hybrid",
    targetAmount: 15000000,
    raisedAmount: 15000000,
    minimumInvestment: 100000,
    status: "Closed",
    investors: 89,
    closingDate: "2024-01-20",
  },
  {
    id: "OFF-004",
    name: "Healthcare Innovation Fund",
    type: "Equity", 
    targetAmount: 7500000,
    raisedAmount: 2100000,
    minimumInvestment: 30000,
    status: "Active",
    investors: 28,
    closingDate: "2024-04-10",
  },
  {
    id: "OFF-005",
    name: "Emerging Markets Bond Fund",
    type: "Debt",
    targetAmount: 20000000,
    raisedAmount: 0,
    minimumInvestment: 75000,
    status: "Draft",
    investors: 0,
    closingDate: "2024-05-01",
  },
];

const offerColumns: ColumnDef<Offer>[] = [
  {
    accessorKey: "id",
    header: "Offer ID",
  },
  {
    accessorKey: "name",
    header: "Offer Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const variants = {
        Equity: "bg-primary/10 text-primary",
        Debt: "bg-success/10 text-success",
        Hybrid: "bg-warning/10 text-warning",
      };
      return (
        <Badge variant="secondary" className={variants[type as keyof typeof variants]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Target Amount",
    cell: ({ row }) => {
      const amount = row.getValue("targetAmount") as number;
      return <span className="font-medium">${amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "raisedAmount", 
    header: "Raised Amount",
    cell: ({ row }) => {
      const raised = row.getValue("raisedAmount") as number;
      const target = row.original.targetAmount;
      const percentage = Math.round((raised / target) * 100);
      return (
        <div className="space-y-1">
          <span className="font-medium">${raised.toLocaleString()}</span>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{percentage}% of target</span>
        </div>
      );
    },
  },
  {
    accessorKey: "minimumInvestment",
    header: "Min Investment",
    cell: ({ row }) => {
      const amount = row.getValue("minimumInvestment") as number;
      return <span className="font-medium">${amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Active: "bg-success/10 text-success",
        Closed: "bg-muted text-muted-foreground",
        Draft: "bg-warning/10 text-warning",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
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
    accessorKey: "closingDate",
    header: "Closing Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("closingDate"));
      return date.toLocaleDateString();
    },
  },
];

export default function Offers() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Offers</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage and track all investment opportunities and offerings.
          </p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      <DataTable
        columns={offerColumns}
        data={mockOffers}
        title="Offers"
        searchKey="name"
      />
    </div>
  );
}