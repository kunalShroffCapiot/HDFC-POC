import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Entity } from '../../models/data/Entity';
import * as _ from 'lodash';

@Injectable()
export class EntityService {

  public stage: any; // Array<Entity> = new Array<Entity>();
finalData=[];
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
 getData(){
    return this.http.get('http://sandbox.odp.capiot.com:32001/api/a/sm/service?page=1&count=-1&' +
      'filter=%7B%22domain%22:%22HDFC-DATA-LINEAGE%22%7D');
  }

  getEntity_Old(){
    return (this.stage);
  }

  getEntity():Observable<any> {
    //return (this.stage);
 return new Observable((observer) => {
    
    // observable execution
         this.getData().subscribe(res => {
      //debugger;
      let actualData: any;
      actualData = res;
      let finalData = [];
      if (actualData != null) {
        actualData.forEach(element => {
          // if (element.name.indexOf("entity") >= 0) {
            if(true){
            let stageName = "";
            let stageIndex = -1;
            let idx = 0;
            element.attributeList.forEach(element2 => {
              if (element2.name.indexOf("stage") >= 0) {
                stageName = element2.name.substring(element2.name.indexOf("-") + 1);
                stageIndex = idx;
              }
              idx = idx + 1;
            });
            if(stageName==""){
              return;
            }
            element.attributeList.splice(stageIndex, 1);
            let data = {
              id: element._id,
              name: element.name,
              stage: stageName,
              attr: element.attributeList.map(r => {
                return { id: r._id, name: r.name, relationIn: JSON.parse(element.definition), relationOut: [] }
              })


            }
            finalData.push(data);
          }
        });
       this.finalData=finalData;
      observer.next(  this.formatFinalData(this.finalData));
      observer.complete();
      }



    }, err => {
      debugger;

      console.log(err);
      observer.complete();
    });
   
   
    
});
  

  }

   formatFinalData(finalData): any {
    // debugger;
    finalData.forEach(element => {
      element.attr.forEach(element2 => {
        let isExists = false;
        for (var key in element2.relationIn) {
          if (element2.relationIn.hasOwnProperty(key)) {
            var element3 = element2.relationIn[key];
            //  debugger;
            if (element3.properties != null && element3.properties.name != null) {
              // debugger;
              if (element3.properties.name == element2.name && element3.properties.relatedSearchField != null) {
                isExists = true;
                let data = {
                  stage: element.stage,
                  entityId: element.id,
                  attributeId: element2.id
                }
                // let r=_.filter(finalData,rr=>{
                // return _.filter(rr.attr,rr2=>{
                //     return rr.id=element3.properties.relatedTo && rr2.name==element3.properties.name
                //   })
                // })
                // debugger;
                this.updatefinalData(element3.properties.relatedTo, element3.properties.relatedSearchField, data)
                // debugger;
                return;
              }

            }
          }

        }

      });
    });

   
    this.finalData = _.chain(this.finalData).groupBy("stage").map(function (v, i) {
      return {
        stage: i,
        entity: _.map(v, x => {
          return { id: x.id, name: x.name, attr: x.attr }

        })

      }
    }).value();
// debugger;
    let landing=_.filter(this.finalData,x=>{
     return x.stage=="landing";
    })[0];

    let staging=_.filter(this.finalData,x=>{
     return x.stage=="staging";
    })[0];

    let sor=_.filter(this.finalData,x=>{
     return x.stage=="sor";
    })[0];

    let mart=_.filter(this.finalData,x=>{
      return x.stage=="mart";
    })[0];

    this.finalData=[];
    this.finalData.push(landing);
    this.finalData.push(staging);
    this.finalData.push(sor);
    this.finalData.push(mart);

    return this.finalData;

   }

     updatefinalData(entityId, attributeName, dataTOpushed) {
    // debugger;
    let entity = _.filter(this.finalData, r => {
      return r.id == entityId
    });

    if (entity != null && entity.length > 0) {
      let attribute = _.filter(entity[0].attr, r => {
        return r.name == attributeName
      });

      if (attribute != null && attribute.length > 0) {
        attribute[0].relationOut.push(dataTOpushed);
      }
    }

  }

}
