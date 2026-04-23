export interface Client {
  id?: number;
  nom: string;
  prenom?: string;
  dateNaissance?: string;
  motif?: string;
  commentaire?: string;
  dateDeDernierModif?: string;
  creePar?: string;
  entite?: string;
  pays?: string;
}

export interface ClientPm extends Client {
  raisonSociale: string;
  dateDeCreationDuClient?: string;
  clientObjetDUneDs: boolean;
}

export interface ClientSuspPp extends Client {
  clientObjetDUneDs: boolean;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
