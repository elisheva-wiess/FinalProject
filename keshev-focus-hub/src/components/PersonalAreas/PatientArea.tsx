import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaUser, FaCheckCircle, FaRegClock, FaEdit, FaTimes } from "react-icons/fa";
import { PersonalArea, Appointment } from "@/api/api";

const PatientArea = ({ open, setOpen }: { open: boolean, setOpen: (v: boolean) => void }) => {
  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [visitSummaries, setVisitSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState<any>({});
  const [pastAppointments, setPastAppointments] = useState<any[]>([]);
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (open && user?.id) {
      setLoading(true);
      PersonalArea.getPersonalDetails(user.id)
        .then(res => {
          setPersonalDetails(res.data);
          setUpdatedDetails(res.data);
        })
        .catch(() => setPersonalDetails(null))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleEditChange = (field: string, value: string) => {
    setUpdatedDetails((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpdateDetails = () => {
    const detailsToUpdate = {
      PatientsId: updatedDetails.PatientsId,
      FirstName: updatedDetails.FirstName,
      LastName: updatedDetails.LastName,
      BirthDate: updatedDetails.BirthDate,
      Address: updatedDetails.Address,
      Gender: updatedDetails.Gender,
      PhoneNumber: updatedDetails.PhoneNumber,
      Email: updatedDetails.Email,
      HealthInsurance: updatedDetails.HealthInsurance
    };

    PersonalArea.updatePersonalDetails(detailsToUpdate)
      .then(response => {
        alert(response.data);
        setPersonalDetails(updatedDetails);
        setIsEditing(false);
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "שגיאה לא ידועה";
        alert("Failed to update details: " + errorMessage);
      });
  };

  const handleCancelEdit = () => {
    setUpdatedDetails(personalDetails);
    setIsEditing(false);
  };

  const handleGetPastAppointments = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.id) {
      Appointment.getPastAppointments(user.id)
        .then(res => {
          setPastAppointments(res.data);
          setAppointmentsLoaded(true);
        })
        .catch(() => {
          setPastAppointments([]);
          setAppointmentsLoaded(true);
        });
    }
  };

  const handleCloseAppointments = () => {
    setPastAppointments([]);
  };

  return (
    <AnimatePresence>
      {open && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-w-md mx-auto rounded-t-2xl shadow-lg border border-green-200">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <DrawerHeader>
                <DrawerTitle className="text-green-700 text-xl flex items-center gap-2">
                  <FaUser /> אזור אישי
                </DrawerTitle>
                <DrawerDescription className="text-gray-500">פרטי המשתמש</DrawerDescription>
              </DrawerHeader>
              <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px', gap: '24px' }}>
                {loading ? (
                  <div className="text-center text-green-700">טוען נתונים...</div>
                ) : (
                  <>
                    <div className="bg-white rounded-lg shadow p-4 border border-green-100">
                      <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                        <FaUser /> {isEditing ? updatedDetails.FirstName : personalDetails?.firstName} {isEditing ? updatedDetails.LastName : personalDetails?.lastName}
                      </h2>
                      <div className="text-gray-700 mt-2">
                        {isEditing && (
                          <>
                            <div>
                              שם פרטי:
                              <input
                                type="text"
                                value={updatedDetails.FirstName}
                                onChange={(e) => handleEditChange('FirstName', e.target.value)}
                                className="border rounded p-1"
                              />
                            </div>
                            <div>
                              שם משפחה:
                              <input
                                type="text"
                                value={updatedDetails.LastName}
                                onChange={(e) => handleEditChange('LastName', e.target.value)}
                                className="border rounded p-1"
                              />
                            </div>
                          </>
                        )}
                        <div>
                          תעודת זהות:
                          <input
                            type="text"
                            value={isEditing ? updatedDetails.PatientsId : personalDetails?.patientsId}
                            onChange={(e) => handleEditChange('PatientsId', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          תאריך לידה:
                          <input
                            type="date"
                            value={isEditing ? updatedDetails.BirthDate : personalDetails?.birthDate}
                            onChange={(e) => handleEditChange('BirthDate', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          מגדר:
                          <input
                            type="text"
                            value={isEditing ? updatedDetails.Gender : personalDetails?.gender}
                            onChange={(e) => handleEditChange('Gender', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          אימייל:
                          <input
                            type="email"
                            value={isEditing ? updatedDetails.Email : personalDetails?.email}
                            onChange={(e) => handleEditChange('Email', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          טלפון:
                          <input
                            type="text"
                            value={isEditing ? updatedDetails.PhoneNumber : personalDetails?.phoneNumber}
                            onChange={(e) => handleEditChange('PhoneNumber', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          כתובת:
                          <input
                            type="text"
                            value={isEditing ? updatedDetails.Address : personalDetails?.address}
                            onChange={(e) => handleEditChange('Address', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          קופת חולים:
                          <input
                            type="text"
                            value={isEditing ? updatedDetails.HealthInsurance : personalDetails?.healthInsurance}
                            onChange={(e) => handleEditChange('HealthInsurance', e.target.value)}
                            className={`border rounded p-1 ${isEditing ? '' : 'bg-transparent'}`}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          {isEditing ? (
                            <>
                              <Button className="bg-brown-200 hover:bg-brown-300 text-brown-700 text-sm py-1 px-2 rounded" onClick={handleUpdateDetails}>עדכון</Button>
                              <Button className="bg-gray-300 hover:bg-gray-400 text-sm py-1 px-2 rounded" onClick={handleCancelEdit}>ביטול</Button>
                            </>
                          ) : (
                            <Button className="bg-brown-200 hover:bg-brown-300 text-brown-700 text-sm py-1 px-2 rounded" onClick={() => setIsEditing(true)}><FaEdit /> עריכה</Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border border-green-100">
                      <h3 className="text-md font-semibold text-green-700 flex items-center gap-2 mb-2">
                        <FaCheckCircle /> ביקורים שבוצעו
                      </h3>
                      <Button className="bg-brown-200 hover:bg-brown-300 text-brown-700 text-sm py-1 px-2 rounded" onClick={handleGetPastAppointments}>טוען ביקורים שבוצעו</Button>
                      {appointmentsLoaded && pastAppointments.length > 0 && (
                        <Button className="bg-brown-200 hover:bg-brown-300 text-brown-700 text-sm py-1 px-2 rounded float-right" onClick={handleCloseAppointments}>
                          <FaTimes /> סגור תורים
                        </Button>
                      )}
                      <ul className="list-disc pr-5 text-green-800">
                        {pastAppointments.map((appointment, idx) => (
                          <li key={idx} className="mb-2">
                            <div>
                              <strong>אצל המטפל:</strong> {appointment.nameTherapist.trim()} <br />
                              <strong>בתאריך:</strong> {new Date(appointment.day).toLocaleDateString('he-IL')} <br />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 border border-red-100">
                      <h3 className="text-md font-semibold text-red-700 flex items-center gap-2 mb-2">
                        <FaRegClock /> ביקורים עתידיים
                      </h3>
                      <ul className="list-disc pr-5 text-red-800">
                        {visitSummaries.filter(v => !v.done).map((visit, idx) => (
                          <li key={idx}>{visit.summary || "ביקור עתידי"}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <DrawerFooter>
                <Button className="bg-brown-200 hover:bg-brown-300 text-brown-700 text-sm py-1 px-2 rounded" onClick={() => setOpen(false)}>
                  סגור
                </Button>
              </DrawerFooter>
            </motion.div>
          </DrawerContent>
        </Drawer>
      )}
    </AnimatePresence>
  );
};

export default PatientArea;
