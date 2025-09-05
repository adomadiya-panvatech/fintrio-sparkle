import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpDown,
  ChevronDown,
  Settings,
  Target,
  User,
  DollarSign,
  Receipt,
  FileBarChart,
  Shield,
  X,
  Mail,
  MessageSquare,
  BookOpen,
  FormInput,
  Archive,
  Signature,
  WalletCards,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Offers",
    url: "/offers",
    icon: Target,
  },
  {
    title: "Accounts",
    url: "/accounts", 
    icon: User,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowUpDown,
  },
  {
    title: "Distributions",
    url: "/distributions",
    icon: DollarSign,
  },
  {
    title: "Redemptions",
    url: "/redemptions",
    icon: Receipt,
  }
];

const reportsItems = [
  {
    title: "Audit Report",
    url: "/reports/audit",
    icon: FileBarChart,
  },
  {
    title: "KYC Report", 
    url: "/reports/kyc",
    icon: Shield,
  },
  {
    title: "Canceled Pending Transactions",
    url: "/reports/canceled-pending",
    icon: X,
  },
];

const configurationItems = [
  {
    title: "Form Category",
    url: "/config/form-category",
    icon: BookOpen,
  },
  {
    title: "Form Type",
    url: "/config/form-type", 
    icon: FormInput,
  },
  {
    title: "Form Library",
    url: "/config/form-library",
    icon: Archive,
  },
  {
    title: "Esign Document",
    url: "/config/esign-document",
    icon: Signature,
  },
  {
    title: "Payment Details",
    url: "/config/payment-details",
    icon: WalletCards,
  },
  {
    title: "Email Template",
    url: "/config/email-template",
    icon: Mail,
  },
  {
    title: "SMS Template", 
    url: "/config/sms-template",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [reportsOpen, setReportsOpen] = useState(currentPath.startsWith('/reports'));
  const [configOpen, setConfigOpen] = useState(currentPath.startsWith('/config'));

  const isActive = (path: string) => currentPath === path;
  const isInGroup = (items: typeof reportsItems) => 
    items.some(item => isActive(item.url));

  const getNavClassName = (active: boolean) =>
    `w-full justify-start transition-all duration-300 ease-in-out group ${
      active
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
    }`;

  return (
    <Sidebar 
      className={`border-r border-sidebar-border transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Fintrio</h1>
              <p className="text-xs text-sidebar-foreground/60">Investment Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-4 space-y-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(isActive(item.url))}>
                      <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      {state !== "collapsed" && (
                        <span className="transition-opacity duration-300">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <>
            <SidebarGroup>
              <Collapsible open={reportsOpen} onOpenChange={setReportsOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={`w-full transition-smooth ${
                        isInGroup(reportsItems) || reportsOpen
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                      <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${reportsOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {reportsItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={`transition-smooth ${
                              isActive(item.url)
                                ? "bg-primary/10 text-primary border-l-2 border-primary"
                                : "hover:bg-sidebar-accent"
                            }`}
                          >
                            <item.icon className="h-3 w-3" />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            <SidebarGroup>
              <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={`w-full transition-smooth ${
                        isInGroup(configurationItems) || configOpen
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Configuration</span>
                      <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${configOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {configurationItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink 
                            to={item.url}
                            className={`transition-smooth ${
                              isActive(item.url)
                                ? "bg-primary/10 text-primary border-l-2 border-primary"
                                : "hover:bg-sidebar-accent"
                            }`}
                          >
                            <item.icon className="h-3 w-3" />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}