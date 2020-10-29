import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  students: IUser[];
  showModal: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showModal = false;
    this.students = this.userService.getUsersByRole('student');
  }

  onEdit(student: IUser): void {
    this.router.navigate(['/', 'home', 'students', 'tpl', student.id]);
  }

  onDelete(index: number, id: number): void {
    try {
      this.userService.deleteById(id);
      this.students.splice(index, 1);
      console.log('Usuario eliminado');
    } catch (error) {
      console.error(error);
    }
  }

  onEventButtons(event: boolean): void {
    console.log(event);
  }
}
