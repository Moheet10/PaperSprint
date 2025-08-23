import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setDisplayName(user.displayName || "");
    }
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      alert("✅ Profile updated!");
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Your Profile</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="p-2 bg-gray-100 rounded">{email}</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Display Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
      >
        Logout
      </button>
    </div>
  );
}
