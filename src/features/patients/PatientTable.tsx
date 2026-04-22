import { useState, useEffect, useMemo } from "react";
import type { Patient, SortField, SortOrder } from "../../types/patient";
import { fetchPatients } from "../../data/mockPatients";
import Spinner from "../../components/Spinner";
import EmptyState from "../../components/EmptyState";
import Button from "../../components/Button";

type PatientTableProps = {
  newPatient: Patient | null;
};

const PAGE_SIZE = 5;

export default function PatientTable({ newPatient }: PatientTableProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("admissionDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPatients().then((data) => {
      setPatients(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (newPatient) {
      setPatients((prev) => [newPatient, ...prev]);
    }
  }, [newPatient]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.nik.includes(q)
    );
  }, [patients, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <span className="ml-1 text-gray-300">↕</span>;
    return (
      <span className="ml-1 text-teal-600">
        {sortOrder === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Daftar Pasien Aktif
          <span className="ml-2 text-sm font-normal text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
            {filtered.length} pasien
          </span>
        </h2>
        <input
          type="text"
          placeholder="Cari nama / NIK..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64
            outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
        />
      </div>

      {paginated.length === 0 ? (
        <EmptyState message="Tidak ada pasien yang sesuai pencarian." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  { label: "No", sortable: false },
                  { label: "Nama", sortable: true, field: "name" as SortField },
                  { label: "NIK", sortable: false },
                  { label: "Diagnosa", sortable: false },
                  {
                    label: "Tgl Masuk",
                    sortable: true,
                    field: "admissionDate" as SortField,
                  },
                  { label: "Dokter", sortable: false },
                  { label: "Ruangan", sortable: false },
                ].map((col, i) => (
                  <th
                    key={i}
                    className={`text-left px-3 py-3 font-medium text-gray-500 whitespace-nowrap
                      ${col.sortable ? "cursor-pointer hover:text-teal-600 select-none" : ""}`}
                    onClick={() =>
                      col.sortable && col.field && handleSort(col.field)
                    }
                  >
                    {col.label}
                    {col.sortable && col.field && (
                      <SortIcon field={col.field} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-50 hover:bg-teal-50/40 transition-colors"
                >
                  <td className="px-3 py-3 text-gray-400">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-3 py-3 text-gray-500 font-mono text-xs">{p.nik}</td>
                  <td className="px-3 py-3">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      {p.diagnosis}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{p.admissionDate}</td>
                  <td className="px-3 py-3 text-gray-600">{p.doctor}</td>
                  <td className="px-3 py-3">
                    <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs">
                      {p.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Halaman {page} dari {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Prev
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}