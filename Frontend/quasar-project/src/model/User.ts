export interface User {
    id: number;
    nome: string;
    email: string;
    password: string;
    role: string; // Può essere "admin", "operator", "customer", ecc.
    createdAt: Date;
    updatedAt: Date;
  }
  