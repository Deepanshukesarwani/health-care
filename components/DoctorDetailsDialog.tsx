import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import {mockDoctors} from "@/data/mockDoctor";
  import { Star, MapPin, Award, DollarSign, Calendar, Clock } from "lucide-react";
  import { format, parse, isToday, isTomorrow } from "date-fns";
  import SymptomMatcher from "@/components/SymptomMatcher";
  import type { Doctor } from "@/types/Doctor";
  
  interface DoctorDetailsDialogProps {
    doctor: Doctor | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBookAppointment: (doctor: Doctor) => void;
  }

  // Note: The booking modal is handled by the parent component (Dashboard)
  // This component just triggers the booking flow via onBookAppointment callback

  // Group slots by day
  const groupSlotsByDay = (slots: string[]) => {
    const grouped: Record<string, string[]> = {};
    
    slots.forEach((slot) => {
      const [dateStr, timeStr] = slot.split(" ");
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(timeStr);
    });

    // Sort dates and times
    const sortedDates = Object.keys(grouped).sort();
    const result: Array<{ date: string; times: string[] }> = [];
    
    sortedDates.forEach((dateStr) => {
      result.push({
        date: dateStr,
        times: grouped[dateStr].sort()
      });
    });

    return result;
  };

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
  
  const DoctorDetailsDialog = ({ doctor, open, onOpenChange, onBookAppointment }: DoctorDetailsDialogProps) => {
    if (!doctor) return null;

    const groupedSlots = groupSlotsByDay(doctor.availableSlots);
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                {doctor.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl">{doctor.name}</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {doctor.specialty}
                </DialogDescription>
                <Badge
                  variant={doctor.acceptingNewPatients ? "default" : "secondary"}
                  className={`mt-2 ${doctor.acceptingNewPatients ? "bg-success hover:bg-success/90" : ""}`}
                >
                  {doctor.acceptingNewPatients ? "Accepting Patients" : "Not Accepting"}
                </Badge>
              </div>
            </div>
          </DialogHeader>
  
          <div className="space-y-6 mt-6">
            {/* Profile Information Card */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{doctor.bio}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="text-sm font-medium text-foreground">{doctor.yearsExperience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{doctor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning fill-warning shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="text-sm font-medium text-foreground">{doctor.rating} / 5.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                      <p className="text-sm font-medium text-foreground">₹{doctor.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Conditions Treated */}
                {doctor.conditionsTreated && doctor.conditionsTreated.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-2 text-sm">Conditions Treated</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.conditionsTreated.map((condition) => (
                        <Badge key={condition} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Symptom Matcher */}
            <SymptomMatcher />

            {/* Available Slots */}
            {groupedSlots.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Available Slots</h3>
                <div className="space-y-3">
                  {groupedSlots.map(({ date, times }) => (
                    <Card key={date} className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground text-sm">
                            {formatDateHeader(date)}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {times.map((time) => (
                            <Button
                              key={`${date}-${time}`}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => {
                                // Handle slot selection
                                console.log(`Selected slot: ${date} ${time}`);
                              }}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
  
            {/* Book Button */}
            <Button
              onClick={() => {
                onBookAppointment(doctor);
                onOpenChange(false);
              }}
              disabled={!doctor.acceptingNewPatients}
              className="w-full"
              size="lg"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DoctorDetailsDialog;