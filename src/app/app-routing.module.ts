import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExitGuard } from './guards/exit/exit.guard';
import { HasSessionGuard } from './guards/hasSession/has-session.guard';
import { StudentModule } from './student/student.module';

const routes: Routes = [
  /* {path: '', component: UserListComponent, canDeactivate: [ExitGuard]},
  {path: 'profile', component: UserProfileComponent}, */
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
