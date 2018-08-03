import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/user/login/Login.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  @Input() menuListStyle: any;

  userDetails: any;

  constructor( public loginService: LoginService) { }

  ngOnInit() {
    this.userDetails = this.loginService.getUserDetails;
    this.userDetails = JSON.parse(this.userDetails);
  }

}
