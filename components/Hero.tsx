import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/public/heroImage.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Health,{" "}
                <span className="text-primary">Our Priority</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Book appointments with top-rated doctors instantly. Smart matching, easy scheduling, quality care—all in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button variant="default" size="lg" className="w-full sm:w-auto group">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book an Appointment
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/#doctors">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Doctors
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Healthcare professionals providing quality medical care"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;