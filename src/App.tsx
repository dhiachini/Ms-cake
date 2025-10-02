import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./userpages/HomePage";
import WorkShops from "./userpages/WorkShops";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkshopDetails from "./userpages/WorkshopDetails";
import PastryWeekEnd from "./userpages/PastryWeekEnd";
import Dashboard from "./adminpages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshops" element={<WorkShops />} />
          <Route path="/workshop/:id" element={<WorkshopDetails />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
