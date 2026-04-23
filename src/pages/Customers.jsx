import PageHeader from "../components/PageHeader";

export default function Customers() {
  return (
    <div className="space-y-6">
      
      <PageHeader
        title="Customers"
        breadcrumb={["Home", "Customers"]}
      >
        <button className="bg-hijau text-white px-4 py-2 rounded-lg font-bold shadow-md">
          + Add Customer
        </button>
      </PageHeader>

      <p>INI HALAMAN CUSTOMERS</p>
    </div>
  );
}