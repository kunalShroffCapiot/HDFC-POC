import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'filterContent',
})
export class filterContent implements PipeTransform {
 transform(value: any, input: string,searchList :any,stage:string,actualStage) {
    
    // debugger;
  if (input && stage==actualStage) {
   input = input.toLowerCase();
 value=_.filter(searchList.entity,x=>{
     return x.name.toLowerCase().indexOf(input)>-1;
 })
 }
 return value;
 }
}