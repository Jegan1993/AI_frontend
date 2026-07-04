import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import DashBoard from "./DashBoard";

import PrivateRoute from "./ProtectedRoute/PrivateRoute.jsx";
import PublicRoute from "./ProtectedRoute/PublicRoute.jsx";
import Lead from "./Pages/Crm/Lead.jsx";
import CreateLead from "./Pages/Crm/CreateLead.jsx";
import Editlead from "./Pages/Crm/Editlead.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/create-lead" element={<CreateLead />} />
          <Route path="/edit-lead/:id" element={<Editlead />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
