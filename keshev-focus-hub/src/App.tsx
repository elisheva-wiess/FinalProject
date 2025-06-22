import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { store } from "@/store/store";

import MainLayout from "@/components/Layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SpecializationsPage from "./components/SpecializationsPage";
import SpecializationDetailPage from "./components/SpecializationDetailPage";
import TherapistDetailPage from "./components/TherapistDetailPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import AdminArea from "./components/PersonalAreas/AdminArea";
import TherapistArea from "./components/PersonalAreas/TherapistArea";
import PatientArea from "./components/PersonalAreas/PatientArea";

import i18n from './i18n/i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {

  useEffect(() => {
    document.documentElement.dir = i18n.language === "he" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ToastContainer position="top-center" />
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="about" element={<About />} />
                <Route path="specializations" element={<SpecializationsPage />} />
                <Route path="specializations/:name" element={<SpecializationDetailPage />} />
                <Route path="therapists" element={<TherapistDetailPage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="articles" element={<Articles />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="/admin" element={<AdminArea />} />
                <Route path="/therapist" element={<TherapistArea />} />
                <Route path="/patient" element={<PatientArea />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
