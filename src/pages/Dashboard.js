import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "orders"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(userOrders);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} onClick={() => navigate(`/order/${order.id}`)} className="p-4 bg-white shadow rounded hover:bg-indigo-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="font-medium">{order.files?.map(f => f.name).join(", ")}</span>
                <span className={`text-sm px-2 py-1 rounded 
                  ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "En Route" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">Copies: {order.copies}, Color: {order.color}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
