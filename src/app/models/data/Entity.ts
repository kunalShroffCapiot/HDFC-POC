import { Attribute } from '../../../../node_modules/@angular/compiler';

export class Entity {
    id: string;
    name: string;
    attributes: Array<Attribute>;

    constructor () {
      this.id = null;
      this.name = null;
    }
}
