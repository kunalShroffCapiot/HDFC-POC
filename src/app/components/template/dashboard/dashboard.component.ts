import { Component, OnInit, ElementRef } from '@angular/core';
import { DashboardService } from '../../../services/user/dashboard/Dashboard.service';
import { Entity } from '../../../models/data/Entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // entityData: Array<Entity> = new Array<Entity>();
  entitySub = new Subscription();

  stage = [
    {
      stage: 'landing',
      entity: [
        {
          id: 1,
          name: 'Entity 1',
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



  /*

  entityData = [
    {
      id: 1,
      stage: 'landing',
      entity: [
        {
          id: 1,
          name: 'landing 1',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            }
          ]
        },
        {
          id: 2,
          name: 'landing 2',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            },
            {
              id: 2,
              name: 'att 2',
              relation: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      stage: 'staging',
      entity: [
        {
          id: 3,
          name: 'staging 1',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: [
                {
                  stage: 'landing',
                  entity: '1',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'landing',
                  entity: '2',
                  attributeId: '1',
                  attributeName: 'att 1'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: 'staging 2',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            }
          ]
        },
        {
          id: 5,
          name: 'staging 3',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            },
            {
              id: 2,
              name: 'att 2',
              relation: []
            },
            {
              id: 3,
              name: 'att 3',
              relation: [
                {
                  stage: 'landing',
                  entity: '2',
                  attributeId: '3',
                  attributeName: 'att 3'
                }
              ]
            }
          ]
        },
        {
          id: 6,
          name: 'staging 4',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            }
          ]
        },
      ]
    },
    {
      id: 3,
      stage: 'sor',
      entity: [
        {
          id: 7,
          name: 'sor 7',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: [
                {
                  stage: 'staging',
                  entity: '3',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: '4',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: '5',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'staging',
                  entity: '5',
                  attributeId: '2',
                  attributeName: 'att 2'
                },
                {
                  stage: 'staging',
                  entity: '5',
                  attributeId: '3',
                  attributeName: 'att 3'
                },
                {
                  stage: 'staging',
                  entity: '6',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: '8',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: '8',
                  attributeId: '2',
                  attributeName: 'att 2'
                },
                {
                  stage: 'mart',
                  entity: '9',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: '10',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: '11',
                  attributeId: '1',
                  attributeName: 'att 1'
                },
                {
                  stage: 'mart',
                  entity: '11',
                  attributeId: '2',
                  attributeName: 'att 2'
                }
              ]
            },
            {
              id: 2,
              name: 'att 2',
              relation: []
            },
            {
              id: 3,
              name: 'att 3',
              relation: []
            },
            {
              id: 4,
              name: 'att 4',
              relation: []
            },
            {
              id: 5,
              name: 'att 5',
              relation: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      stage: 'mart',
      entity: [
        {
          id: 8,
          name: 'mart 1',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            },
            {
              id: 2,
              name: 'att 2',
              relation: []
            }
          ]
        },
        {
          id: 9,
          name: 'mart 2',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            }
          ]
        },
        {
          id: 10,
          name: 'mart 3',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            }
          ]
        },
        {
          id: 11,
          name: 'mart 4',
          attributes: [
            {
              id: 1,
              name: 'att 1',
              relation: []
            },
            {
              id: 2,
              name: 'att 2',
              relation: []
            }
          ]
        }
      ]
    }
  ];

  */

  constructor(private elRef: ElementRef, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getEntity();

    this.stage.forEach(stage => {
      console.log(stage);
    });

  }

  getCoordinates(event) {
    // const target = event.target || event.srcElement || event.currentTarget;
    console.log(event.srcElement.parentElement.offsetLeft);
    console.log(event.srcElement.parentElement.offsetTop);

  }
}
