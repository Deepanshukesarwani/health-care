import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Calendar, Star } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctor";

interface DoctorListCardProps {
  doctor: typeof mockDoctors[number];
  onViewDetails: (doctor: typeof mockDoctors[number]) => void;
  onBookAppointment: (doctor: typeof mockDoctors[number]) => void;
  onClick: () => void; 
}

const DoctorListCard = ({ doctor, onViewDetails, onBookAppointment, onClick }: DoctorListCardProps) => {
  const handleCardClick = () => {
    if (doctor.acceptingNewPatients && onClick) {
      onClick();
    }
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className={`border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md ${
        doctor.acceptingNewPatients ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={handleCardClick}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
          {doctor.name.split(" ").map((n) => n[0]).join("")}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          
          {/* Star Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(doctor.rating)
                      ? "text-warning fill-warning"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
          </div>
          
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0"
              onClick={handleDropdownClick}
            >
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48" onClick={handleDropdownClick}>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onViewDetails(doctor);
            }}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onBookAppointment(doctor);
              }}
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