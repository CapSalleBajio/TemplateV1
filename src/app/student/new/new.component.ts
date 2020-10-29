import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  form: FormGroup;
  params: Params;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.params = {};
    this.getParams();
  }

  async getParams(): Promise<void> {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Prams:' , params);
      this.params = params;
      if (params.studentId === 'new') {
        this.form.reset();
      }
    });

    try {
      this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();

      const user = this.userService.getUserById(+this.params.studentId);
      if (user) {
        this.form = new FormGroup({
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          password: new FormControl(user.password, Validators.required),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onRegister(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const res = this.userService.addStudent({...this.form.value, role: 'student'});
      if (res) {
        console.log('Usuario registrado');
      } else {
        console.error('El usuario ya existe.');
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onUpdate(): void {
    if (this.form.valid) {
      const res = this.userService.updateUser({...this.form.value, id: +this.params.studentId});
      if (res) {
        console.log('Usuario actualizado');
        this.router.navigate(['/', 'home', 'students', 'tpl', 'list']);
      } else {
        console.error('El usuario no existe.');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
