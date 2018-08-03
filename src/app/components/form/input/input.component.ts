import { Component, OnInit, Input } from '@angular/core';
import { InputField } from '../../../models/formField/inputField/inputField.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() control: FormControl;
  @Input() inputConfig: InputField = new InputField();

  constructor() { }

  ngOnInit() { }

}
