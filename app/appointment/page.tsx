"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { appointmentsAtom } from "@/atoms/atoms";
import { format, parse, isToday, isTomorrow, isPast } from "date-fns";
import { ArrowLeft, Calendar, Clock, User, FileText, Stethoscope } from "lucide-react";
import type { Appointment } from "@/types/Doctor";

const AppointmentPage = () => {
  const appointments = useAtomValue(appointmentsAtom);

  // Group appointments by date
  const groupedAppointments = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {};

    appointments.forEach((appointment) => {
      const date = appointment.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(appointment);
    });

    // Sort dates and appointments within each date
    const sortedDates = Object.keys(grouped).sort();
    const result: Array<{ date: string; appointments: Appointment[] }> = [];

    sortedDates.forEach((date) => {
      result.push({
        date,
        appointments: grouped[date].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)),
      });
    });

    return result;
  }, [appointments]);

  const formatDateHeader = (dateStr: string) => {
    try {
      const date = parse(dateStr, "yyyy-MM-dd", new Date());
      if (isToday(date)) {
        return "Today";
      } else if (isTomorrow(date)) {
        return "Tomorrow";
      } else {
        return format(date, "EEEE, MMMM d, yyyy");
      }
    } catch {
      return dateStr;
    }
  };

  const isAppointmentPast = (dateStr: string) => {
    try {
      const date = parse(dateStr, "yyyy-MM-dd", new Date());
      return isPast(date) && !isToday(date);
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your scheduled appointments
          </p>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Appointments Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any appointments scheduled. Book one now!
                </p>
                <Link href="/dashboard">
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {groupedAppointments.map(({ date, appointments: dateAppointments }) => (
              <div key={date} className="space-y-3">
                {/* Date Header */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    {formatDateHeader(date)}
                  </h2>
                  {isAppointmentPast(date) && (
                    <Badge variant="secondary" className="text-xs">
                      Past
                    </Badge>
                  )}
                  {isToday(parse(date, "yyyy-MM-dd", new Date())) && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Today
                    </Badge>
                  )}
                </div>

                {/* Appointments for this date */}
                <div className="space-y-3">
                  {dateAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      className={`border-border hover:border-primary/50 transition-all ${
                        isAppointmentPast(date) ? "opacity-75" : ""
                      }`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          {/* Left: Doctor Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                                <Stethoscope className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg mb-1">
                                  {appointment.doctorName}
                                </CardTitle>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.timeSlot}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{appointment.patientName}</span>
                                  </div>
                                  {appointment.reason && (
                                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                                      <span className="line-clamp-2">{appointment.reason}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right: Appointment ID */}
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              ID: {appointment.id.slice(0, 8)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
