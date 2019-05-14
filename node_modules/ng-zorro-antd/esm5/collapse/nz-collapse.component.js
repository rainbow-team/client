/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { toBoolean } from '../core/util/convert';
var NzCollapseComponent = /** @class */ (function () {
    function NzCollapseComponent() {
        this._accordion = false;
        this._bordered = true;
        this.listOfPanel = [];
    }
    Object.defineProperty(NzCollapseComponent.prototype, "nzAccordion", {
        get: /**
         * @return {?}
         */
        function () {
            return this._accordion;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._accordion = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCollapseComponent.prototype, "nzBordered", {
        get: /**
         * @return {?}
         */
        function () {
            return this._bordered;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._bordered = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collapse
     * @return {?}
     */
    NzCollapseComponent.prototype.click = /**
     * @param {?} collapse
     * @return {?}
     */
    function (collapse) {
        if (this.nzAccordion) {
            this.listOfPanel.forEach(function (item) {
                /** @type {?} */
                var active = collapse === item;
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
    };
    /**
     * @param {?} collapse
     * @return {?}
     */
    NzCollapseComponent.prototype.addCollapse = /**
     * @param {?} collapse
     * @return {?}
     */
    function (collapse) {
        this.listOfPanel.push(collapse);
    };
    /**
     * @param {?} collapse
     * @return {?}
     */
    NzCollapseComponent.prototype.removeCollapse = /**
     * @param {?} collapse
     * @return {?}
     */
    function (collapse) {
        this.listOfPanel.splice(this.listOfPanel.indexOf(collapse), 1);
    };
    NzCollapseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-collapse',
                    template: "<div class=\"ant-collapse\" [class.ant-collapse-borderless]=\"!nzBordered\">\n  <ng-content></ng-content>\n</div>",
                    styles: [":host {\n      display: block;\n    }"]
                }] }
    ];
    NzCollapseComponent.propDecorators = {
        nzAccordion: [{ type: Input }],
        nzBordered: [{ type: Input }]
    };
    return NzCollapseComponent;
}());
export { NzCollapseComponent };
function NzCollapseComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCollapseComponent.prototype._accordion;
    /** @type {?} */
    NzCollapseComponent.prototype._bordered;
    /** @type {?} */
    NzCollapseComponent.prototype.listOfPanel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL256LWNvbGxhcHNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7MEJBYzFCLEtBQUs7eUJBQ04sSUFBSTsyQkFDMEIsRUFBRTs7SUFFcEQsc0JBQ0ksNENBQVc7Ozs7UUFJZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4Qjs7Ozs7UUFQRCxVQUNnQixLQUFjO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDOzs7T0FBQTtJQU1ELHNCQUNJLDJDQUFVOzs7O1FBSWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O1FBUEQsVUFDZSxLQUFjO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DOzs7T0FBQTs7Ozs7SUFNRCxtQ0FBSzs7OztJQUFMLFVBQU0sUUFBa0M7UUFDdEMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7Z0JBQzNCLElBQU0sTUFBTSxHQUFHLFFBQVEsS0FBSyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QztxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO29CQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QzthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakQ7S0FDRjs7Ozs7SUFFRCx5Q0FBVzs7OztJQUFYLFVBQVksUUFBa0M7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsNENBQWM7Ozs7SUFBZCxVQUFlLFFBQWtDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hFOztnQkF4REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBSyxhQUFhO29CQUMxQiw2SEFBMkM7NkJBRXpDLHVDQUVFO2lCQUVMOzs7OEJBTUUsS0FBSzs2QkFTTCxLQUFLOzs4QkFoQ1I7O1NBa0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcblxuaW1wb3J0IHsgTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9uei1jb2xsYXBzZS1wYW5lbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICA6ICduei1jb2xsYXBzZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uei1jb2xsYXBzZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlcyAgICAgOiBbXG4gICAgYDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1gXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpDb2xsYXBzZUNvbXBvbmVudCB7XG4gIHByaXZhdGUgX2FjY29yZGlvbiA9IGZhbHNlO1xuICBwcml2YXRlIF9ib3JkZXJlZCA9IHRydWU7XG4gIHByaXZhdGUgbGlzdE9mUGFuZWw6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudFtdID0gW107XG5cbiAgQElucHV0KClcbiAgc2V0IG56QWNjb3JkaW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWNjb3JkaW9uID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekFjY29yZGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWNjb3JkaW9uO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Qm9yZGVyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ib3JkZXJlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpCb3JkZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYm9yZGVyZWQ7XG4gIH1cblxuICBjbGljayhjb2xsYXBzZTogTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpBY2NvcmRpb24pIHtcbiAgICAgIHRoaXMubGlzdE9mUGFuZWwuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gY29sbGFwc2UgPT09IGl0ZW07XG4gICAgICAgIGlmIChhY3RpdmUgJiYgaXRlbS5uekFjdGl2ZSA9PT0gYWN0aXZlKSB7XG4gICAgICAgICAgaXRlbS5uekFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGl0ZW0ubnpBY3RpdmVDaGFuZ2UuZW1pdChpdGVtLm56QWN0aXZlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLm56QWN0aXZlICE9PSBhY3RpdmUpIHtcbiAgICAgICAgICBpdGVtLm56QWN0aXZlID0gYWN0aXZlO1xuICAgICAgICAgIGl0ZW0ubnpBY3RpdmVDaGFuZ2UuZW1pdChpdGVtLm56QWN0aXZlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbGxhcHNlLm56QWN0aXZlID0gIWNvbGxhcHNlLm56QWN0aXZlO1xuICAgICAgY29sbGFwc2UubnpBY3RpdmVDaGFuZ2UuZW1pdChjb2xsYXBzZS5uekFjdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ29sbGFwc2UoY29sbGFwc2U6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mUGFuZWwucHVzaChjb2xsYXBzZSk7XG4gIH1cblxuICByZW1vdmVDb2xsYXBzZShjb2xsYXBzZTogTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZQYW5lbC5zcGxpY2UodGhpcy5saXN0T2ZQYW5lbC5pbmRleE9mKGNvbGxhcHNlKSwgMSk7XG4gIH1cbn1cbiJdfQ==