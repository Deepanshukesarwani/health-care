"use client";

import { useState, useMemo, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { format, parse, isToday, isTomorrow, addDays, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, FileText } from "lucide-react";
import type { Doctor, Appointment } from "@/types/Doctor";
import { appointmentsAtom, persistAppointmentsAtom } from "@/atoms/atoms";

interface BookAppointmentModalProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookAppointmentModal = ({ doctor, open, onOpenChange }: BookAppointmentModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{
    date?: string;
    timeSlot?: string;
    patientName?: string;
  }>({});

  const appointments = useAtomValue(appointmentsAtom);
  const setAppointments = useSetAtom(persistAppointmentsAtom);

  // Reset form when modal opens/closes or doctor changes
  useEffect(() => {
    if (open && doctor) {
      setSelectedDate(new Date());
      setSelectedTimeSlot("");
      setPatientName("");
      setReason("");
      setErrors({});
    }
  }, [open, doctor]);

  // Get available time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!doctor || !selectedDate) return [];

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slots = doctor.availableSlots
      .filter((slot) => slot.startsWith(dateStr))
      .map((slot) => slot.split(" ")[1])
      .sort();

    // Filter out already booked slots
    const bookedSlots = appointments
      .filter(
        (apt) =>
          apt.doctorId === doctor.id &&
          apt.date === dateStr &&
          apt.timeSlot
      )
      .map((apt) => apt.timeSlot);

    return slots.filter((slot) => !bookedSlots.includes(slot));
  }, [doctor, selectedDate, appointments]);

  // Quick date selection handlers
  const handleQuickDateSelect = (days: number) => {
    const date = addDays(new Date(), days);
    setSelectedDate(date);
    setSelectedTimeSlot(""); // Reset time slot when date changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: typeof errors = {};
    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }
    if (!selectedTimeSlot) {
      newErrors.timeSlot = "Please select a time slot";
    }
    if (!patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!doctor) return;

    // Create appointment
    const dateStr = format(selectedDate!, "yyyy-MM-dd");
    const appointmentId = `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newAppointment: Appointment = {
      id: appointmentId,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: dateStr,
      timeSlot: selectedTimeSlot,
      patientName: patientName.trim(),
      reason: reason.trim() || undefined,
    };

    // Add to appointments
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    // Show success toast
    toast.success("Appointment Booked Successfully!", {
      description: `Your appointment with ${doctor.name} on ${format(selectedDate!, "PPP")} at ${selectedTimeSlot} has been confirmed.`,
      duration: 5000,
    });

    // Close modal
    onOpenChange(false);
  };

  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with {doctor.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Doctor Info Card */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                  {doctor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label htmlFor="date" className="text-base font-semibold">
              Select Date
            </Label>
            
            {/* Quick Date Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={isToday(selectedDate || new Date()) ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickDateSelect(0)}
              >
                Today
              </Button>
              <Button
                type="button"
                variant={isTomorrow(selectedDate || new Date()) ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickDateSelect(1)}
              >
                Tomorrow
              </Button>
            </div>

            {/* Calendar Picker */}
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTimeSlot(""); // Reset time slot when date changes
                  if (errors.date) {
                    setErrors({ ...errors, date: undefined });
                  }
                }}
                disabled={(date) => date < startOfDay(new Date())}
                className="rounded-md"
              />
            </div>
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <Label htmlFor="timeSlot" className="text-base font-semibold">
              Select Time Slot
            </Label>
            <Select
              value={selectedTimeSlot}
              onValueChange={(value) => {
                setSelectedTimeSlot(value);
                if (errors.timeSlot) {
                  setErrors({ ...errors, timeSlot: undefined });
                }
              }}
              disabled={!selectedDate || availableTimeSlots.length === 0}
            >
              <SelectTrigger id="timeSlot">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder={
                  !selectedDate
                    ? "Select a date first"
                    : availableTimeSlots.length === 0
                    ? "No available slots"
                    : "Select time slot"
                } />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No available slots for this date
                  </SelectItem>
                ) : (
                  availableTimeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.timeSlot && (
              <p className="text-sm text-destructive">{errors.timeSlot}</p>
            )}
            {selectedDate && availableTimeSlots.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {availableTimeSlots.length} slot(s) available
              </p>
            )}
          </div>

          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-base font-semibold">
              Patient Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  if (errors.patientName) {
                    setErrors({ ...errors, patientName: undefined });
                  }
                }}
                placeholder="Enter patient name"
                className="pl-9"
                required
              />
            </div>
            {errors.patientName && (
              <p className="text-sm text-destructive">{errors.patientName}</p>
            )}
          </div>

          {/* Reason (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-base font-semibold">
              Reason for Visit <span className="text-muted-foreground text-sm">(Optional)</span>
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief description of symptoms or reason for visit"
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!doctor.acceptingNewPatients}
              className="flex-1"
              size="lg"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;

