import React from "react";
import { TherapistCard } from "./TherapistCard";
import { TherapistType } from "@/types";

interface TherapistListProps {
  therapists: TherapistType[];
  onSelect: (therapist: TherapistType) => void;
}

const TherapistList: React.FC<TherapistListProps> = ({ therapists, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-auto">
    {therapists && therapists.length > 0 ? (
      therapists.map((therapist) => (
        <TherapistCard
          key={therapist.id}
          therapist={therapist}
          onSelect={() => onSelect(therapist)} 
        />
      ))
    ) : (
      <div className="text-center text-muted-foreground py-4">
        לא נמצאו מטפלים.
      </div>
    )}
  </div>
);

export default TherapistList;

