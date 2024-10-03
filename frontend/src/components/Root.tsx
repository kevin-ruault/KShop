import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [adminUser, setAdminUser] = useState(false)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storeAdminUser = localStorage.getItem("admin")
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
      if (storeAdminUser === "true") setAdminUser(true)
    }
  }, []);

  const handleLogout = () => {
    setUserId("");
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/produit">Produit</NavLink>


        {!isLoggedIn ? (
          <NavLink to="/login">S'identifier</NavLink>
        ) : (
          <>
            {adminUser && <NavLink to="/admin">Admin</NavLink>}
            <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}