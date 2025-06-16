
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Frown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-xl animate-fade-in">
        <Frown className="mx-auto text-primary mb-4" size={48} />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">אופס! העמוד לא נמצא</p>
        <Link to="/" className="text-primary hover:underline font-bold">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
