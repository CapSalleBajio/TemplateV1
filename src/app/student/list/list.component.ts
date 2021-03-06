import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, take } from 'rxjs/operators';
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
    this.init();
    this.initHttp();
  }

  init(): void {
    this.showModal = false;
    // this.students = this.userService.getUsersByRole('student');
    this.students = [];

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

  async initHttp(): Promise<void> {
    const users = await this.userService.getAllUsers().toPromise();
    this.students = users;

  }

  onEdit(student: IUser): void {
    this.router.navigate(['/', 'home', 'students', 'tpl', student._id]);
  }

  onDelete(index: number, id: number): void {
    const that = this;
    this.userService.deleteById(id).subscribe(
      (res) => {
        // console.log('this', this.students, that.students);
        this.students.splice(index, 1);
      },
      (error) => { console.error(error); },
      () => { console.log('Complete'); }
    );
  }



  onRegister(): void {
    /* console.log(this.form.value);
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
    } */
  }

  onEventButtons(event: boolean): void {
    if (event) {
      this.onRegister();
    }
    this.showModal = false;
    this.form.reset();
  }
}
