
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TherapistType = {
  id: number;
  name: string;
  avatar?: string;
  details?: string;
  workHours?: string[];
};

interface TherapistCardProps {
  therapist: TherapistType;
  onSelect: (therapist: TherapistType) => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist, onSelect }) => (
  <Card className="flex flex-row items-center gap-3 py-2 px-3 m-0 animate-fade-in hover:shadow-lg transition">
    <img
      src={therapist.avatar || "https://cdn.pixabay.com/photo/2018/01/15/07/52/people-3084386_1280.jpg"}
      alt={therapist.name}
      className="rounded-full w-14 h-14 border-2 border-primary object-cover"
      loading="lazy"
    />
    <CardContent className="overflow-auto flex-1 p-0">
      <CardTitle className="mb-0 text-primary text-lg">{therapist.name}</CardTitle>
      <CardDescription className="mb-1">{therapist.details}</CardDescription>
      <span className="text-xs text-muted-foreground">{therapist.workHours?.join(" | ")}</span>
    </CardContent>
    <Button className="ml-4" onClick={() => onSelect(therapist)}>
      בחר
    </Button>
  </Card>
);

export default TherapistCard;
