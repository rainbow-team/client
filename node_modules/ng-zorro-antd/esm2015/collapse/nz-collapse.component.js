/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { toBoolean } from '../core/util/convert';
export class NzCollapseComponent {
    constructor() {
        this._accordion = false;
        this._bordered = true;
        this.listOfPanel = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAccordion(value) {
        this._accordion = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzAccordion() {
        return this._accordion;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzBordered(value) {
        this._bordered = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzBordered() {
        return this._bordered;
    }
    /**
     * @param {?} collapse
     * @return {?}
     */
    click(collapse) {
        if (this.nzAccordion) {
            this.listOfPanel.forEach(item => {
                /** @type {?} */
                const active = collapse === item;
                if (active && item.nzActive === active) {
                    item.nzActive = false;
                    item.nzActiveChange.emit(item.nzActive);
                }
                else if (item.nzActive !== active) {
                    item.nzActive = active;
                    item.nzActiveChange.emit(item.nzActive);
                }
            });
        }
        else {
            collapse.nzActive = !collapse.nzActive;
            collapse.nzActiveChange.emit(collapse.nzActive);
        }
    }
    /**
     * @param {?} collapse
     * @return {?}
     */
    addCollapse(collapse) {
        this.listOfPanel.push(collapse);
    }
    /**
     * @param {?} collapse
     * @return {?}
     */
    removeCollapse(collapse) {
        this.listOfPanel.splice(this.listOfPanel.indexOf(collapse), 1);
    }
}
NzCollapseComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-collapse',
                template: "<div class=\"ant-collapse\" [class.ant-collapse-borderless]=\"!nzBordered\">\n  <ng-content></ng-content>\n</div>",
                styles: [`:host {
      display: block;
    }`]
            }] }
];
NzCollapseComponent.propDecorators = {
    nzAccordion: [{ type: Input }],
    nzBordered: [{ type: Input }]
};
function NzCollapseComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCollapseComponent.prototype._accordion;
    /** @type {?} */
    NzCollapseComponent.prototype._bordered;
    /** @type {?} */
    NzCollapseComponent.prototype.listOfPanel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL256LWNvbGxhcHNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBYWpELE1BQU07OzBCQUNpQixLQUFLO3lCQUNOLElBQUk7MkJBQzBCLEVBQUU7Ozs7OztJQUVwRCxJQUNJLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7OztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7O0lBRUQsS0FBSyxDQUFDLFFBQWtDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7Z0JBQzlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsS0FBSyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QztxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO29CQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QzthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakQ7S0FDRjs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBa0M7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWtDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hFOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBSyxhQUFhO2dCQUMxQiw2SEFBMkM7eUJBRXpDOztNQUVFO2FBRUw7OzswQkFNRSxLQUFLO3lCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmltcG9ydCB7IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vbnotY29sbGFwc2UtcGFuZWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgOiAnbnotY29sbGFwc2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbnotY29sbGFwc2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXMgICAgIDogW1xuICAgIGA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56Q29sbGFwc2VDb21wb25lbnQge1xuICBwcml2YXRlIF9hY2NvcmRpb24gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYm9yZGVyZWQgPSB0cnVlO1xuICBwcml2YXRlIGxpc3RPZlBhbmVsOiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnRbXSA9IFtdO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuekFjY29yZGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FjY29yZGlvbiA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpBY2NvcmRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY29yZGlvbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekJvcmRlcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYm9yZGVyZWQgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56Qm9yZGVyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2JvcmRlcmVkO1xuICB9XG5cbiAgY2xpY2soY29sbGFwc2U6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QWNjb3JkaW9uKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhbmVsLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGNvbGxhcHNlID09PSBpdGVtO1xuICAgICAgICBpZiAoYWN0aXZlICYmIGl0ZW0ubnpBY3RpdmUgPT09IGFjdGl2ZSkge1xuICAgICAgICAgIGl0ZW0ubnpBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBpdGVtLm56QWN0aXZlQ2hhbmdlLmVtaXQoaXRlbS5uekFjdGl2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5uekFjdGl2ZSAhPT0gYWN0aXZlKSB7XG4gICAgICAgICAgaXRlbS5uekFjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgICBpdGVtLm56QWN0aXZlQ2hhbmdlLmVtaXQoaXRlbS5uekFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2xsYXBzZS5uekFjdGl2ZSA9ICFjb2xsYXBzZS5uekFjdGl2ZTtcbiAgICAgIGNvbGxhcHNlLm56QWN0aXZlQ2hhbmdlLmVtaXQoY29sbGFwc2UubnpBY3RpdmUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENvbGxhcHNlKGNvbGxhcHNlOiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZlBhbmVsLnB1c2goY29sbGFwc2UpO1xuICB9XG5cbiAgcmVtb3ZlQ29sbGFwc2UoY29sbGFwc2U6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mUGFuZWwuc3BsaWNlKHRoaXMubGlzdE9mUGFuZWwuaW5kZXhPZihjb2xsYXBzZSksIDEpO1xuICB9XG59XG4iXX0=