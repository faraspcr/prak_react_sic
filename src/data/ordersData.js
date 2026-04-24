const orders = Array.from({ length: 30 }, (_, i) => ({
  id: `#ORD${1000 + i}`,
  customer: `Customer ${i + 1}`,
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  total: `Rp ${(Math.floor(Math.random() * 500) + 50)}k`,
  date: `2025-04-${(i % 30) + 1}`,
}));


export default orders;

