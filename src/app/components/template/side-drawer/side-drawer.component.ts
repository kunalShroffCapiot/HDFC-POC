import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { EntityService } from '../../../services/entity/Entity.service';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements OnInit {
  stage: any;

  constructor(private sideDrawerService: SideDrawerService, private entityService: EntityService) { }

  ngOnInit() {
    this.entityService.getEntity().subscribe(res => {
      debugger;
      this.stage = res;
    }, err => {
      console.log("error has occurred" + err);
    })
    //this.stage = this.entityService.getEntity();

  }

  selectEntity(id, entity) {
    if (id.srcElement.checked === true) {
      this.sideDrawerService.selectEntity(entity);
    }
  }

}
