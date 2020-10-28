import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTemplateComponent } from './home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    children: [
      {path: 'students', loadChildren: () => import('../student/student.module').then((m) => m.StudentModule) },
      {path: 'teachers', loadChildren: () => import('../teacher/teacher.module').then((m) => m.TeacherModule)},
      {path: '**', redirectTo: 'students'}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
