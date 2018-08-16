export class Attribute {
  id: string;
  name: string;
  relationOut?: [
    {
      stage: string,
      entityId: string,
      attributeId: string,
    }
  ];

  constructor () {
    this.id = null;
    this.name = null;
    this.relationOut = [
      {
        stage: null,
        entityId: null,
        attributeId: null,
      }
    ];
  }
}
