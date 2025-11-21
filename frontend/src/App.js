import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import AdminStoresPage from "./pages/AdminStoresPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminAddUserPage from "./pages/AdminAddUserPage";
import AdminAddStorePage from "./pages/AdminAddStorePage";
import AdminUserDetailsPage from "./pages/AdminUserDetailsPage";
import LandingPage from "./pages/LandingPage";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/stores" element={<AdminStoresPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/add-user" element={<AdminAddUserPage />} />
        <Route path="/admin/add-store" element={<AdminAddStorePage />} />
        <Route path="/admin/users/:id" element={<AdminUserDetailsPage />} />
        <Route path="/" element={<LandingPage />} />
        {/* ROLE DASHBOARDS */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
