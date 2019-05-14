/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { forwardRef, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
export class NzInputNumberComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isInit = false;
        this._disabled = false;
        this._step = 1;
        this._autoFocus = false;
        this._formatter = (value) => value;
        this.isFocused = false;
        this.el = this.elementRef.nativeElement;
        this.prefixCls = 'ant-input-number';
        this.disabledUp = false;
        this.disabledDown = false;
        this.onChange = () => null;
        this.onTouched = () => null;
        this.nzSize = 'default';
        this.nzMin = -Infinity;
        this.nzMax = Infinity;
        this.nzParser = (value) => value;
        this.nzPlaceHolder = '';
    }
    /**
     * @return {?}
     */
    get isLarge() {
        return this.nzSize === 'large';
    }
    /**
     * @return {?}
     */
    get isSmall() {
        return this.nzSize === 'small';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAutoFocus(value) {
        this._autoFocus = toBoolean(value);
        this.updateAutoFocus();
    }
    /**
     * @return {?}
     */
    get nzAutoFocus() {
        return this._autoFocus;
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
    set nzStep(value) {
        this._step = value;
    }
    /**
     * @return {?}
     */
    get nzStep() {
        return this._step;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set nzFormatter(v) {
        this._formatter = v;
        /** @type {?} */
        const value = this.getCurrentValidValue(this.actualValue);
        this.writeValue(value);
    }
    /**
     * @return {?}
     */
    get nzFormatter() {
        return this._formatter;
    }
    /**
     * @return {?}
     */
    updateAutoFocus() {
        if (this.nzAutoFocus) {
            this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
        }
        else {
            this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onModelChange(value) {
        this.actualValue = this.nzParser(value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, ''));
        this.inputElement.nativeElement.value = this.actualValue;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getCurrentValidValue(value) {
        /** @type {?} */
        let val = value;
        if (val === '') {
            val = '';
        }
        else if (!this.isNotCompleteNumber(val)) {
            val = /** @type {?} */ (this.getValidValue(val));
        }
        else {
            val = this.value;
        }
        return this.toNumber(val);
    }
    /**
     * @param {?} num
     * @return {?}
     */
    isNotCompleteNumber(num) {
        return (isNaN(/** @type {?} */ (num)) ||
            num === '' ||
            num === null ||
            (num && num.toString().indexOf('.') === num.toString().length - 1));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getValidValue(value) {
        /** @type {?} */
        let val = parseFloat(/** @type {?} */ (value));
        // https://github.com/ant-design/ant-design/issues/7358
        if (isNaN(val)) {
            return value;
        }
        if (val < this.nzMin) {
            val = this.nzMin;
        }
        if (val > this.nzMax) {
            val = this.nzMax;
        }
        return val;
    }
    /**
     * @param {?} num
     * @return {?}
     */
    toNumber(num) {
        if (this.isNotCompleteNumber(num)) {
            return /** @type {?} */ (num);
        }
        if (isNotNil(this.nzPrecision)) {
            return Number(Number(num).toFixed(this.nzPrecision));
        }
        return Number(num);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onBlur(e) {
        this.onTouched();
        this.isFocused = false;
        /** @type {?} */
        const value = this.getCurrentValidValue(this.actualValue);
        this.setValue(value, `${this.value}` !== `${value}`);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        this.isFocused = true;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    getRatio(e) {
        /** @type {?} */
        let ratio = 1;
        if (e.metaKey || e.ctrlKey) {
            ratio = 0.1;
        }
        else if (e.shiftKey) {
            ratio = 10;
        }
        return ratio;
    }
    /**
     * @param {?} e
     * @param {?=} ratio
     * @return {?}
     */
    down(e, ratio) {
        if (!this.isFocused) {
            this.focus();
        }
        this.step('down', e, ratio);
    }
    /**
     * @param {?} e
     * @param {?=} ratio
     * @return {?}
     */
    up(e, ratio) {
        if (!this.isFocused) {
            this.focus();
        }
        this.step('up', e, ratio);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getPrecision(value) {
        /** @type {?} */
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        /** @type {?} */
        let precision = 0;
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1;
        }
        return precision;
    }
    /**
     * @param {?} currentValue
     * @param {?} ratio
     * @return {?}
     */
    getMaxPrecision(currentValue, ratio) {
        if (isNotNil(this.nzPrecision)) {
            return this.nzPrecision;
        }
        /** @type {?} */
        const ratioPrecision = this.getPrecision(ratio);
        /** @type {?} */
        const stepPrecision = this.getPrecision(this.nzStep);
        /** @type {?} */
        const currentValuePrecision = this.getPrecision(/** @type {?} */ (currentValue));
        if (!currentValue) {
            return ratioPrecision + stepPrecision;
        }
        return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    }
    /**
     * @param {?} currentValue
     * @param {?} ratio
     * @return {?}
     */
    getPrecisionFactor(currentValue, ratio) {
        /** @type {?} */
        const precision = this.getMaxPrecision(currentValue, ratio);
        return Math.pow(10, precision);
    }
    /**
     * @param {?} val
     * @param {?} rat
     * @return {?}
     */
    upStep(val, rat) {
        /** @type {?} */
        const precisionFactor = this.getPrecisionFactor(val, rat);
        /** @type {?} */
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        /** @type {?} */
        let result;
        if (typeof val === 'number') {
            result =
                ((precisionFactor * val + precisionFactor * this.nzStep * rat) /
                    precisionFactor).toFixed(precision);
        }
        else {
            result = this.nzMin === -Infinity ? this.nzStep : this.nzMin;
        }
        return this.toNumber(result);
    }
    /**
     * @param {?} val
     * @param {?} rat
     * @return {?}
     */
    downStep(val, rat) {
        /** @type {?} */
        const precisionFactor = this.getPrecisionFactor(val, rat);
        /** @type {?} */
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        /** @type {?} */
        let result;
        if (typeof val === 'number') {
            result =
                ((precisionFactor * val - precisionFactor * this.nzStep * rat) /
                    precisionFactor).toFixed(precision);
        }
        else {
            result = this.nzMin === -Infinity ? -this.nzStep : this.nzMin;
        }
        return this.toNumber(result);
    }
    /**
     * @param {?} type
     * @param {?} e
     * @param {?=} ratio
     * @return {?}
     */
    step(type, e, ratio = 1) {
        this.stop();
        e.preventDefault();
        if (this.nzDisabled) {
            return;
        }
        /** @type {?} */
        const value = this.getCurrentValidValue(this.actualValue) || 0;
        /** @type {?} */
        let val;
        if (type === 'up') {
            val = this.upStep(value, ratio);
        }
        else if (type === 'down') {
            val = this.downStep(value, ratio);
        }
        /** @type {?} */
        const outOfRange = val > this.nzMax || val < this.nzMin;
        if (val > this.nzMax) {
            val = this.nzMax;
        }
        else if (val < this.nzMin) {
            val = this.nzMin;
        }
        this.setValue(val, true);
        this.isFocused = true;
        if (outOfRange) {
            return;
        }
        this.autoStepTimer = setTimeout(() => {
            this[type](e, ratio, true);
        }, 600);
    }
    /**
     * @return {?}
     */
    stop() {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
    }
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    setValue(value, emit) {
        if (emit && (`${this.value}` !== `${value}`)) {
            this.onChange(value);
        }
        this.value = value;
        this.actualValue = value;
        /** @type {?} */
        const displayValue = isNotNil(this.nzFormatter(this.value)) ? this.nzFormatter(this.value) : '';
        this.displayValue = displayValue;
        this.inputElement.nativeElement.value = displayValue;
        this.disabledUp = this.disabledDown = false;
        if (value || value === 0) {
            /** @type {?} */
            const val = Number(value);
            if (val >= this.nzMax) {
                this.disabledUp = true;
            }
            if (val <= this.nzMin) {
                this.disabledDown = true;
            }
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (e.code === 'ArrowUp' || e.keyCode === UP_ARROW) {
            /** @type {?} */
            const ratio = this.getRatio(e);
            this.up(e, ratio);
            this.stop();
        }
        else if (e.code === 'ArrowDown' || e.keyCode === DOWN_ARROW) {
            /** @type {?} */
            const ratio = this.getRatio(e);
            this.down(e, ratio);
            this.stop();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyUp(e) {
        this.stop();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.setValue(value, false);
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
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    blur() {
        this.inputElement.nativeElement.blur();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isInit = true;
        if (this._autoFocus) {
            this.focus();
        }
    }
}
NzInputNumberComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-input-number',
                template: "<div class=\"ant-input-number-handler-wrap\">\n  <span\n    unselectable=\"unselectable\"\n    (mousedown)=\"up($event)\"\n    (mouseup)=\"stop()\"\n    (mouseleave)=\"stop()\"\n    class=\"ant-input-number-handler ant-input-number-handler-up\"\n    [class.ant-input-number-handler-up-disabled]=\"disabledUp\">\n    <i nz-icon type=\"up\" class=\"ant-input-number-handler-up-inner\"></i>\n  </span>\n  <span\n    unselectable=\"unselectable\"\n    (mousedown)=\"down($event)\"\n    (mouseup)=\"stop()\"\n    (mouseleave)=\"stop()\"\n    class=\"ant-input-number-handler ant-input-number-handler-down\"\n    [class.ant-input-number-handler-down-disabled]=\"disabledDown\">\n    <i nz-icon type=\"down\" class=\"ant-input-number-handler-down-inner\"></i>\n  </span>\n</div>\n<div class=\"ant-input-number-input-wrap\">\n  <input\n    #inputElement\n    class=\"ant-input-number-input\"\n    [disabled]=\"nzDisabled\"\n    [attr.min]=\"nzMin\"\n    [attr.max]=\"nzMax\"\n    [placeholder]=\"nzPlaceHolder\"\n    [attr.step]=\"nzStep\"\n    (keydown)=\"onKeyDown($event)\"\n    (keyup)=\"onKeyUp($event)\"\n    (blur)=\"onBlur($event)\"\n    (focus)=\"onFocus($event)\"\n    [ngModel]=\"displayValue\"\n    (ngModelChange)=\"onModelChange($event)\"\n    autocomplete=\"off\">\n</div>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzInputNumberComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-input-number]': 'true',
                    '[class.ant-input-number-focused]': 'isFocused'
                }
            }] }
];
/** @nocollapse */
NzInputNumberComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NzInputNumberComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['inputElement',] }],
    nzSize: [{ type: Input }],
    nzMin: [{ type: Input }],
    nzMax: [{ type: Input }],
    nzParser: [{ type: Input }],
    nzPrecision: [{ type: Input }],
    nzPlaceHolder: [{ type: Input }],
    isLarge: [{ type: HostBinding, args: ['class.ant-input-number-lg',] }],
    isSmall: [{ type: HostBinding, args: ['class.ant-input-number-sm',] }],
    nzAutoFocus: [{ type: Input }],
    nzDisabled: [{ type: Input }, { type: HostBinding, args: ['class.ant-input-number-disabled',] }],
    nzStep: [{ type: Input }],
    nzFormatter: [{ type: Input }]
};
function NzInputNumberComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzInputNumberComponent.prototype.isInit;
    /** @type {?} */
    NzInputNumberComponent.prototype._disabled;
    /** @type {?} */
    NzInputNumberComponent.prototype._step;
    /** @type {?} */
    NzInputNumberComponent.prototype.autoStepTimer;
    /** @type {?} */
    NzInputNumberComponent.prototype._autoFocus;
    /** @type {?} */
    NzInputNumberComponent.prototype._formatter;
    /** @type {?} */
    NzInputNumberComponent.prototype.displayValue;
    /** @type {?} */
    NzInputNumberComponent.prototype.actualValue;
    /** @type {?} */
    NzInputNumberComponent.prototype.isFocused;
    /** @type {?} */
    NzInputNumberComponent.prototype.value;
    /** @type {?} */
    NzInputNumberComponent.prototype.el;
    /** @type {?} */
    NzInputNumberComponent.prototype.prefixCls;
    /** @type {?} */
    NzInputNumberComponent.prototype.disabledUp;
    /** @type {?} */
    NzInputNumberComponent.prototype.disabledDown;
    /** @type {?} */
    NzInputNumberComponent.prototype.onChange;
    /** @type {?} */
    NzInputNumberComponent.prototype.onTouched;
    /** @type {?} */
    NzInputNumberComponent.prototype.inputElement;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzSize;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzMin;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzMax;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzParser;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzPrecision;
    /** @type {?} */
    NzInputNumberComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    NzInputNumberComponent.prototype.elementRef;
    /** @type {?} */
    NzInputNumberComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaW5wdXQtbnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJpbnB1dC1udW1iZXIvbnotaW5wdXQtbnVtYmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0wsVUFBVSxFQUVWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJqRCxNQUFNOzs7OztJQTBVSixZQUFvQixVQUFzQixFQUFVLFFBQW1CO1FBQW5ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO3NCQXpVdEQsS0FBSzt5QkFDRixLQUFLO3FCQUNULENBQUM7MEJBRUksS0FBSzswQkFDTCxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSzt5QkFHekIsS0FBSztrQkFFQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7eUJBQ25DLGtCQUFrQjswQkFDakIsS0FBSzs0QkFDSCxLQUFLO3dCQUNnQixHQUFHLEVBQUUsQ0FBQyxJQUFJO3lCQUN0QixHQUFHLEVBQUUsQ0FBQyxJQUFJO3NCQUVlLFNBQVM7cUJBQ2pDLENBQUMsUUFBUTtxQkFDVCxRQUFRO3dCQUNiLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLOzZCQUVYLEVBQUU7S0FvVDFCOzs7O0lBbFRELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1B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QWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDekM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEM7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0tBQ0Y7OztZQWpXRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFLLGlCQUFpQjtnQkFDOUIsMndDQUErQztnQkFDL0MsU0FBUyxFQUFJO29CQUNYO3dCQUNFLE9BQU8sRUFBTSxpQkFBaUI7d0JBQzlCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ3JELEtBQUssRUFBUSxJQUFJO3FCQUNsQjtpQkFDRjtnQkFDRCxJQUFJLEVBQVM7b0JBQ1gsMEJBQTBCLEVBQVUsTUFBTTtvQkFDMUMsa0NBQWtDLEVBQUUsV0FBVztpQkFDaEQ7YUFDRjs7OztZQXpCQyxVQUFVO1lBR1YsU0FBUzs7OzJCQXdDUixTQUFTLFNBQUMsY0FBYztxQkFDeEIsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7c0JBRUwsV0FBVyxTQUFDLDJCQUEyQjtzQkFLdkMsV0FBVyxTQUFDLDJCQUEyQjswQkFLdkMsS0FBSzt5QkFVTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLGlDQUFpQztxQkFTN0MsS0FBSzswQkFTTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL2NvcmUvdXRpbC9jaGVjayc7XG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgIDogJ256LWlucHV0LW51bWJlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uei1pbnB1dC1udW1iZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnMgIDogW1xuICAgIHtcbiAgICAgIHByb3ZpZGUgICAgOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56SW5wdXROdW1iZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGkgICAgICA6IHRydWVcbiAgICB9XG4gIF0sXG4gIGhvc3QgICAgICAgOiB7XG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtbnVtYmVyXScgICAgICAgIDogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LWlucHV0LW51bWJlci1mb2N1c2VkXSc6ICdpc0ZvY3VzZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpJbnB1dE51bWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBpc0luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgYXV0b1N0ZXBUaW1lcjtcbiAgcHJpdmF0ZSBfYXV0b0ZvY3VzID0gZmFsc2U7XG4gIHByaXZhdGUgX2Zvcm1hdHRlciA9ICh2YWx1ZSkgPT4gdmFsdWU7XG4gIGRpc3BsYXlWYWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBhY3R1YWxWYWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIHByZWZpeENscyA9ICdhbnQtaW5wdXQtbnVtYmVyJztcbiAgZGlzYWJsZWRVcCA9IGZhbHNlO1xuICBkaXNhYmxlZERvd24gPSBmYWxzZTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgQFZpZXdDaGlsZCgnaW5wdXRFbGVtZW50JykgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBuelNpemU6ICdzbWFsbCcgfCAnZGVmYXVsdCcgfCAnbGFyZ2UnID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuek1pbjogbnVtYmVyID0gLUluZmluaXR5O1xuICBASW5wdXQoKSBuek1heDogbnVtYmVyID0gSW5maW5pdHk7XG4gIEBJbnB1dCgpIG56UGFyc2VyID0gKHZhbHVlKSA9PiB2YWx1ZTtcbiAgQElucHV0KCkgbnpQcmVjaXNpb246IG51bWJlcjtcbiAgQElucHV0KCkgbnpQbGFjZUhvbGRlciA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWlucHV0LW51bWJlci1sZycpXG4gIGdldCBpc0xhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56U2l6ZSA9PT0gJ2xhcmdlJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWlucHV0LW51bWJlci1zbScpXG4gIGdldCBpc1NtYWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56U2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekF1dG9Gb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2F1dG9Gb2N1cyA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVBdXRvRm9jdXMoKTtcbiAgfVxuXG4gIGdldCBuekF1dG9Gb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b0ZvY3VzO1xuICB9XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtaW5wdXQtbnVtYmVyLWRpc2FibGVkJylcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpTdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnpTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpGb3JtYXR0ZXIodjogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcikge1xuICAgIHRoaXMuX2Zvcm1hdHRlciA9IHY7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEN1cnJlbnRWYWxpZFZhbHVlKHRoaXMuYWN0dWFsVmFsdWUpO1xuICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpGb3JtYXR0ZXIoKTogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlcjtcbiAgfVxuXG4gIHVwZGF0ZUF1dG9Gb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekF1dG9Gb2N1cykge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2F1dG9mb2N1cycsICdhdXRvZm9jdXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2F1dG9mb2N1cycpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW9kZWxDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWN0dWFsVmFsdWUgPSB0aGlzLm56UGFyc2VyKHZhbHVlLnRyaW0oKS5yZXBsYWNlKC/jgIIvZywgJy4nKS5yZXBsYWNlKC9bXlxcd1xcLi1dKy9nLCAnJykpO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmFjdHVhbFZhbHVlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFZhbGlkVmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHZhbCA9IHZhbHVlO1xuICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICB2YWwgPSAnJztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzTm90Q29tcGxldGVOdW1iZXIodmFsKSkge1xuICAgICAgdmFsID0gdGhpcy5nZXRWYWxpZFZhbHVlKHZhbCkgYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWwgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50b051bWJlcih2YWwpO1xuICB9XG5cbiAgLy8gJzEuJyAnMXgnICd4eCcgJycgPT4gYXJlIG5vdCBjb21wbGV0ZSBudW1iZXJzXG4gIGlzTm90Q29tcGxldGVOdW1iZXIobnVtOiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNOYU4obnVtIGFzIG51bWJlcikgfHxcbiAgICAgIG51bSA9PT0gJycgfHxcbiAgICAgIG51bSA9PT0gbnVsbCB8fFxuICAgICAgKG51bSAmJiBudW0udG9TdHJpbmcoKS5pbmRleE9mKCcuJykgPT09IG51bS50b1N0cmluZygpLmxlbmd0aCAtIDEpXG4gICAgKTtcbiAgfVxuXG4gIGdldFZhbGlkVmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlcik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgbGV0IHZhbCA9IHBhcnNlRmxvYXQodmFsdWUgYXMgc3RyaW5nKTtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50LWRlc2lnbi9hbnQtZGVzaWduL2lzc3Vlcy83MzU4XG4gICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbCA8IHRoaXMubnpNaW4pIHtcbiAgICAgIHZhbCA9IHRoaXMubnpNaW47XG4gICAgfVxuICAgIGlmICh2YWwgPiB0aGlzLm56TWF4KSB7XG4gICAgICB2YWwgPSB0aGlzLm56TWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgdG9OdW1iZXIobnVtOiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzTm90Q29tcGxldGVOdW1iZXIobnVtKSkge1xuICAgICAgcmV0dXJuIG51bSBhcyBudW1iZXI7XG4gICAgfVxuICAgIGlmIChpc05vdE5pbCh0aGlzLm56UHJlY2lzaW9uKSkge1xuICAgICAgcmV0dXJuIE51bWJlcihOdW1iZXIobnVtKS50b0ZpeGVkKHRoaXMubnpQcmVjaXNpb24pKTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcihudW0pO1xuICB9XG5cbiAgb25CbHVyKGU6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEN1cnJlbnRWYWxpZFZhbHVlKHRoaXMuYWN0dWFsVmFsdWUpO1xuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUsIGAke3RoaXMudmFsdWV9YCAhPT0gYCR7dmFsdWV9YCk7XG4gIH1cblxuICBvbkZvY3VzKGU6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBnZXRSYXRpbyhlOiBLZXlib2FyZEV2ZW50KTogbnVtYmVyIHtcbiAgICBsZXQgcmF0aW8gPSAxO1xuICAgIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgICByYXRpbyA9IDAuMTtcbiAgICB9IGVsc2UgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgIHJhdGlvID0gMTA7XG4gICAgfVxuICAgIHJldHVybiByYXRpbztcbiAgfVxuXG4gIGRvd24oZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIHJhdGlvPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgICB0aGlzLnN0ZXAoJ2Rvd24nLCBlLCByYXRpbyk7XG4gIH1cblxuICB1cChlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgcmF0aW8/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMuc3RlcCgndXAnLCBlLCByYXRpbyk7XG4gIH1cblxuICBnZXRQcmVjaXNpb24odmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgdmFsdWVTdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIGlmICh2YWx1ZVN0cmluZy5pbmRleE9mKCdlLScpID49IDApIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZVN0cmluZy5zbGljZSh2YWx1ZVN0cmluZy5pbmRleE9mKCdlLScpICsgMiksIDEwKTtcbiAgICB9XG4gICAgbGV0IHByZWNpc2lvbiA9IDA7XG4gICAgaWYgKHZhbHVlU3RyaW5nLmluZGV4T2YoJy4nKSA+PSAwKSB7XG4gICAgICBwcmVjaXNpb24gPSB2YWx1ZVN0cmluZy5sZW5ndGggLSB2YWx1ZVN0cmluZy5pbmRleE9mKCcuJykgLSAxO1xuICAgIH1cbiAgICByZXR1cm4gcHJlY2lzaW9uO1xuICB9XG5cbiAgLy8gc3RlcD17MS4wfSB2YWx1ZT17MS41MX1cbiAgLy8gcHJlc3MgK1xuICAvLyB0aGVuIHZhbHVlIHNob3VsZCBiZSAyLjUxLCByYXRoZXIgdGhhbiAyLjVcbiAgLy8gaWYgdGhpcy5wcm9wcy5wcmVjaXNpb24gaXMgdW5kZWZpbmVkXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdC1jb21wb25lbnQvaW5wdXQtbnVtYmVyL2lzc3Vlcy8zOVxuICBnZXRNYXhQcmVjaXNpb24oY3VycmVudFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHJhdGlvOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChpc05vdE5pbCh0aGlzLm56UHJlY2lzaW9uKSkge1xuICAgICAgcmV0dXJuIHRoaXMubnpQcmVjaXNpb247XG4gICAgfVxuICAgIGNvbnN0IHJhdGlvUHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24ocmF0aW8pO1xuICAgIGNvbnN0IHN0ZXBQcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbih0aGlzLm56U3RlcCk7XG4gICAgY29uc3QgY3VycmVudFZhbHVlUHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24oY3VycmVudFZhbHVlIGFzIG51bWJlcik7XG4gICAgaWYgKCFjdXJyZW50VmFsdWUpIHtcbiAgICAgIHJldHVybiByYXRpb1ByZWNpc2lvbiArIHN0ZXBQcmVjaXNpb247XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1heChjdXJyZW50VmFsdWVQcmVjaXNpb24sIHJhdGlvUHJlY2lzaW9uICsgc3RlcFByZWNpc2lvbik7XG4gIH1cblxuICBnZXRQcmVjaXNpb25GYWN0b3IoY3VycmVudFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHJhdGlvOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IHRoaXMuZ2V0TWF4UHJlY2lzaW9uKGN1cnJlbnRWYWx1ZSwgcmF0aW8pO1xuICAgIHJldHVybiBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcbiAgfVxuXG4gIHVwU3RlcCh2YWw6IHN0cmluZyB8IG51bWJlciwgcmF0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHByZWNpc2lvbkZhY3RvciA9IHRoaXMuZ2V0UHJlY2lzaW9uRmFjdG9yKHZhbCwgcmF0KTtcbiAgICBjb25zdCBwcmVjaXNpb24gPSBNYXRoLmFicyh0aGlzLmdldE1heFByZWNpc2lvbih2YWwsIHJhdCkpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXN1bHQgPVxuICAgICAgICAoKHByZWNpc2lvbkZhY3RvciAqIHZhbCArIHByZWNpc2lvbkZhY3RvciAqIHRoaXMubnpTdGVwICogcmF0KSAvXG4gICAgICAgICAgcHJlY2lzaW9uRmFjdG9yKS50b0ZpeGVkKHByZWNpc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMubnpNaW4gPT09IC1JbmZpbml0eSA/IHRoaXMubnpTdGVwIDogdGhpcy5uek1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9OdW1iZXIocmVzdWx0KTtcbiAgfVxuXG4gIGRvd25TdGVwKHZhbDogc3RyaW5nIHwgbnVtYmVyLCByYXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHJlY2lzaW9uRmFjdG9yID0gdGhpcy5nZXRQcmVjaXNpb25GYWN0b3IodmFsLCByYXQpO1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IE1hdGguYWJzKHRoaXMuZ2V0TWF4UHJlY2lzaW9uKHZhbCwgcmF0KSk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJlc3VsdCA9XG4gICAgICAgICgocHJlY2lzaW9uRmFjdG9yICogdmFsIC0gcHJlY2lzaW9uRmFjdG9yICogdGhpcy5uelN0ZXAgKiByYXQpIC9cbiAgICAgICAgICBwcmVjaXNpb25GYWN0b3IpLnRvRml4ZWQocHJlY2lzaW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5uek1pbiA9PT0gLUluZmluaXR5ID8gLXRoaXMubnpTdGVwIDogdGhpcy5uek1pbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9OdW1iZXIocmVzdWx0KTtcbiAgfVxuXG4gIHN0ZXAodHlwZTogc3RyaW5nLCBlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgcmF0aW86IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Q3VycmVudFZhbGlkVmFsdWUodGhpcy5hY3R1YWxWYWx1ZSkgfHwgMDtcbiAgICBsZXQgdmFsO1xuICAgIGlmICh0eXBlID09PSAndXAnKSB7XG4gICAgICB2YWwgPSB0aGlzLnVwU3RlcCh2YWx1ZSwgcmF0aW8pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Rvd24nKSB7XG4gICAgICB2YWwgPSB0aGlzLmRvd25TdGVwKHZhbHVlLCByYXRpbyk7XG4gICAgfVxuICAgIGNvbnN0IG91dE9mUmFuZ2UgPSB2YWwgPiB0aGlzLm56TWF4IHx8IHZhbCA8IHRoaXMubnpNaW47XG4gICAgaWYgKHZhbCA+IHRoaXMubnpNYXgpIHtcbiAgICAgIHZhbCA9IHRoaXMubnpNYXg7XG4gICAgfSBlbHNlIGlmICh2YWwgPCB0aGlzLm56TWluKSB7XG4gICAgICB2YWwgPSB0aGlzLm56TWluO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgIGlmIChvdXRPZlJhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYXV0b1N0ZXBUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpc1sgdHlwZSBdKGUsIHJhdGlvLCB0cnVlKTtcbiAgICB9LCA2MDApO1xuICB9XG5cbiAgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvU3RlcFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hdXRvU3RlcFRpbWVyKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogbnVtYmVyLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGVtaXQgJiYgKGAke3RoaXMudmFsdWV9YCAhPT0gYCR7dmFsdWV9YCkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHZhbHVlO1xuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IGlzTm90TmlsKHRoaXMubnpGb3JtYXR0ZXIodGhpcy52YWx1ZSkpID8gdGhpcy5uekZvcm1hdHRlcih0aGlzLnZhbHVlKSA6ICcnO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gZGlzcGxheVZhbHVlO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBkaXNwbGF5VmFsdWU7XG4gICAgdGhpcy5kaXNhYmxlZFVwID0gdGhpcy5kaXNhYmxlZERvd24gPSBmYWxzZTtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgIGNvbnN0IHZhbCA9IE51bWJlcih2YWx1ZSk7XG4gICAgICBpZiAodmFsID49IHRoaXMubnpNYXgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFVwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPD0gdGhpcy5uek1pbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkRG93biA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChlLmNvZGUgPT09ICdBcnJvd1VwJyB8fCBlLmtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICBjb25zdCByYXRpbyA9IHRoaXMuZ2V0UmF0aW8oZSk7XG4gICAgICB0aGlzLnVwKGUsIHJhdGlvKTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSAnQXJyb3dEb3duJyB8fCBlLmtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5nZXRSYXRpbyhlKTtcbiAgICAgIHRoaXMuZG93bihlLCByYXRpbyk7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBvbktleVVwKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9hdXRvRm9jdXMpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==