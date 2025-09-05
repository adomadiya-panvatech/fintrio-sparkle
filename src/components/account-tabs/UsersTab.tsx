import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockUsers = [
  {
    id: "USER-001",
    name: "Sarah Johnson",
    role: "Primary Account Holder",
    email: "sarah.johnson@email.com",
    status: "Active"
  },
  {
    id: "USER-002",
    name: "Michael Johnson",
    role: "Authorized User",
    email: "michael.johnson@email.com", 
    status: "Active"
  },
  {
    id: "USER-003",
    name: "Jennifer Smith",
    role: "Financial Advisor",
    email: "j.smith@advisors.com",
    status: "Active"
  }
];

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
];

export default function UsersTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Account Users</h3>
          <p className="text-sm text-muted-foreground">
            Users with access to this account
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <DataTable
        columns={columns}
        data={mockUsers}
        searchPlaceholder="Search users..."
        exportFilename="account_users"
      />
    </div>
  );
}