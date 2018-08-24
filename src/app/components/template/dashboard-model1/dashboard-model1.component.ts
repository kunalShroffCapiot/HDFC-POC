import { Component, OnInit, ElementRef, ViewChild, ViewChildren, AfterContentInit, AfterViewChecked } from '@angular/core';
import { DashboardService } from '../../../services/user/dashboard/Dashboard.service';
import { Subscription } from 'rxjs';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { EntityService } from '../../../services/entity/Entity.service';
import * as _ from 'lodash';
import { sharedData } from '../../../services/shared/sharedData';

@Component({
  selector: 'app-dashboard-model1',
  templateUrl: './dashboard-model1.component.html',
  styleUrls: ['./dashboard-model1.component.css']
})
export class DashboardModel1Component implements OnInit, AfterContentInit, AfterViewChecked {
  @ViewChild('wrapper_1')
  wrapper_1: ElementRef;
  @ViewChild('wrapper_2')
  wrapper_2: ElementRef;
  @ViewChildren('attributes')
  attributes: ElementRef;
  @ViewChildren('entities')
  entities: ElementRef;
  @ViewChildren('entitiesCcontent')
  entitiesContent: ElementRef;

  toggleEntityExpand: any;

  // entityData: Array<Entity> = new Array<Entity>();
  entitySub = new Subscription();

  stage: any;

  generateEntity: any;
  generateRelationFlag = false;
  initialEntity: any;
  initialAttribute: any;
  selectedEntityId = 0;

  constructor(
    private elRef: ElementRef,
    private dashboardService: DashboardService,
    private sideDrawerService: SideDrawerService,
    private entityService: EntityService, private shared: sharedData
  ) { }

  ngOnInit() {

    this.shared.track.subscribe(x => {
      this.wrapper_1.nativeElement.innerHTML = '';
      this.generateEntity = [];
      this.getData(x);
    });
    this.getData('Back');

    this.sideDrawerService.getSelectEntity().subscribe(selectedEntity => {

      this.selectedEntityId = selectedEntity['id'];

      const entity = _.findIndex(this.entitiesContent['_results'], x => {
        return (x.nativeElement.id === 'entity_content_' + selectedEntity['id']);
      });

      if (entity !== -1) {
        this.toggleEntityExpand = false;
        if (selectedEntity['attr'].length <= 5) {
          this.entitiesContent['_results'][entity].nativeElement.style.height = (selectedEntity['attr'].length * 40) + 'px';
        } else {
          this.entitiesContent['_results'][entity].nativeElement.style.height = '200px';
        }
      }

      this.initialEntity = entity;
      this.initialAttribute = null;
      this.validateEntity(selectedEntity);
    });
  }

  ngAfterViewChecked() {

    if (this.initialEntity && this.initialAttribute) {
      this.wrapper_1.nativeElement.innerHTML = '';
      this.createAttributeLink(this.initialEntity, this.initialAttribute);
    }

  }

  getData(mode) {
    if (mode === 'Back') {
      this.entityService.getEntity().subscribe(res => {
        this.generateEntity = res;
      }, err => {
        console.log('error has occurred' + err);
      });

      this.dashboardService.getEntity();
    } else {
      this.generateEntity = this.entityService.getEntity_Old();
    }
  }

  ngAfterContentInit() { }

  expandEntity(entityId) {
    const entity = _.findIndex(this.entitiesContent['_results'], x => {
      return (x.nativeElement.id === 'entity_content_' + entityId);
    });

    if (entity !== -1) {
      if (this.entitiesContent['_results'][entity].nativeElement.style.height === 'auto') {
        this.entitiesContent['_results'][entity].nativeElement.style.height = '200px';
        this.toggleEntityExpand = false;
      } else {
        this.entitiesContent['_results'][entity].nativeElement.style.height = 'auto';
        this.toggleEntityExpand = true;
      }
    }

  }

  validateEntity(ent: any) {

    this.wrapper_1.nativeElement.innerHTML = '';

    _.forEach(this.entities['_results'], x => {
      x.nativeElement.hidden = true;
    });

    const index = _.findIndex(this.entities['_results'], x => {
      return x.nativeElement.id === 'entity_' + ent.id;
    });

    this.entities['_results'][index].nativeElement.hidden = false;

    this.generateEntity.forEach(s => {
      s.entity.forEach(e => {
        e.attr.forEach(a => {
          if (ent.id === e.id) {
            a.display = true;
          } else {
            a.display = false;
          }
        });
      });
    });

  }

  renderEntity(stageName, entity, attributeId) {

    if (
      entity.attr[entity.attr.findIndex(x => x.id === attributeId)].relationOut
        .length > 0
    ) {

      this.validateEntity(entity);

      let stageInd = null;
      let entityInd = null;

      stageInd = this.generateEntity.findIndex(s => s.stage === stageName);

      this.generateEntity.forEach(s => {
        if (s.stage === stageName) {
          entityInd = s.entity.findIndex(e => e.id === entity.id);
        }
      });

      const attrInd = entity.attr.findIndex(x => x.id === attributeId);

      this.generateEntity[stageInd].entity[entityInd].attr.unshift(
        this.generateEntity[stageInd].entity[entityInd].attr.splice(attrInd, 1)[0]);

      this.generateEntity[stageInd].entity.unshift(
        this.generateEntity[stageInd].entity.splice(entityInd, 1)[0]);

      entity.attr[entity.attr.findIndex(x => x.id === attributeId)].relationOut.forEach(x => {
        this.generateEntity.forEach(s => {
          s.entity.forEach(e => {
            if (x.entityId === e.id) {
              this.renderLoopEntity(s.stage, e, x.attributeId);
            }
          });
        });
      });

      this.wrapper_1.nativeElement.style.height = (this.wrapper_2.nativeElement.offsetHeight + 100) + 'px';
      this.wrapper_1.nativeElement.style.width = this.wrapper_2.nativeElement.offsetWidth + 'px';

      this.initialEntity = entity;
      this.initialAttribute = attributeId;

    }

  }

  renderLoopEntity(stageName, entity, attrId) {

    const index = _.findIndex(this.entities['_results'], x => {
      return x.nativeElement.id === 'entity_' + entity.id;
    });
    this.entities['_results'][index].nativeElement.hidden = false;

    this.generateEntity.forEach(s => {
      s.entity.forEach(e => {
        if (e.id === entity.id) {
          e.attr.forEach(a => {
            if (a.id === attrId) {
              a.display = true;
            }
          });
        }
      });
    });

    const entityIndex = _.findIndex(this.entitiesContent['_results'], x => {
      return (x.nativeElement.id === 'entity_content_' + entity['id']);
    });

    let counter = 0;
    if (entity !== -1) {
      entity.attr.forEach(x => {
        if (x.display === true) {
          counter++;
        }
      });

      if (counter <= 5) {
        this.entitiesContent['_results'][entityIndex].nativeElement.style.height = (counter * 50) + 'px';
      } else {
        this.entitiesContent['_results'][entityIndex].nativeElement.style.height = '200px';
      }
    }


    if (entity.attr[entity.attr.findIndex(x => x.id === attrId)].relationOut.length > 0) {
      entity.attr[
        entity.attr.findIndex(x => x.id === attrId)
      ].relationOut.forEach(x => {
        this.generateEntity.forEach(s => {
          s.entity.forEach(e => {
            if (x.entityId === e.id) {
              this.renderLoopEntity(s.stage, e, x.attributeId);
            }
          });
        });
      });
    }
  }

  /*
  createLinearSvgLink(color, polygon, line) {
    if (polygon && line) {
      this.wrapper_1.nativeElement.innerHTML +=
        `<div class="svg-ele">
            <svg height='100%' width='100%' style='position: absolute;'>
              <polygon points="` + polygon.x1 + `,` + polygon.y1 + ` ` + polygon.x2 +
        `,` + polygon.y2 + ` ` + polygon.x3 + `,` + polygon.y3 +
        `" style="fill:` + color + `;" />
              <line x1='` + line.x1 + `' y1='` + line.y1 + `' x2='` + line.x2 + `' y2='` + line.y2 + `' style='stroke:` +
        color + `;stroke-width:3' />
            </svg>
          </div>`;
    }
  }

  createStepSvgLink(color, polygon, line1, line2, line3) {
    if (polygon && line1 && line2 && line3) {
      this.wrapper_1.nativeElement.innerHTML +=
      `<div class="svg-ele">
      <svg height='100%' width='100%' style='position: absolute;'>
        <polygon points="` + polygon.x1 + `,` + polygon.y1 + ` ` + polygon.x2 +
      `,` + polygon.y2 + ` ` + polygon.x3 + `,` + polygon.y3 +
      `" style="fill:` + color + `;" />
        <line x1='` + line1.x1 + `' y1='` + line1.y1 + `' x2='` + line1.x2 + `' y2='` + line1.y2 + `' style='stroke:` +
      color + `;stroke-width:3' />
        <line x1='` + line2.x1 + `' y1='` + line2.y1 + `' x2='` + line2.x2 + `' y2='` + line2.y2 + `' style='stroke:` +
      color + `;stroke-width:3' />
        <line x1='` + line3.x1 + `' y1='` + line3.y1 + `' x2='` + line3.x2 + `' y2='` + line3.y2 + `' style='stroke:` +
      color + `;stroke-width:3' />
      </svg>
    </div>`;
    }
  }
  // <!--<circle cx="` + circle.startDivX + `" cy="` + circle.startDivY + `" r="7" fill="` + color + `" />-->

*/

  createLoopAttributeLink(entityId, attributeId) {

    const EntityData = this.generateEntity;

    let stg = '';

    EntityData.forEach(s => {
      s.entity.forEach(e => {
        if (e.id === entityId) {
          stg = s.stage;
        }
      });
    });

    EntityData.forEach(stage => {
      stage.entity.forEach(entity => {

        if (entity.id === entityId) {
          entity.attr.forEach(attribute => {

            if (attribute.relationOut.length > 0 && attribute.id === attributeId) {

              attribute.relationOut.forEach(rel => {

                let color = '';
                let startDivX = null;
                let startDivY = null;
                let endDivX = null;
                let endDivY = null;

                if (stg === 'landing' && rel.stage === 'staging') {
                  color = '#F5717C';
                } else if (stg === 'staging' && rel.stage === 'landing') {
                  color = '#77B3FF';
                } else if (stg === 'staging' && rel.stage === 'sor') {
                  color = '#77B3FF';
                } else if (stg === 'sor' && rel.stage === 'staging') {
                  color = '#FB9D46';
                } else if (stg === 'sor' && rel.stage === 'mart') {
                  color = '#FB9D46';
                } else if (stage === 'mart' && rel.stage === 'sor') {
                  color = '#78B847';
                }

                const element_from = _.filter(this.attributes['_results'], x => {
                  return (x.nativeElement.id === 'attr_' + entity.id + '_' + attribute.id);
                });

                const element_to = _.filter(this.attributes['_results'], x => {
                  return (x.nativeElement.id === 'attr_' + rel.entityId + '_' + rel.attributeId);
                });


                if (element_to) {
                  if (
                    (stg === 'staging' && rel.stage === 'landing') ||
                    (stg === 'sor' && rel.stage === 'staging') ||
                    (stg === 'mart' && rel.stage === 'sor')
                  ) {

                    startDivX = element_from[0].nativeElement.offsetLeft - 10;
                    startDivY = element_from[0].nativeElement.offsetTop + 13;
                    endDivX = element_to[0].nativeElement.offsetLeft + 150;
                    endDivY = element_to[0].nativeElement.offsetTop + 13;

                    if (startDivY === endDivY) {
                      this.wrapper_1.nativeElement.innerHTML +=
                        `
                        <div class="svg-ele">
                    <svg height='100%' width='100%' style='position: absolute;'>
                      <polygon points="` + (endDivX - 7) + `,` + startDivY + ` ` + (endDivX + 5) +
                        `,` + (startDivY - 7) + ` ` + (endDivX + 5) + `,` + (startDivY + 7) +
                        `" style="fill:` + color + `;" />
                        <line x1='` +
                        startDivX +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        endDivX +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
                      </svg>
                      </div>
                  `;
                    } else {
                      this.wrapper_1.nativeElement.innerHTML +=
                        `
                        <div class="svg-ele">
                    <svg height='100%' width='100%' style='position: absolute;'>
                      <polygon points="` + (endDivX - 7) + `,` + endDivY + ` ` + (endDivX + 5) +
                        `,` + (endDivY - 7) + ` ` + (endDivX + 5) + `,` + (endDivY + 7) +
                        `" style="fill:` + color + `;" />
                        <line x1='` +
                        startDivX +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        (endDivX + 64) +
                        `' y2='` +
                        startDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <line x1='` +
                        (endDivX + 64) +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        (endDivX + 64) +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <line x1='` +
                        (endDivX + 64) +
                        `' y1='` +
                        endDivY +
                        `' x2='` +
                        endDivX +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
                    </svg>
                    </div>
                  `;
                    }

                  } else if (
                    (stg === 'landing' && rel.stage === 'staging') ||
                    (stg === 'staging' && rel.stage === 'sor') ||
                    (stg === 'sor' && rel.stage === 'mart')
                  ) {
                    startDivX = element_from[0].nativeElement.offsetLeft + 145;
                    startDivY = element_from[0].nativeElement.offsetTop + 13;
                    endDivX = element_to[0].nativeElement.offsetLeft - 10;
                    endDivY = element_to[0].nativeElement.offsetTop + 13;

                    if (startDivY === endDivY) {
                      this.wrapper_1.nativeElement.innerHTML +=
                        `
                        <div class="svg-ele">
                        <svg height='100%' width='100%' style='position: absolute;'>
                        <polygon points="` + (endDivX - 10) + `,` + (endDivY - 7) + ` ` + (endDivX + 2) +
                        `,` + endDivY + ` ` + (endDivX - 10) + `,` + (endDivY + 7) +
                        `" style="fill:` + color + `;" />
                      <line x1='` +
                        startDivX +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        endDivX +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
                    </svg>
                    </div>
                  `;
                    } else {
                      this.wrapper_1.nativeElement.innerHTML +=
                        `
                        <div class="svg-ele">
                        <svg height='100%' width='100%' style='position: absolute;'>
                        <polygon points="` + (endDivX - 10) + `,` + (endDivY - 7) + ` ` + (endDivX + 2) +
                        `,` + endDivY + ` ` + (endDivX - 10) + `,` + (endDivY + 7) +
                        `" style="fill:` + color + `;" />
                            <line x1='` +
                        startDivX +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        (endDivX - 64) +
                        `' y2='` +
                        startDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <line x1='` +
                        (endDivX - 64) +
                        `' y1='` +
                        startDivY +
                        `' x2='` +
                        (endDivX - 64) +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <line x1='` +
                        (endDivX - 64) +
                        `' y1='` +
                        endDivY +
                        `' x2='` +
                        endDivX +
                        `' y2='` +
                        endDivY +
                        `' style='stroke:` +
                        color +
                        `;stroke-width:3' />
                      <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
                    </svg>
                    </div>
                  `;
                    }

                  }

                  this.createLoopAttributeLink(rel.entityId, rel.attributeId);

                }

              });

            }

          });
        }
      });
    });

  }

  createAttributeLink(entity, attributeId) {

    const EntityData = this.generateEntity;

    let stage = '';

    EntityData.forEach(s => {
      s.entity.forEach(e => {
        if (e.id === entity.id) {
          stage = s.stage;
        }
      });
    });

    entity.attr.forEach(attribute => {

      if (attribute.relationOut.length > 0 && attribute.id === attributeId) {

        attribute.relationOut.forEach(rel => {

          let color = '';
          let startDivX = null;
          let startDivY = null;
          let endDivX = null;
          let endDivY = null;

          if (stage === 'landing' && rel.stage === 'staging') {
            color = '#F5717C';
          } else if (stage === 'staging' && rel.stage === 'landing') {
            color = '#77B3FF';
          } else if (stage === 'staging' && rel.stage === 'sor') {
            color = '#77B3FF';
          } else if (stage === 'sor' && rel.stage === 'staging') {
            color = '#FB9D46';
          } else if (stage === 'sor' && rel.stage === 'mart') {
            color = '#FB9D46';
          } else if (stage === 'mart' && rel.stage === 'sor') {
            color = '#78B847';
          }

          const element_from = _.filter(this.attributes['_results'], x => {
            return (x.nativeElement.id === 'attr_' + entity.id + '_' + attribute.id);
          });

          const element_to = _.filter(this.attributes['_results'], x => {
            return (x.nativeElement.id === 'attr_' + rel.entityId + '_' + rel.attributeId);
          });

          if (element_to[0]) {
            if (
              (stage === 'staging' && rel.stage === 'landing') ||
              (stage === 'sor' && rel.stage === 'staging') ||
              (stage === 'mart' && rel.stage === 'sor')
            ) {

              startDivX = element_from[0].nativeElement.offsetLeft - 10;
              startDivY = element_from[0].nativeElement.offsetTop + 13;
              endDivX = element_to[0].nativeElement.offsetLeft + 150;
              endDivY = element_to[0].nativeElement.offsetTop + 13;

              if (startDivY === endDivY) {

                this.wrapper_1.nativeElement.innerHTML +=
                  `
                  <div class="svg-ele">
              <svg height='100%' width='100%' style='position: absolute;'>
                <polygon points="` + (endDivX - 7) + `,` + startDivY + ` ` + (endDivX + 5) +
                  `,` + (startDivY - 7) + ` ` + (endDivX + 5) + `,` + (startDivY + 7) +
                  `" style="fill:` + color + `;" />
                <line x1='` +
                  startDivX +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  endDivX +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
              </svg>
              </div>
            `;
              } else {

                this.wrapper_1.nativeElement.innerHTML +=
                  `
                  <div class="svg-ele">
              <svg height='100%' width='100%' style='position: absolute;'>
                <polygon points="` + (endDivX - 7) + `,` + endDivY + ` ` + (endDivX + 5) +
                  `,` + (endDivY - 7) + ` ` + (endDivX + 5) + `,` + (endDivY + 7) +
                  `" style="fill:` + color + `;" />
                <line x1='` +
                  startDivX +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  (endDivX + 64) +
                  `' y2='` +
                  startDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <line x1='` +
                  (endDivX + 64) +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  (endDivX + 64) +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <line x1='` +
                  (endDivX + 64) +
                  `' y1='` +
                  endDivY +
                  `' x2='` +
                  endDivX +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
              </svg>
              </div>
            `;
              }

            } else if (
              (stage === 'landing' && rel.stage === 'staging') ||
              (stage === 'staging' && rel.stage === 'sor') ||
              (stage === 'sor' && rel.stage === 'mart')
            ) {

              startDivX = element_from[0].nativeElement.offsetLeft + 145;
              startDivY = element_from[0].nativeElement.offsetTop + 13;
              endDivX = element_to[0].nativeElement.offsetLeft - 10;
              endDivY = element_to[0].nativeElement.offsetTop + 13;

              if (startDivY === endDivY) {
                this.wrapper_1.nativeElement.innerHTML +=
                  `
                  <div class="svg-ele">
              <svg height='100%' width='100%' style='position: absolute;'>
                <polygon points="` + (endDivX - 10) + `,` + (endDivY - 7) + ` ` + (endDivX + 2) +
                  `,` + endDivY + ` ` + (endDivX - 10) + `,` + (endDivY + 7) +
                  `" style="fill:` + color + `;" />
                <line x1='` +
                  startDivX +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  endDivX +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
              </svg>
              </div>
            `;
              } else {
                this.wrapper_1.nativeElement.innerHTML +=
                  `
                  <div class="svg-ele">
              <svg height='100%' width='100%' style='position: absolute;'>
                <polygon points="` + (endDivX - 10) + `,` + (endDivY - 7) + ` ` + (endDivX + 2) +
                  `,` + endDivY + ` ` + (endDivX - 10) + `,` + (endDivY + 7) +
                  `" style="fill:` + color + `;" />
                <line x1='` +
                  startDivX +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  (endDivX - 64) +
                  `' y2='` +
                  startDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <line x1='` +
                  (endDivX - 64) +
                  `' y1='` +
                  startDivY +
                  `' x2='` +
                  (endDivX - 64) +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <line x1='` +
                  (endDivX - 64) +
                  `' y1='` +
                  endDivY +
                  `' x2='` +
                  endDivX +
                  `' y2='` +
                  endDivY +
                  `' style='stroke:` +
                  color +
                  `;stroke-width:3' />
                <!--<circle cx="` + startDivX + `" cy="` + (startDivY) + `" r="7" fill="` + color + `" />-->
              </svg>
              </div>
            `;
              }

            }

            this.createLoopAttributeLink(rel.entityId, rel.attributeId);

          }

        });

      }

    });

    this.generateRelationFlag = false;
  }

}
