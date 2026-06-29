import React from 'react';
import { CiMail } from 'react-icons/ci';
import { BsTelephone, BsPinMap } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export function Footer() {
  const linkActive = ({ isActive }) => (isActive ? 'font-bold' : '');

  return (
    <section className="py-4 px-6 md:px-12 md:py-8 md:flex md:gap-10 md:justify-around text-base">
      <ul className="pb-4">
        <h3 className="font-semibold title-h3 mb-4"> Seconde chance</h3>
        <li>
          Offrir une nouvelle vie{' '}
          <span className="display: block">aux animaux abandonnés.</span>{' '}
        </li>
      </ul>
      <ul className="pb-4">
        <h3 className="font-semibold title-h3 mb-4"> Navigation</h3>
        <li>
          <NavLink to="/" className={linkActive}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" className={linkActive}>
            Adopter
          </NavLink>
        </li>
        <li>
          <NavLink to="/terms" className={linkActive}>
            Conditions d&apos;adoption
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={linkActive}>
            Connexion
          </NavLink>
        </li>
      </ul>

      <address className="not-italic ">
        <h3 className="font-semibold title-h3 mb-4">Contact</h3>
        <ul>
          <li className="items-center">
            {' '}
            <a
              href="mailto:contact@seconde-chance.fr"
              className=" flex items-center gap-2"
            >
              <CiMail /> contact@seconde-chance.fr{' '}
            </a>
          </li>
          <li>
            {' '}
            <a href="tel:0123456789" className=" flex items-center gap-2">
              <BsTelephone /> 01 23 45 67 89
            </a>
          </li>
          <li className=" flex items-center gap-2">
            <BsPinMap /> 71 quai Perrache, 69002 Lyon
          </li>
        </ul>
      </address>
      {/* <p className='text-center'>© 2026 Seconde chance </p> */}
    </section>
  );
}
