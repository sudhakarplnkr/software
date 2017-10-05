import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[number-only]'
})
export class InputNumbersOnly {
    constructor(public el: ElementRef) {
        this.el.nativeElement.onkeypress = (evt) => {
            if ((evt.which < 48 || evt.which > 57) && evt.which !== 46) {
                evt.preventDefault();
            }
        };
        this.el.nativeElement.onblur = (event) => {
            if (event.target.value && isNaN(event.target.value)) {
                event.target.value = '';
            }
        };
    }
}