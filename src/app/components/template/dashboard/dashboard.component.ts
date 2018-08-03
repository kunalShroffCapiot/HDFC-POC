import { Component, OnInit, ElementRef } from '@angular/core';
import { DashboardService } from '../../../services/user/dashboard/Dashboard.service';
import { Entity } from '../../../models/data/Entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  entityData: Array<Entity> = new Array<Entity>();
  entitySub = new Subscription();

  constructor(private elRef: ElementRef, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getEntity();
  }

  getCoordinates(event) {
    // const target = event.target || event.srcElement || event.currentTarget;
    console.log(event.srcElement.parentElement.offsetLeft);
    console.log(event.srcElement.parentElement.offsetTop);

  }
}
