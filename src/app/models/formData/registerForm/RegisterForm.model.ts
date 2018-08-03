import { InputField } from '../../formField/inputField/inputField.model';

export class RegisterForm {
  registerName: InputField;
  registerMobile: InputField;
  registerPassword: InputField;

  constructor() {
    this.registerName = null;
    this.registerMobile = null;
    this.registerPassword = null;
  }
}
