import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TNewComponent } from './t-new/t-new.component';
import { TListComponent } from './t-list/t-list.component';
import { TTemplateComponent } from './t-template/t-template.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TNewComponent, TListComponent, TTemplateComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
