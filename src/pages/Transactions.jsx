import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaUser, FaBox, FaCoins, FaCrown, FaMedal, FaStar, FaPlus } from "react-icons/fa";
import { membersAPI } from "../services/membersAPI";
import { productsAPI } from "../services/productsAPI";
import { transactionsAPI } from "../services/transactionsAPI";
import { getTierInfo, getTierBadgeColor, calculatePoints } from "../lib/tierHelper";
import AlertBox from "../components/AlertBox";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

export default function Transactions() {
    const [members, setMembers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [transactions, setTransactions] = useState([]);

    // Form state
    const [selectedMember, setSelectedMember] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [pointsEarned, setPointsEarned] = useState(0);
    const [newTier, setNewTier] = useState("");

    // Load data awal
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");
            
            const [membersRes, productsRes] = await Promise.all([
                membersAPI.getMembers(),
                productsAPI.getProducts()
            ]);
            
            setMembers(membersRes.data || []);
            setProducts(productsRes.data || []);
            
            // Load riwayat transaksi
            const transRes = await transactionsAPI.getTransactions();
            setTransactions(transRes.data || []);
            
        } catch (err) {
            setError("Gagal memuat data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Hitung total, poin, dan tier otomatis
    useEffect(() => {
        if (selectedProduct && quantity > 0) {
            const product = products.find(p => p.id === parseInt(selectedProduct));
            if (product) {
                const total = product.price * quantity;
                setTotalPrice(total);
                
                const points = calculatePoints(total);
                setPointsEarned(points);
                
                // Cek tier baru
                if (selectedMember) {
                    const member = members.find(m => m.id === parseInt(selectedMember));
                    if (member) {
                        const newTotalPoints = member.total_points + points;
                        const { tier } = getTierInfo(newTotalPoints);
                        setNewTier(tier);
                    }
                }
            }
        } else {
            setTotalPrice(0);
            setPointsEarned(0);
            setNewTier("");
        }
    }, [selectedProduct, quantity, selectedMember, members, products]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedMember || !selectedProduct || quantity < 1) {
            setError("Mohon lengkapi semua data!");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const member = members.find(m => m.id === parseInt(selectedMember));
            const product = products.find(p => p.id === parseInt(selectedProduct));

            // 1. Simpan transaksi
            const transactionData = {
                member_id: parseInt(selectedMember),
                product_id: parseInt(selectedProduct),
                quantity: quantity,
                total_price: totalPrice,
                points_earned: pointsEarned
            };

            await transactionsAPI.createTransaction(transactionData);

            // 2. Update poin member
            const newTotalPoints = member.total_points + pointsEarned;
            const { tier } = getTierInfo(newTotalPoints);
            
            await membersAPI.updateMember(member.id, {
                total_points: newTotalPoints,
                tier: tier
            });

            setSuccess(`✅ Transaksi berhasil!\nMember: ${member.name}\nProduk: ${product.name}\nTotal: Rp ${totalPrice.toLocaleString()}\nPoin: ${pointsEarned}\nTier baru: ${tier}`);

            // Reset form
            setSelectedMember("");
            setSelectedProduct("");
            setQuantity(1);
            setTotalPrice(0);
            setPointsEarned(0);
            setNewTier("");

            // Reload data
            await loadData();

        } catch (err) {
            setError("Gagal menyimpan transaksi: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const getTierIcon = (tier) => {
        switch (tier) {
            case "Platinum": return <FaCrown className="text-purple-500" />;
            case "Gold": return <FaCrown className="text-yellow-500" />;
            case "Silver": return <FaMedal className="text-gray-400" />;
            case "Bronze": return <FaStar className="text-orange-500" />;
            default: return null;
        }
    };

    if (loading && members.length === 0) return <Loading />;

    return (
        <div className="space-y-6">
            <PageHeader title="Transaksi" breadcrumb={["Home", "Transaksi"]}>
                <div className="flex items-center gap-2 text-sm bg-green-100 px-3 py-2 rounded-full">
                    <FaCoins className="text-green-600" />
                    <span className="font-semibold text-green-700">Rp 1.000 = 1 Poin</span>
                </div>
            </PageHeader>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* Form Transaksi */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 rounded-2xl">
                        <FaShoppingCart className="text-2xl text-orange-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Form Transaksi</h2>
                        <p className="text-sm text-gray-500">Isi data transaksi dengan lengkap</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Pilih Member */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <FaUser className="inline mr-2 text-orange-500" />
                            Pilih Member
                        </label>
                        <select
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">-- Pilih Member --</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name} - {member.tier} ({member.total_points || 0} poin)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pilih Produk */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <FaBox className="inline mr-2 text-orange-500" />
                            Pilih Produk
                        </label>
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">-- Pilih Produk --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - Rp {product.price.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Jumlah (Qty)
                        </label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* Ringkasan Transaksi */}
                    {selectedProduct && quantity > 0 && (
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl border border-orange-200">
                            <h4 className="font-semibold text-gray-700 mb-3">📊 Ringkasan Transaksi</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Total Harga</p>
                                    <p className="text-xl font-bold text-orange-600">
                                        Rp {totalPrice.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Poin Didapat</p>
                                    <p className="text-xl font-bold text-green-600">
                                        <FaCoins className="inline mr-1" />
                                        {pointsEarned} poin
                                    </p>
                                </div>
                                {selectedMember && newTier && (
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Tier Member Baru</p>
                                        <p className="text-xl font-bold">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getTierBadgeColor(newTier)}`}>
                                                {getTierIcon(newTier)}
                                                {newTier}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <FaShoppingCart />
                        {loading ? "Memproses..." : "Proses Transaksi"}
                    </button>
                </form>
            </div>

            {/* Riwayat Transaksi */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4">📋 Riwayat Transaksi</h3>
                
                {transactions.length === 0 ? (
                    <EmptyState text="Belum ada transaksi" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Member</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Produk</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Poin</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map((t, index) => {
                                    const member = members.find(m => m.id === t.member_id);
                                    const product = products.find(p => p.id === t.product_id);
                                    return (
                                        <tr key={t.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                                {member?.name || 'Unknown'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {product?.name || 'Unknown'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{t.quantity}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-orange-600">
                                                Rp {t.total_price?.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold text-green-600">
                                                {t.points_earned} poin
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(t.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}