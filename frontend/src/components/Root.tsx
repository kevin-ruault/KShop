import { NavLink, Outlet } from 'react-router-dom';

export function Root() {
  return <>
    <header>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/produit">Produit</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
    </header>
    <div><Outlet /></div>
  </>
}