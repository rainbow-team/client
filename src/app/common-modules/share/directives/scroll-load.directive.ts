import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScrollLoad]'
})
export class ScrollLoadDirective {

  @Input('appScrollLoad')
  loadCallback: any;

  constructor(private el: ElementRef) { }

  @HostListener('scroll') onScrollElement() {
    const nativeEle = this.el.nativeElement;
    if (nativeEle) {
      if (nativeEle.scrollTop + nativeEle.offsetHeight + 5 >= nativeEle.scrollHeight) {
        if (typeof this.loadCallback === 'function') {
          this.loadCallback();
        }
      }
    }
  }
}
