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
      console.log('Parms:' , params);
      this.params = params;
      // studentId corresponde al nombre que le definimos en las rutas (student-routing.module)
      if (params.studentId === 'new') {
        // Si el valor de studentId es igual a new lo vamos a considerar como estudiante nuevo
        // caso contrario vamos a actualizar el estudiante
        this.form.reset();
      }
    });

    try {
      // Obtener parámetros utilzando async-await
      this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();

      const user = await this.userService.getUserById(this.params.studentId).toPromise();
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

  async onRegister(): Promise<void> {
    console.log(this.form.value);
    if (this.form.valid) {
      try {
        const user = await this.userService.addStudent({...this.form.value, role: 'student'}).toPromise();
        this.router.navigate(['/home/students/tpl/list']);
      } catch (error) {
        console.error('ERROR TO PROMISE: ', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onUpdate(): void {
    if (this.form.valid) {
      this.userService.updateUser({...this.form.value, id: this.params.studentId}).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/home/students/tpl/list']);
        },
        (error) => { console.error(error); },
        () => {},
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
