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
  Menu,
  LogOut,
  UserCircle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [reportsOpen, setReportsOpen] = useState(currentPath.startsWith('/reports'));
  const [configOpen, setConfigOpen] = useState(currentPath.startsWith('/config'));

  const isActive = (path: string) => currentPath === path;
  const isInGroup = (items: typeof reportsItems) => 
    items.some(item => isActive(item.url));

  const getNavClassName = (active: boolean) => {
    const baseClasses = "w-full justify-start transition-all duration-300 ease-in-out group relative";
    
    if (active) {
      return `${baseClasses} bg-primary text-primary-foreground shadow-lg font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary-foreground`;
    }
    
    return `${baseClasses} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md`;
  };

  const getSubNavClassName = (active: boolean) => {
    if (active) {
      return "transition-smooth bg-primary/10 text-primary border-l-2 border-primary font-medium";
    }
    return "transition-smooth hover:bg-sidebar-accent";
  };

  const isCollapsed = state === "collapsed";

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Mobile Overlay */}
      {isMobile && state === "expanded" && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar 
        className={`
          ${className}
          border-r border-sidebar-border transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobile ? (state === "expanded" ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${isMobile ? "fixed left-0 top-0 bottom-0 z-50 shadow-2xl" : "relative"}
        `}
        collapsible="icon"
      >
        {/* Header */}
        <div className={`p-6 border-b border-sidebar-border ${isCollapsed ? "p-4" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold text-sidebar-foreground">Fintrio</h1>
                <p className="text-xs text-sidebar-foreground/60">Investment Dashboard</p>
              </div>
            )}
            {/* Mobile Close Button */}
            {isMobile && !isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="ml-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <SidebarContent className="px-4 py-6 space-y-6 flex-1">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClassName(isActive(item.url))}
                        onClick={isMobile ? toggleSidebar : undefined}
                      >
                        <item.icon className={`h-5 w-5 transition-all duration-200 group-hover:scale-110 ${isCollapsed ? "mx-auto" : ""}`} />
                        {!isCollapsed && (
                          <span className="transition-opacity duration-300 animate-fade-in">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Reports Section */}
          {!isCollapsed && (
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
                      <FileText className="h-5 w-5" />
                      <span>Reports</span>
                      <ChevronDown className={`h-4 w-4 ml-auto transition-transform duration-200 ${reportsOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="animate-accordion-down">
                  <SidebarMenuSub className="mt-2 space-y-1">
                    {reportsItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={getSubNavClassName(isActive(item.url))}
                            onClick={isMobile ? toggleSidebar : undefined}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          )}

          {/* Configuration Section */}
          {!isCollapsed && (
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
                      <Settings className="h-5 w-5" />
                      <span>Configuration</span>
                      <ChevronDown className={`h-4 w-4 ml-auto transition-transform duration-200 ${configOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="animate-accordion-down">
                  <SidebarMenuSub className="mt-2 space-y-1">
                    {configurationItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <NavLink 
                            to={item.url}
                            className={getSubNavClassName(isActive(item.url))}
                            onClick={isMobile ? toggleSidebar : undefined}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* Profile Section */}
        <div className="p-4 border-t border-sidebar-border">
          {isCollapsed ? (
            <div className="flex justify-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full p-2 h-auto justify-start hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-1 animate-fade-in">
                    <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                    <p className="text-xs text-sidebar-foreground/60">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="top"
                className="w-56 mb-2"
              >
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Sidebar>
    </>
  );
}