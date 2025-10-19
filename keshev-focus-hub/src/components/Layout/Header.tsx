import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  LogIn,
  UserPlus,
  Info,
  Home,
  PhoneCall,
  BookOpen,
  FileText,
  UserCog,
} from "lucide-react";
import { logout } from "@/store/authSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import PatientArea from "@/components/PersonalAreas/PatientArea";
import TherapistArea from "@/components/PersonalAreas/TherapistArea";
import ManagerArea from "@/components/PersonalAreas/AdminArea";

export const Header = () => {
  const { isLoggedIn, firstName, lastName, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [personalAreaComponent, setPersonalAreaComponent] = useState(null);

  const toggleLanguage = () => {
    const newLang = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(newLang).then(() => {
      document.documentElement.dir = newLang === "he" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
      window.dispatchEvent(new CustomEvent("languageChanged", { detail: newLang }));
    });
  };

  const navItems = [
    { name: t("home"), to: "/", icon: Home },
    { name: t("about"), to: "/about", icon: Info },
    { name: t("articles"), to: "/articles", icon: BookOpen },
    { name: t("specializations"), to: "/specializations", icon: FileText },
    { name: t("contact"), to: "/contact", icon: PhoneCall },
    ...(isLoggedIn
      ? []
      : [
        { name: t("signup"), to: "/signup", icon: UserPlus },
        { name: t("login"), to: "/login", icon: LogIn },
      ]),
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

 const handlePersonalAreaNavigation = () => {
  setOpen(prev => {
    const newOpenState = !prev; // הפוך את מצב ה-open
    if (newOpenState) { // אם הוא הולך להיפתח
      if (role === "therapist") {
        setPersonalAreaComponent(<TherapistArea open={newOpenState} setOpen={setOpen} />);
      } else if (role === "manager") {
        setPersonalAreaComponent(<ManagerArea open={newOpenState} setOpen={setOpen} />);
      } else if (role === "patient") {
        setPersonalAreaComponent(<PatientArea open={newOpenState} setOpen={setOpen} />);
      }
    }
    return newOpenState; // החזר את מצב ה-open החדש
  });
};


  useEffect(() => {
    if (!open) {
      setPersonalAreaComponent(null); // לנקות את הקומפוננטה כאשר היא נסגרת
    }
  }, [open]);

  useEffect(() => {
    document.dir = i18n.language === "he" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full flex items-center px-6 py-3 bg-accent/80 shadow-lg justify-between z-[9999] border-b border-border backdrop-blur-lg">
        <nav className="flex gap-1 md:gap-3 items-center">
          {isLoggedIn && (
            <button onClick={handlePersonalAreaNavigation}>
              <span className="flex items-center gap-2 px-3 py-1 rounded border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition">
                <UserCog className="w-5 h-5" />
                {`${firstName} ${lastName}`}
              </span>
            </button>
          )}

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 md:px-3 py-1.5 rounded hover:bg-primary/10 font-bold transition 
                ${isActive ? "text-primary underline underline-offset-8 decoration-2" : "text-foreground"}`
              }
              tabIndex={0}
              end={item.to === "/"}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-primary font-semibold hover:text-orange-500 transition transform hover:scale-105"
            aria-label="Change Language"
          >
            <span className="underline underline-offset-4">{t("language")}</span>
          </button>

          <span
            className="text-lg md:text-2xl font-extrabold select-none text-primary drop-shadow-sm tracking-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            FocusWay
          </span>
        </div>
      </header>
      <div style={{ height: 70 }} />
      {personalAreaComponent}
    </>
  );
};
