import axios from "axios";

const API_URL = "https://mifnbjfzhgddpfmvkghn.supabase.co/rest/v1/members";
const API_KEY = "sb_publishable_Mo06HXFnu1RW2pkv6Wu0vA_9fug87yI";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const membersAPI = {
  // ✅ GET: Ambil semua data member
  getMembers() {
    return axios.get(API_URL, {
      headers,
    });
  },

  // ✅ POST: Tambah member baru
  createMember(data) {
    return axios.post(API_URL, data, {
      headers,
    });
  },

  // ✅ PATCH: Update data member (misal: update total_points & tier setelah transaksi)
  updateMember(id, data) {
    return axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
  },

  // ✅ DELETE: Hapus member berdasarkan id
  deleteMember(id) {
    return axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
  },
};