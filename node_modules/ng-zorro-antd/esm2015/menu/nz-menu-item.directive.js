/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Optional, Renderer2 } from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { NzMenuDirective } from './nz-menu.directive';
import { NzSubMenuComponent } from './nz-submenu.component';
export class NzMenuItemDirective {
    /**
     * @param {?} renderer
     * @param {?} cd
     * @param {?} nzMenuDirective
     * @param {?} nzSubMenuComponent
     * @param {?} hostElement
     */
    constructor(renderer, cd, nzMenuDirective, nzSubMenuComponent, hostElement) {
        this.renderer = renderer;
        this.cd = cd;
        this.nzMenuDirective = nzMenuDirective;
        this.nzSubMenuComponent = nzSubMenuComponent;
        this.hostElement = hostElement;
        this._disabled = false;
        this._selected = false;
        this._initialized = false;
        this.level = 0;
        this.padding = null;
        this.isInDropDown = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSelected(value) {
        this._selected = toBoolean(value);
        if (this._initialized) {
            this.setClass();
        }
    }
    /**
     * @return {?}
     */
    get nzSelected() {
        return this._selected;
    }
    /**
     * clear all item selected status except this
     * @param {?} e
     * @return {?}
     */
    onClickItem(e) {
        if (this.nzDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.nzMenuDirective.clickItem(this);
        if (this.nzMenuDirective.nzSelectable) {
            this.nzMenuDirective.clearAllSelected();
            this.nzSelected = true;
        }
        if (this.nzSubMenuComponent) {
            this.nzSubMenuComponent.clickSubMenuDropDown();
        }
    }
    /**
     * define host class
     * @return {?}
     */
    get isInDropDownClass() {
        return this.isInDropDown;
    }
    /**
     * @return {?}
     */
    get isNotInDropDownClass() {
        return !this.isInDropDown;
    }
    /**
     * @return {?}
     */
    get setDropDownDisableClass() {
        return this.isInDropDown && this.nzDisabled;
    }
    /**
     * @return {?}
     */
    get setMenuDisableClass() {
        return (!this.isInDropDown) && this.nzDisabled;
    }
    /**
     * @return {?}
     */
    get setPaddingLeft() {
        if (this.nzMenuDirective.nzMode === 'inline') {
            if (this.nzSubMenuComponent) {
                /** if in sub menu component and host menu's mode is inline add PADDING_BASE * level padding */
                return (this.nzSubMenuComponent.level + 1) * this.nzMenuDirective.nzInlineIndent;
            }
            else {
                /** not in sub menu component but root menu's mode is inline return default padding */
                return this.nzMenuDirective.nzInlineIndent;
            }
        }
        else {
            return this.padding;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.nzMenuDirective.menuItems.push(this);
        /** store origin padding in padding */
        if (this.hostElement.nativeElement.style['padding-left']) {
            this.padding = parseInt(this.hostElement.nativeElement.style['padding-left'], 10);
        }
        this.isInDropDown = this.nzMenuDirective.nzInDropDown;
        this.setClass();
        this._initialized = true;
    }
    /**
     * @return {?}
     */
    setClass() {
        if (this._selected) {
            this.renderer.addClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
        }
        else {
            this.renderer.removeClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
        }
    }
}
NzMenuItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-menu-item]'
            },] }
];
/** @nocollapse */
NzMenuItemDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NzMenuDirective },
    { type: NzSubMenuComponent, decorators: [{ type: Optional }] },
    { type: ElementRef }
];
NzMenuItemDirective.propDecorators = {
    nzDisabled: [{ type: Input }],
    nzSelected: [{ type: Input }],
    onClickItem: [{ type: HostListener, args: ['click', ['$event'],] }],
    isInDropDownClass: [{ type: HostBinding, args: ['class.ant-dropdown-menu-item',] }],
    isNotInDropDownClass: [{ type: HostBinding, args: ['class.ant-menu-item',] }],
    setDropDownDisableClass: [{ type: HostBinding, args: ['class.ant-dropdown-menu-item-disabled',] }],
    setMenuDisableClass: [{ type: HostBinding, args: ['class.ant-menu-item-disabled',] }],
    setPaddingLeft: [{ type: HostBinding, args: ['style.padding-left.px',] }]
};
function NzMenuItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NzMenuItemDirective.prototype._disabled;
    /** @type {?} */
    NzMenuItemDirective.prototype._selected;
    /** @type {?} */
    NzMenuItemDirective.prototype._initialized;
    /** @type {?} */
    NzMenuItemDirective.prototype.level;
    /** @type {?} */
    NzMenuItemDirective.prototype.padding;
    /** @type {?} */
    NzMenuItemDirective.prototype.isInDropDown;
    /** @type {?} */
    NzMenuItemDirective.prototype.renderer;
    /** @type {?} */
    NzMenuItemDirective.prototype.cd;
    /** @type {?} */
    NzMenuItemDirective.prototype.nzMenuDirective;
    /** @type {?} */
    NzMenuItemDirective.prototype.nzSubMenuComponent;
    /** @type {?} */
    NzMenuItemDirective.prototype.hostElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJtZW51L256LW1lbnUtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFLNUQsTUFBTTs7Ozs7Ozs7SUFtRkosWUFBb0IsUUFBbUIsRUFBUyxFQUFxQixFQUFVLGVBQWdDLEVBQXFCLGtCQUFzQyxFQUFVLFdBQXVCO1FBQXZMLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFxQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBbEZ2TCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0YsS0FBSztxQkFDcEIsQ0FBQzt1QkFDQyxJQUFJOzRCQUNDLEtBQUs7S0E4RW5COzs7OztJQTVFRCxJQUNJLFVBQVUsQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMs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LGlDQUFpQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzdJO0tBQ0Y7OztZQTFHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQVZDLFNBQVM7WUFSVCxpQkFBaUI7WUFhVixlQUFlO1lBQ2Ysa0JBQWtCLHVCQXdGeUYsUUFBUTtZQXBHMUgsVUFBVTs7O3lCQXlCVCxLQUFLO3lCQVNMLEtBQUs7MEJBYUwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRTtnQ0FrQmxDLFdBQVcsU0FBQyw4QkFBOEI7bUNBSzFDLFdBQVcsU0FBQyxxQkFBcUI7c0NBS2pDLFdBQVcsU0FBQyx1Q0FBdUM7a0NBS25ELFdBQVcsU0FBQyw4QkFBOEI7NkJBSzFDLFdBQVcsU0FBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmltcG9ydCB7IE56TWVudURpcmVjdGl2ZSB9IGZyb20gJy4vbnotbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpTdWJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uei1zdWJtZW51LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1tZW51LWl0ZW1dJ1xufSlcbmV4cG9ydCBjbGFzcyBOek1lbnVJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgbGV2ZWwgPSAwO1xuICBwYWRkaW5nID0gbnVsbDtcbiAgaXNJbkRyb3BEb3duID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpTZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuc2V0Q2xhc3MoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICAvKiogY2xlYXIgYWxsIGl0ZW0gc2VsZWN0ZWQgc3RhdHVzIGV4Y2VwdCB0aGlzICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyAnJGV2ZW50JyBdKVxuICBvbkNsaWNrSXRlbShlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uek1lbnVEaXJlY3RpdmUuY2xpY2tJdGVtKHRoaXMpO1xuICAgIGlmICh0aGlzLm56TWVudURpcmVjdGl2ZS5uelNlbGVjdGFibGUpIHtcbiAgICAgIHRoaXMubnpNZW51RGlyZWN0aXZlLmNsZWFyQWxsU2VsZWN0ZWQoKTtcbiAgICAgIHRoaXMubnpTZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLm56U3ViTWVudUNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uelN1Yk1lbnVDb21wb25lbnQuY2xpY2tTdWJNZW51RHJvcERvd24oKTtcbiAgICB9XG4gIH1cblxuICAvKiogZGVmaW5lIGhvc3QgY2xhc3MgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1pdGVtJylcbiAgZ2V0IGlzSW5Ecm9wRG93bkNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5Ecm9wRG93bjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LW1lbnUtaXRlbScpXG4gIGdldCBpc05vdEluRHJvcERvd25DbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNJbkRyb3BEb3duO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1pdGVtLWRpc2FibGVkJylcbiAgZ2V0IHNldERyb3BEb3duRGlzYWJsZUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5Ecm9wRG93biAmJiB0aGlzLm56RGlzYWJsZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LWl0ZW0tZGlzYWJsZWQnKVxuICBnZXQgc2V0TWVudURpc2FibGVDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCF0aGlzLmlzSW5Ecm9wRG93bikgJiYgdGhpcy5uekRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLWxlZnQucHgnKVxuICBnZXQgc2V0UGFkZGluZ0xlZnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5uek1lbnVEaXJlY3RpdmUubnpNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgaWYgKHRoaXMubnpTdWJNZW51Q29tcG9uZW50KSB7XG4gICAgICAgIC8qKiBpZiBpbiBzdWIgbWVudSBjb21wb25lbnQgYW5kIGhvc3QgbWVudSdzIG1vZGUgaXMgaW5saW5lIGFkZCBQQURESU5HX0JBU0UgKiBsZXZlbCBwYWRkaW5nICovXG4gICAgICAgIHJldHVybiAodGhpcy5uelN1Yk1lbnVDb21wb25lbnQubGV2ZWwgKyAxKSAqIHRoaXMubnpNZW51RGlyZWN0aXZlLm56SW5saW5lSW5kZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqIG5vdCBpbiBzdWIgbWVudSBjb21wb25lbnQgYnV0IHJvb3QgbWVudSdzIG1vZGUgaXMgaW5saW5lIHJldHVybiBkZWZhdWx0IHBhZGRpbmcgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMubnpNZW51RGlyZWN0aXZlLm56SW5saW5lSW5kZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWRkaW5nO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBuek1lbnVEaXJlY3RpdmU6IE56TWVudURpcmVjdGl2ZSwgQE9wdGlvbmFsKCkgcHVibGljIG56U3ViTWVudUNvbXBvbmVudDogTnpTdWJNZW51Q29tcG9uZW50LCBwcml2YXRlIGhvc3RFbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm56TWVudURpcmVjdGl2ZS5tZW51SXRlbXMucHVzaCh0aGlzKTtcbiAgICAvKiogc3RvcmUgb3JpZ2luIHBhZGRpbmcgaW4gcGFkZGluZyAqL1xuICAgIGlmICh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGVbICdwYWRkaW5nLWxlZnQnIF0pIHtcbiAgICAgIHRoaXMucGFkZGluZyA9IHBhcnNlSW50KHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZVsgJ3BhZGRpbmctbGVmdCcgXSwgMTApO1xuICAgIH1cbiAgICB0aGlzLmlzSW5Ecm9wRG93biA9IHRoaXMubnpNZW51RGlyZWN0aXZlLm56SW5Ecm9wRG93bjtcbiAgICB0aGlzLnNldENsYXNzKCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgc2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5pc0luRHJvcERvd24gPyAnYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1zZWxlY3RlZCcgOiAnYW50LW1lbnUtaXRlbS1zZWxlY3RlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5pc0luRHJvcERvd24gPyAnYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1zZWxlY3RlZCcgOiAnYW50LW1lbnUtaXRlbS1zZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxufVxuIl19