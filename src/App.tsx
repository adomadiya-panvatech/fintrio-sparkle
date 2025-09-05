import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Offers from "./pages/Offers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Distributions from "./pages/Distributions";
import Redemptions from "./pages/Redemptions";
import AccountDetails from "./pages/AccountDetails";

// Reports
import AuditReport from "./pages/reports/AuditReport";
import KYCReport from "./pages/reports/KYCReport";
import CanceledPendingTransactions from "./pages/reports/CanceledPendingTransactions";

// Configuration
import FormCategory from "./pages/config/FormCategory";
import FormType from "./pages/config/FormType";
import FormLibrary from "./pages/config/FormLibrary";
import EsignDocument from "./pages/config/EsignDocument";
import PaymentDetails from "./pages/config/PaymentDetails";
import EmailTemplate from "./pages/config/EmailTemplate";
import SMSTemplate from "./pages/config/SMSTemplate";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/distributions" element={<Distributions />} />
            <Route path="/redemptions" element={<Redemptions />} />
            <Route path="/account/:id" element={<AccountDetails />} />
            
            {/* Reports */}
            <Route path="/reports/audit" element={<AuditReport />} />
            <Route path="/reports/kyc" element={<KYCReport />} />
            <Route path="/reports/canceled-pending" element={<CanceledPendingTransactions />} />
            
            {/* Configuration */}
            <Route path="/config/form-category" element={<FormCategory />} />
            <Route path="/config/form-type" element={<FormType />} />
            <Route path="/config/form-library" element={<FormLibrary />} />
            <Route path="/config/esign-document" element={<EsignDocument />} />
            <Route path="/config/payment-details" element={<PaymentDetails />} />
            <Route path="/config/email-template" element={<EmailTemplate />} />
            <Route path="/config/sms-template" element={<SMSTemplate />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
