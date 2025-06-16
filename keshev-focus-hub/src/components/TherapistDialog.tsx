
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import TherapistList, { TherapistType } from "./TherapistList";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface TherapistDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  specialization: {
    specializationName: string;
    description: string;
    therapists?: TherapistType[];
  };
}

// Mock therapists data for demo
const DEMO_THERAPISTS: TherapistType[] = [
  {
    id: 1,
    name: "ד\"ר תמר כהן",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    details: "התמחות בנוירולוגיה ילדים",
    workHours: ["9:00-13:00", "14:00-18:00"]
  },
  {
    id: 2,
    name: "מר יוסי ישראלי",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    details: "טיפול CBT, מבוגרים",
    workHours: ["11:00-16:00"]
  }
];

const TherapistDialog: React.FC<TherapistDialogProps> = ({
  open,
  onOpenChange,
  specialization,
}) => {
  const therapists = specialization.therapists && specialization.therapists.length > 0
    ? specialization.therapists
    : DEMO_THERAPISTS;
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [appointmentSet, setAppointmentSet] = useState(false);

  // Mock available hours
  const hours = ["08:00", "09:30", "11:00", "13:00", "15:30", "17:00"];
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  // "קבע תור" מדומה (ברגע שיש API זה יעבוד אמיתי!)
  const handleSetAppointment = () => {
    setAppointmentSet(true);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        setSelectedTherapist(null);
        setSelectedDate(undefined);
        setStep(1);
        setAppointmentSet(false);
        setSelectedHour(null);
      }, 500);
    }, 1300); // success UI + סגירה אוטומטית
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg min-h-[430px] animate-fade-in">
        <DialogHeader>
          <DialogTitle>קביעת תור בהתמחות: <span className="text-primary">{specialization.specializationName}</span></DialogTitle>
          <DialogDescription>
            {step === 1 && "בחר מטפל מתוך אנשי הצוות בתחום"}
            {step === 2 && selectedTherapist && `בחר תאריך להיפגש עם ${selectedTherapist.name}`}
            {step === 3 && `בחר שעה פנויה לתור`}
            {appointmentSet && (
              <span className="text-green-600 font-bold">התור נקבע בהצלחה!</span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* שלב 1: בחר מטפל */}
        {step === 1 && (
          <TherapistList therapists={therapists} onSelect={(t) => {
            setSelectedTherapist(t);
            setStep(2);
          }} />
        )}

        {/* שלב 2: בחר תאריך */}
        {step === 2 && selectedTherapist && (
          <div className="flex flex-col items-center gap-4 mt-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
            <Button
              onClick={() => setStep(3)}
              disabled={!selectedDate}
              className="w-full mt-2"
            >
              המשך לבחירת שעה
            </Button>
            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={() => { setStep(1); setSelectedDate(undefined); setSelectedTherapist(null); }}
            >
              ← חזרה לרשימת מטפלים
            </Button>
          </div>
        )}

        {/* שלב 3: בחר שעה */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-3 mt-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              {hours.map((h) => (
                <Button
                  key={h}
                  variant={selectedHour === h ? "default" : "outline"}
                  onClick={() => setSelectedHour(h)}
                  className="w-full"
                >
                  {h}
                </Button>
              ))}
            </div>
            <Button
              className="w-full mt-2"
              onClick={handleSetAppointment}
              disabled={!selectedHour}
            >
              קבע תור
            </Button>
            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={() => setStep(2)}
            >
              ← חזרה לתאריך
            </Button>
          </div>
        )}

        {appointmentSet && (
          <div className="flex flex-col items-center gap-2 pt-3">
            <span className="text-green-600 font-semibold text-lg">🎉 התור נקבע בהצלחה!</span>
            <span className="text-sm text-muted-foreground">פרטי התור יוצגו בחשבונך</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TherapistDialog;
