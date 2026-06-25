import axios from "axios";

const API_URL = "https://mifnbjfzhgddpfmvkghn.supabase.co/rest/v1/transactions";
const API_KEY = "sb_publishable_Mo06HXFnu1RW2pkv6Wu0vA_9fug87yI";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const transactionsAPI = {
  // ✅ GET: Ambil semua transaksi (bisa difilter per member dari komponen)
  getTransactions() {
    return axios.get(API_URL, {
      headers,
    });
  },

  // ✅ GET: Ambil transaksi khusus 1 member (riwayat transaksi per member)
  getTransactionsByMember(memberId) {
    return axios.get(`${API_URL}?member_id=eq.${memberId}`, {
      headers,
    });
  },

  // ✅ POST: Tambah transaksi baru
  createTransaction(data) {
    return axios.post(API_URL, data, {
      headers,
    });
  },

  // ✅ DELETE: Hapus transaksi berdasarkan id
  deleteTransaction(id) {
    return axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
  },
};