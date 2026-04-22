import { useState } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectedField";
import Button from "../../components/Button";
import type { AdmissionFormData, Patient } from "../../types/patient";

type AdmissionFormProps = {
  onSubmit: (patient: Patient) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof AdmissionFormData, string>>;

const DOCTORS = [
  { value: "dr. Arif Wicaksono", label: "dr. Arif Wicaksono" },
  { value: "dr. Maya Indah", label: "dr. Maya Indah" },
  { value: "dr. Bimo Prakoso", label: "dr. Bimo Prakoso" },
];

const ROOMS = [
  { value: "Kenanga 1", label: "Kenanga 1" },
  { value: "Kenanga 2", label: "Kenanga 2" },
  { value: "Melati 1", label: "Melati 1" },
  { value: "Melati 2", label: "Melati 2" },
  { value: "Flamboyan 1", label: "Flamboyan 1" },
  { value: "Flamboyan 3", label: "Flamboyan 3" },
];

const EMPTY_FORM: AdmissionFormData = {
  name: "",
  nik: "",
  diagnosis: "",
  admissionDate: "",
  doctor: "",
  room: "",
};

function validate(data: AdmissionFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Nama wajib diisi.";
  else if (data.name.trim().length < 3) errors.name = "Nama minimal 3 karakter.";

  if (!data.nik.trim()) errors.nik = "NIK wajib diisi.";
  else if (!/^\d{16}$/.test(data.nik)) errors.nik = "NIK harus 16 digit angka.";

  if (!data.diagnosis.trim()) errors.diagnosis = "Diagnosa wajib diisi.";
  else if (data.diagnosis.trim().length < 3) errors.diagnosis = "Diagnosa minimal 3 karakter.";

  if (!data.admissionDate) errors.admissionDate = "Tanggal masuk wajib diisi.";

  if (!data.doctor) errors.doctor = "Dokter wajib dipilih.";

  if (!data.room) errors.room = "Ruangan wajib dipilih.";

  return errors;
}

export default function AdmissionForm({ onSubmit, onCancel }: AdmissionFormProps) {
  const [form, setForm] = useState<AdmissionFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newPatient: Patient = {
      ...form,
      id: Date.now().toString(),
    };
    onSubmit(newPatient);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Formulir Pasien Masuk
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Nama Lengkap"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Masukkan nama lengkap"
            required
          />
          <InputField
            label="NIK"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            error={errors.nik}
            placeholder="16 digit NIK"
            required
          />
          <InputField
            label="Diagnosa Masuk"
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            error={errors.diagnosis}
            placeholder="Contoh: Demam Berdarah"
            required
          />
          <InputField
            label="Tanggal Masuk"
            name="admissionDate"
            type="date"
            value={form.admissionDate}
            onChange={handleChange}
            error={errors.admissionDate}
            required
          />
          <SelectField
            label="Dokter Penanggung Jawab"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            options={DOCTORS}
            error={errors.doctor}
            required
          />
          <SelectField
            label="Ruangan"
            name="room"
            value={form.room}
            onChange={handleChange}
            options={ROOMS}
            error={errors.room}
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit" variant="primary">
            Simpan Pasien
          </Button>
        </div>
      </form>
    </div>
  );
}