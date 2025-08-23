import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Navbar({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/place-order" className="text-indigo-600 font-semibold hover:underline">Place Order</Link>
          <Link to="/dashboard" className="text-indigo-600 font-semibold hover:underline">Orders</Link>
          <Link to="/help" className="text-indigo-600 font-semibold hover:underline">Help</Link>
        </div>

        {/* 👤 Profile icon as a link */}
        <Link to="/profile">
          <UserCircle className="w-7 h-7 text-indigo-500 hover:text-indigo-700" />
        </Link>
      </nav>

      {/* Render page content below navbar */}
      <main className="p-4">{children}</main>
    </div>
  );
}
