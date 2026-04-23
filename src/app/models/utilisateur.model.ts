export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER_CENTRAL = 'USER_CENTRAL',
  USER_LOCAL = 'USER_LOCAL'
}

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: RoleEnum;
  entite?: string;
}
