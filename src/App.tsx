import { useState } from "react";
import AdmissionForm from "./features/admission/AdmissionForm";
import PatientTable from "./features/patients/PatientTable";
import Button from "./components/Button";
import type { Patient } from "./types/patient";

type View = "list" | "form";

export default function App() {
  const [view, setView] = useState<View>("list");
  const [newPatient, setNewPatient] = useState<Patient | null>(null);

  const handleSubmit = (patient: Patient) => {
    setNewPatient(patient);
    setView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 21v-6h6v6M9 7h1" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-800">Rawat Inap</h1>
              <p className="text-xs text-gray-400">Modul Pasien Masuk</p>
            </div>
          </div>
          {view === "list" ? (
            <Button variant="primary" onClick={() => setView("form")}>
              + Pasien Baru
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setView("list")}>
              ← Kembali
            </Button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === "form" ? (
          <AdmissionForm
            onSubmit={handleSubmit}
            onCancel={() => setView("list")}
          />
        ) : (
          <PatientTable newPatient={newPatient} />
        )}
      </main>
    </div>
  );
}