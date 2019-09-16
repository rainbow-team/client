import { Directive, ElementRef, Input, HostListener } from '@angular/core';


//用于 attribute 的 CSS 选择器就是属性名称加方括号。 这里，指令的选择器是[myHighlight]，Angular 将会在模板中找到所有带myHighlight属性的元素。
@Directive({ selector: '[appPageWidth]' })
export class PageWidthDrective {
    private nativeElement: any;
    constructor(private element: ElementRef) {
        this.nativeElement = element.nativeElement;
    }
    @Input('appPageWidth') OffsetWidth: number;

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        this.nativeElement.style.width = (event.target.innerWidth - this.OffsetWidth) + 'px';
        //console.log('页面变化了'+event.target.innerHeight);
    }


    ngAfterViewInit() {
        this.nativeElement.style.width = (window.innerWidth - this.OffsetWidth) + 'px';
        //console.log('ngAfterViewInit'+window.innerHeight);
    }


}