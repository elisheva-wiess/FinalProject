export type TherapistType = {
  id: string;
  name: string;
  avatar?: string;
  sessionDuration: number;
  workHours: {
    [day: string]: string[];
  };
};

export type SpecializationType = {
  id: string;
  specializationName: string;
  description: string;
  image?: string;
};

export type SpecializationCardProps = {
  specialization: {
    specializationId: string;
    specializationName: string;
    description: string;
    image?: string;
    therapists?: TherapistType[];
  };
}

export type TherapistCardProps = {
  therapist: TherapistType;
  onSelect: (therapist: TherapistType) => void; 
  showBookButton?: boolean;
};

export type WorkHourFromServer = {
  dayOfWeek: string;
  startTime: string; 
  endTime: string; 
  treatmentTime: number;
};

export interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  specialization: {
    specializationId: string;
    specializationName: string;
    description: string;
  };
  preselectedTherapist?: TherapistType | null; 
}

export type AvailableHour = {
  date: string;
  therapistId: string;
  startTime: string;
  endTime: string;
};

export interface BlTherapistDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string | null;
  yearsOfExperience?: number | null;
  specializations: string[]; 
}


