import { jwtDecode } from 'jwt-decode';

export function isTokenValid(token) {
  //calcul si la date est valide ou pas
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;
    return decodedToken.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
