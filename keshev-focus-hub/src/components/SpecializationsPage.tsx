import React, { useEffect, useState } from "react";
import { Specialization } from "@/api/api";
import { SpecializationType } from "@/types";
import SpecializationList from "@/components/SpecializationList";

const SpecializationsPage: React.FC = () => {
  const [specializations, setSpecializations] = useState<SpecializationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <h1 className="text-3xl text-center font-extrabold text-amber-800 mb-8 underline decoration-amber-600">
        ההתמחויות שלנו
      </h1>
      <SpecializationList specializations={specializations} />
    </main>
  );
};

export default SpecializationsPage;
