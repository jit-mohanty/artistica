import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Photography from "./pages/Photography";
import Paintings from "./pages/Paintings";
import DigitalArt from "./pages/DigitalArt";
import Sculptures from "./pages/Sculptures";
import Prints from "./pages/Prints";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/digital-art" element={<DigitalArt />} />
          <Route path="/sculptures" element={<Sculptures />} />
          <Route path="/prints" element={<Prints />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;