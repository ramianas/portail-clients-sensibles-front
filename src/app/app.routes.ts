import { Routes } from '@angular/router';
import { PpeListComponent } from './components/ppe-list/ppe-list.component';
import { TacheListComponent } from './components/tache-list/tache-list.component';
import { SuspPmListComponent } from './components/susp-pm-list/susp-pm-list.component';
import { SuspPpListComponent } from './components/susp-pp-list/susp-pp-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ppes', pathMatch: 'full' },
  { path: 'ppes', component: PpeListComponent },
  { path: 'susp-pm', component: SuspPmListComponent },
  { path: 'susp-pp', component: SuspPpListComponent },
  { path: 'tasks', component: TacheListComponent },
];
