import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRowComponent } from './user-row/user-row.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ModalComponent } from './modal/modal/modal.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserRowComponent,
    NavBarComponent,
    ModalComponent,
  ],
  exports: [
    UserListComponent,
    UserProfileComponent,
    UserRowComponent,
    NavBarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
