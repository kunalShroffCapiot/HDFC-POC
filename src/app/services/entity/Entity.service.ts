import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Entity } from '../../models/data/Entity';
import * as _ from 'lodash';

@Injectable()
export class EntityService {

  public stage: any; // Array<Entity> = new Array<Entity>();
  finalData = [];
  constructor(private http: HttpClient, private router: Router) {

    this.stage = [
      {
        index: 1,
        stage: 'landing',
        entity: [
          {
            id: '1',
            name: 'Entity 1',
            description: 'Entity 1 for testing, please check the  description.',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: 'Att 1',
                relationOut: [],
                display: false
              }
            ]
          },
          {
            id: '2',
            name: 'Entity 2',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [],
                display: false
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
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
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
                  }],
                  display: false
                }
            ]
          },
          {
            id: '4',
            name: 'Entity 4',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              }
            ]
          },
          {
            id: '5',
            name: 'Entity 5',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '3',
                name: 'Att 3',
                 description: '',
                relationOut: [
                  {
                    stage: 'landing',
                    entityId: '2',
                    attributeId: '2'
                  }
                ],
                display: false
              }
            ]
          },
          {
            id: '6',
            name: 'Entity 6',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: []
              }
            ],
            display: false
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
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
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
                ],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '3',
                name: 'Att 3',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '4',
                name: 'Att 4',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '5',
                name: 'Att 5',
                 description: '',
                relationOut: [],
                display: false
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
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [],
                display: false
              }
            ]
          },
          {
            id: '9',
            name: 'Entity 9',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              }
            ]
          },
          {
            id: '10',
            name: 'Entity 10',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [
                  {
                    stage: 'sor',
                    entityId: '7',
                    attributeId: '1'
                  }
                ],
                display: false
              }
            ]
          },
          {
            id: '11',
            name: 'Entity 11',
             description: '',
            attr: [
              {
                id: '1',
                name: 'Att 1',
                 description: '',
                relationOut: [],
                display: false
              },
              {
                id: '2',
                name: 'Att 2',
                 description: '',
                relationOut: [],
                display: false
              }
            ]
          }
        ]
      }
    ];
  }
  getData() {
    return this.http.get('http://sandbox.odp.capiot.com:32001/api/a/sm/service?page=1&count=-1&' +
      'filter=%7B%22domain%22:%22HDFC-DATA-LINEAGE%22%7D');
  }

  getEntity_Old() {
    return (this.stage);
  }

  getEntity(): Observable<any> {
    // return (this.stage);
    return new Observable((observer) => {

      // observable execution
      this.getData().subscribe(res => {
        let actualData: any;
        actualData = res;
        const finalData = [];
        if (actualData != null) {
          actualData.forEach(element => {
            // if (element.name.indexOf('entity') >= 0) {
            if (true) {
              let stageName = '';
              let stageIndex = -1;
              let idx = 0;
              element.attributeList.forEach(element2 => {
                if (element2.name.indexOf('stage') >= 0) {
                  stageName = element2.name.substring(element2.name.indexOf('-') + 1);
                  stageIndex = idx;
                }
                idx = idx + 1;
              });
              if (stageName === '') {
                return;
              }
             // debugger;
              element.attributeList.splice(stageIndex, 1);
              const data = {
                id: element._id,
                name: element.name,
                description: element.description,
                stage: stageName,
                attr: element.attributeList.map(r => {
                  return { id: r._id, name: r.name, description: (JSON.parse(element.definition))[r.key].properties,
                    relationIn: JSON.parse(element.definition), relationOut: [], display: false, key: r.key };
                })


              };
              finalData.push(data);
            }
          });
          this.finalData = finalData;
          observer.next(this.formatFinalData(this.finalData));
         // debugger;
          observer.complete();
        }



      }, err => {
        console.log(err);
        observer.complete();
      });



    });


  }

  formatFinalData(finalData): any {
    finalData.forEach(element => {
      element.attr.forEach(element2 => {
        let isExists = false;
      //  debugger;
        if (element2.description != null && element2.description._description != null) {
          element2.description = element2.description._description;
        } else {
          element2.description = null;
        }
        for (const key in element2.relationIn) {
          if (element2.relationIn.hasOwnProperty(key)) {
            const element3 = element2.relationIn[key];
            // debugger;
            if (element3.properties != null && element3.properties.name != null) {
              // debugger;
              if (element3.properties.name === element2.name && element3.properties.relatedSearchField != null) {
                isExists = true;
                const data = {
                  stage: element.stage,
                  entityId: element.id,
                  attributeId: element2.id,
                };
                let r = _.filter(finalData, rr => {

                  return rr.id === element3.properties.relatedTo;

                });
                if (r != null && r.length > 0) {
                  data.entityId = r[0].id;
                  data.stage = r[0].stage;
                  r = _.filter(r[0].attr, x => {
                    return x.key === element3.properties.relatedSearchField;
                  });

                  if (r != null && r.length > 0) {
                    data.attributeId = r[0].id;
                    element2.relationOut.push(data);
                  }


                }

                // debugger;
              //  this.updatefinalData(element3.properties.relatedTo, element3.properties.relatedSearchField, data)
                // debugger;
                return;
              }

            }
          }

        }

      });
    });


    this.finalData = _.chain(this.finalData).groupBy('stage').map(function (v, i) {
      return {
        stage: i,
        entity: _.map(v, x => {
          return { id: x.id, name: x.name, attr: x.attr,description:x.description };

        })
      };
    }).value();
    // debugger;
    const landing = _.filter(this.finalData, x => {
      return x.stage === 'landing';
    })[0];

    const staging = _.filter(this.finalData, x => {
      return x.stage === 'staging';
    })[0];

    const sor = _.filter(this.finalData, x => {
      return x.stage === 'sor';
    })[0];

    const mart = _.filter(this.finalData, x => {
      return x.stage === 'mart';
    })[0];

    this.finalData = [];
    this.finalData.push(landing);
    this.finalData.push(staging);
    this.finalData.push(sor);
    this.finalData.push(mart);

    return this.finalData;

  }

  updatefinalData(entityId, attributeName, dataTOpushed) {
    // debugger;
    const entity = _.filter(this.finalData, r => {
      return r.id === entityId;
    });

    if (entity != null && entity.length > 0) {
      const attribute = _.filter(entity[0].attr, r => {
        return r.key === attributeName;
      });

      if (attribute != null && attribute.length > 0) {
        attribute[0].relationOut.push(dataTOpushed);
      }
    }

  }

}
