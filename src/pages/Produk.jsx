import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaBox } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import productsData from "../data/productsData.js";

export default function Produk() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProduk(productsData);
  }, []);

  const filtered = produk.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <PageHeader title="Products" breadcrumb={["Home", "Products"]}>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange-200 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white/80 w-64"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
        </div>
      </PageHeader>

      {/* TABLE PRODUCTS - SAMA PERSIS DENGAN CUSTOMERS */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-pink-100 text-gray-700 text-sm">
                <th className="p-4 text-left font-semibold">ID</th>
                <th className="p-4 text-left font-semibold">Title</th>
                <th className="p-4 text-left font-semibold">Code</th>
                <th className="p-4 text-left font-semibold">Category</th>
                <th className="p-4 text-left font-semibold">Brand</th>
                <th className="p-4 text-left font-semibold">Price</th>
                <th className="p-4 text-left font-semibold">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-orange-50 transition-all duration-200">
                  <td className="p-4 font-medium text-gray-800">{item.id}</td>
                  <td className="p-4 font-medium text-gray-700">
                    <Link 
                      to={`/products/${item.id}`} 
                      className="text-emerald-400 hover:text-emerald-600 font-semibold transition-colors"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500">{item.code}</td>
                  <td className="p-4 text-gray-500">{item.category}</td>
                  <td className="p-4 text-gray-500">{item.brand}</td>
                  <td className="p-4 text-pink-500 font-semibold">Rp {item.price.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      ${item.stock > 50 ? "bg-green-100 text-green-700 border border-green-200" : ""}
                      ${item.stock > 20 && item.stock <= 50 ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : ""}
                      ${item.stock <= 20 ? "bg-red-100 text-red-700 border border-red-200" : ""}
                    `}>
                      <FaBox className="text-xs" />
                      {item.stock}
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