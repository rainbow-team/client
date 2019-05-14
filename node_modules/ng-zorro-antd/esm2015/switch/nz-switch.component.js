/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { forwardRef, Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
export class NzSwitchComponent {
    constructor() {
        this._disabled = false;
        this._loading = false;
        this._control = false;
        this.prefixCls = 'ant-switch';
        this.checked = false;
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzControl(value) {
        this._control = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzControl() {
        return this._control;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzCheckedChildren(value) {
        this.isCheckedChildrenString = !(value instanceof TemplateRef);
        this._checkedChildren = value;
    }
    /**
     * @return {?}
     */
    get nzCheckedChildren() {
        return this._checkedChildren;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzUnCheckedChildren(value) {
        this.isUnCheckedChildrenString = !(value instanceof TemplateRef);
        this._unCheckedChildren = value;
    }
    /**
     * @return {?}
     */
    get nzUnCheckedChildren() {
        return this._unCheckedChildren;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSize(value) {
        this._size = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzSize() {
        return this._size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzLoading(value) {
        this._loading = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzLoading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onClick(e) {
        e.preventDefault();
        if ((!this.nzDisabled) && (!this.nzLoading) && (!this.nzControl)) {
            this.updateValue(!this.checked, true);
        }
    }
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    updateValue(value, emit) {
        if (this.checked === value) {
            return;
        }
        this.checked = value;
        this.setClassMap();
        if (emit) {
            this.onChange(this.checked);
        }
    }
    /**
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            [this.prefixCls]: true,
            [`${this.prefixCls}-checked`]: this.checked,
            [`${this.prefixCls}-loading`]: this.nzLoading,
            [`${this.prefixCls}-disabled`]: this.nzDisabled,
            [`${this.prefixCls}-small`]: this.nzSize === 'small'
        };
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (!this.nzControl) {
            if (e.keyCode === LEFT_ARROW) { // Left
                // Left
                this.updateValue(false, true);
                e.preventDefault();
            }
            else if (e.keyCode === RIGHT_ARROW) { // Right
                // Right
                this.updateValue(true, true);
                e.preventDefault();
            }
            else if (e.keyCode === SPACE || e.keyCode === ENTER) { // Space, Enter
                // Space, Enter
                this.updateValue(!this.checked, true);
                e.preventDefault();
            }
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.switchElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    blur() {
        this.switchElement.nativeElement.blur();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.updateValue(value, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
    }
}
NzSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-switch',
                preserveWhitespaces: false,
                template: "<span nz-wave [nzWaveExtraNode]=\"true\" [ngClass]=\"classMap\" [tabindex]=\"nzDisabled?-1:0\" #switchElement (keydown)=\"onKeyDown($event)\">\n  <i *ngIf=\"nzLoading\" nz-icon type=\"loading\" class=\"ant-switch-loading-icon\"></i>\n  <span class=\"ant-switch-inner\">\n    <span *ngIf=\"checked\">\n      <ng-container *ngIf=\"isCheckedChildrenString; else checkedChildrenTemplate\">{{ nzCheckedChildren }}</ng-container>\n      <ng-template #checkedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n    <span *ngIf=\"!checked\">\n      <ng-container *ngIf=\"isUnCheckedChildrenString; else unCheckedChildrenTemplate\">{{ nzUnCheckedChildren }}</ng-container>\n      <ng-template #unCheckedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzUnCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n  </span>\n</span>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzSwitchComponent),
                        multi: true
                    }
                ],
                styles: [`
    :host {
      display: inline-block;
    }
  `]
            }] }
];
NzSwitchComponent.propDecorators = {
    switchElement: [{ type: ViewChild, args: ['switchElement',] }],
    nzControl: [{ type: Input }],
    nzCheckedChildren: [{ type: Input }],
    nzUnCheckedChildren: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
function NzSwitchComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSwitchComponent.prototype._disabled;
    /** @type {?} */
    NzSwitchComponent.prototype._size;
    /** @type {?} */
    NzSwitchComponent.prototype._loading;
    /** @type {?} */
    NzSwitchComponent.prototype._control;
    /** @type {?} */
    NzSwitchComponent.prototype._checkedChildren;
    /** @type {?} */
    NzSwitchComponent.prototype._unCheckedChildren;
    /** @type {?} */
    NzSwitchComponent.prototype.prefixCls;
    /** @type {?} */
    NzSwitchComponent.prototype.classMap;
    /** @type {?} */
    NzSwitchComponent.prototype.checked;
    /** @type {?} */
    NzSwitchComponent.prototype.isCheckedChildrenString;
    /** @type {?} */
    NzSwitchComponent.prototype.isUnCheckedChildrenString;
    /** @type {?} */
    NzSwitchComponent.prototype.switchElement;
    /** @type {?} */
    NzSwitchComponent.prototype.onChange;
    /** @type {?} */
    NzSwitchComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJzd2l0Y2gvbnotc3dpdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQXFCakQsTUFBTTs7eUJBQ2dCLEtBQUs7d0JBRU4sS0FBSzt3QkFDTCxLQUFLO3lCQUdaLFlBQVk7dUJBRWQsS0FBSzt3QkFLc0IsR0FBRyxFQUFFLENBQUMsSUFBSTt5QkFDdkIsR0FBRyxFQUFFLENBQUMsSUFBSTs7Ozs7O0lBRWxDLElBQ0ksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFDSSxpQkFBaUIsQ0FBQyxLQUFpQztRQUNyRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0tBQy9COzs7O0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDOUI7Ozs7O0lBRUQsSUFDSSxtQkFBbUIsQ0FB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Q0FBQzt3QkFDaEQsS0FBSyxFQUFRLElBQUk7cUJBQ2xCO2lCQUNGO3lCQVhzQjs7OztHQUl0QjthQVFGOzs7NEJBYUUsU0FBUyxTQUFDLGVBQWU7d0JBS3pCLEtBQUs7Z0NBU0wsS0FBSztrQ0FVTCxLQUFLO3FCQVVMLEtBQUs7d0JBVUwsS0FBSzt5QkFVTCxLQUFLO3NCQVVMLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBRSxRQUFRLENBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmV4cG9ydCB0eXBlIE56U3dpdGNoU2l6ZVR5cGUgPSAnZGVmYXVsdCcgfCAnc21hbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXN3aXRjaCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zd2l0Y2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXMgICAgICAgICAgICAgOiBbIGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICBgIF0sXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFtcbiAgICB7XG4gICAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelN3aXRjaENvbXBvbmVudCksXG4gICAgICBtdWx0aSAgICAgIDogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelN3aXRjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zaXplOiBOelN3aXRjaFNpemVUeXBlO1xuICBwcml2YXRlIF9sb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2NvbnRyb2wgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENoaWxkcmVuOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ2hpbGRyZW46IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBwcmVmaXhDbHMgPSAnYW50LXN3aXRjaCc7XG4gIGNsYXNzTWFwO1xuICBjaGVja2VkID0gZmFsc2U7XG4gIGlzQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBpc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBAVmlld0NoaWxkKCdzd2l0Y2hFbGVtZW50JylcbiAgcHJpdmF0ZSBzd2l0Y2hFbGVtZW50OiBFbGVtZW50UmVmO1xuICBvbkNoYW5nZTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpDb250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q2hlY2tlZENoaWxkcmVuKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNDaGVja2VkQ2hpbGRyZW5TdHJpbmcgPSAhKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpO1xuICAgIHRoaXMuX2NoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56Q2hlY2tlZENoaWxkcmVuKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENoaWxkcmVuO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VW5DaGVja2VkQ2hpbGRyZW4odmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgdGhpcy5pc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56VW5DaGVja2VkQ2hpbGRyZW4oKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNpemUodmFsdWU6IE56U3dpdGNoU2l6ZVR5cGUpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56U2l6ZSgpOiBOelN3aXRjaFNpemVUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sb2FkaW5nID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbICckZXZlbnQnIF0pXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoKCF0aGlzLm56RGlzYWJsZWQpICYmICghdGhpcy5uekxvYWRpbmcpICYmICghdGhpcy5uekNvbnRyb2wpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKCF0aGlzLmNoZWNrZWQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBib29sZWFuLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc01hcCA9IHtcbiAgICAgIFsgdGhpcy5wcmVmaXhDbHMgXSAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tY2hlY2tlZGAgXSA6IHRoaXMuY2hlY2tlZCxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWxvYWRpbmdgIF0gOiB0aGlzLm56TG9hZGluZyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkYCBdOiB0aGlzLm56RGlzYWJsZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zbWFsbGAgXSAgIDogdGhpcy5uelNpemUgPT09ICdzbWFsbCdcbiAgICB9O1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpDb250cm9sKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7IC8vIExlZnRcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykgeyAvLyBSaWdodFxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRydWUsIHRydWUpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gU1BBQ0UgfHwgZS5rZXlDb2RlID09PSBFTlRFUikgeyAvLyBTcGFjZSwgRW50ZXJcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSghdGhpcy5jaGVja2VkLCB0cnVlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cbn1cbiJdfQ==