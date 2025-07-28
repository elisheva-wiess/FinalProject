import React from "react";
import { useNavigate } from "react-router-dom";
import { SpecializationType } from "@/types";

type Props = {
  specialization: SpecializationType;
};

const imageMap: { [key: string]: string } = {
  "1": "/specializationsImages/adhd.jpg",
  "2": "/specializationsImages/therapy-sport.jpg",
  "3": "/specializationsImages/neurology.jpg",
  "6": "/specializationsImages/horse-therapy.jpg",
  "7": "/specializationsImages/parent-guidance.jpg",
  "8": "/specializationsImages/counseling.jpg",
  "9": "/specializationsImages/occupational-therapy.jpg",
  "10": "/specializationsImages/adhd-diagnosis.jpg",
  "11": "/specializationsImages/cbt.jpg",
  "12": "/specializationsImages/learning-emotion.jpg",
  "13": "/specializationsImages/psychiatry.jpg",
  "14": "/specializationsImages/support-groups.jpg",
  "15": "/specializationsImages/sensory-emotional.jpg",
  "16": "/specializationsImages/emotional-kids.jpg",
  "17": "/specializationsImages/parent-training.jpg",
};

const SpecializationCard: React.FC<Props> = ({ specialization }) => {
  const navigate = useNavigate();
  const imageSrc = imageMap[String(specialization.id)] || "/specializationsImages/default.jpg";

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default overflow-hidden"
    >
      <img
        src={imageSrc}
        alt={specialization.specializationName}
        className="w-full h-56 object-cover object-top"
      />

      <div className="p-6 pb-12">
        <h2 className="text-2xl font-semibold mb-2">{specialization.specializationName}</h2>
        <p className="text-gray-600 line-clamp-3">{specialization.description}</p>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <span
          className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm cursor-pointer"
          onClick={() =>
            navigate(`/specializations/${encodeURIComponent(specialization.specializationName)}`)
          }
        >
          לפרטים
        </span>
      </div>
    </div>
  );
};

export default SpecializationCard;
