export interface ClientPpe {
  id?: number;
  nom: string;
  prenom: string;
  dateDeNaissance?: string; 
  motif?: string;
  commentaire?: string;
  fonction: string;
  entite?: string;
  pays?: string;
  creePar?: string;
  dateDeDernierModif?: string;
  deleted?: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
