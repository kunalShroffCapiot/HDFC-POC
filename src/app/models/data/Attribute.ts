export class Attribute {
  id: string;
  name: string;
  relation: [
    {
      stage: string,
      entity: string,
      attributeId: string,
      attributeName: string
    }
  ];

  constructor () {
    this.id = null;
    this.name = null;
    this.relation = [
      {
        stage: null,
        entity: null,
        attributeId: null,
        attributeName: null
      }
    ];
  }
}
