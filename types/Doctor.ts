export type Specialty = 'Dermatologist'|'Neurologist'|'Psychiatrist'|'General Physician'|'Cardiologist'|'Pediatrician';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  yearsExperience: number; // years
  location: string;
  rating: number; // 1-5
  acceptingNewPatients: boolean;
  bio?: string;
  conditionsTreated?: string[];
  fee?: number;
  availableSlots: string[]; // ISO datetimes or simpler strings
}
export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string; // ISO or formatted
  timeSlot: string;
  patientName: string;
  reason?: string;
}