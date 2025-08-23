import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    });
    return () => unsub();
  }, []);

  const cancelOrder = async (id) => {
    const ref = doc(db, "orders", id);
    await updateDoc(ref, { status: "Cancelled" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Admin Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow bg-white">
              <p><strong>User:</strong> {order.userId}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Files:</strong></p>
              <ul className="list-disc list-inside">
                {order.files.map((file, idx) => (
                  <li key={idx}>{file.name} ({file.size})</li>
                ))}
              </ul>
              <p><strong>Cost:</strong> ₹{order.cost}</p>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
