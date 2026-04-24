import { useState } from "react";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customersData";
import { FaUserPlus, FaTimes, FaSave, FaCrown, FaMedal, FaStar } from "react-icons/fa";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loyalty: "Bronze"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Customer:", formData);
    alert("Customer added successfully!");
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", loyalty: "Bronze" });
  };

  const getLoyaltyIcon = (loyalty) => {
    switch (loyalty) {
      case "Gold": return <FaCrown className="text-yellow-500 text-sm" />;
      case "Silver": return <FaMedal className="text-gray-400 text-sm" />;
      case "Bronze": return <FaStar className="text-orange-500 text-sm" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <PageHeader title="Customers" breadcrumb={["Home", "Customers"]}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <FaUserPlus />
          {showForm ? "Cancel" : "Add Customer"}
        </button>
      </PageHeader>

      {/* FORM ADD CUSTOMER */}
      {showForm && (
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl shadow-xl border border-orange-200 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <FaUserPlus className="text-orange-500" />
              Add New Customer
            </h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                required
              />
              <select
                value={formData.loyalty}
                onChange={(e) => setFormData({...formData, loyalty: e.target.value})}
                className="border border-orange-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
              >
                <option value="Bronze">🥉 Bronze</option>
                <option value="Silver">🥈 Silver</option>
                <option value="Gold">🥇 Gold</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaSave />
              Save Customer
            </button>
          </form>
        </div>
      )}

      {/* TABLE CUSTOMERS */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-pink-100 text-gray-700 text-sm">
                <th className="p-4 text-left font-semibold">Customer ID</th>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Phone</th>
                <th className="p-4 text-left font-semibold">Loyalty</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((c, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-orange-50 transition-all duration-200">
                  <td className="p-4 font-medium text-gray-800">{c.id}</td>
                  <td className="p-4 font-medium text-gray-700">{c.name}</td>
                  <td className="p-4 text-gray-500">{c.email}</td>
                  <td className="p-4 text-gray-500">{c.phone}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      ${c.loyalty === "Gold" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : ""}
                      ${c.loyalty === "Silver" ? "bg-gray-100 text-gray-600 border border-gray-200" : ""}
                      ${c.loyalty === "Bronze" ? "bg-orange-100 text-orange-600 border border-orange-200" : ""}
                    `}>
                      {getLoyaltyIcon(c.loyalty)}
                      {c.loyalty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}