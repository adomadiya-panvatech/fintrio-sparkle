import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Plus } from "lucide-react";

interface Account {
  id: string;
  name: string;
  email: string;
  type: "Individual" | "Entity" | "Trust";
  totalInvestment: number;
  status: "Active" | "Pending" | "Suspended";
  joinDate: string;
  country: string;
  kycStatus: "Verified" | "Pending" | "Rejected";
}

const mockAccounts: Account[] = [
  {
    id: "ACC-001",
    name: "John Smith",
    email: "john.smith@email.com",
    type: "Individual",
    totalInvestment: 250000,
    status: "Active",
    joinDate: "2023-08-15",
    country: "United States",
    kycStatus: "Verified",
  },
  {
    id: "ACC-002",
    name: "Tech Innovations LLC",
    email: "contact@techinnovations.com",
    type: "Entity",
    totalInvestment: 500000,
    status: "Active",
    joinDate: "2023-09-20",
    country: "Canada",
    kycStatus: "Verified",
  },
  {
    id: "ACC-003",
    name: "Smith Family Trust",
    email: "trustee@smithfamily.com",
    type: "Trust",
    totalInvestment: 750000,
    status: "Active",
    joinDate: "2023-07-10",
    country: "United Kingdom",
    kycStatus: "Verified",
  },
  {
    id: "ACC-004",
    name: "Emily Johnson",
    email: "emily.johnson@email.com",
    type: "Individual",
    totalInvestment: 150000,
    status: "Pending",
    joinDate: "2024-01-05",
    country: "Australia",
    kycStatus: "Pending",
  },
  {
    id: "ACC-005",
    name: "Global Ventures Inc",
    email: "info@globalventures.com",
    type: "Entity",
    totalInvestment: 0,
    status: "Suspended",
    joinDate: "2023-12-01",
    country: "Singapore",
    kycStatus: "Rejected",
  },
];

const accountColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "id",
    header: "Account ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const variants = {
        Individual: "bg-primary/10 text-primary",
        Entity: "bg-success/10 text-success",
        Trust: "bg-warning/10 text-warning",
      };
      return (
        <Badge variant="secondary" className={variants[type as keyof typeof variants]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalInvestment",
    header: "Total Investment",
    cell: ({ row }) => {
      const amount = row.getValue("totalInvestment") as number;
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
        Pending: "bg-warning/10 text-warning",
        Suspended: "bg-destructive/10 text-destructive",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "kycStatus",
    header: "KYC Status",
    cell: ({ row }) => {
      const status = row.getValue("kycStatus") as string;
      const variants = {
        Verified: "bg-success/10 text-success",
        Pending: "bg-warning/10 text-warning",
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
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"));
      return date.toLocaleDateString();
    },
  },
];

export default function Accounts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage investor accounts and their verification status.
          </p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <DataTable
        columns={accountColumns}
        data={mockAccounts}
        title="Accounts"
        searchKey="name"
      />
    </div>
  );
}