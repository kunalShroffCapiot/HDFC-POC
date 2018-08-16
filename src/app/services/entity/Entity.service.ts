import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Entity } from '../../models/data/Entity';

@Injectable()
export class EntityService {

  public stage: any; // Array<Entity> = new Array<Entity>();

  constructor(private http: HttpClient, private router: Router) {

    this.stage = [
      {
        index: 1,
        stage: 'landing',
        entity: [
          {
            id: '1',
            name: 'Entity 1',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              }
            ]
          },
          {
            id: '2',
            name: 'Entity 2',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              }
            ]
          }
        ]
      },
      {
        index: 2,
        stage: 'staging',
        entity: [
          {
            id: '3',
            name: 'Entity 3',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: [
                  {
                    stage: 'landing',
                    entityId: '1',
                    attributeId: '1'
                  },
                  {
                    stage: 'landing',
                    entityId: '2',
                    attributeId: '1'
                  }]
              }
            ]
          },
          {
            id: '4',
            name: 'Entity 4',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              }
            ]
          },
          {
            id: '5',
            name: 'Entity 5',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              },
              {
                id: '3',
                name: 'Att 3',
                relationOut: [
                  {
                    stage: 'landing',
                    entityId: '2',
                    attributeId: '2'
                  }
                ]
              }
            ]
          },
          {
            id: '6',
            name: 'Entity 6',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              }
            ]
          }
        ]
      },
      {
        index: 3,
        stage: 'sor',
        entity: [
          {
            id: '7',
            name: 'Entity 7',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: [
                  {
                    stage: 'staging',
                    entityId: '3',
                    attributeId: '1'
                  },
                  {
                    stage: 'staging',
                    entityId: '4',
                    attributeId: '1'
                  },
                  {
                    stage: 'staging',
                    entityId: '5',
                    attributeId: '1'
                  },
                  {
                    stage: 'staging',
                    entityId: '5',
                    attributeId: '2'
                  },
                  {
                    stage: 'staging',
                    entityId: '5',
                    attributeId: '3'
                  },
                  {
                    stage: 'staging',
                    entityId: '6',
                    attributeId: '1'
                  },
                  {
                    stage: 'mart',
                    entityId: '8',
                    attributeId: '1'
                  },
                  {
                    stage: 'mart',
                    entityId: '8',
                    attributeId: '2'
                  },
                  {
                    stage: 'mart',
                    entityId: '9',
                    attributeId: '1'
                  },
                  {
                    stage: 'mart',
                    entityId: '10',
                    attributeId: '1'
                  },
                  {
                    stage: 'mart',
                    entityId: '11',
                    attributeId: '1'
                  },
                  {
                    stage: 'mart',
                    entityId: '11',
                    attributeId: '2'
                  }
                ]
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              },
              {
                id: '3',
                name: 'Att 3',
                relationOut: []
              },
              {
                id: '4',
                name: 'Att 4',
                relationOut: []
              },
              {
                id: '5',
                name: 'Att 5',
                relationOut: []
              }
            ]
          }
        ]
      },
      {
        index: 4,
        stage: 'mart',
        entity: [
          {
            id: '8',
            name: 'Entity 8',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              }
            ]
          },
          {
            id: '9',
            name: 'Entity 9',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              }
            ]
          },
          {
            id: '10',
            name: 'Entity 10',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              }
            ]
          },
          {
            id: '11',
            name: 'Entity 11',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                relationOut: []
              },
              {
                id: '2',
                name: 'Att 2',
                relationOut: []
              }
            ]
          }
        ]
      }
    ];
  }


  getEntity() {
    return (this.stage);
  }

}
