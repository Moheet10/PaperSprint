import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import Dashboard from "./pages/Dashboard";
import HelpPage from "./pages/HelpPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  return (
    <Router>
      <Routes>

        {/* 🚀 Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 👤 User Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
``
        {/* 🛠 Admin Auth */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-signup" element={<AdminSignupPage />} />

        <Route path="/admin" element={<AdminDashboard />} />


        {/* 🧑‍💻 User Pages with Navbar */}
        <Route path="/place-order" element={<Navbar><PlaceOrderPage /></Navbar>} />
        <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />
        <Route path="/home" element={<Navbar><HomePage /></Navbar>} />
        <Route path="/help" element={<Navbar><HelpPage /></Navbar>} />
        <Route path="/profile" element={<Navbar><ProfilePage /></Navbar>} />
        <Route path="/order/:id" element={<Navbar><OrderDetailsPage /></Navbar>} />

        {/* ✅ Order Confirmation (no navbar) */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

      </Routes>
    </Router>
  );
}

export default App;
