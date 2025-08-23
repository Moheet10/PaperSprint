import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">PaperSprint</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Get your documents printed and delivered in minutes.
        </p>
        <button
          onClick={() => navigate("/place-order")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          📄 Place Your Order
        </button>
      </div>
    </div>
  );
}
