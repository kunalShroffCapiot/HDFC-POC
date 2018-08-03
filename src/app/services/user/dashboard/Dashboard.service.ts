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
export class DashboardService {

  entity: Array<Entity> = new Array<Entity>();

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  getEntity() {
    this.http.get<any>('http://sandbox.odp.capiot.com:32001/api/a/sm/service?page=1&count=-1&' +
      'filter=%7B%22domain%22:%22HDFC-DATA-LINEAGE%22%7D')
      .subscribe(response => {

        console.log(response);

        const testStage: Array<Stage> = new Array<Stage>();

        let counter = 0;
        response.forEach(entity => {

          if (entity.name.indexOf('entity') >= 0) {

            const definition = JSON.parse(entity.definition);

            console.log(definition);

            if ( definition.indexOf('stage') >= 0 ) {
              testStage[counter].id = entity._id;
              testStage[counter].stage = 'landing';

              counter ++;
            }


          }


        });

        console.log(testStage);

      });
  }

}
