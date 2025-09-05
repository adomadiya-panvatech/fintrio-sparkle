import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download } from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  status: "Success" | "Failed" | "Warning";
}

const mockAuditData: AuditEntry[] = [
  {
    id: "AUD-001",
    timestamp: "2024-01-15 14:30:25",
    user: "admin@fintrio.com",
    action: "CREATE_OFFER",
    entity: "Offer",
    entityId: "OFF-001",
    details: "Created new offer: Tech Growth Fund Series A",
    ipAddress: "192.168.1.100",
    status: "Success",
  },
  {
    id: "AUD-002",
    timestamp: "2024-01-15 14:25:10",
    user: "john.smith@email.com",
    action: "UPDATE_PROFILE",
    entity: "Account",
    entityId: "ACC-001",
    details: "Updated investor profile information",
    ipAddress: "10.0.0.45",
    status: "Success",
  },
  {
    id: "AUD-003",
    timestamp: "2024-01-15 13:45:30",
    user: "sarah.johnson@email.com",
    action: "FAILED_LOGIN",
    entity: "Authentication",
    entityId: "AUTH-003",
    details: "Failed login attempt - invalid password",
    ipAddress: "172.16.1.20",
    status: "Failed",
  },
  {
    id: "AUD-004",
    timestamp: "2024-01-15 12:15:45",
    user: "admin@fintrio.com",
    action: "PROCESS_TRANSACTION",
    entity: "Transaction",
    entityId: "TXN-001",
    details: "Processed investment transaction for $50,000",
    ipAddress: "192.168.1.100",
    status: "Success",
  },
  {
    id: "AUD-005",
    timestamp: "2024-01-15 11:30:20",
    user: "system@fintrio.com",
    action: "AUTO_BACKUP",
    entity: "System",
    entityId: "SYS-001",
    details: "Automated database backup completed with warnings",
    ipAddress: "127.0.0.1",
    status: "Warning",
  },
];

const auditColumns: ColumnDef<AuditEntry>[] = [
  {
    accessorKey: "id",
    header: "Audit ID",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("timestamp")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("user")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-primary/10 text-primary">
        {row.getValue("action")}
      </Badge>
    ),
  },
  {
    accessorKey: "entity",
    header: "Entity",
  },
  {
    accessorKey: "entityId",
    header: "Entity ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("entityId")}</div>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="max-w-64 truncate text-muted-foreground">
        {row.getValue("details")}
      </div>
    ),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("ipAddress")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        Success: "bg-success/10 text-success",
        Failed: "bg-destructive/10 text-destructive",
        Warning: "bg-warning/10 text-warning",
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
];

export default function AuditReport() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileBarChart className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Audit Report</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Comprehensive audit trail of all system activities and user actions.
          </p>
        </div>
        <Button variant="outline" className="shadow-card">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <DataTable
        columns={auditColumns}
        data={mockAuditData}
        title="Audit Entries"
        searchKey="user"
      />
    </div>
  );
}