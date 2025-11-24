export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    yearsExperience: number;
    rating: number;
    location: string;
    acceptingNewPatients: boolean;
    image?: string;
  }
  
  export const mockDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Mitchell",
      specialty: "Cardiologist",
      yearsExperience: 15,
      rating: 4.9,
      location: "Downtown Medical Center",
      acceptingNewPatients: true,
    },
    {
      id: "2",
      name: "Dr. James Chen",
      specialty: "Pediatrician",
      yearsExperience: 12,
      rating: 4.8,
      location: "Children's Health Clinic",
      acceptingNewPatients: true,
    },
    {
      id: "3",
      name: "Dr. Maria Rodriguez",
      specialty: "Dermatologist",
      yearsExperience: 8,
      rating: 4.7,
      location: "Skin & Wellness Center",
      acceptingNewPatients: false,
    },
    {
      id: "4",
      name: "Dr. Michael Thompson",
      specialty: "Orthopedic Surgeon",
      yearsExperience: 20,
      rating: 5.0,
      location: "Sports Medicine Institute",
      acceptingNewPatients: true,
    },
  ];