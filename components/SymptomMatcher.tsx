"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { matchSymptoms, type SymptomMatchResult } from "@/utils/symptomMatcher";

const SymptomMatcher = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<SymptomMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckMatch = () => {
    if (!symptoms.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate AI processing delay for better UX
    setTimeout(() => {
      const matchResult = matchSymptoms(symptoms);
      setResult(matchResult);
      setIsLoading(false);
    }, 500);
  };

  const getMatchLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-success text-success-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-foreground mb-2">Symptom Matcher</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Describe your symptoms and get AI-powered specialty recommendations
        </p>
        
        <div className="space-y-3">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="E.g., I have been experiencing severe headaches and dizziness for the past week..."
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            rows={4}
          />
          
          <Button
            onClick={handleCheckMatch}
            disabled={!symptoms.trim() || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Check Match with AI
              </>
            )}
          </Button>
        </div>
      </div>

      {result && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Match Result</CardTitle>
              <Badge className={getMatchLevelColor(result.matchLevel)}>
                {result.matchLevel} Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Recommended Specialty
              </p>
              <p className="text-base font-semibold text-foreground">
                {result.recommendedSpecialty}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Reason
              </p>
              <p className="text-sm text-foreground">
                {result.reason}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomMatcher;

