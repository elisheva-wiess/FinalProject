import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { WebsiteConnection } from "@/api/api";

const Login = () => {
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      // בדיקה אם אין משתמש תואם
      if (!userData) {
        setErrorMsg("תעודת הזהות שהוזנה אינה קיימת במערכת.");
        setLoading(false);
        return;
      }

      // שמירת המשתמש ב-localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // שמירת פרטי המשתמש ב-Redux
      dispatch(
        login({
          user: userData,
          role: userData.role,
          firstName: userData.firstName || "מנהל" || "",
          lastName: userData.lastName || "",
        })
      );

      // ניווט לפי תפקיד
      if (userData.role === "manager") {
        navigate("/");
      } else if (userData.role === "therapist") {
        navigate("/");
      } else if (userData.role === "patient") {
        navigate("/specializations");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("שגיאה בשרת:", error);

      // בדיקה אם השרת החזיר 404 - לא נמצא
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
    <main className="flex flex-col items-center justify-start min-h-screen px-4 pt-2">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-2">התחברות למערכת</h2>
        <p className="mb-6 text-center text-muted-foreground">
          הזן תעודת זהות כדי להתחבר
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">תעודת זהות</label>
            <input
              name="idNumber"
              type="text"
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              autoComplete="username"
              inputMode="numeric"
              pattern="\d{9}"
              maxLength={9}
            />
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center">{errorMsg}</div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center">
          אין לך חשבון?{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            צור חשבון
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
