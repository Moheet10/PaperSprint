import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setOrder(docSnap.data());
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">📄 Order Details</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Copies:</strong> {order.copies}</p>
        <p><strong>Color:</strong> {order.color}</p>
        <p><strong>Binding:</strong> {order.binding}</p>
        <p><strong>Location:</strong> {order.location}</p>
        <p><strong>Status:</strong> <span className="text-indigo-600 font-semibold">{order.status}</span></p>
        <p><strong>Total Cost:</strong> ₹{order.cost}</p>

        <div className="mt-4">
          <strong>Files:</strong>
          <ul className="list-disc ml-6 mt-2">
            {order.files.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {file.name} ({file.size})
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
