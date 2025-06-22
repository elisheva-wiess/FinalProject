import { useState, useEffect } from "react";
import { Appointment } from "@/api/api";
import { AvailableHour, AppointmentDialogProps } from "@/types";

export const useAppointmentDialog = (preselectedTherapist: AppointmentDialogProps['preselectedTherapist']) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<AvailableHour | null>(null);
  const [availableHours, setAvailableHours] = useState<AvailableHour[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);

  // טעינת שעות לתאריך מסוים בלבד
  useEffect(() => {
    if (preselectedTherapist && selectedDate) {
      setLoadingHours(true);
      const dateString = selectedDate.toISOString().split("T")[0];
      Appointment.allHourSpecificDayAndTherapist(preselectedTherapist.id, dateString)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setAvailableHours(res.data);
          } else {
            setAvailableHours([]);
          }
        })
        .catch(() => setAvailableHours([]))
        .finally(() => setLoadingHours(false));
    } else {
      setAvailableHours([]);
    }
  }, [preselectedTherapist, selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(null);
      setAvailableHours([]);
      return;
    }
    // בחירה חדשה מאפסת את השעה שנבחרה
    setSelectedHour(null);
    setSelectedDate(date);
  };

  return {
    selectedDate,
    setSelectedDate: handleDateSelect,
    selectedHour,
    setSelectedHour,
    availableHours,
    loadingHours
  }; 
};


// import { useState, useEffect } from "react";
// import { Appointment } from "@/api/api";
// import { AvailableHour, AppointmentDialogProps } from "@/types";

// export const useAppointmentDialog = (preselectedTherapist: AppointmentDialogProps['preselectedTherapist']) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedHour, setSelectedHour] = useState<AvailableHour | null>(null);
//   const [availableHours, setAvailableHours] = useState<AvailableHour[]>([]);
//   const [loadingHours, setLoadingHours] = useState(false);

//   useEffect(() => {
//     if (preselectedTherapist && selectedDate) {
//       setLoadingHours(true);
//       const dateString = selectedDate.toISOString().split("T")[0];
//       Appointment.allHourSpecificDayAndTherapist(preselectedTherapist.id, dateString)
//         .then((res) => {
//           if (Array.isArray(res.data)) {
//             setAvailableHours(res.data);
//           } else {
//             setAvailableHours([]);
//           }
//         })
//         .catch(() => setAvailableHours([]))
//         .finally(() => setLoadingHours(false));
//     } else {
//       setAvailableHours([]);
//     }
//   }, [preselectedTherapist, selectedDate]);

//   const handleDateSelect = (date: Date | undefined) => {
//     if (!date) {
//       setSelectedDate(null);
//       setAvailableHours([]);
//       return;
//     }
//     setSelectedHour(null);
//     setSelectedDate(date);
//   };

//   return {
//     selectedDate,
//     setSelectedDate: handleDateSelect,
//     selectedHour,
//     setSelectedHour,
//     availableHours,
//     setAvailableHours, 
//     loadingHours
//   };
// };
