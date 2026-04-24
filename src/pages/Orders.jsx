import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/ordersData";
import { FaPlus, FaTimes, FaSave, FaBoxOpen, FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    status: "Pending",
    total: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Order:", formData);
    alert("Order added successfully!");
    setShowForm(false);
    setFormData({ customer: "", status: "Pending", total: "", date: "" });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <FaCheckCircle className="text-green-500" />;
      case "Pending": return <FaSpinner className="text-blue-500 animate-spin" />;
      case "Cancelled": return <FaTimesCircle className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <PageHeader title="Orders" breadcrumb={["Home", "Orders"]}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <FaPlus />
          {showForm ? "Cancel" : "Add Order"}
        </button>
      </PageHeader>

      {/* FORM ADD ORDER */}
      {showForm && (
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl shadow-xl border border-orange-200 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <FaBoxOpen className="text-orange-500" />
              Add New Order
            </h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Completed">✅ Completed</option>
                <option value="Cancelled">❌ Cancelled</option>
              </select>
              <input
                type="text"
                placeholder="Total Price (e.g., 450000)"
                value={formData.total}
                onChange={(e) => setFormData({...formData, total: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaSave />
              Save Order
            </button>
          </form>
        </div>
      )}

      {/* TABLE ORDERS */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-pink-100 text-gray-700 text-sm">
                <th className="p-4 text-left font-semibold">Order ID</th>
                <th className="p-4 text-left font-semibold">Customer</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Total Price</th>
                <th className="p-4 text-left font-semibold">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((o, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-orange-50 transition-all duration-200">
                  <td className="p-4 font-medium text-gray-800">{o.id}</td>
                  <td className="p-4 font-medium text-gray-700">{o.customer}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      ${o.status === "Completed" ? "bg-green-100 text-green-700 border border-green-200" : ""}
                      ${o.status === "Pending" ? "bg-blue-100 text-blue-600 border border-blue-200" : ""}
                      ${o.status === "Cancelled" ? "bg-red-100 text-red-600 border border-red-200" : ""}
                    `}>
                      {getStatusIcon(o.status)}
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    Rp {parseInt(o.total.replace(/\D/g, "")).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 text-gray-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}