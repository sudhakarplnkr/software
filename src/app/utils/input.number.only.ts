import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[number-only]'
})
export class InputNumbersOnly {
    constructor(public element: ElementRef) {
        this.element.nativeElement.onkeypress = (event) => {
            if ((event.which < 48 || event.which > 57) && event.which !== 46) {
                event.preventDefault();
            }
        };
        this.element.nativeElement.onblur = (event) => {
            if (event.target.value && isNaN(event.target.value)) {
                event.target.value = '';
                return;
            }
            event.target.value = parseFloat((Math.round(event.target.value * 100) / 100).toString()).toFixed(2);
        };
    }
}