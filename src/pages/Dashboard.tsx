import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data
const aumData = [
  { month: "Jan", value: 1000 },
  { month: "Feb", value: 1200 },
  { month: "Mar", value: 1400 },
  { month: "Apr", value: 1800 },
  { month: "May", value: 2200 },
  { month: "Jun", value: 2500 },
];

interface Transaction {
  id: string;
  date: string;
  investor: string;
  type: "Investment" | "Redemption" | "Distribution";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

const recentTransactions: Transaction[] = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    investor: "John Smith", 
    type: "Investment",
    amount: 50000,
    status: "Completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    investor: "Sarah Johnson",
    type: "Redemption", 
    amount: 25000,
    status: "Pending",
  },
  {
    id: "TXN-003",
    date: "2024-01-13",
    investor: "Michael Brown",
    type: "Distribution",
    amount: 15000,
    status: "Completed",
  },
  {
    id: "TXN-004", 
    date: "2024-01-12",
    investor: "Emily Davis",
    type: "Investment",
    amount: 75000,
    status: "Completed",
  },
  {
    id: "TXN-005",
    date: "2024-01-11", 
    investor: "David Wilson",
    type: "Redemption",
    amount: 30000,
    status: "Failed",
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
  },
  {
    accessorKey: "investor",
    header: "Investor",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const variants = {
        Investment: "bg-success/10 text-success hover:bg-success/20",
        Redemption: "bg-warning/10 text-warning hover:bg-warning/20", 
        Distribution: "bg-primary/10 text-primary hover:bg-primary/20",
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
      return (
        <span className="font-medium">
          ${amount.toLocaleString()}
        </span>
      );
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
      };
      return (
        <Badge variant="outline" className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your investments.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assets Under Management
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              $2.5M
            </div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +13.8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Investors
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              120
            </div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +7 new this month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Offers
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              8
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              2 closing this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AUM Growth Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">AUM Growth</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Assets under management over the last 6 months
              </p>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +150% YTD
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aumData}>
                <defs>
                  <linearGradient id="aumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs text-muted-foreground"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  className="text-xs text-muted-foreground"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-elegant)",
                  }}
                  formatter={(value) => [`$${value}K`, "AUM"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#aumGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Latest investment activities from your portfolio
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={transactionColumns}
            data={recentTransactions}
            title="Transactions"
            searchKey="investor"
          />
        </CardContent>
      </Card>
    </div>
  );
}