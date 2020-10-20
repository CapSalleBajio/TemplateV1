import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TNewComponent } from './t-new/t-new.component';
import { TListComponent } from './t-list/t-list.component';


@NgModule({
  declarations: [TNewComponent, TListComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
