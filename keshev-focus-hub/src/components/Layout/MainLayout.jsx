import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer"; 
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-16 px-4 min-h-[calc(100vh-80px-60px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
