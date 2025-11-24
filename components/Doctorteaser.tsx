import Link from "next/link";
import { Button } from "@/components/ui/button";
import DoctorCard from "@/components/DoctorCard";
import { mockDoctors } from "@/data/mockDoctor";
import { ArrowRight } from "lucide-react";

const DoctorTeaser = () => {
  return (
    <section id="doctors" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Meet Our Doctors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced healthcare professionals ready to care for you and your family
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="default" size="lg" className="group">
              View All Doctors
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorTeaser;