import { Pipe, PipeTransform } from '@angular/core';
import * as translation from "../assets/he.json";

@Pipe({
  name: 'translate'
})
export class TranslatePipePipe implements PipeTransform {
  translation:any;
  translate: boolean;

constructor() {
  this.translation=translation;
  this.translate = false;
}
  transform(value: string): string {
    if (!this.translate){
      return value;
    }
    const hebTranslation = this.translation[value.toLowerCase()];
    if (hebTranslation) {
      return hebTranslation;
    } else {
      return value;
    }
  }
}
