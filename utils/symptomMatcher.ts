import type { Specialty } from "@/types/Doctor";

export type MatchLevel = "High" | "Medium" | "Low";

export interface SymptomMatchResult {
  matchLevel: MatchLevel;
  recommendedSpecialty: Specialty;
  reason: string;
  matchedKeywords: string[];
}

// Keyword mapping for each specialty
const specialtyKeywords: Record<Specialty, string[]> = {
  Dermatologist: [
    "skin", "rash", "acne", "eczema", "pigmentation", "hair fall", "allergy",
    "dermatitis", "psoriasis", "infection", "fungal", "itchy", "redness",
    "blister", "wart", "mole", "hair loss", "baldness", "scalp"
  ],
  Neurologist: [
    "headache", "migraine", "seizure", "sleep disorder", "stroke", "dizziness",
    "vertigo", "epilepsy", "tremor", "numbness", "tingling", "memory loss",
    "confusion", "neurological", "brain", "nerve", "paralysis", "convulsion"
  ],
  Psychiatrist: [
    "anxiety", "depression", "stress", "panic", "mood", "trauma", "mental health",
    "bipolar", "schizophrenia", "obsessive", "compulsive", "phobia", "eating disorder",
    "addiction", "suicidal", "emotional", "behavioral", "therapy", "counseling"
  ],
  "General Physician": [
    "fever", "cough", "cold", "sore throat", "infection", "flu", "diabetes", "BP",
    "blood pressure", "viral", "bacterial", "nausea", "vomiting", "diarrhea",
    "fatigue", "weakness", "general", "routine", "checkup", "health"
  ],
  Cardiologist: [
    "chest pain", "heart", "palpitation", "BP", "arrhythmia", "cardiac",
    "cardiovascular", "hypertension", "heart attack", "angina", "breathlessness",
    "shortness of breath", "heart rate", "irregular", "cardiac arrest"
  ],
  Pediatrician: [
    "child", "children", "baby", "infant", "growth", "pediatric", "kid",
    "toddler", "newborn", "adolescent", "teen", "development", "vaccination",
    "immunization", "feeding", "nutrition", "milestone", "pediatric"
  ]
};

/**
 * Rule-based symptom matcher that maps symptoms to medical specialties
 * @param symptoms - Text description of symptoms
 * @returns Match result with level, recommended specialty, and reason
 */
export function matchSymptoms(symptoms: string): SymptomMatchResult {
  if (!symptoms || symptoms.trim().length === 0) {
    return {
      matchLevel: "Low",
      recommendedSpecialty: "General Physician",
      reason: "Please describe your symptoms for a better match.",
      matchedKeywords: []
    };
  }

  const lowerSymptoms = symptoms.toLowerCase();
  const specialtyScores: Record<Specialty, { count: number; keywords: string[] }> = {
    Dermatologist: { count: 0, keywords: [] },
    Neurologist: { count: 0, keywords: [] },
    Psychiatrist: { count: 0, keywords: [] },
    "General Physician": { count: 0, keywords: [] },
    Cardiologist: { count: 0, keywords: [] },
    Pediatrician: { count: 0, keywords: [] }
  };

  // Count keyword matches for each specialty
  Object.entries(specialtyKeywords).forEach(([specialty, keywords]) => {
    keywords.forEach((keyword) => {
      if (lowerSymptoms.includes(keyword)) {
        specialtyScores[specialty as Specialty].count++;
        specialtyScores[specialty as Specialty].keywords.push(keyword);
      }
    });
  });

  // Find the specialty with the highest score
  let maxScore = 0;
  let recommendedSpecialty: Specialty = "General Physician";
  let matchedKeywords: string[] = [];

  Object.entries(specialtyScores).forEach(([specialty, data]) => {
    if (data.count > maxScore) {
      maxScore = data.count;
      recommendedSpecialty = specialty as Specialty;
      matchedKeywords = data.keywords;
    }
  });

  // Determine match level
  let matchLevel: MatchLevel;
  if (maxScore >= 3) {
    matchLevel = "High";
  } else if (maxScore === 2) {
    matchLevel = "Medium";
  } else if (maxScore === 1) {
    matchLevel = "Low";
  } else {
    matchLevel = "Low";
    recommendedSpecialty = "General Physician";
  }

  // Generate reason
  let reason: string;
  if (maxScore === 0) {
    reason = "No specific specialty match found. A General Physician can help assess your symptoms.";
  } else {
    const keywordList = matchedKeywords.slice(0, 3).join(", ");
    reason = `Based on keywords like "${keywordList}"${matchedKeywords.length > 3 ? " and more" : ""}, a ${recommendedSpecialty} is recommended.`;
  }

  return {
    matchLevel,
    recommendedSpecialty,
    reason,
    matchedKeywords
  };
}

