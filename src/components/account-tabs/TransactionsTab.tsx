import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";

interface TransactionsTabProps {
  accountId?: string;
}

const mockTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    type: "Investment",
    amount: 50000,
    status: "Completed",
    description: "Initial Investment - Series A"
  },
  {
    id: "TXN-002", 
    date: "2024-02-20",
    type: "Distribution",
    amount: 2500,
    status: "Completed",
    description: "Quarterly Distribution Q1 2024"
  },
  {
    id: "TXN-003",
    date: "2024-03-10",
    type: "Investment",
    amount: 75000,
    status: "Pending",
    description: "Additional Investment - Series B"
  },
  {
    id: "TXN-004",
    date: "2024-03-25",
    type: "Redemption",
    amount: 25000,
    status: "Processing",
    description: "Partial Redemption Request"
  }
];

const columns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status") as string;
      const variant = status === "Completed" ? "default" : 
                    status === "Pending" ? "secondary" : "outline";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export default function TransactionsTab({ accountId }: TransactionsTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Account Transactions</h3>
        <p className="text-sm text-muted-foreground">
          All transactions for this account
        </p>
      </div>
      <DataTable
        columns={columns}
        data={mockTransactions}
        searchPlaceholder="Search transactions..."
        exportFilename={`account_${accountId}_transactions`}
      />
    </div>
  );
}