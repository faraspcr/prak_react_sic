import { useState, useEffect } from "react"
import { membersAPI } from "../services/membersAPI"
import { getTierBadgeColor } from "../lib/tierHelper"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import Loading from "../components/Loading"
import PageHeader from "../components/PageHeader"
import { FaUsers, FaTrash } from "react-icons/fa"

export default function Members() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [members, setMembers] = useState([])

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await membersAPI.getMembers()
      setMembers(response.data)
    } catch (err) {
      setError("Gagal memuat data member")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await membersAPI.createMember(dataForm)

      setSuccess("Member berhasil ditambahkan!")

      setDataForm({ name: "", email: "" })

      setTimeout(() => setSuccess(""), 3000)

      loadMembers()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus member ini? Riwayat transaksinya juga akan terhapus.")
    if (!konfirmasi) return

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await membersAPI.deleteMember(id)

      loadMembers()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Members" breadcrumb={["Home", "Members"]} />

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-100 rounded-2xl">
            <FaUsers className="text-2xl text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Tambah Member Baru</h3>
            <p className="text-sm text-gray-500">Isi data member dengan lengkap</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={dataForm.name}
            placeholder="Nama member"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-700 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            value={dataForm.email}
            placeholder="Email member"
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaUsers />
            {loading ? "Memproses..." : "Tambah Member"}
          </button>
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            📋 Daftar Member
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({members.length} member)
            </span>
          </h3>
          <button
            onClick={loadMembers}
            disabled={loading}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        </div>

        {loading && <Loading />}

        {!loading && members.length === 0 && !error && (
          <EmptyState text="Belum ada member. Tambah member pertama!" />
        )}

        {!loading && members.length === 0 && error && (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        )}

        {!loading && members.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Poin</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member, index) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-600">
                      {member.total_points || 0} pts
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(member.tier)}`}>
                        {member.tier || 'Bronze'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleDelete(member.id)}
                          disabled={loading}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                          title="Hapus"
                        >
                          <FaTrash className="text-lg" />
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
  )
}