import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { IUser } from '../../interfaces/user/user.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-t-list',
  templateUrl: './t-list.component.html',
  styleUrls: ['./t-list.component.scss']
})
export class TListComponent implements OnInit, OnDestroy {
  teachers: IUser[];
  teachersObs: Subscription;
  isActive: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.teachers = [];
    this.isActive = true;
    this.teachersObs = this.userService.getTeachersFirebase().pipe(takeWhile(() => this.isActive)).subscribe((teachers: IUser[]) => {
      this.teachers = teachers;
      console.log(teachers);
    });
  }

  /**
   * Elimina un usuario de firebase
   * @param teacher Objeto de tipo usuario
   */
  async onDelete(teacher: IUser): Promise<void> {
    try {
      const userDeleted = await this.userService.deleteTeacherById(teacher._id);
      console.log('Maestro eliminado', userDeleted);
    } catch (error) {
      console.log('No se pudo eliminar el maestro', error);
    }
  }

  /**
   * Método que redirecciona al componeten t-new para poder ser editado
   * @param teacher Objeto de tipo teacher
   */
  onUpdate(teacher: IUser): void {
    this.router.navigate(['/', 'home', 'teachers', 'tpl', teacher._id]);
  }

  ngOnDestroy(): void {
    console.log('Lista de maestros destruida');
    // this.teachersObs.unsubscribe();
    // this.isActive = false;
  }

}
