"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctor";
import DoctorListCard from "@/components/DoctorListCard";
import DoctorDetailsDialog from "@/components/DoctorDetailsDialog";
import { format } from "date-fns";

const Dashboard = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[number] | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Get unique specialties
  const specialties = Array.from(new Set(mockDoctors.map((d) => d.specialty)));

  // Filter doctors
  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesName = doctor.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    
    let matchesDate = true;
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
      matchesDate = doctor.availableSlots.some((slot) => 
        slot.startsWith(selectedDateStr)
      );
    }

    return matchesName && matchesSpecialty && matchesDate;
  });

  const handleViewDetails = (doctor: typeof mockDoctors[number]) => {
    setSelectedDoctor(doctor);
    setDetailsDialogOpen(true);
  };

  const handleBookAppointment = (doctor: typeof mockDoctors[number]) => {
    console.log("Booking appointment with:", doctor.name);
    // TODO: Implement booking logic
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Search for doctors and check their availability
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Search by Name */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by doctor name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Filter by Specialty */}
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Doctor List */}
            <div className="space-y-3">
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    No doctors found matching your criteria.
                  </p>
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <DoctorListCard
                    key={doctor.id}
                    doctor={doctor}
                    onViewDetails={handleViewDetails}
                    onBookAppointment={handleBookAppointment}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar - Calendar */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-card rounded-lg border border-border p-4">
              <h2 className="font-semibold text-foreground mb-4">Select Date</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
              {selectedDate && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Selected: {format(selectedDate, "PPP")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Dialog */}
      <DoctorDetailsDialog
        doctor={selectedDoctor}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default Dashboard;