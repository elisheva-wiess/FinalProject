import { useEffect, useState } from "react";
import { Therapist } from "@/api/api";
import { BlTherapistDto } from "@/types";
import { useNavigate } from "react-router-dom";

const TherapistListPage = () => {
  const [therapists, setTherapists] = useState<BlTherapistDto[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Therapist.getAll()
      .then(res => setTherapists(res.data))
      .catch(() => setError("שגיאה בטעינת המטפלים"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">טוען...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gradient-to-b from-yellow-100 to-amber-200 min-h-screen">
      <button
        onClick={() => navigate("/specializations")}
        className="mb-6 text-orange-600 hover:text-orange-800 font-semibold underline"
      >
        ← לקביעת תורים 
      </button>

      <h2 className="text-3xl text-center font-extrabold text-amber-800 mb-8 underline decoration-amber-600">
        רשימת מטפלים
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {therapists.map((therapist, index) => (
          <div
            key={index}
            className="bg-amber-50 border border-amber-200 rounded-2xl shadow-lg p-6 space-y-4 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-bold text-center text-amber-800">
              {therapist.firstName} {therapist.lastName}
            </h3>
            <p className="text-brown-800"><strong>טלפון:</strong> {therapist.phoneNumber}</p>
            <p className="text-brown-800"><strong>אימייל:</strong> {therapist.email || "לא צויין"}</p>
            <p className="text-brown-800"><strong>שנות ניסיון:</strong> {therapist.yearsOfExperience ?? "לא צויין"}</p>
            <p className="text-brown-800"><strong>התמחויות:</strong> {therapist.specializations.length > 0 ? therapist.specializations.join(", ") : "לא צויין"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistListPage;
