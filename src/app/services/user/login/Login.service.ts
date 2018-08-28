import { Injectable } from '@angular/core';
import { LoginForm } from '../../../models/formData/loginForm/loginForm.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response/ApiResponse.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';

@Injectable()
export class LoginService {

  private loginForm: LoginForm = new LoginForm();
  private updatedLogin = new Subject<ApiResponse>();

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private snackBar: MatSnackBar) { }

  login(payload) {
    this.http.post<any>('http://sandbox.odp.capiot.com:32001/api/a/rbac/login', JSON.stringify(payload))
      .subscribe(response => {
//debugger;
          localStorage.setItem('ba-user', JSON.stringify(response.basicDetails));
          localStorage.setItem('ba-token', response.token);
          localStorage.setItem('ba-rToken', response.rToken);
          localStorage.setItem('ba-domains', JSON.stringify(response.domains));

          const res: ApiResponse = {
            status: 200,
            message: 'Login Successful!',
            data: []
          };

        this.updatedLogin.next(...[res]);
      },
      error => {

        const res: ApiResponse = {
          status: 400,
          message: error.error.message,
          data: []
        };

      this.updatedLogin.next(...[res]);
      throw error;
      }
    );
  }

  getUpdateResponse(): Observable<ApiResponse> {
    return this.updatedLogin.asObservable();
  }

  logout() {
    localStorage.removeItem('ba-user');
    localStorage.removeItem('ba-token');
    localStorage.removeItem('ba-rToken');
    localStorage.removeItem('ba-domains');
    this.router.navigate(['login']);
  }

  public get loggedIn(): boolean {
    if (this.jwtHelper.isTokenExpired()) {
      return false;
    }
    return true;
  }

  public get getUserDetails() {
    if (localStorage.getItem('ba-user')) {
      return localStorage.getItem('ba-user');
    }
    return false;

  }

}
