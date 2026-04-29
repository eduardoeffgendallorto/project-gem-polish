import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IPhones from "./pages/IPhones.tsx";
import Seminovos from "./pages/Seminovos.tsx";
import IPads from "./pages/IPads.tsx";
import Macs from "./pages/Macs.tsx";
import Produto from "./pages/Produto.tsx";
import Carrinho from "./pages/Carrinho.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/iphones" element={<IPhones />} />
          <Route path="/seminovos" element={<Seminovos />} />
          <Route path="/ipads" element={<IPads />} />
          <Route path="/macs" element={<Macs />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
