import React, { useEffect, useState } from 'react';
import { getTherapists } from '../services/apiService'; 

const TherapistSelection = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      const response = await getTherapists();
      setTherapists(response.data);
    };
    fetchTherapists();
  }, []);

  return (
    <div>
      <h2>בחר מטפל</h2>
      {therapists.map(therapist => (
        <div key={therapist.id}>{therapist.name}</div>
      ))}
    </div>
  );
};

export default TherapistSelection;
