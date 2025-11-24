import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-primary/10">
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground">
            Appointment Dashboard
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to your appointment booking dashboard. This is a placeholder page where users can view, book, and manage their healthcare appointments.
          </p>

          <div className="pt-8">
            <div className="bg-muted/50 rounded-lg p-8 text-left space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Coming Soon:</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  View available appointment slots
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Book appointments with your preferred doctors
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Manage your upcoming appointments
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  View appointment history and medical records
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;