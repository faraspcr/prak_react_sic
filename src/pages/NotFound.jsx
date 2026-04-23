import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white border border-orange-100 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-orange-100 to-pink-200 p-4 rounded-xl">
            <FaExclamationTriangle className="text-orange-500 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">404</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Halaman yang kamu cari tidak ditemukan.
        </p>

        {/* Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full my-6"></div>

        {/* Action */}
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}