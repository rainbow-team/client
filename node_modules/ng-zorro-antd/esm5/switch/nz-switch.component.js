/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { forwardRef, Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
var NzSwitchComponent = /** @class */ (function () {
    function NzSwitchComponent() {
        this._disabled = false;
        this._loading = false;
        this._control = false;
        this.prefixCls = 'ant-switch';
        this.checked = false;
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
    }
    Object.defineProperty(NzSwitchComponent.prototype, "nzControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._control;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._control = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSwitchComponent.prototype, "nzCheckedChildren", {
        get: /**
         * @return {?}
         */
        function () {
            return this._checkedChildren;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isCheckedChildrenString = !(value instanceof TemplateRef);
            this._checkedChildren = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSwitchComponent.prototype, "nzUnCheckedChildren", {
        get: /**
         * @return {?}
         */
        function () {
            return this._unCheckedChildren;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isUnCheckedChildrenString = !(value instanceof TemplateRef);
            this._unCheckedChildren = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSwitchComponent.prototype, "nzSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._size = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSwitchComponent.prototype, "nzLoading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._loading = toBoolean(value);
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSwitchComponent.prototype, "nzDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = toBoolean(value);
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    NzSwitchComponent.prototype.onClick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        if ((!this.nzDisabled) && (!this.nzLoading) && (!this.nzControl)) {
            this.updateValue(!this.checked, true);
        }
    };
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    NzSwitchComponent.prototype.updateValue = /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    function (value, emit) {
        if (this.checked === value) {
            return;
        }
        this.checked = value;
        this.setClassMap();
        if (emit) {
            this.onChange(this.checked);
        }
    };
    /**
     * @return {?}
     */
    NzSwitchComponent.prototype.setClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        this.classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this.prefixCls + "-checked"] = this.checked,
            _a[this.prefixCls + "-loading"] = this.nzLoading,
            _a[this.prefixCls + "-disabled"] = this.nzDisabled,
            _a[this.prefixCls + "-small"] = this.nzSize === 'small',
            _a);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzSwitchComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
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
    };
    /**
     * @return {?}
     */
    NzSwitchComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.switchElement.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    NzSwitchComponent.prototype.blur = /**
     * @return {?}
     */
    function () {
        this.switchElement.nativeElement.blur();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzSwitchComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.updateValue(value, false);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzSwitchComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzSwitchComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NzSwitchComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.nzDisabled = isDisabled;
    };
    /**
     * @return {?}
     */
    NzSwitchComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setClassMap();
    };
    NzSwitchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-switch',
                    preserveWhitespaces: false,
                    template: "<span nz-wave [nzWaveExtraNode]=\"true\" [ngClass]=\"classMap\" [tabindex]=\"nzDisabled?-1:0\" #switchElement (keydown)=\"onKeyDown($event)\">\n  <i *ngIf=\"nzLoading\" nz-icon type=\"loading\" class=\"ant-switch-loading-icon\"></i>\n  <span class=\"ant-switch-inner\">\n    <span *ngIf=\"checked\">\n      <ng-container *ngIf=\"isCheckedChildrenString; else checkedChildrenTemplate\">{{ nzCheckedChildren }}</ng-container>\n      <ng-template #checkedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n    <span *ngIf=\"!checked\">\n      <ng-container *ngIf=\"isUnCheckedChildrenString; else unCheckedChildrenTemplate\">{{ nzUnCheckedChildren }}</ng-container>\n      <ng-template #unCheckedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzUnCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n  </span>\n</span>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NzSwitchComponent; }),
                            multi: true
                        }
                    ],
                    styles: ["\n    :host {\n      display: inline-block;\n    }\n  "]
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
    return NzSwitchComponent;
}());
export { NzSwitchComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJzd2l0Y2gvbnotc3dpdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O3lCQXNCM0IsS0FBSzt3QkFFTixLQUFLO3dCQUNMLEtBQUs7eUJBR1osWUFBWTt1QkFFZCxLQUFLO3dCQUtzQixjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7eUJBQ3ZCLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTs7SUFFbEMsc0JBQ0ksd0NBQVM7Ozs7UUFJYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7Ozs7UUFQRCxVQUNjLEtBQWM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7OztPQUFBO0lBTUQsc0JBQ0ksZ0RBQWlCOzs7O1FBS3JCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDOUI7Ozs7O1FBUkQsVUFDc0IsS0FBaUM7WUFDckQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUMvQjs7O09BQUE7SUFNRCxzQkFDSSxrREFBbUI7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QUNFLE9BQU8sRUFBTSxpQkFBaUI7NEJBQzlCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDOzRCQUNoRCxLQUFLLEVBQVEsSUFBSTt5QkFDbEI7cUJBQ0Y7NkJBWHNCLHdEQUl0QjtpQkFRRjs7O2dDQWFFLFNBQVMsU0FBQyxlQUFlOzRCQUt6QixLQUFLO29DQVNMLEtBQUs7c0NBVUwsS0FBSzt5QkFVTCxLQUFLOzRCQVVMLEtBQUs7NkJBVUwsS0FBSzswQkFVTCxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUUsUUFBUSxDQUFFOzs0QkE5R3JDOztTQWtDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmV4cG9ydCB0eXBlIE56U3dpdGNoU2l6ZVR5cGUgPSAnZGVmYXVsdCcgfCAnc21hbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXN3aXRjaCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zd2l0Y2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXMgICAgICAgICAgICAgOiBbIGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICBgIF0sXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFtcbiAgICB7XG4gICAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelN3aXRjaENvbXBvbmVudCksXG4gICAgICBtdWx0aSAgICAgIDogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelN3aXRjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zaXplOiBOelN3aXRjaFNpemVUeXBlO1xuICBwcml2YXRlIF9sb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2NvbnRyb2wgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENoaWxkcmVuOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ2hpbGRyZW46IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBwcmVmaXhDbHMgPSAnYW50LXN3aXRjaCc7XG4gIGNsYXNzTWFwO1xuICBjaGVja2VkID0gZmFsc2U7XG4gIGlzQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBpc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBAVmlld0NoaWxkKCdzd2l0Y2hFbGVtZW50JylcbiAgcHJpdmF0ZSBzd2l0Y2hFbGVtZW50OiBFbGVtZW50UmVmO1xuICBvbkNoYW5nZTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpDb250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q2hlY2tlZENoaWxkcmVuKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNDaGVja2VkQ2hpbGRyZW5TdHJpbmcgPSAhKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpO1xuICAgIHRoaXMuX2NoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56Q2hlY2tlZENoaWxkcmVuKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENoaWxkcmVuO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VW5DaGVja2VkQ2hpbGRyZW4odmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgdGhpcy5pc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56VW5DaGVja2VkQ2hpbGRyZW4oKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNpemUodmFsdWU6IE56U3dpdGNoU2l6ZVR5cGUpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56U2l6ZSgpOiBOelN3aXRjaFNpemVUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sb2FkaW5nID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbICckZXZlbnQnIF0pXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoKCF0aGlzLm56RGlzYWJsZWQpICYmICghdGhpcy5uekxvYWRpbmcpICYmICghdGhpcy5uekNvbnRyb2wpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKCF0aGlzLmNoZWNrZWQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBib29sZWFuLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc01hcCA9IHtcbiAgICAgIFsgdGhpcy5wcmVmaXhDbHMgXSAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tY2hlY2tlZGAgXSA6IHRoaXMuY2hlY2tlZCxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWxvYWRpbmdgIF0gOiB0aGlzLm56TG9hZGluZyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkYCBdOiB0aGlzLm56RGlzYWJsZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zbWFsbGAgXSAgIDogdGhpcy5uelNpemUgPT09ICdzbWFsbCdcbiAgICB9O1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpDb250cm9sKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7IC8vIExlZnRcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykgeyAvLyBSaWdodFxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRydWUsIHRydWUpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gU1BBQ0UgfHwgZS5rZXlDb2RlID09PSBFTlRFUikgeyAvLyBTcGFjZSwgRW50ZXJcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSghdGhpcy5jaGVja2VkLCB0cnVlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3dpdGNoRWxlbWVudC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cbn1cbiJdfQ==