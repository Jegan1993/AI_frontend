import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="d-flex">
      <SideBar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
