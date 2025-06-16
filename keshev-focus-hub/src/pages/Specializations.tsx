
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://localhost:7102/api/";

const SpecializationsPage = () => {
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState<any>(null);
  const [appointments, setAppointments] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // שליפת כל ההתמחויות
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(BASE_URL + "Specialization/GetAllSpecializations")
      .then((res) => setSpecializations(res.data))
      .catch(() => setError("שגיאה בטעינת ההתמחויות"))
      .finally(() => setLoading(false));
  }, []);

  // שליפת תורים ומטפלים להתמחות שנבחרה
  useEffect(() => {
    if (!selectedSpec) return;
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(BASE_URL + "Appointment/GetAvailableAppointments", {
        params: { specializationId: selectedSpec.specializationId },
      }),
      axios.get(BASE_URL + "Specialization/GetTherapistsBySpecializationName", {
        params: { name: selectedSpec.specializationName },
      }),
    ])
      .then(([apps, ths]) => {
        setAppointments(apps.data);
        // טיפול בשגיאות – הפיכת המטפלים לאובייקט עם שם מובטח  
        let mappedTherapists = (ths.data && Array.isArray(ths.data)
          ? ths.data
          : []
        ).map((t: any, idx: number) => ({
          ...t,
          name: t.fullName || t.name || `מטפל/ת ${idx + 1}`,
          avatar: t.avatar || "https://cdn.pixabay.com/photo/2018/01/15/07/52/people-3084386_1280.jpg",
          workHours: (t.workHours && Array.isArray(t.workHours)) ? t.workHours : [],
        }));
        setTherapists(mappedTherapists);
      })
      .catch(() => setError("שגיאה בטעינת תורים/מטפלים"))
      .finally(() => setLoading(false));
  }, [selectedSpec]);

  return (
    <main className="min-h-[80vh] w-full bg-gradient-to-br from-accent/10 to-primary/5 pb-20 pt-28 px-3">
      <div className="max-w-7xl mx-auto pt-8 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-primary text-center drop-shadow-lg">
          בחר/י התמחות
        </h1>
        {loading && (
          <div className="my-20 text-lg text-primary font-bold text-center">
            טוען...
          </div>
        )}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {specializations.map((s: any, i) => (
            <div
              key={i}
              className={`bg-white border border-primary/20 rounded-2xl shadow-xl p-7 flex flex-col gap-2 hover:scale-105 cursor-pointer transition hover:border-primary/50 ${
                selectedSpec && selectedSpec.specializationId === s.specializationId
                  ? "ring-primary ring-2"
                  : ""
              }`}
              onClick={() => setSelectedSpec(s)}
            >
              <h3 className="text-2xl font-bold text-primary mb-1">
                {s.specializationName}
              </h3>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
        {/* אם נבחרה התמחות, הצג תורים ומטפלים */}
        {selectedSpec && (
          <div className="mt-14 max-w-3xl mx-auto bg-white/95 border border-muted rounded-2xl p-7 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              תורים זמינים להתמחות: {selectedSpec.specializationName}
            </h2>
            {loading && (
              <div className="my-10 text-lg text-primary font-bold text-center">
                טוען...
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-primary">
                מטפלים בתחום:
              </h3>
              {therapists.length === 0 && !loading ? (
                <div className="text-muted-foreground text-center">
                  לא נמצאו מטפלים לתחום זה.
                </div>
              ) : (
                <ul className="space-y-2">
                  {therapists.map((t: any, idx: number) => (
                    <li
                      key={t.id ?? idx}
                      className="flex items-center gap-2 border-b pb-1"
                    >
                      <img
                        src={
                          t.avatar ||
                          "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=700&q=80"
                        }
                        alt={t.name}
                        className="w-8 h-8 rounded-full border"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=700&q=80")
                        }
                      />
                      <span className="font-semibold text-primary">
                        {t.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Array.isArray(t.workHours) ? t.workHours.join(" | ") : (t.workHours || "")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-primary">תורים זמינים:</h3>
              {appointments.length === 0 && !loading ? (
                <div className="text-muted-foreground text-center">
                  אין תורים זמינים כרגע.
                </div>
              ) : (
                <ul className="divide-y">
                  {appointments.map((app: any, idx: number) => (
                    <li
                      key={idx}
                      className="py-2 flex justify-between items-center"
                    >
                      <span className="font-semibold text-accent-foreground">
                        {app.date} {app.hour && `- ${app.hour}`}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => setSelectedSpec(null)}
              className="mt-5 bg-accent text-primary-foreground px-6 py-2 rounded-lg shadow-md hover:bg-primary/80 hover:text-white transition"
            >
              חזור לרשימת התמחויות
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
export default SpecializationsPage;
