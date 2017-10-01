import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject, HostBinding } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jsPDF';

@HostBinding('style.height.px')
@Directive({
  selector: '[data-export]'
})
export class ExportDirective {
  @Input('data-export') exportEvent: EventEmitter<boolean>;

  constructor( @Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.exportEvent.subscribe(event => {
      this.createPDF();
    });
  }

  createPDF() {
    var scope = this;
    this.getCanvas().then(function (canvas) {
      var img = canvas.toDataURL("image/png"),
        doc = new jsPDF({
          unit: 'px',
          format: 'a4'
        });
      doc.addImage(img, 'JPEG', 20, 20);
      doc.save('techumber-html-to-pdf.pdf');
      //this.element.nativeElement.width(this.cacheWidth);
      scope.renderer.setElementStyle(scope.element.nativeElement, 'width', scope.cacheWidth.toString()+'px');
    });
  }

  private cacheWidth: number;
  getCanvas() {
    var a4 = [595.28, 841.89];
    this.cacheWidth = this.element.nativeElement.offsetWidth;
    this.renderer.setElementStyle(this.element.nativeElement, 'max-width', ((a4[0] * 1.33333) - 80).toString());
    this.renderer.setElementStyle(this.element.nativeElement, 'width', '750px');
    // this.element.nativeElement.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
    return html2canvas(this.element.nativeElement, {
      timeout: 2000
    });
  }
}