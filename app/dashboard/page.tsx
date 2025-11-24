"use client";
import { useState, useMemo } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, ArrowUpDown } from "lucide-react";
import { mockDoctors } from "@/data/mockDoctor";
import DoctorListCard from "@/components/DoctorListCard";
import DoctorDetailsDialog from "@/components/DoctorDetailsDialog";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import { format } from "date-fns";
import { useDebounce } from "@/hooks/use-debounce";
import type { Doctor } from "@/types/Doctor";

type SortOption = "rating" | "experience" | "alpha" | "none";

const Dashboard = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [acceptingNewPatients, setAcceptingNewPatients] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [doctorToBook, setDoctorToBook] = useState<Doctor | null>(null);

  // Debounce search input
  const debouncedSearch = useDebounce(searchName, 300);

  // Get unique specialties
  const specialties = Array.from(new Set(mockDoctors.map((d) => d.specialty)));

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors.filter((doctor) => {
      const matchesName = doctor.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesAccepting = !acceptingNewPatients || doctor.acceptingNewPatients;
      
      let matchesDate = true;
      if (selectedDate) {
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        matchesDate = doctor.availableSlots.some((slot) => 
          slot.startsWith(selectedDateStr)
        );
      }

      return matchesName && matchesSpecialty && matchesDate && matchesAccepting;
    });

    // Apply sorting
    if (sortBy !== "none") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating; // High to low
          case "experience":
            return b.yearsExperience - a.yearsExperience; // High to low
          case "alpha":
            return a.name.localeCompare(b.name); // A-Z
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [debouncedSearch, selectedSpecialty, acceptingNewPatients, sortBy, selectedDate]);

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDetailsDialogOpen(true);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setDoctorToBook(doctor);
    setBookingModalOpen(true);
    setDetailsDialogOpen(false);
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
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filters Row */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Filter by Specialty */}
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="text-sm font-medium">
                    Specialty
                  </Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger id="specialty">
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

                {/* Sort Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="sort" className="text-sm font-medium">
                    Sort By
                  </Label>
                  <Select 
                    value={sortBy} 
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger id="sort">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="experience">Experience (High to Low)</SelectItem>
                      <SelectItem value="alpha">Alphabetical (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Accepting New Patients Toggle */}
                <div className="space-y-2">
                  <Label htmlFor="accepting" className="text-sm font-medium">
                    Filters
                  </Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="accepting"
                      checked={acceptingNewPatients}
                      onCheckedChange={setAcceptingNewPatients}
                    />
                    <Label
                      htmlFor="accepting"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Accepting New Patients
                    </Label>
                  </div>
                </div>
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

      {/* Booking Modal */}
      <BookAppointmentModal
        doctor={doctorToBook}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </div>
  );
};

export default Dashboard;