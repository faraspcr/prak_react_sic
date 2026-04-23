import { FaHome, FaClipboardList, FaUsers, FaChartPie, FaEnvelope,FaCog,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, to: "/" },
    { name: "Orders", icon: <FaClipboardList />, to: "/orders" },
    { name: "Customers", icon: <FaUsers />, to: "/customers" },
    { name: "Analytics", icon: <FaChartPie />, to: "/analytics" },
    { name: "Messages", icon: <FaEnvelope />, badge: "3", to: "/messages" },
    { name: "Settings", icon: <FaCog />, to: "/settings" },
  ];

  
  const menuClass = ({ isActive }) =>
    `flex items-center space-x-3 cursor-pointer rounded-xl p-3 font-medium transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
        : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
    }`;

  return (
    <div className="flex min-h-screen w-80 flex-col bg-gradient-to-b from-orange-50 to-pink-50 shadow-xl rounded-r-3xl border-r border-orange-100">

      {/* Logo */}
      <div className="flex flex-col p-6 border-b border-orange-200">
        <span className="font-poppins text-[42px] text-gray-800 tracking-tight">
          Waroenk<span className="text-orange-500">Ku</span>
        </span>
        <span className="font-medium text-orange-400 text-sm mt-1">
          ✨ Premium Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-6 px-4">
        <p className="text-xs font-bold text-orange-400 uppercase mb-4">
          MAIN MENU
        </p>

        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink to={item.to} className={menuClass}>
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1">{item.name}</span>

                {item.badge && (
                  <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}