import { useState, Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load tab components
const AccountTab = lazy(() => import("@/components/account-tabs/AccountTab"));
const AccreditationTab = lazy(() => import("@/components/account-tabs/AccreditationTab"));
const TransactionsTab = lazy(() => import("@/components/account-tabs/TransactionsTab"));
const DocumentsTab = lazy(() => import("@/components/account-tabs/DocumentsTab"));
const QATab = lazy(() => import("@/components/account-tabs/QATab"));
const KYCTab = lazy(() => import("@/components/account-tabs/KYCTab"));
const ReinvestmentTab = lazy(() => import("@/components/account-tabs/ReinvestmentTab"));
const AutoInvestTab = lazy(() => import("@/components/account-tabs/AutoInvestTab"));
const UsersTab = lazy(() => import("@/components/account-tabs/UsersTab"));
const PaymentMethodTab = lazy(() => import("@/components/account-tabs/PaymentMethodTab"));

// Mock account data
const mockAccount = {
  id: "ACC-001",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  idNumber: "123456789",
  accountType: "Individual",
  status: "Auto Approved",
  investedAmount: 150000,
  distributionAmount: 12500,
  avatar: "SJ"
};

const TabSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-64" />
  </div>
);

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Details</h1>
          <p className="text-muted-foreground">Manage account information and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Section - Left Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar and Basic Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    {mockAccount.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{mockAccount.name}</h2>
                  <p className="text-sm text-muted-foreground">{mockAccount.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <span className="text-sm font-medium">{mockAccount.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                    {mockAccount.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium truncate">{mockAccount.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium">{mockAccount.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ID Number</span>
                  <span className="text-sm font-medium">{mockAccount.idNumber}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-2xl font-bold text-primary">
                      ${mockAccount.investedAmount.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Distributions</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${mockAccount.distributionAmount.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600/60" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section - Right Column */}
        <div className="lg:col-span-8">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
                  <TabsTrigger value="account" className="text-xs px-2 py-2">Account</TabsTrigger>
                  <TabsTrigger value="accreditation" className="text-xs px-2 py-2">Accreditation</TabsTrigger>
                  <TabsTrigger value="transactions" className="text-xs px-2 py-2">Transactions</TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs px-2 py-2">Documents</TabsTrigger>
                  <TabsTrigger value="qa" className="text-xs px-2 py-2">Q & A</TabsTrigger>
                  <TabsTrigger value="kyc" className="text-xs px-2 py-2">KYC</TabsTrigger>
                  <TabsTrigger value="reinvestment" className="text-xs px-2 py-2">Reinvestment</TabsTrigger>
                  <TabsTrigger value="autoinvest" className="text-xs px-2 py-2">Auto Invest</TabsTrigger>
                  <TabsTrigger value="users" className="text-xs px-2 py-2">Users</TabsTrigger>
                  <TabsTrigger value="payment" className="text-xs px-2 py-2">Payment</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <Suspense fallback={<TabSkeleton />}>
                    <TabsContent value="account">
                      <AccountTab account={mockAccount} />
                    </TabsContent>
                    <TabsContent value="accreditation">
                      <AccreditationTab />
                    </TabsContent>
                    <TabsContent value="transactions">
                      <TransactionsTab accountId={id} />
                    </TabsContent>
                    <TabsContent value="documents">
                      <DocumentsTab />
                    </TabsContent>
                    <TabsContent value="qa">
                      <QATab />
                    </TabsContent>
                    <TabsContent value="kyc">
                      <KYCTab />
                    </TabsContent>
                    <TabsContent value="reinvestment">
                      <ReinvestmentTab />
                    </TabsContent>
                    <TabsContent value="autoinvest">
                      <AutoInvestTab />
                    </TabsContent>
                    <TabsContent value="users">
                      <UsersTab />
                    </TabsContent>
                    <TabsContent value="payment">
                      <PaymentMethodTab />
                    </TabsContent>
                  </Suspense>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}