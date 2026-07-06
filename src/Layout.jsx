import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Layout() {
  return (
    <div className="d-flex">
      <SideBar />

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
