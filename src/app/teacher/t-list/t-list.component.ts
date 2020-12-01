import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-t-list',
  templateUrl: './t-list.component.html',
  styleUrls: ['./t-list.component.scss']
})
export class TListComponent implements OnInit {
  teachers: IUser[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.teachers = [];
    this.userService.getTeachersFirebase().subscribe((teachers: IUser[]) => {
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

}
