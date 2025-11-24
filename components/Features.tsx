import { Search, Brain, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Browse Doctors",
    description: "Search through hundreds of qualified healthcare professionals by specialty, location, and availability.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent system matches you with the perfect doctor based on your needs and preferences.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Schedule appointments instantly with real-time availability. Manage all your bookings in one place.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern healthcare at your fingertips with powerful features designed for your convenience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;