import { FaPlus, FaHome, FaClipboardList, FaUsers, FaChartPie, FaEnvelope, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, active: true },
    { name: "Orders", icon: <FaClipboardList />, active: false },
    { name: "Customers", icon: <FaUsers />, active: false },
    { name: "Analytics", icon: <FaChartPie />, active: false },
    { name: "Messages", icon: <FaEnvelope />, active: false, badge: "3" },
    { name: "Settings", icon: <FaCog />, active: false },
  ];

  return (
    <div className="flex min-h-screen w-80 flex-col bg-gradient-to-b from-orange-50 to-pink-50 shadow-xl rounded-r-3xl border-r border-orange-100 transition-all duration-300">

      {/* Logo */}
      <div className="flex flex-col p-6 border-b border-orange-200">
        <span className="font-poppins text-[42px] text-gray-800 tracking-tight">
          Waroenk<span className="text-orange-500 drop-shadow-md">Ku</span>
        </span>
        <span className="font-medium text-orange-400 text-sm mt-1">
          ✨ Premium Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-6 px-4">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
          MAIN MENU
        </p>
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 font-medium transition-all duration-200 ${
                item.active
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.active && (
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4">
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 px-4 py-4 rounded-2xl shadow-xl mb-6 transition-all duration-300 hover:scale-[1.02]">
          <div className="text-white text-sm space-y-3">
            <span className="font-semibold">✨ Need help organizing your menus?</span>
            <div className="flex justify-between items-center p-2 bg-white/20 backdrop-blur-md rounded-xl cursor-pointer hover:bg-white/30 transition-all group">
              <div className="flex items-center space-x-2 text-white">
                <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Add New Menu</span>
              </div>
              <img
                src="https://avatar.iran.liara.run/public/50"
                className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="font-bold text-orange-400 text-sm">WaroenkKu Admin Dashboard</span>
          <p className="font-light text-gray-400 text-xs mt-1">
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

