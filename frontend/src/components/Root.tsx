import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setUserId("");
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/produit">Produit</NavLink>
        <NavLink to="/admin">Admin</NavLink>

        {!isLoggedIn ? (
          <NavLink to="/login">S'identifier</NavLink>
        ) : (
          <>
            <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}