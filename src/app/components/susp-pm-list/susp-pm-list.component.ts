import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuspService } from '../../services/susp.service';
import { ClientPm, Page } from '../../models/client-susp.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { COUNTRIES } from '../../constants/countries';

@Component({
  selector: 'app-susp-pm-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './susp-pm-list.component.html'
})
export class SuspPmListComponent implements OnInit {
  private refreshTag = new BehaviorSubject<number>(0);
  countries = COUNTRIES;
  pmPage$: Observable<Page<ClientPm>>;
  
  currentPage = 0;
  pageSize = 10;
  currentUserId = 1;

  currentPm: ClientPm = this.getEmptyPm();
  isEditing = false;

  constructor(private suspService: SuspService) {
    this.pmPage$ = this.refreshTag.asObservable().pipe(
      switchMap(() => this.suspService.listerSuspPms(this.currentUserId, this.currentPage, this.pageSize))
    );
  }

  ngOnInit(): void {}

  refresh(): void {
    this.refreshTag.next(this.refreshTag.value + 1);
  }

  enregistrerPm(): void {
    const action$ = (this.isEditing && this.currentPm.id)
      ? this.suspService.modifierSuspPm(this.currentPm.id, this.currentPm)
      : this.suspService.creerSuspPm(this.currentPm, this.currentUserId);

    action$.subscribe({
      next: () => {
        this.refresh();
        this.annulerEdition();
      },
      error: (err) => console.error('Erreur lors de l\'enregistrement', err)
    });
  }

  editerPm(pm: ClientPm): void {
    this.isEditing = true;
    this.currentPm = { ...pm };
  }

  annulerEdition(): void {
    this.isEditing = false;
    this.currentPm = this.getEmptyPm();
  }

  supprimerPm(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette entité ?')) {
      this.suspService.supprimerSuspPm(id).subscribe({
        next: () => this.refresh(),
        error: (err) => console.error('Erreur suppression PM', err)
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

  private getEmptyPm(): ClientPm {
    return { 
      nom: '', // Requis par le backend (hérité de Client)
      raisonSociale: '', 
      dateDeCreationDuClient: '',
      pays: 'France',
      clientObjetDUneDs: true, 
      motif: '',
      commentaire: '',
      entite: ''
    };
  }
}
