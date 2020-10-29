import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async getParams(): Promise<void> {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Prams:' , params);
    });

    try {
      const params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      console.log('params: ', params);
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
}
