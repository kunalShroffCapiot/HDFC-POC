import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/user/login/Login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideMenuToggle = new EventEmitter<void>();

  menuSvg = true;

  constructor( public loginService: LoginService) { }

  ngOnInit() { }

  onSideMenuToggle() {
    this.sideMenuToggle.emit();
    this.menuSvg = !this.menuSvg;
  }


}
