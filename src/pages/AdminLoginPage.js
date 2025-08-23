import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (email === "admin@papersprint.com") {
        navigate("/admin");
      } else {
        setError("Not an admin account.");
      }
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <h1 className="text-2xl font-bold tracking-widest mb-6 text-gray-800">
        P A P E R S P R I N T
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-6"
        />

        <button
          onClick={handleAdminLogin}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>

        <div className="text-center mt-4 text-sm">
          Not registered?{" "}
          <Link to="/admin-signup" className="text-blue-600 hover:underline">
            Signup as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
