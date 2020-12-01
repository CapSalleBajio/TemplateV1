import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TListComponent } from './t-list/t-list.component';
import { TNewComponent } from './t-new/t-new.component';
import { TTemplateComponent } from './t-template/t-template.component';

const routes: Routes = [

  // home/teachers/tpl/list
  // home/teachers/tpl/new
  {path: 'tpl', children: [
    // Componentes cargados de forma dinamica
    {path: 'list', component: TListComponent},
    {path: 'new', component: TNewComponent},
    {path: '**', redirectTo: 'list'}
  ], component: TTemplateComponent},
  {path: '**', redirectTo: 'tpl'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
