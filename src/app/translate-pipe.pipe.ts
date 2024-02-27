import { Pipe, PipeTransform } from '@angular/core';
import * as translation from "../assets/he.json";

@Pipe({
  name: 'translate'
})
export class TranslatePipePipe implements PipeTransform {
  translation:any;
constructor() {
  this.translation=translation;
}
  transform(value: string): string {
    const hebTranslation = this.translation[value.toLowerCase()];
    if (hebTranslation) {
      return hebTranslation;
    } else {
      return value;
    }
  }
}
