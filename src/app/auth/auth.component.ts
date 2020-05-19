import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  error: string = null;

  isLoginMode = true;
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    this.isLoading = true;
    this.error = null;

    const authObs: Observable<AuthResponseData> = this.isLoginMode
      ? this.authService.signin(email, password)
      : this.authService.signup(email, password)
    ;
    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      },
    )

    this.form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }
}
