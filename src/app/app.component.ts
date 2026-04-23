import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Utilisateur } from './models/utilisateur.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user?: Utilisateur;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(u => this.user = u);
  }

  get initials(): string {
    if (!this.user) return '';
    return (this.user.prenom[0] + this.user.nom[0]).toUpperCase();
  }
}
