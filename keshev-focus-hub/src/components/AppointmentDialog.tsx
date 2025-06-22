import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/api/api";
import { AppointmentDialogProps } from "@/types";
import { useAppointmentDialog } from "@/hooks/useAppointmentDialog";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RefreshCcw } from "lucide-react";

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  open,
  onOpenChange,
  specialization,
  preselectedTherapist,
}) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    availableHours,
    loadingHours,
  } = useAppointmentDialog(preselectedTherapist);

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!open) {
      setSelectedDate(null);
      setSelectedHour(null);
    }
  }, [open]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    return (
      date < today ||
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };

  const handleSetAppointment = () => {
    if (!isLoggedIn || !user) {
      alert("עליך להתחבר למערכת כדי לקבוע תור.");
      return;
    }

    const patientId = user?.id;
    if (!patientId) {
      console.warn("User object:", user); // לבדיקה אם צריך
      alert("שגיאה בזיהוי המשתמש. אנא התחבר מחדש.");
      return;
    }

    if (!preselectedTherapist || !selectedDate || !selectedHour || !specialization) {
      alert("חסרים נתונים לקביעת התור.");
      return;
    }

    const request = {
      idPatient: patientId,
      idTherapist: preselectedTherapist.id,
      day: selectedHour.date
    };

    Appointment.makeAppointment(request)
      .then(() => {
        alert("התור נקבע בהצלחה!");
        onOpenChange(false);
      })
      .catch((err) => {
        console.error("Appointment error:", err);
        alert("שגיאה בקביעת התור");
      });
  };

  if (!preselectedTherapist) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent aria-describedby="appointment-dialog-description">
          <p id="appointment-dialog-description" className="text-center text-red-500">
            אין מטפל נבחר.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg min-h-[400px] max-h-[90vh] overflow-y-auto mt-8"
        aria-describedby="appointment-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-extrabold bg-gradient-to-r from-amber-700 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            {specialization ? `קביעת תור: ${specialization.specializationName}` : "קביעת תור"}
          </DialogTitle>
        </DialogHeader>

        <p id="appointment-dialog-description" className="sr-only">
          בחר תאריך ושעה לקביעת תור.
        </p>

        <div className="flex justify-end w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedDate(null);
              setSelectedHour(null);
            }}
          >
            <RefreshCcw className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
          />
        </div>

        <div className="flex flex-col items-center gap-3 mt-4">
          {selectedDate && (
            loadingHours ? (
              <p>טוען שעות זמינות...</p>
            ) : availableHours.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 w-full text-right">
                {availableHours.map((h) => (
                  <Button
                    key={`${h.date}-${h.startTime}`}
                    variant={selectedHour?.startTime === h.startTime ? "default" : "outline"}
                    onClick={() => setSelectedHour(h)}
                  >
                    {`${h.startTime} - ${h.endTime}`}
                  </Button>
                ))}
              </div>
            ) : (
              <p>אין שעות זמינות ביום זה.</p>
            )
          )}
        </div>

        <Button
          disabled={!selectedHour}
          onClick={handleSetAppointment}
          className="mt-4 w-full"
        >
          קבע תור
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;



// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Appointment } from "@/api/api";
// import { AppointmentDialogProps } from "@/types";
// import { useAppointmentDialog } from "@/hooks/useAppointmentDialog";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { RefreshCcw } from "lucide-react";

// const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
//   open,
//   onOpenChange,
//   specialization,
//   preselectedTherapist,
// }) => {
//   const {
//     selectedDate,
//     setSelectedDate,
//     selectedHour,
//     setSelectedHour,
//     availableHours,
//     setAvailableHours, // חשוב
//     loadingHours,
//   } = useAppointmentDialog(preselectedTherapist);

//   const user = useSelector((state: RootState) => state.auth.user);
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

//   useEffect(() => {
//     if (!open) {
//       setSelectedDate(null);
//       setSelectedHour(null);
//     }
//   }, [open]);

//   const isDateDisabled = (date: Date) => {
//     const today = new Date();
//     return (
//       date < today ||
//       date.getMonth() !== today.getMonth() ||
//       date.getFullYear() !== today.getFullYear()
//     );
//   };

//   const handleSetAppointment = () => {
//     if (!isLoggedIn || !user) {
//       alert("עליך להתחבר למערכת כדי לקבוע תור.");
//       return;
//     }

//     const patientId = user?.id;
//     if (!patientId) {
//       console.warn("User object:", user);
//       alert("שגיאה בזיהוי המשתמש. אנא התחבר מחדש.");
//       return;
//     }

//     if (!preselectedTherapist || !selectedDate || !selectedHour || !specialization) {
//       alert("חסרים נתונים לקביעת התור.");
//       return;
//     }

//     const request = {
//       idPatient: patientId,
//       idTherapist: preselectedTherapist.id,
//       day: selectedHour.date,
//     };

//     Appointment.makeAppointment(request)
//       .then(() => {
//         alert("התור נקבע בהצלחה!");

//         // מחיקת התור מה־availableHours
//         const updatedHours = availableHours.filter(
//           (h) => !(h.date === selectedHour.date && h.startTime === selectedHour.startTime)
//         );
//         setAvailableHours(updatedHours);

//         // איפוס הבחירה
//         setSelectedHour(null);
//         setSelectedDate(null);

//         onOpenChange(false); // סגירת המודאל
//       })
//       .catch((err) => {
//         console.error("Appointment error:", err);
//         alert("שגיאה בקביעת התור");
//       });
//   };

//   if (!preselectedTherapist) {
//     return (
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent aria-describedby="appointment-dialog-description">
//           <p id="appointment-dialog-description" className="text-center text-red-500">
//             אין מטפל נבחר.
//           </p>
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className="max-w-lg min-h-[400px] max-h-[90vh] overflow-y-auto mt-8"
//         aria-describedby="appointment-dialog-description"
//       >
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-extrabold bg-gradient-to-r from-amber-700 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
//             {specialization ? `קביעת תור: ${specialization.specializationName}` : "קביעת תור"}
//           </DialogTitle>
//         </DialogHeader>

//         <p id="appointment-dialog-description" className="sr-only">
//           בחר תאריך ושעה לקביעת תור.
//         </p>

//         <div className="flex justify-end w-full">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => {
//               setSelectedDate(null);
//               setSelectedHour(null);
//             }}
//           >
//             <RefreshCcw className="w-5 h-5" />
//           </Button>
//         </div>

//         <div className="flex flex-col items-center gap-4">
//           <Calendar
//             mode="single"
//             selected={selectedDate ?? undefined}
//             onSelect={setSelectedDate}
//             disabled={isDateDisabled}
//           />
//         </div>

//         <div className="flex flex-col items-center gap-3 mt-4">
//           {selectedDate && (
//             loadingHours ? (
//               <p>טוען שעות זמינות...</p>
//             ) : availableHours.length > 0 ? (
//               <div className="grid grid-cols-2 gap-2 w-full text-right">
//                 {availableHours.map((h) => (
//                   <Button
//                     key={`${h.date}-${h.startTime}`}
//                     variant={selectedHour?.startTime === h.startTime ? "default" : "outline"}
//                     onClick={() => setSelectedHour(h)}
//                   >
//                     {`${h.startTime} - ${h.endTime}`}
//                   </Button>
//                 ))}
//               </div>
//             ) : (
//               <p>אין שעות זמינות ביום זה.</p>
//             )
//           )}
//         </div>

//         <Button
//           disabled={!selectedHour}
//           onClick={handleSetAppointment}
//           className="mt-4 w-full"
//         >
//           קבע תור
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AppointmentDialog;
