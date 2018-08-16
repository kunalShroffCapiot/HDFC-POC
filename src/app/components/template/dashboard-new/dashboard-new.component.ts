import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DashboardService } from '../../../services/user/dashboard/Dashboard.service';
import { Entity } from '../../../models/data/Entity';
import { Subscription } from 'rxjs';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { EntityService } from '../../../services/entity/Entity.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
  @ViewChild('wrapper_1')
  wrapper_1: ElementRef;
  @ViewChildren('attributes')
  attributes: ElementRef;

  // entityData: Array<Entity> = new Array<Entity>();
  entitySub = new Subscription();

  stage: any;

  generateEntity: any;

  constructor(
    private elRef: ElementRef,
    private dashboardService: DashboardService,
    private sideDrawerService: SideDrawerService,
    private entityService: EntityService
  ) { }

  ngOnInit() {
    this.stage = this.entityService.getEntity();

    this.dashboardService.getEntity();
    this.sideDrawerService.getSelectEntity().subscribe(selectedEntity => {
      this.generateEnt(selectedEntity);
    });
  }

  generateEnt(ent: any) {

    let selStage: any;

    this.stage.forEach(s => {
      if (s.entity.findIndex(en => en.id === ent.id) >= 0) {
        selStage = s;
      }
    });

    this.generateEntity = [];

    this.generateEntity = [
      {
        stage: selStage.stage,
        entity: [ent]
      }
    ];
  }

  callRenderEntity(stageName, entity, attributeId) {
    this.renderEntity(stageName, entity, attributeId).then(
      (val) => {

        const newEnt = [];

        this.generateEntity.forEach(x => {
          if (x.stage === 'landing') {
            newEnt[0] = x;
          }
        });

        this.generateEntity.forEach(x => {
          if (x.stage === 'staging') {
            newEnt[1] = x;
          }
        });

        this.generateEntity.forEach(x => {
          if (x.stage === 'sor') {
            newEnt[2] = x;
          }
        });

        this.generateEntity.forEach(x => {
          if (x.stage === 'mart') {
            newEnt[3] = x;
          }
        });

        this.generateEntity = newEnt;

        this.generateRelation(entity);

        return false;
        // this.generateRelation(entity);
      }
    );
  }

  renderEntity(stageName, entity, attributeId) {
    const p = new Promise((resolve, reject) => {
      try {
        if (this.generateEntity.findIndex(x => x.stage === stageName) === -1) {
          this.generateEntity = [
            {
              stage: stageName,
              entity: [entity]
            }
          ];
        }

        if (
          entity.attr[entity.attr.findIndex(x => x.id === attributeId)].relationOut
            .length > 0
        ) {
          entity.attr[
            entity.attr.findIndex(x => x.id === attributeId)
          ].relationOut.forEach(x => {
            this.stage.forEach(s => {
              s.entity.forEach(e => {
                if (x.entityId === e.id) {
                  return this.putEntity(s.stage, e, x.attributeId);
                }
              });
            });
          });
        }

        resolve(true);
      } catch (Ex) {
        reject(false);
      }

    });

    return p;

  }

  putEntity(stageName, entity, attrId) {
    if (this.generateEntity.findIndex(x => x.stage === stageName) === -1) {
      this.generateEntity.push({
        stage: stageName,
        entity: [entity]
      });
    } else {
      if (
        this.generateEntity[
          this.generateEntity.findIndex(x => x.stage === stageName)
        ].entity.findIndex(x => x.id === entity.id) === -1
      ) {
        this.generateEntity[
          this.generateEntity.findIndex(x => x.stage === stageName)
        ].entity.push(entity);
      }
    }

    if (
      entity.attr[entity.attr.findIndex(x => x.id === attrId)].relationOut
        .length > 0
    ) {
      entity.attr[
        entity.attr.findIndex(x => x.id === attrId)
      ].relationOut.forEach(x => {
        this.stage.forEach(s => {
          s.entity.forEach(e => {
            if (x.entityId === e.id) {
              this.putEntity(s.stage, e, x.attributeId);
            }
          });
        });
      });
    }
  }

  checkRelation(entityId, attributeId) {

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
              } else {
                color = '##78B847';
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
                  startDivY = element_from[0].nativeElement.offsetTop + 46;
                  endDivX = element_to[0].nativeElement.offsetLeft + 115;
                  endDivY = element_to[0].nativeElement.offsetTop + 46;

                  if (startDivY === endDivY) {
                    this.wrapper_1.nativeElement.innerHTML +=
                      `
                    <svg height='100%' width='100%' style='position: absolute;'>
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
                      `;stroke-width:5' />
                    </svg>
                  `;
                  } else {
                    this.wrapper_1.nativeElement.innerHTML +=
                      `
                    <svg height='100%' width='100%' style='position: absolute;'>
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
                      `;stroke-width:5' />
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
                      `;stroke-width:5' />
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
                      `;stroke-width:5' />
                    </svg>
                  `;
                  }

                } else if (
                  (stg === 'landing' && rel.stage === 'staging') ||
                  (stg === 'staging' && rel.stage === 'sor') ||
                  (stg === 'sor' && rel.stage === 'mart')
                ) {
                  startDivX = element_from[0].nativeElement.offsetLeft + 120;
                  startDivY = element_from[0].nativeElement.offsetTop + 46;
                  endDivX = element_to[0].nativeElement.offsetLeft - 10;
                  endDivY = element_to[0].nativeElement.offsetTop + 46;

                  if (startDivY === endDivY) {
                    this.wrapper_1.nativeElement.innerHTML +=
                      `
                    <svg height='100%' width='100%' style='position: absolute;'>
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
                      `;stroke-width:5' />
                    </svg>
                  `;
                  } else {
                    this.wrapper_1.nativeElement.innerHTML +=
                      `
                    <svg height='100%' width='100%' style='position: absolute;'>
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
                      `;stroke-width:5' />
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
                      `;stroke-width:5' />
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
                      `;stroke-width:5' />
                    </svg>
                  `;
                  }

                }

              }

            });
          });
        }
      });
    });


  }

  generateRelation(entity) {

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
        } else {
          color = '##78B847';
        }

        const element_from = _.filter(this.attributes['_results'], x => {
          return (x.nativeElement.id === 'attr_' + entity.id + '_' + attribute.id);
        });

        const element_to = _.filter(this.attributes['_results'], x => {
          return (x.nativeElement.id === 'attr_' + rel.entityId + '_' + rel.attributeId);
        });

        if (element_to) {
          if (
            (stage === 'staging' && rel.stage === 'landing') ||
            (stage === 'sor' && rel.stage === 'staging') ||
            (stage === 'mart' && rel.stage === 'sor')
          ) {
            startDivX = element_from[0].nativeElement.offsetLeft - 10;
            startDivY = element_from[0].nativeElement.offsetTop + 46;
            endDivX = element_to[0].nativeElement.offsetLeft + 115;
            endDivY = element_to[0].nativeElement.offsetTop + 46;

            if (startDivY === endDivY) {
              this.wrapper_1.nativeElement.innerHTML +=
                `
              <svg height='100%' width='100%' style='position: absolute;'>
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
                `;stroke-width:5' />
              </svg>
            `;
            } else {
              this.wrapper_1.nativeElement.innerHTML +=
                `
              <svg height='100%' width='100%' style='position: absolute;'>
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
                `;stroke-width:5' />
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
                `;stroke-width:5' />
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
                `;stroke-width:5' />
              </svg>
            `;
            }

          } else if (
            (stage === 'landing' && rel.stage === 'staging') ||
            (stage === 'staging' && rel.stage === 'sor') ||
            (stage === 'sor' && rel.stage === 'mart')
          ) {
            startDivX = element_from[0].nativeElement.offsetLeft + 120;
            startDivY = element_from[0].nativeElement.offsetTop + 46;
            endDivX = element_to[0].nativeElement.offsetLeft - 10;
            endDivY = element_to[0].nativeElement.offsetTop + 46;

            if (startDivY === endDivY) {
              this.wrapper_1.nativeElement.innerHTML +=
                `
              <svg height='100%' width='100%' style='position: absolute;'>
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
                `;stroke-width:5' />
              </svg>
            `;
            } else {
              this.wrapper_1.nativeElement.innerHTML +=
                `
              <svg height='100%' width='100%' style='position: absolute;'>
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
                `;stroke-width:5' />
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
                `;stroke-width:5' />
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
                `;stroke-width:5' />
              </svg>
            `;
            }

          }

          this.checkRelation(rel.entityId, rel.attributeId);

        }

      });
    });
  }

}
