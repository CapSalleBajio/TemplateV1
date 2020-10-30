import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

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
      email: new FormControl('',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [CustomValidators.validateEmail(this.userService)],
          updateOn: 'blur'
        }
      ),
      password: new FormControl('', Validators.required),
    });

    /* this.form.get('email').valueChanges.pipe(debounceTime(1000)).subscribe((val: string) => {
      console.log('Control email: ', val);
    }); */
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
    this.showModal = false;
    this.form.reset();
  }
}
