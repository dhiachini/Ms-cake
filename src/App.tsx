import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./userpages/HomePage";
import WorkShops from "./userpages/WorkShops";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkshopDetails from "./userpages/WorkshopDetails";
import PastryWeekEnd from "./userpages/PastryWeekEnd";
import Dashboard from "./adminpages/Dashboard";
import WorkshopEdit from "./adminpages/EditAtelier";
import PastryEdit from "./adminpages/PastryEdit";
import AddPastry from "./adminpages/AddPastry";
import AddAtelier from "./adminpages/AddAtelier";
import WorkshopDetailsReserve from "./userpages/WorkshopDetailsReserve";
import ReservationsTable from "./components/tables/ReservationsTable";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshops" element={<WorkShops />} />
          <Route path="/workshop/:id" element={<WorkshopDetails />} />
          <Route
            path="/workshopreserve/:id"
            element={<WorkshopDetailsReserve />}
          />
          <Route path="/pastryweekend" element={<PastryWeekEnd />} />
          {/* Example admin route: */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workshop/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <WorkshopEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pastry/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <PastryEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addpastry"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddPastry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addworkshop"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddAtelier />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
