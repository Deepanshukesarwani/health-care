"use client";
import { atom, WritableAtom } from 'jotai';
import { Doctor, Appointment } from '@/types/Doctor';
import { mockDoctors } from '@/data/mockDoctor';

export const doctorsAtom = atom<Doctor[]>(mockDoctors);
export const searchAtom = atom('');
export const specialtyFilterAtom = atom<string | null>(null);
export const acceptingFilterAtom = atom(false);
export const sortAtom = atom<'rating'|'experience'|'alpha' | null>(null);

// Helper to get initial appointments from localStorage
const getInitialAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('appointments');
    if (raw) {
      return JSON.parse(raw) as Appointment[];
    }
  } catch {
    // Invalid JSON, return empty array
  }
  return [];
};

// appointments - writable atom initialized from localStorage
export const appointmentsAtom = atom<Appointment[]>(getInitialAppointments());

// Helper atom for persisting appointments with localStorage sync
export const persistAppointmentsAtom = atom(
  null,
  (get, set, update: Appointment[]) => {
    set(appointmentsAtom, update);
    if (typeof window !== 'undefined') {
      localStorage.setItem('appointments', JSON.stringify(update));
    }
  }
);