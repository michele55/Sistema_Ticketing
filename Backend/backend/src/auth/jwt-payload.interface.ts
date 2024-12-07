export interface JwtPayload {
  email: string; // Email dell'utente
  sub: number; // ID dell'utente (viene usato come identificatore principale dell'utente)
  role: string;
}
