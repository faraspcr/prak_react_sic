import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function FiturXYZ() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fitur XYZ"
        breadcrumb={["Dashboard", "Fitur XYZ"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-hijau text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          + Add Feature
        </button>
      </PageHeader>
    </div>
  );
}