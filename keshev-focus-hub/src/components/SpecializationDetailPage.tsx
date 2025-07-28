import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Specialization } from "@/api/api";
import { TherapistCard } from "./TherapistCard";
import AppointmentDialog from "./AppointmentDialog";
import { TherapistType, SpecializationType } from "@/types";

const SpecializationDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState<TherapistType[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistType | null>(null);
  const [specialization, setSpecialization] = useState<SpecializationType | null>(null);

  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!name) return;
    Specialization.getAll().then((res) => {
      const all = res.data as SpecializationType[];
      const found = all.find((spec) => spec.specializationName === name);
      if (found) setSpecialization(found);
    });
  }, [name]);

  useEffect(() => {
    if (!name) return;
    Specialization.getTherapistsByName(name).then((res) => {
      const data = Array.isArray(res.data) ? res.data : [];
      const formatted = data.map((t: any, idx: number) => ({
        id: t.therapistsId || `t${idx}`,
        name: `${t.firstName} ${t.lastName}`,
        avatar: t.avatar,
        workHours: t.workHours || {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        },
        sessionDuration: t.sessionDuration || 30,
      }));
      setTherapists(formatted);
    });
  }, [name]);

  const canBookAppointment = isLoggedIn && role === "patient";

  return (
    <div className="p-8 bg-gradient-to-b from-orange-50 to-yellow-100 min-h-screen">
      <button
        onClick={() => navigate("/specializations")}
        className="mb-6 text-orange-600 hover:text-orange-800 font-semibold underline"
      >
        ← חזרה להתמחויות
      </button>

      {specialization && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brown-800 mb-6">
            {specialization.specializationName}
          </h1>
          {specialization.image && (
            <img
              src={specialization.image}
              alt={specialization.specializationName}
              className="mx-auto rounded-xl shadow-lg mb-6 max-h-80 object-cover"
            />
          )}
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {specialization.description}
          </p>
        </div>
      )}

      <h2 className="text-2xl text-center font-semibold text-[#8B4513] mb-6 underline decoration-[#8B4513]">
        מטפלים בתחום
      </h2>
      <h3 className="text-xl text-center font-semibold text-[#8B4513] mb-6 underline decoration-[#8B4513]">
        לקביעת תורים יש להתחבר למערכת
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((t) => (
          <TherapistCard
            key={t.id}
            therapist={t}
            onSelect={canBookAppointment ? () => setSelectedTherapist(t) : undefined}
            showBookButton={canBookAppointment} 
          />
        ))}
      </div>

      {specialization && canBookAppointment && (
        <AppointmentDialog
          open={!!selectedTherapist}
          onOpenChange={(val) => {
            if (!val) setSelectedTherapist(null);
          }}
          specialization={{
            specializationId: specialization.id,
            specializationName: specialization.specializationName,
            description: specialization.description,
          }}
          preselectedTherapist={selectedTherapist}
        />
      )}
    </div>
  );
};

export default SpecializationDetailPage;
