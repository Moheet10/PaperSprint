import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email === "admin@papersprint.com") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold tracking-widest mb-6 text-gray-800">
        P A P E R S P R I N T
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Signup
            </Link>
          </p>
          <p className="text-sm mt-2">
            Are you an admin?{" "}
            <Link to="/admin-login" className="text-blue-600 hover:underline font-medium">
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
