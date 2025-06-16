import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { WebsiteConnection } from "@/api/controllersApi";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    patientsId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    healthInsurance: '',
  });

  type Errors = {
    general?: string;
    email?: string;
    password?: string;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requiredFields = [
    'firstName',
    'lastName',
    'patientsId',
    'birthDate',
    'phoneNumber',
    'healthInsurance',
  ];

  const getHebrewLabel = (fieldName) => {
    const labels = {
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      patientsId: 'תעודת זהות',
      birthDate: 'תאריך לידה',
      gender: 'מגדר',
      email: 'אימייל',
      phoneNumber: 'מספר טלפון',
      address: 'כתובת',
      healthInsurance: 'קופת חולים',
    };
    return labels[fieldName] || fieldName;
  };

  const getAutoComplete = (field) => {
    const map = {
      email: 'email',
      phoneNumber: 'tel',
      firstName: 'given-name',
      lastName: 'family-name',
      birthDate: 'bday',
      patientsId: 'off',
      gender: 'off',
      address: 'street-address',
      healthInsurance: 'off',
    };
    return map[field] || 'off';
  };

  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!userDetails[field]) {
        newErrors[field] = 'שדה זה חובה';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await WebsiteConnection.signUp(userDetails);
        const data = response.data;

        // שמירה ב-Redux
        const userWithRole = {
          role: data.role || 'patient',
          ...data.user || data
        };

        dispatch(login({
          user: userWithRole,
          role: userWithRole.role,
          firstName: userDetails.firstName
        }));

        // שמירה ב-localStorage
        localStorage.setItem('user', JSON.stringify(userWithRole));

        navigate("/specializations");
      } catch (error) {
        const msg = error.response?.data || error.message || 'שגיאה לא ידועה';
        console.error('Signup failed:', error);
        setErrors({ general: 'אירעה שגיאה בעת ההרשמה: ' + msg });
      }
    }

    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-2">הרשמה למערכת</h2>
        <p className="mb-6 text-center text-muted-foreground">פתח חשבון במכון והתחל לקבוע תורים</p>

        {errors.general && (
          <div className="mb-4 text-red-500 text-sm text-center">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key} className={key === 'address' ? 'md:col-span-2' : ''}>
              <label className="block mb-1 font-semibold">
                {getHebrewLabel(key)}
                {requiredFields.includes(key) && <span className="text-red-500"> *</span>}
              </label>
              {key === 'gender' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors[key] ? 'border-red-500' : ''
                    }`}
                  autoComplete={getAutoComplete(key)}
                >
                  <option value="">בחר מגדר</option>
                  <option value="male">זכר</option>
                  <option value="female">נקבה</option>
                </select>
              ) : key === 'healthInsurance' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors[key] ? 'border-red-500' : ''
                    }`}
                  autoComplete={getAutoComplete(key)}
                >
                  <option value="">בחר קופת חולים</option>
                  <option value="clalit">כללית</option>
                  <option value="maccabi">מכבי</option>
                  <option value="meuhedet">מאוחדת</option>
                  <option value="leumit">לאומית</option>
                </select>
              ) : (
                <input
                  name={key}
                  type={
                    key === 'birthDate' ? 'date' :
                      key === 'email' ? 'email' :
                        key === 'phoneNumber' ? 'tel' :
                          'text'
                  }
                  required={requiredFields.includes(key)}
                  className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors[key] ? 'border-red-500' : ''
                    }`}
                  value={value}
                  onChange={handleChange}
                  autoComplete={getAutoComplete(key)}
                />
              )}
              {errors[key] && <span className="text-red-500 text-sm">{errors[key]}</span>}
            </div>
          ))}

          <div className="md:col-span-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "נרשם..." : "צור חשבון"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center">
          כבר יש לך חשבון? <Link to="/login" className="text-primary font-bold hover:underline">התחברות</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
