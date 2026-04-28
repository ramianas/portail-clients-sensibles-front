import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur, RoleEnum } from '../../models/utilisateur.model';
import { COUNTRIES } from '../../constants/countries';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private refreshTag = new BehaviorSubject<number>(0);
  users$: Observable<Utilisateur[]>;
  countries = COUNTRIES;
  roles = Object.values(RoleEnum);

  currentUser: Utilisateur = this.getEmptyUser();
  isEditing = false;

  constructor(private utilisateurService: UtilisateurService) {
    this.users$ = this.refreshTag.asObservable().pipe(
      switchMap(() => this.utilisateurService.listerUtilisateurs())
    );
  }

  ngOnInit(): void {}

  refresh(): void {
    this.refreshTag.next(this.refreshTag.value + 1);
  }

  enregistrerUser(): void {
    if (this.currentUser.id) {
      // Modification
      this.utilisateurService.modifierUtilisateur(this.currentUser.id, this.currentUser).subscribe({
        next: () => { this.refresh(); this.annulerEdition(); },
        error: () => alert('Erreur lors de la modification')
      });
    } else {
      // Création
      this.utilisateurService.creerUtilisateur(this.currentUser).subscribe({
        next: () => { this.refresh(); this.annulerEdition(); },
        error: () => alert('Erreur lors de la création')
      });
    }
  }

  editerUser(user: Utilisateur): void {
    this.isEditing = true;
    this.currentUser = { ...user };
  }

  annulerEdition(): void {
    this.isEditing = false;
    this.currentUser = this.getEmptyUser();
  }

  supprimerUser(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.supprimerUtilisateur(id).subscribe({
        next: () => this.refresh(),
        error: (err) => alert('Erreur lors de la suppression')
      });
    }
  }

  private getEmptyUser(): Utilisateur {
    return {
      nom: '',
      prenom: '',
      email: '',
      role: RoleEnum.USER_LOCAL,
      telephone: '',
      entite: '',
      pays: 'MA - Maroc'
    };
  }
}
