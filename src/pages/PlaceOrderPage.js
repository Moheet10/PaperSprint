import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function PlaceOrderPage() {
  const [files, setFiles] = useState([]);
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("B&W");
  const [binding, setBinding] = useState("None");
  const [location, setLocation] = useState("Fetching...");
  const [cost, setCost] = useState(0);
  const navigate = useNavigate();

  // 📍 Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`);
      },
      () => setLocation("Location access denied")
    );
  }, []);

  // 💰 Cost calculation
  useEffect(() => {
    const rate = color === "Color" ? 2 : 1;
    const bindingCost = binding === "Spiral" ? 10 : binding === "Stapled" ? 5 : 0;
    setCost(copies * rate * files.length + bindingCost);
  }, [copies, color, binding, files]);

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one file.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Login required.");
      navigate("/login");
      return;
    }

    try {
      const uploadedFileDetails = [];

      for (const file of files) {
        const fileRef = ref(storage, `orders/${user.uid}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        uploadedFileDetails.push({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          url: downloadURL
        });
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        files: uploadedFileDetails,
        copies,
        color,
        binding,
        location,
        status: "Printing",
        cost,
        createdAt: serverTimestamp()
      });

      navigate("/order-confirmation");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🖨 Place Print Order</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Upload Documents</label>
          <input type="file" multiple onChange={handleFileChange} className="w-full border p-2 rounded mt-1" />
          <ul className="text-sm mt-3 space-y-1 text-gray-800">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
                <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="text-sm font-medium">Number of Copies</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            min="1"
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Color Option</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="B&W">Black & White</option>
            <option value="Color">Color</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Binding</label>
          <select
            value={binding}
            onChange={(e) => setBinding(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="None">None</option>
            <option value="Stapled">Stapled</option>
            <option value="Spiral">Spiral</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">📍 {location}</div>
      </div>

      <div className="flex justify-between font-medium text-lg border-t pt-4">
        <span>Total</span>
        <span>₹{cost}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
      >
        ✅ PLACE ORDER
      </button>
    </div>
  );
}
