export class InputField {
    type: string;
    name: string;
    title: string;
    placeHolder: string;
    value: string;

    constructor() {
        this.type = 'input';
        this.name = '';
        this.placeHolder = '';
        this.title = '';
        this.value = '';
    }
}
