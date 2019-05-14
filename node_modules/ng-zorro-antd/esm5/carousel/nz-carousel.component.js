/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toBoolean, toNumber } from '../core/util/convert';
import { NzCarouselContentDirective } from './nz-carousel-content.directive';
var NzCarouselComponent = /** @class */ (function () {
    function NzCarouselComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._autoPlay = false;
        this._autoPlaySpeed = 3000;
        this._dots = true;
        this._vertical = false;
        this._effect = 'scrollx';
        this.unsubscribe$ = new Subject();
        this.activeIndex = 0;
        this.transform = 'translate3d(0px, 0px, 0px)';
        this.nzAfterChange = new EventEmitter();
        this.nzBeforeChange = new EventEmitter();
        this.nzEnableSwipe = true;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    NzCarouselComponent.prototype.onWindowResize = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.renderContent();
    };
    Object.defineProperty(NzCarouselComponent.prototype, "nextIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "prevIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "nzDots", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dots;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dots = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "nzEffect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._effect;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._effect = value;
            this.updateMode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "nzAutoPlay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoPlay;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoPlay = toBoolean(value);
            this.setUpAutoPlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "nzAutoPlaySpeed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoPlaySpeed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoPlaySpeed = toNumber(value, null);
            this.setUpAutoPlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCarouselComponent.prototype, "nzVertical", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = toBoolean(value);
            this.updateMode();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} content
     * @param {?} i
     * @return {?}
     */
    NzCarouselComponent.prototype.setActive = /**
     * @param {?} content
     * @param {?} i
     * @return {?}
     */
    function (content, i) {
        if (this.slideContents && this.slideContents.length) {
            this.setUpAutoPlay();
            /** @type {?} */
            var beforeIndex = this.slideContents.toArray().findIndex(function (slide) { return slide.isActive; });
            this.nzBeforeChange.emit({ from: beforeIndex, to: i });
            this.activeIndex = i;
            if (this.nzEffect === 'scrollx') {
                if (this.nzVertical) {
                    this.transform = "translate3d(0px, " + -this.activeIndex * this.elementRef.nativeElement.offsetHeight + "px, 0px)";
                }
                else {
                    this.transform = "translate3d(" + -this.activeIndex * this.elementRef.nativeElement.offsetWidth + "px, 0px, 0px)";
                }
            }
            else {
                this.transform = 'translate3d(0px, 0px, 0px)';
            }
            this.slideContents.forEach(function (slide) { return slide.isActive = slide === content; });
            this.nzAfterChange.emit(i);
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.renderContent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.slideContents && this.slideContents.length) {
            this.slideContents.forEach(function (content, i) {
                content.width = _this.elementRef.nativeElement.offsetWidth;
                if (_this.nzEffect === 'fade') {
                    content.fadeMode = true;
                    if (_this.nzVertical) {
                        content.top = -i * _this.elementRef.nativeElement.offsetHeight;
                    }
                    else {
                        content.left = -i * content.width;
                    }
                }
                else {
                    content.fadeMode = false;
                    content.left = null;
                    content.top = null;
                }
            });
            if (this.nzVertical) {
                this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
                this.renderer.removeStyle(this.slickList.nativeElement, 'width');
                this.renderer.removeStyle(this.slickList.nativeElement, 'height');
                this.renderer.setStyle(this.slickList.nativeElement, 'height', this.slideContents.first.el.offsetHeight + "px");
                this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
                this.renderer.setStyle(this.slickTrack.nativeElement, 'height', this.slideContents.length * this.elementRef.nativeElement.offsetHeight + "px");
            }
            else {
                this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
                this.renderer.removeStyle(this.slickList.nativeElement, 'height');
                this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
                this.renderer.setStyle(this.slickTrack.nativeElement, 'width', this.slideContents.length * this.elementRef.nativeElement.offsetWidth + "px");
            }
            this.setUpAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.setUpAutoPlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.clearTimeout();
        if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0) {
            this.timeout = setTimeout(function (_) {
                _this.setActive(_this.slideContents.toArray()[_this.nextIndex], _this.nextIndex);
            }, this.nzAutoPlaySpeed);
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.updateMode = /**
     * @return {?}
     */
    function () {
        if (this.slideContents && this.slideContents.length) {
            this.renderContent();
            this.setActive(this.slideContents.first, 0);
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.clearTimeout = /**
     * @return {?}
     */
    function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.setActive(this.slideContents.toArray()[this.nextIndex], this.nextIndex);
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.pre = /**
     * @return {?}
     */
    function () {
        this.setActive(this.slideContents.toArray()[this.prevIndex], this.prevIndex);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzCarouselComponent.prototype.goTo = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index >= 0 && index <= this.slideContents.length - 1) {
            this.setActive(this.slideContents.toArray()[index], index);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzCarouselComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.keyCode === LEFT_ARROW) { // Left
            // Left
            this.pre();
            e.preventDefault();
        }
        else if (e.keyCode === RIGHT_ARROW) { // Right
            // Right
            this.next();
            e.preventDefault();
        }
    };
    /**
     * @param {?=} action
     * @return {?}
     */
    NzCarouselComponent.prototype.swipe = /**
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = 'swipeleft'; }
        if (!this.nzEnableSwipe) {
            return;
        }
        if (action === 'swipeleft') {
            this.next();
        }
        if (action === 'swiperight') {
            this.pre();
        }
    };
    /* tslint:disable:no-any */
    /**
     * @param {?} e
     * @return {?}
     */
    NzCarouselComponent.prototype.swipeInProgress = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.nzEffect === 'scrollx') {
            /** @type {?} */
            var final = e.isFinal;
            /** @type {?} */
            var scrollWidth = final ? 0 : e.deltaX * 1.2;
            /** @type {?} */
            var totalWidth = this.elementRef.nativeElement.offsetWidth;
            if (this.nzVertical) {
                /** @type {?} */
                var totalHeight = this.elementRef.nativeElement.offsetHeight;
                /** @type {?} */
                var scrollPercent = scrollWidth / totalWidth;
                /** @type {?} */
                var scrollHeight = scrollPercent * totalHeight;
                this.transform = "translate3d(0px, " + (-this.activeIndex * totalHeight + scrollHeight) + "px, 0px)";
            }
            else {
                this.transform = "translate3d(" + (-this.activeIndex * totalWidth + scrollWidth) + "px, 0px, 0px)";
            }
        }
        if (e.isFinal) {
            this.setUpAutoPlay();
        }
        else {
            this.clearTimeout();
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (this.slideContents && this.slideContents.length) {
            this.slideContents.first.isActive = true;
        }
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.slideContents.changes
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(function () {
            _this.renderContent();
        });
        this.renderContent();
    };
    /**
     * @return {?}
     */
    NzCarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.clearTimeout();
    };
    NzCarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-carousel',
                    preserveWhitespaces: false,
                    template: "<div class=\"slick-initialized slick-slider\" [class.slick-vertical]=\"nzVertical\">\n  <div class=\"slick-list\" #slickList tabindex=\"-1\" (keydown)=\"onKeyDown($event)\" \n    (swipeleft)=\"swipe('swipeleft')\" (swiperight)=\"swipe('swiperight')\" (pan)=\"swipeInProgress($event);\">\n    <div class=\"slick-track\" [style.transform]=\"transform\" #slickTrack (mousedown)=\"$event.preventDefault()\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n  <ul class=\"slick-dots\" *ngIf=\"nzDots\">\n    <li\n      *ngFor=\"let content of slideContents; let i =index\"\n      [class.slick-active]=\"content.isActive\"\n      (click)=\"setActive(content,i)\">\n      <ng-template [ngTemplateOutlet]=\"nzDotRender || renderDotTemplate\" [ngTemplateOutletContext]=\"{ $implicit: i }\"></ng-template>\n    </li>\n  </ul>\n</div>\n\n<ng-template #renderDotTemplate let-index>\n  <button>{{index + 1}}</button>\n</ng-template>",
                    host: {
                        '[class.ant-carousel]': 'true'
                    },
                    styles: ["\n      :host {\n        display: block;\n        position: relative;\n        overflow: hidden;\n        width: 100%;\n        height: 100%;\n      }\n\n      .slick-dots {\n        display: block;\n      }\n\n      .slick-track {\n        opacity: 1;\n        transition: all 0.5s ease;\n      }\n\n      .slick-slide {\n        transition: opacity 500ms ease;\n      }\n\n    "]
                }] }
    ];
    /** @nocollapse */
    NzCarouselComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NzCarouselComponent.propDecorators = {
        slideContents: [{ type: ContentChildren, args: [NzCarouselContentDirective,] }],
        slickList: [{ type: ViewChild, args: ['slickList',] }],
        slickTrack: [{ type: ViewChild, args: ['slickTrack',] }],
        nzAfterChange: [{ type: Output }],
        nzBeforeChange: [{ type: Output }],
        nzEnableSwipe: [{ type: Input }],
        onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        nzDotRender: [{ type: Input }],
        nzDots: [{ type: Input }],
        nzEffect: [{ type: Input }],
        nzAutoPlay: [{ type: Input }],
        nzAutoPlaySpeed: [{ type: Input }],
        nzVertical: [{ type: Input }, { type: HostBinding, args: ['class.ant-carousel-vertical',] }]
    };
    return NzCarouselComponent;
}());
export { NzCarouselComponent };
function NzCarouselComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCarouselComponent.prototype._autoPlay;
    /** @type {?} */
    NzCarouselComponent.prototype._autoPlaySpeed;
    /** @type {?} */
    NzCarouselComponent.prototype._dots;
    /** @type {?} */
    NzCarouselComponent.prototype._vertical;
    /** @type {?} */
    NzCarouselComponent.prototype._effect;
    /** @type {?} */
    NzCarouselComponent.prototype.unsubscribe$;
    /** @type {?} */
    NzCarouselComponent.prototype.activeIndex;
    /** @type {?} */
    NzCarouselComponent.prototype.transform;
    /** @type {?} */
    NzCarouselComponent.prototype.timeout;
    /** @type {?} */
    NzCarouselComponent.prototype.slideContents;
    /** @type {?} */
    NzCarouselComponent.prototype.slickList;
    /** @type {?} */
    NzCarouselComponent.prototype.slickTrack;
    /** @type {?} */
    NzCarouselComponent.prototype.nzAfterChange;
    /** @type {?} */
    NzCarouselComponent.prototype.nzBeforeChange;
    /** @type {?} */
    NzCarouselComponent.prototype.nzEnableSwipe;
    /** @type {?} */
    NzCarouselComponent.prototype.nzDotRender;
    /** @type {?} */
    NzCarouselComponent.prototype.elementRef;
    /** @type {?} */
    NzCarouselComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL256LWNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBR0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7SUEwUDNFLDZCQUFtQixVQUFzQixFQUFVLFFBQW1CO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO3lCQXBObEQsS0FBSzs4QkFDQSxJQUFJO3FCQUNiLElBQUk7eUJBQ0EsS0FBSzt1QkFDUCxTQUFTOzRCQUNKLElBQUksT0FBTyxFQUFROzJCQUU1QixDQUFDO3lCQUNILDRCQUE0Qjs2QkFNUSxJQUFJLFlBQVksRUFBRTs4QkFDSyxJQUFJLFlBQVksRUFBRTs2QkFDaEUsSUFBSTtLQXFNNUI7Ozs7O0lBbE1ELDRDQUFjOzs7O0lBRGQsVUFDZSxDQUFVO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0QjtJQUVELHNCQUFJLDBDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUks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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdG9Cb29sZWFuLCB0b051bWJlciB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9uei1jYXJvdXNlbC1jb250ZW50LmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCB0eXBlIFN3aXBlRGlyZWN0aW9uID0gJ3N3aXBlbGVmdCcgfCAnc3dpcGVyaWdodCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotY2Fyb3VzZWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0ICAgICAgICAgICAgICAgOiB7XG4gICAgJ1tjbGFzcy5hbnQtY2Fyb3VzZWxdJzogJ3RydWUnXG4gIH0sXG4gIHN0eWxlcyAgICAgICAgICAgICA6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5zbGljay1kb3RzIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIC5zbGljay10cmFjayB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XG4gICAgICB9XG5cbiAgICAgIC5zbGljay1zbGlkZSB7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgNTAwbXMgZWFzZTtcbiAgICAgIH1cblxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekNhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgcHJpdmF0ZSBfYXV0b1BsYXkgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYXV0b1BsYXlTcGVlZCA9IDMwMDA7XG4gIHByaXZhdGUgX2RvdHMgPSB0cnVlO1xuICBwcml2YXRlIF92ZXJ0aWNhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9lZmZlY3QgPSAnc2Nyb2xseCc7XG4gIHByaXZhdGUgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBhY3RpdmVJbmRleCA9IDA7XG4gIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KSc7XG4gIHRpbWVvdXQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZSkgc2xpZGVDb250ZW50czogUXVlcnlMaXN0PE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlPjtcbiAgQFZpZXdDaGlsZCgnc2xpY2tMaXN0Jykgc2xpY2tMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzbGlja1RyYWNrJykgc2xpY2tUcmFjazogRWxlbWVudFJlZjtcbiAgQE91dHB1dCgpIG56QWZ0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbnpCZWZvcmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx7IGZyb206IG51bWJlcjsgdG86IG51bWJlciB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgbnpFbmFibGVTd2lwZSA9IHRydWU7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsgJyRldmVudCcgXSlcbiAgb25XaW5kb3dSZXNpemUoZTogVUlFdmVudCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgZ2V0IG5leHRJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUluZGV4IDwgdGhpcy5zbGlkZUNvbnRlbnRzLmxlbmd0aCAtIDEgPyAodGhpcy5hY3RpdmVJbmRleCArIDEpIDogMDtcbiAgfVxuXG4gIGdldCBwcmV2SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVJbmRleCA+IDAgPyAodGhpcy5hY3RpdmVJbmRleCAtIDEpIDogKHRoaXMuc2xpZGVDb250ZW50cy5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG56RG90UmVuZGVyOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyIH0+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuekRvdHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kb3RzID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekRvdHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvdHM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpFZmZlY3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2VmZmVjdCA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlTW9kZSgpO1xuICB9XG5cbiAgZ2V0IG56RWZmZWN0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VmZmVjdDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekF1dG9QbGF5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXV0b1BsYXkgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIHRoaXMuc2V0VXBBdXRvUGxheSgpO1xuICB9XG5cbiAgZ2V0IG56QXV0b1BsYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9QbGF5O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56QXV0b1BsYXlTcGVlZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYXV0b1BsYXlTcGVlZCA9IHRvTnVtYmVyKHZhbHVlLCBudWxsKTtcbiAgICB0aGlzLnNldFVwQXV0b1BsYXkoKTtcbiAgfVxuXG4gIGdldCBuekF1dG9QbGF5U3BlZWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b1BsYXlTcGVlZDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWNhcm91c2VsLXZlcnRpY2FsJylcbiAgc2V0IG56VmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVNb2RlKCk7XG4gIH1cblxuICBnZXQgbnpWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cblxuICBzZXRBY3RpdmUoY29udGVudDogTnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmUsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNsaWRlQ29udGVudHMgJiYgdGhpcy5zbGlkZUNvbnRlbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZXRVcEF1dG9QbGF5KCk7XG4gICAgICBjb25zdCBiZWZvcmVJbmRleCA9IHRoaXMuc2xpZGVDb250ZW50cy50b0FycmF5KCkuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlKTtcbiAgICAgIHRoaXMubnpCZWZvcmVDaGFuZ2UuZW1pdCh7IGZyb206IGJlZm9yZUluZGV4LCB0bzogaSB9KTtcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpO1xuICAgICAgaWYgKHRoaXMubnpFZmZlY3QgPT09ICdzY3JvbGx4Jykge1xuICAgICAgICBpZiAodGhpcy5uelZlcnRpY2FsKSB7XG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMHB4LCAkey10aGlzLmFjdGl2ZUluZGV4ICogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4LCAwcHgpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey10aGlzLmFjdGl2ZUluZGV4ICogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHgsIDBweCwgMHB4KWA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJztcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVDb250ZW50cy5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID0gc2xpZGUgPT09IGNvbnRlbnQpO1xuICAgICAgdGhpcy5uekFmdGVyQ2hhbmdlLmVtaXQoaSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zbGlkZUNvbnRlbnRzICYmIHRoaXMuc2xpZGVDb250ZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2xpZGVDb250ZW50cy5mb3JFYWNoKChjb250ZW50LCBpKSA9PiB7XG4gICAgICAgIGNvbnRlbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgaWYgKHRoaXMubnpFZmZlY3QgPT09ICdmYWRlJykge1xuICAgICAgICAgIGNvbnRlbnQuZmFkZU1vZGUgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGlzLm56VmVydGljYWwpIHtcbiAgICAgICAgICAgIGNvbnRlbnQudG9wID0gLWkgKiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQubGVmdCA9IC1pICogY29udGVudC53aWR0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudC5mYWRlTW9kZSA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRlbnQubGVmdCA9IG51bGw7XG4gICAgICAgICAgY29udGVudC50b3AgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLm56VmVydGljYWwpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnNsaWNrVHJhY2submF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5zbGlja0xpc3QubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5zbGlja0xpc3QubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tMaXN0Lm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHt0aGlzLnNsaWRlQ29udGVudHMuZmlyc3QuZWwub2Zmc2V0SGVpZ2h0fXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5zbGlja1RyYWNrLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNsaWNrVHJhY2submF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke3RoaXMuc2xpZGVDb250ZW50cy5sZW5ndGggKiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5zbGlja1RyYWNrLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnNsaWNrTGlzdC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5zbGlja1RyYWNrLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2xpY2tUcmFjay5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHt0aGlzLnNsaWRlQ29udGVudHMubGVuZ3RoICogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0VXBBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFVwQXV0b1BsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICBpZiAodGhpcy5uekF1dG9QbGF5ICYmIHRoaXMubnpBdXRvUGxheVNwZWVkID4gMCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChfID0+IHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmUodGhpcy5zbGlkZUNvbnRlbnRzLnRvQXJyYXkoKVsgdGhpcy5uZXh0SW5kZXggXSwgdGhpcy5uZXh0SW5kZXgpO1xuICAgICAgfSwgdGhpcy5uekF1dG9QbGF5U3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2xpZGVDb250ZW50cyAmJiB0aGlzLnNsaWRlQ29udGVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuc2xpZGVDb250ZW50cy5maXJzdCwgMCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaW1lb3V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuc2xpZGVDb250ZW50cy50b0FycmF5KClbIHRoaXMubmV4dEluZGV4IF0sIHRoaXMubmV4dEluZGV4KTtcbiAgfVxuXG4gIHByZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEFjdGl2ZSh0aGlzLnNsaWRlQ29udGVudHMudG9BcnJheSgpWyB0aGlzLnByZXZJbmRleCBdLCB0aGlzLnByZXZJbmRleCk7XG4gIH1cblxuICBnb1RvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLnNsaWRlQ29udGVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5zZXRBY3RpdmUodGhpcy5zbGlkZUNvbnRlbnRzLnRvQXJyYXkoKVsgaW5kZXggXSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gTEVGVF9BUlJPVykgeyAvLyBMZWZ0XG4gICAgICB0aGlzLnByZSgpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykgeyAvLyBSaWdodFxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgc3dpcGUoYWN0aW9uOiBTd2lwZURpcmVjdGlvbiA9ICdzd2lwZWxlZnQnKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56RW5hYmxlU3dpcGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGFjdGlvbiA9PT0gJ3N3aXBlbGVmdCcpIHsgdGhpcy5uZXh0KCk7IH1cbiAgICBpZiAoYWN0aW9uID09PSAnc3dpcGVyaWdodCcpIHsgdGhpcy5wcmUoKTsgfVxuICB9XG5cbiAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXG4gIHN3aXBlSW5Qcm9ncmVzcyhlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekVmZmVjdCA9PT0gJ3Njcm9sbHgnKSB7XG4gICAgICBjb25zdCBmaW5hbCA9IGUuaXNGaW5hbDtcbiAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gZmluYWwgPyAwIDogZS5kZWx0YVggKiAxLjI7XG4gICAgICBjb25zdCB0b3RhbFdpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICBpZiAodGhpcy5uelZlcnRpY2FsKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCBzY3JvbGxQZXJjZW50ID0gc2Nyb2xsV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSAgc2Nyb2xsUGVyY2VudCAqIHRvdGFsSGVpZ2h0O1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwcHgsICR7LXRoaXMuYWN0aXZlSW5kZXggKiB0b3RhbEhlaWdodCArIHNjcm9sbEhlaWdodH1weCwgMHB4KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey10aGlzLmFjdGl2ZUluZGV4ICogdG90YWxXaWR0aCArIHNjcm9sbFdpZHRofXB4LCAwcHgsIDBweClgO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZS5pc0ZpbmFsKSB7XG4gICAgICB0aGlzLnNldFVwQXV0b1BsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2xpZGVDb250ZW50cyAmJiB0aGlzLnNsaWRlQ29udGVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNsaWRlQ29udGVudHMuZmlyc3QuaXNBY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlQ29udGVudHMuY2hhbmdlc1xuICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpXG4gICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIH1cblxufVxuIl19