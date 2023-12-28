import { Outlet, useLocation } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import GoBack from "@/components/shared/GoBack";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col w-full">
      <Topbar />
      <div className="w-full h-full flex flex-row">
        <Leftsidebar />
        <section className="flex flex-1 h-full flex-col custom-scrollbar">
          {pathname !== "/" && <GoBack />}
          <Outlet />
        </section>
      </div>
      <Bottombar />
      <Toaster/>
    </div>
  );
};

export default RootLayout;
