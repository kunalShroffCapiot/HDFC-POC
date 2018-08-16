import { Attribute } from './Attribute';

export class Entity {
    id: string;
    stage: string;
    name: string;
    attr: Array<Attribute>;

    constructor () {
      this.id = null;
      this.stage = null;
      this.name = null;
    }
}
