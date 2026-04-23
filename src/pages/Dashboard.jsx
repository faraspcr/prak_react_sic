import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown, FaStar, FaClock } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const stats = [
    { title: "Total Orders", value: "128", icon: <FaShoppingCart />, color: "orange", change: "+15%", up: true, bg: "from-orange-100 to-orange-200" },
    { title: "Total Delivered", value: "98", icon: <FaTruck />, color: "teal", change: "+22%", up: true, bg: "from-teal-100 to-teal-200" },
    { title: "Total Canceled", value: "12", icon: <FaBan />, color: "pink", change: "-5%", up: false, bg: "from-pink-100 to-pink-200" },
    { title: "Total Revenue", value: "Rp. 3.2M", icon: <FaDollarSign />, color: "purple", change: "+28%", up: true, bg: "from-purple-100 to-purple-200" },
  ];

  const recentOrders = [
    { id: "#INV-001", customer: "Budi Santoso", items: "Nasi Goreng + Es Teh", total: "Rp. 45k", status: "Completed", rating: 5 },
    { id: "#INV-002", customer: "Siti Aminah", items: "Mie Ayam + Pangsit", total: "Rp. 32k", status: "Processing", rating: null },
    { id: "#INV-003", customer: "Rizky Febian", items: "Sate Ayam + Lontong", total: "Rp. 78k", status: "Delivered", rating: 4 },
    { id: "#INV-004", customer: "Dewi Kartika", items: "Es Campur + Pisang Goreng", total: "Rp. 25k", status: "Cancelled", rating: null },
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-600";
      case "Processing": return "bg-orange-100 text-orange-600";
      case "Delivered": return "bg-blue-100 text-blue-600";
      case "Cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-orange-100"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className={`bg-gradient-to-br ${stat.bg} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${stat.color}-500 text-2xl`}>{stat.icon}</div>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.up ? "text-green-500" : "text-red-500"}`}>
                  {stat.up ? <FaArrowUp /> : <FaArrowDown />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-pink-400 group-hover:h-1.5 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Popular Menu */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-300" />
            Quick Actions
          </h3>
          <p className="opacity-90 text-sm">What would you like to do today?</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-sm font-semibold hover:bg-white/30 transition-all">
              + New Order
            </button>
            <button className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-sm font-semibold hover:bg-white/30 transition-all">
              📊 View Report
            </button>
            <button className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-sm font-semibold hover:bg-white/30 transition-all">
              🍽️ Add Menu
            </button>
            <button className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-sm font-semibold hover:bg-white/30 transition-all">
              👥 Manage Staff
            </button>
          </div>
        </div>

        {/* Popular Menu */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            🔥 Popular Menu
            <FaClock className="text-orange-400 text-sm" />
          </h3>
          <div className="space-y-3">
            {[
              { name: "Nasi Goreng Special", orders: 234, percent: 45 },
              { name: "Mie Ayam Jamur", orders: 187, percent: 35 },
              { name: "Sate Ayam Madura", orders: 145, percent: 28 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-orange-500">{item.orders} orders</span>
                </div>
                <div className="bg-orange-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📋 Recent Orders
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Today</span>
          </h2>
          <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
              <tr>
                <th className="p-3 text-gray-600 text-sm">Order ID</th>
                <th className="p-3 text-gray-600 text-sm">Customer</th>
                <th className="p-3 text-gray-600 text-sm">Items</th>
                <th className="p-3 text-gray-600 text-sm">Total</th>
                <th className="p-3 text-gray-600 text-sm">Status</th>
                <th className="p-3 text-gray-600 text-sm">Rating</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-orange-50/50 transition-all duration-200">
                  <td className="p-3 font-medium text-gray-700">{order.id}</td>
                  <td className="p-3 text-gray-600">{order.customer}</td>
                  <td className="p-3 text-gray-500 text-sm">{order.items}</td>
                  <td className="p-3 font-semibold text-gray-700">{order.total}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {order.rating ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{order.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
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

