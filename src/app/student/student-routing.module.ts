import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { TemplateComponent } from './template/template.component';

// localhos:4200/home `
const routes: Routes =  [
    {path: 'tpl', component: TemplateComponent, children: [
        {path: 'list', component: ListComponent},
        {path: ':studentId', component: NewComponent},
        {path: '**', redirectTo: 'list'}
    ]},
    {path: '**', redirectTo: 'tpl'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class StudentRoutingModule {}
