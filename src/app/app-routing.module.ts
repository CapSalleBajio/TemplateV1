import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StudentModule } from './student/student.module';

const routes: Routes = [
  {path: '', component: UserListComponent},
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
