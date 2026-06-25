import { useState, useEffect } from "react";
import { notesAPI } from "../services/notesAPI";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { FaStickyNote } from "react-icons/fa";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader"; // ✅ IMPORT PageHeader

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [dataForm, setDataForm] = useState({
        title: "",
        content: "",
        status: "To Do"
    });

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await notesAPI.fetchNotes();
            setNotes(data);
        } catch (err) {
            setError("Gagal memuat catatan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (isEditing) {
                await notesAPI.updateNote(editId, dataForm);
                setSuccess("Catatan berhasil diupdate!");
                setIsEditing(false);
                setEditId(null);
            } else {
                await notesAPI.createNote(dataForm);
                setSuccess("Catatan berhasil ditambahkan!");
            }

            setDataForm({ title: "", content: "", status: "To Do" });
            setTimeout(() => setSuccess(""), 3000);
            loadNotes();

        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;

        try {
            setLoading(true);
            await notesAPI.deleteNote(id);
            setSuccess("Catatan berhasil dihapus!");
            loadNotes();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Gagal menghapus catatan");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (note) => {
        setIsEditing(true);
        setEditId(note.id);
        setDataForm({
            title: note.title,
            content: note.content,
            status: note.status || "To Do"
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setDataForm({ title: "", content: "", status: "To Do" });
    };

    const getStatusColor = (status) => {
        const colors = {
            'To Do': 'bg-gray-100 text-gray-700 border-gray-200',
            'On Progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Done': 'bg-green-100 text-green-700 border-green-200'
        };
        return colors[status] || colors['To Do'];
    };

    return (
        <div className="space-y-6"> {/* ✅ PAKAI space-y-6 SAMA SEPERTI CUSTOMERS */}
            
            {/* ✅ PAGE HEADER - SAMA PERSIS DENGAN CUSTOMERS */}
            <PageHeader title="Notes" breadcrumb={["Home", "Notes"]}>
                {/* Optional: bisa tambah tombol action di sini kalau mau */}
            </PageHeader>

            {/* Header Notes App - Tetap dipertahankan */}
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 rounded-2xl">
                        <FaStickyNote className="text-3xl text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Notes App</h2>
                        <p className="text-sm text-gray-500">Kelola catatanmu dengan mudah</p>
                    </div>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-emerald-600">
                        Total: {notes.length} Catatan
                    </span>
                </div>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* Form Tambah/Edit Catatan */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <AiOutlinePlus className="text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {isEditing ? "✏️ Edit Catatan" : "📝 Tambah Catatan Baru"}
                    </h3>
                    {isEditing && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            Sedang Mengedit
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        type="text"
                        value={dataForm.title}
                        onChange={handleChange}
                        placeholder="📌 Masukkan judul catatan..."
                        required
                        disabled={loading}
                        className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-700 placeholder-gray-400"
                    />
                    <textarea
                        name="content"
                        value={dataForm.content}
                        onChange={handleChange}
                        placeholder="✏️ Tulis isi catatan di sini..."
                        required
                        rows="3"
                        disabled={loading}
                        className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 text-gray-700 placeholder-gray-400"
                    />
                    <div className="flex flex-wrap gap-4">
                        <select
                            name="status"
                            value={dataForm.status}
                            onChange={handleChange}
                            disabled={loading}
                            className="flex-1 min-w-[150px] p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-700"
                        >
                            <option value="To Do">📋 To Do</option>
                            <option value="On Progress">⏳ On Progress</option>
                            <option value="Done">✅ Done</option>
                        </select>
                        <div className="flex gap-3">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                                >
                                    Batal
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "⏳ Memproses..." : isEditing ? "✅ Update Catatan" : "➕ Tambah Catatan"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Daftar Catatan */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        📋 Daftar Catatan
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            ({notes.length} catatan)
                        </span>
                    </h3>
                    <button
                        onClick={loadNotes}
                        disabled={loading}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50"
                    >
                        🔄 Refresh
                    </button>
                </div>

                {loading && <LoadingSpinner text="Memuat catatan..." />}

                {!loading && notes.length === 0 && !error && (
                    <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
                )}

                {!loading && notes.length === 0 && error && (
                    <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
                )}

                {!loading && notes.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Isi Catatan</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {notes.map((note, index) => (
                                    <tr key={note.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">
                                                {note.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-xs truncate">
                                                {note.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(note.status)}`}>
                                                {note.status || 'To Do'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(note)}
                                                    disabled={loading}
                                                    className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                    title="Edit"
                                                >
                                                    <AiFillEdit className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(note.id)}
                                                    disabled={loading}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                    title="Hapus"
                                                >
                                                    <AiFillDelete className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}