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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RefreshCcw } from "lucide-react";

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  open,
  onOpenChange,
  specialization,
  preselectedTherapist,
}) => {
  const [refreshHours, setRefreshHours] = useState(0);

  const {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    availableHours,
    loadingHours,
  } = useAppointmentDialog(preselectedTherapist, refreshHours);

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [hoursModalOpen, setHoursModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedDate(null);
      setSelectedHour(null);
      setHoursModalOpen(false);
      setIsSubmitting(false);
    }
  }, [open]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return (
      dateWithoutTime < todayWithoutTime ||
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };

  const handleSetAppointment = async () => {
    if (!isLoggedIn || !user) {
      alert("עליך להתחבר למערכת כדי לקבוע תור.");
      return;
    }

    if (!preselectedTherapist || !selectedDate || !selectedHour) {
      alert("חסרים נתונים לקביעת התור.");
      return;
    }

    setIsSubmitting(true);

    try {
      const [hour, minute] = selectedHour.startTime.split(":").map(Number);
      const localDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute,
        0
      );

      if (isNaN(localDateTime.getTime())) {
        alert("שגיאה בעיבוד מועד התור. נסה לבחור שעה מחדש.");
        return;
      }

      const isoLocalDateTime = localDateTime.toISOString();

      const request = {
        IdPatient: user.id,
        IdTherapist: preselectedTherapist.id.trim(),
        Day: isoLocalDateTime,
      };

      console.log("Request to send:", request);

      const response = await Appointment.makeAppointment(request);

      if (response.status >= 200 && response.status < 300) {
        alert("התור נקבע בהצלחה!");
        onOpenChange(false);
        setHoursModalOpen(false);
        setRefreshHours((prev) => prev + 1);
        setSelectedDate(null);
        setSelectedHour(null);
      } else {
        alert("שגיאה בקביעת התור. נסה שוב מאוחר יותר.");
      }
    } catch (err: any) {
      console.error("Appointment error:", err);
      if (err.response?.data?.message) {
        alert("שגיאה בקביעת התור: " + err.response.data.message);
      } else {
        alert("שגיאה בלתי צפויה בקביעת התור.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const uniqueHours = Array.from(
    new Map(availableHours.map((h) => [`${h.date}-${h.startTime}`, h])).values()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg min-h-[400px] max-h-[90vh] overflow-y-auto mt-8"
        aria-describedby="appointment-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-extrabold bg-gradient-to-r from-amber-700 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            {specialization
              ? `קביעת תור: ${specialization.specializationName}`
              : "קביעת תור"}
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
              setHoursModalOpen(false);
              setRefreshHours((prev) => prev + 1);
            }}
            disabled={isSubmitting}
          >
            <RefreshCcw className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedHour(null);
              if (date) setHoursModalOpen(true);
            }}
            disabled={isDateDisabled}
          />
        </div>

        <Dialog open={hoursModalOpen} onOpenChange={setHoursModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                שעות זמינות לתאריך {selectedDate?.toLocaleDateString()}
              </DialogTitle>
            </DialogHeader>

            {loadingHours ? (
              <p>טוען שעות זמינות...</p>
            ) : uniqueHours.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 w-full text-right">
                {uniqueHours.map((h) => (
                  <Button
                    key={`${h.date}-${h.startTime}`}
                    variant={
                      selectedHour?.startTime === h.startTime
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedHour(h)}
                    disabled={isSubmitting}
                  >
                    {`${h.startTime} - ${h.endTime}`}
                  </Button>
                ))}
              </div>
            ) : (
              <p>אין שעות זמינות ביום זה.</p>
            )}

            <Button
              disabled={!selectedHour || isSubmitting}
              onClick={handleSetAppointment}
              className="mt-4 w-full"
            >
              {isSubmitting ? "שולח..." : "קבע תור"}
            </Button>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
