import { Injectable } from '@angular/core';
import { LoginForm } from '../../../models/formData/loginForm/loginForm.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response/ApiResponse.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Entity } from '../../../models/data/Entity';
import { Stage } from '../../../models/data/Stage';

@Injectable()
export class SideDrawerService {

  entity: any = null;
  shareEntity = new Subject<number>();

  getSelectEntity(): Observable<number> {
    return this.shareEntity.asObservable();
  }

  constructor() { }

  selectEntity(entity) {
    this.entity = entity;
    this.shareEntity.next(...[this.entity]);
  }

}
