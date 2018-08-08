import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from '../../../services/common/sideDrawer/SideDrawer.service';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements OnInit {


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
              relationIn: [
                {
                  stage: 'staging',
                  entity: 3,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'staging',
                  entity: 3,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: false,
              relRight: true,
              relationIn: [
                {
                  stage: 'staging',
                  entity: 3,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: [
                {
                  stage: 'landing',
                  entity: 1,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'landing',
                  entity: 2,
                  attributeId: 1,
                  attributeName: 'att 1'
                }              ]
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: false,
              relRight: true,
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            },
            {
              id: 3,
              name: 'Att 3',
              relLeft: true,
              relRight: true,
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: [
                {
                  stage: 'landing',
                  entity: 2,
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
                  entity: 3,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 4,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 5,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 5,
                  attributeId: 2,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 5,
                  attributeId: 3,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 6,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: 8,
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 8,
                  attributeId: 2,
                  attributeName: 'att 2'
                },
                {
                  stage: 'staging',
                  entity: 9,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 10,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 11,
                  attributeId: 1,
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: 11,
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: true,
              relRight: false,
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
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
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            },
            {
              id: 2,
              name: 'Att 2',
              relLeft: true,
              relRight: false,
              relationIn: [
                {
                  stage: 'sor',
                  entity: 7,
                  attributeId: 1,
                  attributeName: 'att 1'
                }
              ],
              relationOut: []
            }
          ]
        }
      ]
    }
  ];

  constructor( private sideDrawerService: SideDrawerService ) { }

  ngOnInit() { }

  selectEntity(id, entity) {
    if (id.srcElement.checked === true) {
      this.sideDrawerService.selectEntity(entity);
    }
  }

}
