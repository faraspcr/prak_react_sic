const customers = Array.from({ length: 30 }, (_, i) => ({
  id: `#CUST${1000 + i}`,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@gmail.com`,
  phone: `08${Math.floor(100000000 + Math.random() * 900000000)}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3],
}));


export default customers;

