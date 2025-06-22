import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Therapist } from "@/api/api";
import { TherapistCardProps, WorkHourFromServer } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const TherapistCard: React.FC<TherapistCardProps> = ({ therapist, onSelect }) => {
  const [workHours, setWorkHours] = useState<{ [day: string]: string[] }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    Therapist.getWorkingHours(therapist.id)
      .then((res) => {
        const data: WorkHourFromServer[] = res.data;
        const formatted: { [day: string]: string[] } = {};

        data.forEach((item) => {
          const { dayOfWeek, startTime, endTime } = item;
          if (!formatted[dayOfWeek]) formatted[dayOfWeek] = [];

          const start = startTime.substring(0, 5);
          const end = endTime.substring(0, 5);

          formatted[dayOfWeek].push(`${end} - ${start}`);
        });

        setWorkHours(formatted);
      })
      .catch(() => setWorkHours({}))
      .finally(() => setLoading(false));
  }, [therapist.id]);

  const renderWorkHours = () => {
    if (loading) return <p className="text-gray-500 text-sm">טוען שעות עבודה...</p>;
    if (!workHours || Object.keys(workHours).length === 0) return <p>אין שעות עבודה זמינות</p>;

    return (
      <ul className="text-sm text-gray-700 space-y-1 mt-2">
        {Object.entries(workHours).map(([day, hours]) => (
          <li key={day}>
            <span className="font-semibold">{day}:</span>{" "}
            {hours.length > 0 ? hours.join(" | ") : "אין שעות"}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg shadow-md bg-white p-6 transition-transform hover:scale-105 h-full">
      <div className="flex flex-col items-center">
        {therapist.avatar ? (
          <img
            src={therapist.avatar}
            alt={therapist.name}
            className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-brown-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
            ללא תמונה
          </div>
        )}
        <h2 className="text-3xl text-center font-extrabold text-amber-800 mb-8 underline decoration-amber-600">{therapist.name}</h2>
        <div className="w-full">{renderWorkHours()}</div>
      </div>

      {/* כפתור קבע תור יופיע רק אם המשתמש מחובר וגם מטופל */}
      {isLoggedIn && role === "patient" && (
        <Button
          onClick={() => onSelect(therapist)}
          className="mt-4 w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold hover:from-orange-500 hover:to-yellow-600 rounded"
        >
          קבע תור
        </Button>
      )}
    </div>
  );
};
