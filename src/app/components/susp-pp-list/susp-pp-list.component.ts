import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuspService } from '../../services/susp.service';
import { ClientSuspPp, Page } from '../../models/client-susp.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { COUNTRIES } from '../../constants/countries';

@Component({
  selector: 'app-susp-pp-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './susp-pp-list.component.html'
})
export class SuspPpListComponent implements OnInit {
  private refreshTag = new BehaviorSubject<number>(0);
  countries = COUNTRIES;
  ppPage$: Observable<Page<ClientSuspPp>>;
  
  currentPage = 0;
  pageSize = 10;
  currentUserId = 1;

  currentPp: ClientSuspPp = this.getEmptyPp();
  isEditing = false;

  constructor(private suspService: SuspService) {
    this.ppPage$ = this.refreshTag.asObservable().pipe(
      switchMap(() => this.suspService.listerSuspPps(this.currentUserId, this.currentPage, this.pageSize))
    );
  }

  ngOnInit(): void {}

  refresh(): void {
    this.refreshTag.next(this.refreshTag.value + 1);
  }

  enregistrerPp(): void {
    const action$ = (this.isEditing && this.currentPp.id)
      ? this.suspService.modifierSuspPp(this.currentPp.id, this.currentPp)
      : this.suspService.creerSuspPp(this.currentPp, this.currentUserId);

    action$.subscribe({
      next: () => {
        this.refresh();
        this.annulerEdition();
      },
      error: (err) => console.error('Erreur lors de l\'enregistrement', err)
    });
  }

  editerPp(pp: ClientSuspPp): void {
    this.isEditing = true;
    this.currentPp = { ...pp };
  }

  annulerEdition(): void {
    this.isEditing = false;
    this.currentPp = this.getEmptyPp();
  }

  supprimerPp(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette personne ?')) {
      this.suspService.supprimerSuspPp(id).subscribe({
        next: () => this.refresh(),
        error: (err) => console.error('Erreur suppression PP', err)
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

  private getEmptyPp(): ClientSuspPp {
    return { nom: '', prenom: '', clientObjetDUneDs: true, pays: 'France', entite: '' };
  }
}
