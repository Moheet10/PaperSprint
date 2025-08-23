import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/place-order"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <div className="text-green-500 text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-green-600 mb-2">Your Order Has Been Placed</h1>
      <p className="text-gray-600">Hang tight! We're getting your print ready...</p>
      <div className="mt-6">
        <p className="text-sm text-gray-400">Redirecting to home page in a few seconds...</p>
      </div>
    </div>
  );
}
