import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitulo]'
})
export class TituloDirective {

  constructor(private element:ElementRef) {
    this.element.nativeElement.style.fontSize = "20px";
  }

}
