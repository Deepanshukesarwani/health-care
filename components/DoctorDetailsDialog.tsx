import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
//   import { mock } from "@/data/mockDoctors";
import {mockDoctors} from "@/data/mockDoctor";
  import { Star, MapPin, Award, DollarSign, Calendar } from "lucide-react";
  
  interface DoctorDetailsDialogProps {
    doctor: typeof mockDoctors[number] | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBookAppointment: (doctor: typeof mockDoctors[number]) => void;
  }
  
  const DoctorDetailsDialog = ({ doctor, open, onOpenChange, onBookAppointment }: DoctorDetailsDialogProps) => {
    if (!doctor) return null;
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
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
            {/* Bio */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">About</h3>
              <p className="text-muted-foreground">{doctor.bio}</p>
            </div>
  
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{doctor.yearsExperience} years experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{doctor.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-warning fill-warning" />
                <span className="text-muted-foreground">{doctor.rating} rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">₹{doctor.fee} consultation fee</span>
              </div>
            </div>
  
            {/* Conditions Treated */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Conditions Treated</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.conditionsTreated && doctor.conditionsTreated.map((condition) => (
                  <Badge key={condition} variant="secondary">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
  
            {/* Available Slots */}
            {doctor.availableSlots.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Available Slots</h3>
                <div className="text-sm text-muted-foreground">
                  {doctor.availableSlots.length} slots available
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