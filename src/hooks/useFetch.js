// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

export function useFetch() {
  // const { logout } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token'); //récupère token

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await res.json();
    // si c'est une erreur de validation 400 (bad request), retourne l'objet attendu
    if (res.status === 400) {
      return { validationErrors: data.errors };
    }
    // si c'est une autre erreur (401, 403, 404, 500...), jette une erreur pour le toast
    if (!res.ok) {
      throw new Error(data.message || 'Une erreur est survenue.');
    }
    // si tout est ok, retourne les données le token, etc
    return data;
  }
  return { apiFetch };
}
