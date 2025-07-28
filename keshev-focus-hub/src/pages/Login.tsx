import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { WebsiteConnection } from "@/api/api";

const Login = () => {
  const [idNumber, setIdNumber] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // טען היסטוריית תעודות זהות מה-localStorage
    const saved = localStorage.getItem("savedIdNumbers");
    if (saved) {
      setSavedIds(JSON.parse(saved));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await WebsiteConnection.login(idNumber);
      const data = response.data;

      let userData = null;
      if (data.manager) {
        userData = { ...data.manager, role: "manager" };
      } else if (data.therapist) {
        userData = { ...data.therapist, role: "therapist" };
      } else if (data.patient) {
        userData = { ...data.patient, id: idNumber, role: "patient" };
      }

      if (!userData) {
        setErrorMsg("תעודת הזהות שהוזנה אינה קיימת במערכת.");
        setLoading(false);
        return;
      }

      // שמור את תעודת הזהות שנכנסה בהצלחה ברשימת ההיסטוריה
      if (!savedIds.includes(idNumber)) {
        const newSavedIds = [...savedIds, idNumber];
        setSavedIds(newSavedIds);
        localStorage.setItem("savedIdNumbers", JSON.stringify(newSavedIds));
      }

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(
        login({
          user: userData,
          role: userData.role,
          firstName: userData.firstName || "מנהל" || "",
          lastName: userData.lastName || "",
        })
      );

      if (userData.role === "manager" || userData.role === "therapist") {
        navigate("/");
      } else if (userData.role === "patient") {
        navigate("/specializations");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("שגיאה בשרת:", error);
      if (error.response && error.response.status === 404) {
        setErrorMsg("תעודת הזהות שהוזנה אינה קיימת במערכת.");
      } else {
        setErrorMsg("אירעה שגיאה בשרת. נסה שנית.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-start justify-center bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50 px-4 pt-20">
      <div className="max-w-lg w-full bg-yellow-50 bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-4 text-yellow-800">התחברות למערכת</h2>
        <p className="mb-6 text-center text-yellow-700">
          הזן תעודת זהות כדי להתחבר
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-yellow-800" htmlFor="idNumber">תעודת זהות</label>
            <input
              list="idNumbersList"
              id="idNumber"
              name="idNumber"
              type="text"
              required
              className="w-full border border-yellow-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              autoComplete="off"
              inputMode="numeric"
              pattern="\d{9}"
              maxLength={9}
            />
            <datalist id="idNumbersList">
              {savedIds.map((id) => (
                <option key={id} value={id} />
              ))}
            </datalist>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center">{errorMsg}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-yellow-700 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-yellow-800">
          אין לך חשבון?{" "}
          <Link to="/signup" className="text-yellow-700 font-bold hover:underline">
            צור חשבון
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
