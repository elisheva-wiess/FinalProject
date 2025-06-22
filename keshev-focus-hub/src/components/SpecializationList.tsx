import React from "react";
import SpecializationCard from "./SpecializationCard";
import { SpecializationType } from "@/types";

type Props = {
  specializations: SpecializationType[];
};

const SpecializationList: React.FC<Props> = ({ specializations }) => {
  if (!specializations.length)
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground animate-fade-in">
        לא נמצאו התמחויות להצגה.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {specializations.map((item) => (
        <SpecializationCard key={item.specializationId} specialization={item} />
      ))}
    </div>
  );
};

export default SpecializationList;
