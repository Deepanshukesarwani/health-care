import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Calendar } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctor";

interface DoctorListCardProps {
  doctor: typeof mockDoctors[number];
  onViewDetails: (doctor: typeof mockDoctors[number]) => void;
  onBookAppointment: (doctor: typeof mockDoctors[number]) => void;
}

const DoctorListCard = ({ doctor, onViewDetails, onBookAppointment }: DoctorListCardProps) => {
  return (
    <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      <div className="p-4 flex items-center gap-4">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
          {doctor.name.split(" ").map((n) => n[0]).join("")}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          <Badge
            variant={doctor.acceptingNewPatients ? "default" : "secondary"}
            className={`mt-2 ${doctor.acceptingNewPatients ? "bg-success hover:bg-success/90" : ""}`}
          >
            {doctor.acceptingNewPatients ? "Accepting Patients" : "Not Accepting"}
          </Badge>
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onViewDetails(doctor)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onBookAppointment(doctor)}
              disabled={!doctor.acceptingNewPatients}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default DoctorListCard;