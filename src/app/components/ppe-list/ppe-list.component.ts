import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PpeService } from '../../services/ppe.service';
import { ClientPpe, Page } from '../../models/client-ppe.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { COUNTRIES } from '../../constants/countries';

@Component({
  selector: 'app-ppe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ppe-list.component.html',
  styleUrl: './ppe-list.component.css'
})
export class PpeListComponent implements OnInit {
  private refreshTag = new BehaviorSubject<number>(0);
  countries = COUNTRIES;
  
  // Observable pour la liste des PPE avec pagination
  ppePage$: Observable<Page<ClientPpe>>;
  
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  currentUserId = 1;

  currentPpe: ClientPpe = this.getEmptyPpe();
  isEditing = false;

  constructor(private ppeService: PpeService) {
    this.ppePage$ = this.refreshTag.asObservable().pipe(
      switchMap(() => this.ppeService.listerPpes(this.currentUserId, this.currentPage, this.pageSize))
    );
  }

  ngOnInit(): void {}

  refresh(): void {
    this.refreshTag.next(this.refreshTag.value + 1);
  }

  enregistrerPpe(): void {
    const action$ = (this.isEditing && this.currentPpe.id)
      ? this.ppeService.modifierPpe(this.currentPpe.id, this.currentPpe)
      : this.ppeService.creerPpe(this.currentPpe, this.currentUserId);

    action$.subscribe({
      next: () => {
        this.refresh();
        this.annulerEdition();
      },
      error: (err) => console.error('Erreur lors de l\'enregistrement', err)
    });
  }

  editerPpe(ppe: ClientPpe): void {
    this.isEditing = true;
    this.currentPpe = { ...ppe };
  }

  annulerEdition(): void {
    this.isEditing = false;
    this.currentPpe = this.getEmptyPpe();
  }

  supprimerPpe(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce PPE ?')) {
      this.ppeService.supprimerPpe(id).subscribe({
        next: () => this.refresh(),
        error: (err) => console.error('Erreur suppression PPE', err)
      });
    }
  }

  pageSuivante(maxPages: number): void {
    if (this.currentPage < maxPages - 1) {
      this.currentPage++;
      this.refresh();
    }
  }

  pagePrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.refresh();
    }
  }

  private getEmptyPpe(): ClientPpe {
    return { nom: '', prenom: '', fonction: '', pays: 'France', entite: '' };
  }
}
