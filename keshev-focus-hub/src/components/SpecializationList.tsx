
import React from "react";
import SpecializationCard from "./SpecializationCard";

type Specialization = {
  specializationName: string;
  description: string;
  image?: string;
  therapists?: any[];
};

interface Props {
  specializations: Specialization[];
}

const SpecializationList: React.FC<Props> = ({ specializations }) => {
  if (!specializations.length)
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground animate-fade-in">
        לא נמצאו התמחויות להצגה.
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {specializations.map((item, i) => (
        <SpecializationCard key={i} specialization={item} />
      ))}
    </div>
  );
};

export default SpecializationList;
