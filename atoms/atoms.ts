"use client";
import { atom, WritableAtom } from 'jotai';
import { Doctor, Appointment } from '@/types/Doctor';
import { mockDoctors } from '@/data/mockDoctor';

export const doctorsAtom = atom<Doctor[]>(mockDoctors);
export const searchAtom = atom('');
export const specialtyFilterAtom = atom<string | null>(null);
export const acceptingFilterAtom = atom(false);
export const sortAtom = atom<'rating'|'experience'|'alpha' | null>(null);

// appointments
export const appointmentsAtom = atom<Appointment[]>(
  (get) => {
    // initialize from localStorage if present
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('appointments');
      if (raw) return JSON.parse(raw) as Appointment[];
    }
    return [];
  }
);
export const persistAppointmentsAtom = atom(
  null,
  (get, set, update: Appointment[]) => {
    set(appointmentsAtom as WritableAtom<Appointment[], [unknown], void>, update);
    if (typeof window !== 'undefined') {
      localStorage.setItem('appointments', JSON.stringify(update));
    }
  }
);