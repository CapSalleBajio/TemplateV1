import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showModal = false;
    this.students = this.userService.getUsersByRole('student');

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
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

  onRegister(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const res = this.userService.addStudent({...this.form.value, role: 'student'});
      if (res) {
        this.students.push(res);
        console.log('Usuario registrado');
      } else {
        console.error('El usuario ya existe.');
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onEventButtons(event: boolean): void {
    if (event) {
      this.onRegister();
    }
  }
}
