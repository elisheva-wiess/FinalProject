
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LogIn, UserPlus, Info, Home, PhoneCall, BookOpen } from "lucide-react";

const siteName = "FocusWay";

const navItems = [
  { name: "בית", to: "/", icon: Home },
  { name: "אודות", to: "/about", icon: Info },
  { name: "מאמרים", to: "/articles", icon: BookOpen },
  { name: "צור קשר", to: "/contact", icon: PhoneCall },
  { name: "הרשמה", to: "/signup", icon: UserPlus },
  { name: "התחברות", to: "/login", icon: LogIn },
];

export const Header = () => {
  const { isLoggedIn, firstName } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full flex items-center px-6 py-3 bg-accent/80 shadow-lg justify-between z-[9999] border-b border-border backdrop-blur-lg"
        style={{
          transition: "all 0.2s",
          willChange: "transform, opacity",
        }}
      >
        <nav className="flex gap-1 md:gap-3 items-center">
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
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-2xl font-extrabold mr-2 select-none text-primary drop-shadow-sm tracking-tight">
            {siteName}
          </span>
          {isLoggedIn && (
            <span className="ml-2 text-primary text-lg font-bold animate-fade-in-up shadow-none bg-transparent">
              שלום, {firstName}!
            </span>
          )}
        </div>
      </header>
      {/* spacer */}
      <div style={{ height: 70 }} />
    </>
  );
};
