import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Authorization/UserContext';
import '../../css/Header.css';

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogoutAndGoHome = () => {
    setUser(null); // מבטל את ההתחברות
    navigate('/'); // עובר לדף הבית
  };

  return (
    <header>
      <div className="header-left">
        <h1 onClick={handleLogoutAndGoHome} style={{ cursor: 'pointer' }}>FocusWay</h1>
        {user && (
          <span className="user-name">
            {user.firstName} {user.lastName}
          </span>
        )}
      </div>

      <nav>
        {!user ? (
          <>
            <Link to="/login">התחברות</Link>
            <Link to="/register">הרשמה</Link>
          </>
        ) : (
          <Link to="/specializations">התמחויות</Link>
        )}
        <Link to="/about">אודות</Link>
        <Link to="/">דף הבית</Link>
      </nav>
    </header>
  );
};

export default Header;