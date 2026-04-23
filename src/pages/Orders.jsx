import PageHeader from "../components/PageHeader";

export default function Orders() {
  return (
    <div className="space-y-6">
      
      <PageHeader
        title="Orders"
        breadcrumb={["Home", "Orders"]}
      >
        <button className="bg-hijau text-white px-4 py-2 rounded-lg font-bold shadow-md">
          + Add Order
        </button>
      </PageHeader>

      <p>INI HALAMAN ORDERS</p>
    </div>
  );
}