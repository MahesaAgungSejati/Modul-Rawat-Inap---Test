export type Patient = {
  id: string;
  name: string;
  nik: string;
  diagnosis: string;
  admissionDate: string;
  doctor: string;
  room: string;
};

export type AdmissionFormData = Omit<Patient, "id">;

export type SortField = "name" | "admissionDate";
export type SortOrder = "asc" | "desc";