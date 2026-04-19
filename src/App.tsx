import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import AccountDashboard from "./pages/AccountDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BundleTiersPage from "./pages/BundleTiersPage";
import BundleCatalog from "./pages/BundleCatalog";
import BundleLanding from "./pages/BundleLanding";
import MyAgents from "./pages/MyAgents";
import BundleQuiz from "./pages/BundleQuiz";
import ThankYou from "./pages/ThankYou";
import LibraryAccess from "./pages/LibraryAccess";
import FunnelLanding from "./pages/FunnelLanding";
import ResumePage from "./pages/ResumePage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CalveraNextStep from "./pages/CalveraNextStep";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/bundles" element={<BundleTiersPage />} />
          <Route path="/bundles/catalog" element={<BundleCatalog />} />
          <Route path="/bundles/:slug" element={<BundleLanding />} />
          <Route path="/quiz" element={<BundleQuiz />} />
          <Route path="/quiz/:slug" element={<BundleQuiz />} />
          <Route path="/my-agents" element={<MyAgents />} />
          <Route path="/account" element={<AccountDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/thank-you/:slug" element={<ThankYou />} />
          <Route path="/library/access/:token" element={<LibraryAccess />} />
          <Route path="/library/:token" element={<LibraryAccess />} />
          <Route path="/funnel/:slug" element={<FunnelLanding />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/calvera-next-step" element={<CalveraNextStep />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
