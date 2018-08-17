import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/user/login/Login.service';
import { Input } from "@angular/core";
import {sharedData} from '../../../services/shared/sharedData';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideMenuToggle = new EventEmitter<void>();
  @Input('mode') mode;
  showMode = "Back";
  menuSvg = true;

  constructor(public loginService: LoginService,private shared:sharedData) { }

  ngOnInit() {

  }

  onSideMenuToggle() {
    this.sideMenuToggle.emit();
    this.menuSvg = !this.menuSvg;
  }
  changeMode(mode) {
    debugger;
    this.showMode = mode;
    this.shared.setMode(mode);
  }

}
