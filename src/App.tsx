import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkShops from "./pages/WorkShops";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkshopDetails from "./pages/WorkshopDetails";
import PastryWeekEnd from "./pages/PastryWeekEnd";

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
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Interface</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
