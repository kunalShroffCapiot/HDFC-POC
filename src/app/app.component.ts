import { Component, ViewChild } from '@angular/core';
import { LoginService } from './services/user/login/Login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public loginService: LoginService) { }

}
