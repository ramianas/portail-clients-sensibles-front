export enum StatutTache {
    ATTENTE_CREATION = 'ATTENTE_CREATION',
    ATTENTE_MODIFICATION = 'ATTENTE_MODIFICATION',
    ATTENTE_SUPPRESSION = 'ATTENTE_SUPPRESSION',
    VALIDEE = 'VALIDEE',
    REJETEE = 'REJETEE'
}

export enum TypeEntiteClient {
    PPE = 'PPE',
    SUSPECT_PM = 'SUSPECT_PM',
    SUSPECT_PP = 'SUSPECT_PP'
}

export interface Tache {
    id: number;
    typeAction: StatutTache;
    typeEntiteClient: TypeEntiteClient;
    dateCreation: string;
    description: string;
    nom: string;
    pays: string;
    createurId: number;
    createurEmail: string;
    validateurId?: number;
    originalClientId?: number;

    // Champs de détails pour la décision
    prenom?: string;
    fonction?: string;
    raisonSociale?: string;
    dateNaissance?: string;
    dateDeCreationDuClient?: string;
    motif?: string;
    commentaire?: string;
    entite?: string;
    clientObjetDUneDs?: boolean;
}
