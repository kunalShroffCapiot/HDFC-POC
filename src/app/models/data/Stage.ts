import { Entity } from './Entity';

export class Stage {
    id: string;
    stage: string;
    entity: Array<Entity>;

    constructor() {
      this.id = null;
      this.stage = null;
    }
}
