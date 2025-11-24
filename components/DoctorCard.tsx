import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Award } from "lucide-react";
import { Doctor } from "@/data/mockDoctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden group">
      <CardContent className="p-6 space-y-4">
        {/* Doctor Avatar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {doctor.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
              <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
            </div>
          </div>
          <Badge
            variant={doctor.acceptingNewPatients ? "default" : "secondary"}
            className={doctor.acceptingNewPatients ? "bg-success hover:bg-success/90" : ""}
          >
            {doctor.acceptingNewPatients ? "Accepting" : "Not Accepting"}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            <span>{doctor.yearsExperience} years experience</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{doctor.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(doctor.rating)
                      ? "text-warning fill-warning"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;