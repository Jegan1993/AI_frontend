import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import DashBoard from "./DashBoard";

import PrivateRoute from "./ProtectedRoute/PrivateRoute";
import PublicRoute from "./ProtectedRoute/PublicRoute";

import Layout from "./Layout";

import Lead from "./Pages/Crm/Lead";
import CreateLead from "./Pages/Crm/CreateLead";
import EditLead from "./Pages/Crm/Editlead.jsx";

import ViewCustomer from "./Pages/Customer/ViewCustomer";
import EditCustomer from "./Pages/Customer/EditCustomer";
import ViewQuotation from "./Pages/Quotation/ViewQuoataion.jsx";
import EditQuoataion from "./Pages/Quotation/EditQuoataion.jsx";
import CreateQuoataion from "./Pages/Quotation/CreateQuoataion.jsx";
import ViewOrder from "./Pages/Order/ViewOrder.jsx";
import CreateOrder from "./Pages/Order/CreateOrder.jsx";
import EditOrder from "./Pages/Order/EditOrder.jsx";
import ViewShipment from "./Pages/Shipments/ViewShipment.jsx";
import CreateShipment from "./Pages/Shipments/CreateShipment.jsx";
import EditShipment from "./Pages/Shipments/EditShipment.jsx";
import RouteMonitoring from "./Pages/ RouteMonitoring/ RouteMonitoring.jsx";
import ViewWarehouse from "./Warehouse/ViewWarehouse.jsx";
import CreateWarehouse from "./Warehouse/CreateWarehouse.jsx";
import EditWarehouse from "./Warehouse/EditWarehouse.jsx";
import WarehouseDetails from "./Warehouse/WarehouseDetails.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/lead" element={<Lead />} />
            <Route path="/create-lead" element={<CreateLead />} />
            <Route path="/edit-lead/:id" element={<EditLead />} />
            <Route path="/get-customer" element={<ViewCustomer />} />
            <Route path="/edit-customer/:id" element={<EditCustomer />} />
            <Route path="/view-quotation" element={<ViewQuotation />} />
            <Route path="/edit-quotation/:id" element={<EditQuoataion />} />
            <Route path="/create-quotation" element={<CreateQuoataion />} />
            <Route path="/view-order" element={<ViewOrder />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
            <Route path="/view-shipment" element={<ViewShipment />} />
            <Route path="/create-shipment" element={<CreateShipment />} />
            <Route path="/edit-shipment/:id" element={<EditShipment />} />
            <Route path="/route-monitoring/:id" element={<RouteMonitoring />} />
            <Route path="/view-warehouse" element={<ViewWarehouse />} />
            <Route path="/create-warehouse" element={<CreateWarehouse />} />
            <Route path="/edit-warehouse/:id" element={<EditWarehouse />} />
            <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            <Route
              path="/warehouse-details/:id"
              element={<WarehouseDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
