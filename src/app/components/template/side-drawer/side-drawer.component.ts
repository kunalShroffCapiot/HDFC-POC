import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { EntityService } from '../../../services/entity/Entity.service';
import { sharedData } from '../../../services/shared/sharedData';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements OnInit {
  stage: any;

  constructor(private sideDrawerService: SideDrawerService, private entityService: EntityService, private shared: sharedData) { }

  ngOnInit() {
    this.shared.track.subscribe(x => {
      // this.stage=[];
      this.getData(x);
    });

    this.getData("Back");
    //this.stage = this.entityService.getEntity();

  }

  getData(mode) {
    if (mode == 'Back') {
      this.entityService.getEntity().subscribe(res => {
        this.stage = res;
      }, err => {
        console.log("error has occurred" + err);
      })
    }
    else {
      this.stage = this.entityService.getEntity_Old();
    }

  }
  selectEntity(id, entity) {
    if (id.srcElement.checked === true) {
      this.sideDrawerService.selectEntity(entity);
    }
  }

}
