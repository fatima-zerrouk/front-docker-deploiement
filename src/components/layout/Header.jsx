import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const linkActive = ({ isActive }) => (isActive ? 'font-semibold' : '');

  return (
    <header className="flex justify-between items-center px-6 py-6 md:px-12 md:py-4 shadow-line-b">
      <Link to="/" className="font-bold text-2xl uppercase">
        Seconde<span className="display: block">chance</span>
      </Link>
      <nav aria-label="Barre de navigation">
        <button
          className="lg:hidden text-3xl z-50 relative justify-end ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : ' ☰'}
        </button>
        <ul
          className={`
           fixed inset-0 z-1 bg-white flex-col items-center text-center gap-4 p-10 lg:p-0
           ${isOpen ? 'flex' : 'hidden'} 
           lg:static lg:flex lg:flex-row lg:bg-transparent lg:inset-auto lg:gap-8 lg:items-center text-base
         `}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Adopter
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/terms"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Conditions d&apos;adoption
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={logout}
                className="bg-terracotta py-2 px-5 rounded-lg w-40 lg:w-35"
              >
                Déconnexion
              </button>
            </li>
          ) : (
            <li className="bg-terracotta py-2 px-5 rounded-lg w-40 lg:w-35">
              {' '}
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={linkActive}
              >
                Connexion
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
