// TherapistArea.tsx
import React from 'react';

interface TherapistAreaProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TherapistArea: React.FC<TherapistAreaProps> = ({ open, setOpen }) => {
  // לוגיקה ו- JSX כאן
  return <div>
    <h2>אזור אישי מטפל</h2>
  {/* תוכן הקומפוננטה */}</div>;
};

export default TherapistArea;
