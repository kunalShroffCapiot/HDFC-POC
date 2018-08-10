import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../../services/user/dashboard/Dashboard.service';
import { Entity } from '../../../models/data/Entity';
import { Subscription } from 'rxjs';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';
import { startTimeRange } from '../../../../../node_modules/@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  // entityData: Array<Entity> = new Array<Entity>();
  entitySub = new Subscription();


  stage = [
    {
      stage: 'landing',
      entity: [
        {
          id: 1,
          name: 'Entity 1',
          stage: 'landing',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            }
          ]
        },
        {
          id: 2,
          name: 'Entity 2',
          stage: 'landing',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            }
          ]
        }
      ]
    },
    {
      stage: 'staging',
      entity: [
        {
          id: 3,
          name: 'Entity 3',
          stage: 'staging',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: true,
              relationIn: [],
              relationOut: [
                {
                  stage: 'landing',
                  entityId: 1,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'landing',
                  entityId: 2,
                  attributeId: 1,
                  attributeName: 'att 1'
                }]
            }
          ]
        },
        {
          id: 4,
          name: 'Entity 4',
          stage: 'staging',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            }
          ]
        },
        {
          id: 5,
          name: 'Entity 5',
          stage: 'staging',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            },
            {
              id: 3,
              name: 'Att 3',
              relLeft: true,
              relRight: true,
              relationIn: [],
              relationOut: [
                {
                  stage: 'landing',
                  entityId: 2,
                  attributeId: 2,
                  attributeName: 'att 2'
                }
              ]
            }
          ]
        },
        {
          id: 6,
          name: 'Entity 6',
          stage: 'staging',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: false,
              relRight: true,
              relationIn: [],
              relationOut: []
            }
          ]
        }
      ]
    },
    {
      stage: 'sor',
      entity: [
        {
          id: 7,
          name: 'Entity 7',
          stage: 'sor',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: true,
              relationIn: [],
              relationOut: [
                {
                  stage: 'staging',
                  entityId: 3,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entityId: 4,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entityId: 5,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entityId: 5,
                  attributeId: 2,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entityId: 5,
                  attributeId: 3,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entityId: 6,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entityId: 8,
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entityId: 8,
                  attributeId: 2,
                  attributeName: 'att 2'
                },
                {
                  stage: 'mart',
                  entityId: 9,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entityId: 10,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entityId: 11,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entityId: 11,
                  attributeId: 2,
                  attributeName: 'att 2'
                }
              ]
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: false,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 3,
              name: 'Att 3',
              relLeft: false,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 4,
              name: 'Att 4',
              relLeft: false,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 5,
              name: 'Att 5',
              relLeft: false,
              relRight: false,
              relationIn: [],
              relationOut: []
            }
          ]
        }
      ]
    },
    {
      stage: 'mart',
      entity: [
        {
          id: 8,
          name: 'Entity 8',
          stage: 'mart',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            }
          ]
        },
        {
          id: 9,
          name: 'Entity 9',
          stage: 'mart',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            }
          ]
        },
        {
          id: 10,
          name: 'Entity 10',
          stage: 'mart',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            }
          ]
        },
        {
          id: 11,
          name: 'Entity 11',
          stage: 'mart',
          attr: [
            {
              id: 1,
              name: 'Att 1',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: true,
              relRight: false,
              relationIn: [],
              relationOut: []
            }
          ]
        }
      ]
    }
  ];

  generateEntity: any;


  constructor(private elRef: ElementRef, private dashboardService: DashboardService, private sideDrawerService: SideDrawerService) { }

  ngOnInit() {

    this.dashboardService.getEntity();
    this.sideDrawerService.getSelectEntity()
      .subscribe(selectedEntity => {

        this.generateEnt(selectedEntity);

      });
  }

  generateEnt(ent: any) {
    this.generateEntity = [
      {
        stage: ent.stage,
        entity: [
          ent
        ]
      }
    ];

    (window as any).genRelation(this.stage, ent);

  }

}
