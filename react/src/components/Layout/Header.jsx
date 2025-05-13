import { Link } from 'react-router-dom';
import '../../css/Header.css';

const Header = () => {
  return (
    <header>
      <h1>מרכז הקשב</h1>
      <nav>
        <Link to="/login">התחברות</Link>
        <Link to="/register">הרשמה</Link>
        <Link to="/about">אודות</Link>
        <Link to="/">דף הבית</Link>
      </nav>
    </header>
  );
};

export default Header;
