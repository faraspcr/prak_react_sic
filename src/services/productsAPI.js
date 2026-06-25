import axios from "axios";

const API_URL = "https://mifnbjfzhgddpfmvkghn.supabase.co/rest/v1/products";
const API_KEY = "sb_publishable_Mo06HXFnu1RW2pkv6Wu0vA_9fug87yI";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const productsAPI = {
  // ✅ GET: Ambil semua data produk
  getProducts() {
    return axios.get(API_URL, {
      headers,
    });
  },

  // ✅ POST: Tambah produk baru
  createProduct(data) {
    return axios.post(API_URL, data, {
      headers,
    });
  },

  // ✅ PATCH: Update produk berdasarkan id
  updateProduct(id, data) {
    return axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
  },

  // ✅ DELETE: Hapus produk berdasarkan id
  deleteProduct(id) {
    return axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
  },
};