import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExitGuard } from './guards/exit/exit.guard';
import { HasSessionGuard } from './guards/hasSession/has-session.guard';
import { StudentModule } from './student/student.module';

const routes: Routes = [
  {path: '', component: UserListComponent, canDeactivate: [ExitGuard]},
  {path: 'profile', component: UserProfileComponent},
  {path: 'students', loadChildren: () => StudentModule },
  {path: 'teachers', loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule)},
  {path: '**', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
