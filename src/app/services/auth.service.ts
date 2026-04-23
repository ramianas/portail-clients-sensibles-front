import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur, RoleEnum } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // On simule un utilisateur connecté (par exemple Abdenaji Chriba)
  private currentUserSubject = new BehaviorSubject<Utilisateur>({
    id: 1,
    nom: 'Rami',
    prenom: 'Anas',
    email: 'a.rami@bankofafrica.ma',
    role: RoleEnum.USER_CENTRAL, // On peut changer ici pour tester Local ou Central
    entite: 'Siège Casablanca'
  });

  constructor() { }

  getCurrentUser(): Observable<Utilisateur> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }

  // Méthode pour simuler un changement d'utilisateur (utile pour vos tests)
  switchUser(user: Utilisateur): void {
    this.currentUserSubject.next(user);
  }
}
