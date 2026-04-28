import { Routes } from '@angular/router';
import { PpeListComponent } from './components/ppe-list/ppe-list.component';
import { TacheListComponent } from './components/tache-list/tache-list.component';
import { SuspPmListComponent } from './components/susp-pm-list/susp-pm-list.component';
import { SuspPpListComponent } from './components/susp-pp-list/susp-pp-list.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'ppes', pathMatch: 'full' },
  { path: 'ppes', component: PpeListComponent, canActivate: [AuthGuard] },
  { path: 'susp-pm', component: SuspPmListComponent, canActivate: [AuthGuard] },
  { path: 'susp-pp', component: SuspPpListComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TacheListComponent, canActivate: [AuthGuard] },
  { 
    path: 'users', 
    component: UserManagementComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
];
