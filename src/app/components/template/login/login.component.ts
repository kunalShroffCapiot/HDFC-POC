import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../../models/formData/loginForm/loginForm.model';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { LoginService } from '../../../services/user/login/Login.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  objectKeys = Object.keys;

  loginForm: FormGroup;

  private loginSubscription: Subscription;

  loginFormConfig: LoginForm = new LoginForm;

  progressBar = false;

  constructor( private loginService: LoginService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.loginSubscription = this.loginService.getUpdateResponse()
    .subscribe(response => {
      this.progressBar = false;
      this.snackbar.open(response.message, 'close');
      if (response.status === 200) {
        this.router.navigate(['/']);
        return;
      } else if ( response.status === 400 ) {
        this.progressBar = false;
        this.snackbar.open( response.message, 'close');
        return false;
      }
    });

    this.loginForm = new FormGroup({
      'username': new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._]+')]
      }),
      'password': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.loginFormConfig = {
      username: {
        type: 'input',
        name: 'username',
        title: 'User Name',
        placeHolder: 'User Name',
        value: ''
      },
      password: {
        type: 'password',
        name: 'password',
        title: 'Password',
        placeHolder: 'Password',
        value: ''
      }
    };

  }

  onLoginSubmit(formValue): void {

    this.progressBar = true;

    this.loginService.login(formValue);

  }
}
