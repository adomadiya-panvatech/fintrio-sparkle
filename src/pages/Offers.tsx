import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Plus, Filter, Home, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
  image: string;
  offeringSize: string;
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
    image: "/placeholder.svg",
    offeringSize: "$5.0M",
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
    image: "/placeholder.svg",
    offeringSize: "$10.0M",
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
    image: "/placeholder.svg",
    offeringSize: "$15.0M",
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
    image: "/placeholder.svg",
    offeringSize: "$7.5M",
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
    image: "/placeholder.svg",
    offeringSize: "$20.0M",
  },
  {
    id: "OFF-006",
    name: "Fintech Startup Portfolio",
    type: "Equity",
    targetAmount: 8000000,
    raisedAmount: 4800000,
    minimumInvestment: 40000,
    status: "Active",
    investors: 62,
    closingDate: "2024-04-25",
    image: "/placeholder.svg",
    offeringSize: "$8.0M",
  },
];

export default function Offers() {
  const [selectedOffer, setSelectedOffer] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-success/10 text-success border-success/20",
      Closed: "bg-muted text-muted-foreground border-muted",
      Draft: "bg-warning/10 text-warning border-warning/20",
    };
    return variants[status as keyof typeof variants] || variants.Active;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      Equity: "bg-primary/10 text-primary border-primary/20",
      Debt: "bg-success/10 text-success border-success/20",
      Hybrid: "bg-warning/10 text-warning border-warning/20",
    };
    return variants[type as keyof typeof variants] || variants.Equity;
  };

  const filteredOffers = mockOffers.filter(offer => {
    const matchesOffer = selectedOffer === "all" || offer.name.toLowerCase().includes(selectedOffer.toLowerCase());
    const matchesStatus = selectedStatus === "all" || offer.status === selectedStatus;
    return matchesOffer && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Offers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
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
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedOffer} onValueChange={setSelectedOffer}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Select Offer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offers</SelectItem>
              {mockOffers.map((offer) => (
                <SelectItem key={offer.id} value={offer.name}>
                  {offer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Apply
          </Button>
          <Button className="bg-primary text-primary-foreground shadow-elegant hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Offer
          </Button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredOffers.map((offer) => (
          <Card key={offer.id} className="group hover:shadow-float transition-all duration-300 border-border/50 hover:border-primary/20">
            {/* Header */}
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {offer.name}
                </h3>
                <Badge variant="outline" className={getStatusBadge(offer.status)}>
                  {offer.status}
                </Badge>
              </div>
            </CardHeader>

            {/* Banner Image */}
            <div className="px-6 pb-4">
              <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-border/50 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary/40" />
              </div>
            </div>

            {/* Content */}
            <CardContent className="space-y-4">
              {/* Title and Type */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getTypeBadge(offer.type)}>
                    {offer.type}
                  </Badge>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min Amount</span>
                  <span className="font-medium">${offer.minimumInvestment.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Funding End</span>
                  <span className="font-medium">{formatDate(offer.closingDate)}</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-success">
                    {offer.offeringSize}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Offering Size
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {Math.round((offer.raisedAmount / offer.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((offer.raisedAmount / offer.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${offer.raisedAmount.toLocaleString()} raised of ${offer.targetAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="pt-4">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                variant="default"
              >
                View Offer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No offers found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or create a new offer.
          </p>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create New Offer
          </Button>
        </div>
      )}
    </div>
  );
}