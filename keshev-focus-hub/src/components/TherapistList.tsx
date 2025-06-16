
import React from "react";
import TherapistCard from "./TherapistCard";

export type TherapistType = {
  id: number;
  name: string;
  avatar?: string;
  details?: string;
  workHours?: string[];
};

interface TherapistListProps {
  therapists: TherapistType[];
  onSelect: (therapist: TherapistType) => void;
}

const TherapistList: React.FC<TherapistListProps> = ({ therapists, onSelect }) => (
  <div className="grid grid-cols-1 gap-4 max-h-72 overflow-auto">
    {therapists && therapists.length > 0 ? (
      therapists.map((therapist) => (
        <TherapistCard key={therapist.id} therapist={therapist} onSelect={onSelect} />
      ))
    ) : (
      <div className="text-center text-muted-foreground py-4">
        לא נמצאו מטפלים.
      </div>
    )}
  </div>
);

export default TherapistList;
