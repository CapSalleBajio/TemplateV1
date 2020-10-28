import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  onReturn(): void {
    this.router.navigate(['/', 'auth', 'login']);
  }

  onRegister(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.userService.register(this.form.value);
      this.router.navigate(['/', 'home']);
    } else {
      console.log('Formulario inválido');
    }
  }

}
