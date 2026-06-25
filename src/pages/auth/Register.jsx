import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ← TAMBAHKAN useNavigate
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
    const navigate = useNavigate(); // ← TAMBAHKAN INI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Validasi password sama
        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan Confirm Password tidak cocok!");
            setLoading(false);
            return;
        }

        try {
            // Panggil API register (sesuaikan dengan endpoint Supabase nanti)
            const response = await axios.post(
                "https://dummyjson.com/users/add", // API sementara
                {
                    email: dataForm.email,
                    password: dataForm.password,
                }
            );

            if (response.status === 201 || response.status === 200) {
                setSuccess("Registrasi berhasil! Silahkan login.");
                // Redirect ke login setelah 2 detik
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registrasi gagal! Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            {/* Alert Error */}
            {error && (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {/* Alert Success */}
            {success && (
                <div className="bg-green-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <span className="text-green-600 me-2 text-lg">✅</span>
                    {success}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Mohon Tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 disabled:opacity-50"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 disabled:opacity-50"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 disabled:opacity-50"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Mendaftar..." : "Register"}
                </button>
            </form>

            {/* Link ke Login */}
            <p className="text-center text-sm text-gray-600 mt-6">
                Sudah punya akun?{' '}
                <Link
                    to="/login"
                    className="text-orange-500 hover:text-orange-600 font-semibold hover:underline transition"
                >
                    Login Sekarang
                </Link>
            </p>
        </div>
    );
}