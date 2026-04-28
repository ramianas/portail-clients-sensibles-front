import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Utilisateur, RoleEnum } from '../models/utilisateur.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);

  constructor(private readonly keycloak: KeycloakService) {
    this.init();
  }

  private async init() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn) {
      const userProfile = await this.keycloak.loadUserProfile();
      const roles = this.keycloak.getUserRoles();
      
      let role = RoleEnum.USER_LOCAL;
      if (roles.includes('ADMIN')) {
        role = RoleEnum.ADMIN;
      } else if (roles.includes('USER_CENTRAL')) {
        role = RoleEnum.USER_CENTRAL;
      }

      this.currentUserSubject.next({
        id: 0, // Id matching is usually done on backend or mapped from sub
        nom: userProfile.lastName || '',
        prenom: userProfile.firstName || '',
        email: userProfile.email || '',
        role: role,
        entite: (userProfile as any).attributes?.entite?.[0] || 'Unknown'
      });
    }
  }

  getCurrentUser(): Observable<Utilisateur | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }
}
