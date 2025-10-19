// TherapistArea.tsx
import React from 'react';

interface AdminAreaProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminArea: React.FC<AdminAreaProps> = ({ open, setOpen }) => {
  // לוגיקה ו- JSX כאן
  return <div>
    <h2>אזור אישי מנהל</h2>
  {/* תוכן הקומפוננטה */}</div>;
};

export default AdminArea;
