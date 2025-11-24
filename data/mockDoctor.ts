


import { Doctor } from "@/types/Doctor";

export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Aisha Verma",
    specialty: "Neurologist",
    yearsExperience: 12,
    location: "Delhi, India",
    rating: 4.7,
    acceptingNewPatients: true,
    bio: "Experienced neurologist specializing in migraines, seizures, and neurological disorders.",
    conditionsTreated: ["Headache", "Migraine", "Seizures", "Sleep Disorders"],
    fee: 800,
    availableSlots: [
      "2025-11-25 09:00",
      "2025-11-25 11:00",
      "2025-11-26 10:00"
    ]
  },
  {
    id: "d2",
    name: "Dr. Rohan Kapoor",
    specialty: "Dermatologist",
    yearsExperience: 9,
    location: "Mumbai, India",
    rating: 4.5,
    acceptingNewPatients: true,
    bio: "Dermatologist with expertise in acne, pigmentation, and chronic skin conditions.",
    conditionsTreated: ["Acne", "Eczema", "Psoriasis", "Skin Rash"],
    fee: 600,
    availableSlots: [
      "2025-11-25 14:00",
      "2025-11-26 09:30",
      "2025-11-27 11:30"
    ]
  },
  {
    id: "d3",
    name: "Dr. Meera Shah",
    specialty: "Psychiatrist",
    yearsExperience: 14,
    location: "Bangalore, India",
    rating: 4.9,
    acceptingNewPatients: false,
    bio: "Specializes in anxiety, depression, and mood disorders with a holistic treatment approach.",
    conditionsTreated: ["Anxiety", "Depression", "Mood Disorders"],
    fee: 1000,
    availableSlots: [
      "2025-11-28 09:00",
      "2025-11-28 15:00"
    ]
  },
  {
    id: "d4",
    name: "Dr. Arjun Deshmukh",
    specialty: "General Physician",
    yearsExperience: 7,
    location: "Pune, India",
    rating: 4.3,
    acceptingNewPatients: true,
    bio: "General physician handling fever, infections, throat pain, and routine check-ups.",
    conditionsTreated: ["Fever", "Cough", "Cold", "Sore Throat"],
    fee: 400,
    availableSlots: [
      "2025-11-25 10:00",
      "2025-11-25 16:00",
      "2025-11-26 13:00"
    ]
  },
  {
    id: "d5",
    name: "Dr. Priya Nambiar",
    specialty: "Pediatrician",
    yearsExperience: 11,
    location: "Chennai, India",
    rating: 4.6,
    acceptingNewPatients: true,
    bio: "Pediatric specialist focusing on child health, nutrition, and growth development.",
    conditionsTreated: ["Fever in children", "Flu", "Allergies", "Growth Issues"],
    fee: 650,
    availableSlots: [
      "2025-11-25 09:15",
      "2025-11-26 12:00"
    ]
  },
  {
    id: "d6",
    name: "Dr. Kabir Singh",
    specialty: "Cardiologist",
    yearsExperience: 18,
    location: "Delhi, India",
    rating: 4.8,
    acceptingNewPatients: false,
    bio: "Senior cardiologist specializing in heart disease management and preventive cardiology.",
    conditionsTreated: ["Chest Pain", "BP Issues", "Arrhythmia"],
    fee: 1200,
    availableSlots: [
      "2025-11-27 10:30",
      "2025-11-28 14:00"
    ]
  },
  {
    id: "d7",
    name: "Dr. Sanya Kulkarni",
    specialty: "Dermatologist",
    yearsExperience: 6,
    location: "Hyderabad, India",
    rating: 4.1,
    acceptingNewPatients: true,
    bio: "Specializes in skin allergies, fungal infections, and hair fall treatment.",
    conditionsTreated: ["Allergies", "Skin Rash", "Hair Fall"],
    fee: 550,
    availableSlots: [
      "2025-11-25 11:30",
      "2025-11-26 15:00"
    ]
  },
  {
    id: "d8",
    name: "Dr. Manav Gupta",
    specialty: "General Physician",
    yearsExperience: 4,
    location: "Kolkata, India",
    rating: 4.0,
    acceptingNewPatients: true,
    bio: "Young GP handling fever, viral infections, nutrition advice, and primary care.",
    conditionsTreated: ["Fever", "Throat Pain", "Mild Infections"],
    fee: 300,
    availableSlots: [
      "2025-11-25 12:00",
      "2025-11-25 17:00"
    ]
  },
  {
    id: "d9",
    name: "Dr. Tanvi Sood",
    specialty: "Psychiatrist",
    yearsExperience: 10,
    location: "Delhi, India",
    rating: 4.4,
    acceptingNewPatients: true,
    bio: "Expert in stress disorders, panic attacks, and behavioral therapy.",
    conditionsTreated: ["Stress", "Panic Attacks", "Depression"],
    fee: 900,
    availableSlots: [
      "2025-11-26 09:45",
      "2025-11-26 12:45"
    ]
  },
  {
    id: "d10",
    name: "Dr. Veer Patel",
    specialty: "Neurologist",
    yearsExperience: 15,
    location: "Ahmedabad, India",
    rating: 4.6,
    acceptingNewPatients: false,
    bio: "Deals with severe migraines, stroke recovery, and neuro-muscular disorders.",
    conditionsTreated: ["Migraines", "Stroke Aftercare"],
    fee: 1100,
    availableSlots: [
      "2025-11-27 11:00",
      "2025-11-27 16:00"
    ]
  },
  {
    id: "d11",
    name: "Dr. Neha Bajaj",
    specialty: "Pediatrician",
    yearsExperience: 8,
    location: "Jaipur, India",
    rating: 4.3,
    acceptingNewPatients: true,
    bio: "Trusted pediatrician with focus on nutrition, immunity building & seasonal illnesses.",
    conditionsTreated: ["Child Fever", "Food Allergies"],
    fee: 500,
    availableSlots: [
      "2025-11-25 10:30",
      "2025-11-26 14:30"
    ]
  },
  {
    id: "d12",
    name: "Dr. Ritesh Purohit",
    specialty: "Cardiologist",
    yearsExperience: 20,
    location: "Mumbai, India",
    rating: 4.9,
    acceptingNewPatients: true,
    bio: "Renowned senior cardiologist specializing in complex cardiac treatments.",
    conditionsTreated: ["Heart Disease", "Palpitations"],
    fee: 1500,
    availableSlots: [
      "2025-11-26 11:00",
      "2025-11-27 13:00"
    ]
  },
  {
    id: "d13",
    name: "Dr. Ishita Mehra",
    specialty: "Dermatologist",
    yearsExperience: 5,
    location: "Lucknow, India",
    rating: 4.2,
    acceptingNewPatients: true,
    bio: "Focus on skincare, pigmentation, laser treatments and teenage acne issues.",
    conditionsTreated: ["Pigmentation", "Acne", "Skin Infection"],
    fee: 500,
    availableSlots: [
      "2025-11-25 12:45",
      "2025-11-26 10:15"
    ]
  },
  {
    id: "d14",
    name: "Dr. Aditya Rawal",
    specialty: "General Physician",
    yearsExperience: 13,
    location: "Surat, India",
    rating: 4.7,
    acceptingNewPatients: false,
    bio: "General doctor with experience in lifestyle diseases like diabetes & BP.",
    conditionsTreated: ["Diabetes", "BP", "Fever"],
    fee: 450,
    availableSlots: [
      "2025-11-28 09:00",
      "2025-11-28 11:30"
    ]
  },
  {
    id: "d15",
    name: "Dr. Kavya Shetty",
    specialty: "Psychiatrist",
    yearsExperience: 6,
    location: "Bangalore, India",
    rating: 4.1,
    acceptingNewPatients: true,
    bio: "Specializes in adolescent mental health, trauma, and emotional well-being.",
    conditionsTreated: ["Anxiety", "Stress", "Depression"],
    fee: 700,
    availableSlots: [
      "2025-11-26 16:00",
      "2025-11-27 10:00"
    ]
  }
];
