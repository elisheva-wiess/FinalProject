import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Specialization } from "@/api/api";
import { SpecializationType } from "@/types";

const imageMap: { [key: string]: string } = {
  "1": "/specializationsImages/psychology.jpg",
  "2": "/specializationsImages/physiotherapy.jpg",
  "3": "/specializationsImages/childDevelopment.jpg",
  "6": "/specializationsImages/childDevelopment.jpg",
  "7": "/specializationsImages/childDevelopment.jpg",
  "8": "/specializationsImages/childDevelopment.jpg",
  "9": "/specializationsImages/childDevelopment.jpg",
  "10": "/specializationsImages/childDevelopment.jpg",
  "11": "/specializationsImages/childDevelopment.jpg",
  "12": "/specializationsImages/childDevelopment.jpg",
  "13": "/specializationsImages/childDevelopment.jpg",
  "14": "/specializationsImages/childDevelopment.jpg",
  "15": "/specializationsImages/childDevelopment.jpg",
  "16": "/specializationsImages/childDevelopment.jpg",
  "17": "/specializationsImages/childDevelopment.jpg",
};

const SpecializationsPage: React.FC = () => {
  const [specializations, setSpecializations] = useState<SpecializationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    Specialization.getAll()
      .then(res => setSpecializations(res.data))
      .catch(() => setError("שגיאה בטעינת ההתמחויות"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">טוען...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl text-center font-extrabold text-amber-800 mb-8 underline decoration-amber-600">ההתמחויות שלנו</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specializations.map(s => (
          <div
            key={s.specializationName}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default overflow-hidden"
          >
            <img
              src={imageMap[s.specializationId] || "/specializationsImages/default.jpg"} // אם לא נמצא מיפוי תשתמש בתמונה ברירת מחדל
              alt={s.specializationName}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 pb-12">
              <h2 className="text-2xl font-semibold mb-2">{s.specializationName}</h2>
              <p className="text-gray-600 line-clamp-3">{s.description}</p>
            </div>
            <div className="absolute bottom-4 right-4 z-10">
              <span
                className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm cursor-pointer"
                onClick={() =>
                  navigate(`/specializations/${encodeURIComponent(s.specializationName)}`)
                }
              >
                לפרטים
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SpecializationsPage;
