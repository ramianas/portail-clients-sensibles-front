import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TacheService } from '../../services/tache.service';
import { AuthService } from '../../services/auth.service';
import { Tache, StatutTache } from '../../models/tache.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tache-list.component.html',
  styleUrl: './tache-list.component.css'
})
export class TacheListComponent implements OnInit {
  private refreshTag = new BehaviorSubject<number>(0);
  
  // Observable pour la liste des tâches
  taches$: Observable<Tache[]>;
  
  // Gestion de la modale de décision
  tacheSelectionnee: Tache | null = null;
  commentaireRejet = '';

  constructor(
    private tacheService: TacheService,
    private authService: AuthService
  ) {
    this.taches$ = this.refreshTag.asObservable().pipe(
      switchMap(() => this.tacheService.listerTachesEnAttente())
    );
  }

  ngOnInit(): void {}

  chargerTaches(): void {
    this.refreshTag.next(this.refreshTag.value + 1);
  }

  ouvrirDecision(tache: Tache): void {
    this.tacheSelectionnee = tache;
    this.commentaireRejet = '';
  }

  fermerDecision(): void {
    this.tacheSelectionnee = null;
  }

  confirmerValidation(): void {
    if (!this.tacheSelectionnee) return;
    
    const validateurId = this.authService.getCurrentUserValue().id;
    this.tacheService.validerTache(this.tacheSelectionnee.id, validateurId).subscribe({
      next: () => {
        this.chargerTaches();
        this.fermerDecision();
      },
      error: (err) => alert('Erreur lors de la validation')
    });
  }

  confirmerRejet(): void {
    if (!this.tacheSelectionnee || !this.commentaireRejet) {
      alert('Veuillez saisir un motif de rejet.');
      return;
    }
    
    const validateurId = this.authService.getCurrentUserValue().id;
    this.tacheService.rejeterTache(this.tacheSelectionnee.id, validateurId, this.commentaireRejet).subscribe({
      next: () => {
        this.chargerTaches();
        this.fermerDecision();
      },
      error: (err) => alert('Erreur lors du rejet')
    });
  }

  getLabelAction(type: string): string {
    switch(type) {
      case 'ATTENTE_CREATION': return 'CRÉATION';
      case 'ATTENTE_MODIFICATION': return 'MODIFICATION';
      case 'ATTENTE_SUPPRESSION': return 'SUPPRESSION';
      default: return type;
    }
  }
}
