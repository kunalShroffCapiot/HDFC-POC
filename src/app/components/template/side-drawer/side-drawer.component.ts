import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { EntityService } from '../../../services/entity/Entity.service';
import { sharedData } from '../../../services/shared/sharedData';
import { ViewChild } from "@angular/core";
import { ViewChildren } from "@angular/core";

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements OnInit {
  stage: any;
  content;
  contentStage;
  @ViewChildren('filterControl') filterControl;
  constructor(private sideDrawerService: SideDrawerService, private entityService: EntityService, private shared: sharedData) { }

  ngOnInit() {
    this.shared.track.subscribe(x => {
      // this.stage=[];
      this.getData(x);
    });

    this.getData('Back');
    // this.stage = this.entityService.getEntity();

  }

  getData(mode) {
    if (mode === 'Back') {
      this.entityService.getEntity().subscribe(res => {
        this.stage = res;
      }, err => {
        console.log('error has occurred' + err);
      });
    } else {
      this.stage = this.entityService.getEntity_Old();
    }

  }
  selectEntity(id, entity) {
    if (id.srcElement.checked === true) {
      this.sideDrawerService.selectEntity(entity);
    }
  }

  filter(event, stage) {
    //debugger;
    this.filterControl._results.forEach(element => {
      if (element.nativeElement.id != stage) {
        element.nativeElement.value = "";
      }
    });
    this.content = event;
    this.contentStage = stage;
  }

}
