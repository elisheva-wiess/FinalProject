import React, { useState } from "react";
import { User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import AppointmentDialog from "./AppointmentDialog";
import { SpecializationCardProps } from "@/types";

const specializationImages: Record<string, string> = {
  "קלינאות תקשורת": "https://images.unsplash.com/photo-1581091012184-7b61c1bf26a7",
  "טיפול רגשי": "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "ריפוי בעיסוק": "https://images.unsplash.com/photo-1588776814546-ec6c2aeb0c94",
  "אבחון דידקטי": "https://images.unsplash.com/photo-1554731617-fa6478214b1b",
  "אבחון פסיכולוגי": "https://images.unsplash.com/photo-1588774069262-dbd8d1a736a4"
};

const defaultImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
];

const badgeColors = [
  "bg-accent/60 text-primary border-primary",
  "bg-muted text-primary border-accent",
  "bg-accent/80 text-primary border-primary/80",
  "bg-muted/80 text-primary border-primary/30"
];

const SpecializationCard: React.FC<SpecializationCardProps> = ({ specialization }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const imageSrc =
    specialization.image ||
    specializationImages[specialization.specializationName] ||
    defaultImages[Math.floor(Math.random() * defaultImages.length)];

  const badgeColor =
    badgeColors[Math.floor(Math.random() * badgeColors.length)];

  return (
    <>
      <Card className="overflow-hidden shadow-xl hover:scale-105 hover:border-primary transition-all border bg-white flex flex-col animate-fade-in max-w-sm mx-auto">
        <div className="h-44 w-full bg-accent/80">
          <img
            src={imageSrc}
            alt={specialization.specializationName}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2 text-xl">
            <span className={`px-2 py-1 rounded-lg border font-bold mr-1 text-base ${badgeColor}`}>
              <User className="inline-block w-6 h-6 ml-2 text-primary align-middle" />
              {specialization.specializationName}
            </span>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-right">
            {specialization.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-0">
          <button
            className="w-full py-2 mt-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
            onClick={() => setDialogOpen(true)}
          >
            קבע תור
          </button>
        </CardContent>
      </Card>

      {/* דיאלוג אחיד לקביעת תור לפי התמחות */}
      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        specialization={{
          specializationId: specialization.specializationId,
          specializationName: specialization.specializationName,
          description: specialization.description
        }}
      />
    </>
  );
};

export default SpecializationCard;
