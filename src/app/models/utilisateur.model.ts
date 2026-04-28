export enum RoleEnum {
    USER_LOCAL = 'USER_LOCAL',
    USER_CENTRAL = 'USER_CENTRAL',
    ADMIN = 'ADMIN'
}

export interface Utilisateur {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    entite?: string;
    pays?: string;
    role: RoleEnum;
    dateCreation?: string;
    dateModification?: string;
}
