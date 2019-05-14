/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, Optional, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
export class NzUploadBtnComponent {
    /**
     * @param {?} http
     * @param {?} el
     * @param {?} updateHostClassService
     * @param {?} cd
     */
    constructor(http, el, updateHostClassService, cd) {
        this.http = http;
        this.el = el;
        this.updateHostClassService = updateHostClassService;
        this.cd = cd;
        this.reqs = {};
        this.inited = false;
        this.destroy = false;
        // region: fields
        this.classes = {};
        this.prefixCls = 'ant-upload';
        if (!http) {
            throw new Error(`Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
        }
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.options.disabled) {
            return;
        }
        (/** @type {?} */ (this.file.nativeElement)).click();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (this.options.disabled) {
            return;
        }
        if (e.key === 'Enter' || e.keyCode === ENTER) {
            this.onClick();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFileDrop(e) {
        if (this.options.disabled || e.type === 'dragover') {
            e.preventDefault();
            return;
        }
        if (this.options.directory) {
            this.traverseFileTree(e.dataTransfer.items);
        }
        else {
            /** @type {?} */
            const files = Array.prototype.slice.call(e.dataTransfer.files).filter((file) => this.attrAccept(file, this.options.accept));
            if (files.length) {
                this.uploadFiles(files);
            }
        }
        e.preventDefault();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onChange(e) {
        if (this.options.disabled) {
            return;
        }
        /** @type {?} */
        const hie = /** @type {?} */ (e.target);
        this.uploadFiles(hie.files);
        hie.value = '';
    }
    /**
     * @param {?} files
     * @return {?}
     */
    traverseFileTree(files) {
        /** @type {?} */
        const _traverseFileTree = (item, path) => {
            if (item.isFile) {
                item.file((file) => {
                    if (this.attrAccept(file, this.options.accept)) {
                        this.uploadFiles([file]);
                    }
                });
            }
            else if (item.isDirectory) {
                /** @type {?} */
                const dirReader = item.createReader();
                dirReader.readEntries((entries) => {
                    for (const entrieItem of entries) {
                        _traverseFileTree(entrieItem, `${path}${item.name}/`);
                    }
                });
            }
        };
        for (const file of files) {
            _traverseFileTree(file.webkitGetAsEntry(), '');
        }
    }
    /**
     * @param {?} file
     * @param {?} acceptedFiles
     * @return {?}
     */
    attrAccept(file, acceptedFiles) {
        if (file && acceptedFiles) {
            /** @type {?} */
            const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
            /** @type {?} */
            const fileName = '' + file.name;
            /** @type {?} */
            const mimeType = '' + file.type;
            /** @type {?} */
            const baseMimeType = mimeType.replace(/\/.*$/, '');
            return acceptedFilesArray.some(type => {
                /** @type {?} */
                const validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return fileName.toLowerCase().indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1;
                }
                else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType === validType.replace(/\/.*$/, '');
                }
                return mimeType === validType;
            });
        }
        return true;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    attachUid(file) {
        if (!file.uid) {
            file.uid = Math.random().toString(36).substring(2);
        }
        return file;
    }
    /**
     * @param {?} fileList
     * @return {?}
     */
    uploadFiles(fileList) {
        /** @type {?} */
        let postFiles = Array.prototype.slice.call(fileList);
        this.options.filters.forEach(f => postFiles = f.fn(postFiles));
        postFiles.forEach((file) => {
            this.attachUid(file);
            this.upload(file, postFiles);
        });
    }
    /**
     * @param {?} file
     * @param {?} fileList
     * @return {?}
     */
    upload(file, fileList) {
        if (!this.options.beforeUpload) {
            return this.post(file);
        }
        /** @type {?} */
        const before = this.options.beforeUpload(file, fileList);
        if (before instanceof Observable) {
            before.subscribe((processedFile) => {
                /** @type {?} */
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    this.attachUid(processedFile);
                    this.post(processedFile);
                }
                else if (typeof processedFile === 'boolean' && processedFile !== false) {
                    this.post(file);
                }
            });
        }
        else if (before !== false) {
            return this.post(file);
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    post(file) {
        if (this.destroy) {
            return;
        }
        /** @type {?} */
        const opt = this.options;
        const { uid } = file;
        let { data, headers } = opt;
        if (typeof data === 'function') {
            data = (/** @type {?} */ (data))(file);
        }
        if (typeof headers === 'function') {
            headers = (/** @type {?} */ (headers))(file);
        }
        /** @type {?} */
        const args = {
            action: opt.action,
            name: opt.name,
            headers,
            file,
            data,
            withCredentials: opt.withCredentials,
            onProgress: opt.onProgress ? e => {
                opt.onProgress(e, file);
            } : null,
            onSuccess: (ret, xhr) => {
                this.clean(uid);
                opt.onSuccess(ret, file, xhr);
            },
            onError: (xhr) => {
                this.clean(uid);
                opt.onError(xhr, file);
            }
        };
        /** @type {?} */
        const req$ = (opt.customRequest || this.xhr).call(this, args);
        if (!(req$ instanceof Subscription)) {
            console.warn(`Must return Subscription type in '[nzCustomRequest]' property`);
        }
        this.reqs[uid] = req$;
        opt.onStart(file);
    }
    /**
     * @param {?} args
     * @return {?}
     */
    xhr(args) {
        /** @type {?} */
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append(args.name, /** @type {?} */ (args.file));
        if (args.data) {
            Object.keys(args.data).map(key => {
                formData.append(key, args.data[key]);
            });
        }
        if (!args.headers) {
            args.headers = {};
        }
        if (args.headers['X-Requested-With'] !== null) {
            args.headers['X-Requested-With'] = `XMLHttpRequest`;
        }
        else {
            delete args.headers['X-Requested-With'];
        }
        /** @type {?} */
        const req = new HttpRequest('POST', args.action, formData, {
            reportProgress: true,
            withCredentials: args.withCredentials,
            headers: new HttpHeaders(args.headers)
        });
        return this.http.request(req).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    // tslint:disable-next-line:no-any
                    (/** @type {?} */ (event)).percent = event.loaded / event.total * 100;
                }
                args.onProgress(event, args.file);
            }
            else if (event instanceof HttpResponse) {
                args.onSuccess(event.body, args.file, event);
            }
        }, (err) => {
            this.abort(args.file);
            args.onError(err, args.file);
        });
    }
    /**
     * @param {?} uid
     * @return {?}
     */
    clean(uid) {
        /** @type {?} */
        const req$ = this.reqs[uid];
        if (req$ instanceof Subscription) {
            req$.unsubscribe();
        }
        delete this.reqs[uid];
    }
    /**
     * @param {?=} file
     * @return {?}
     */
    abort(file) {
        if (file) {
            this.clean(file && file.uid);
        }
        else {
            Object.keys(this.reqs).forEach((uid) => this.clean(uid));
        }
    }
    /**
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        const classMap = Object.assign({ [this.prefixCls]: true, [`${this.prefixCls}-disabled`]: this.options.disabled }, this.classes);
        this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inited = true;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.inited) {
            this.setClassMap();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy = true;
        this.abort();
    }
}
NzUploadBtnComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-upload-btn]',
                template: "<input type=\"file\" #file (change)=\"onChange($event)\"\n  [attr.accept]=\"options.accept\"\n  [attr.directory]=\"options.directory ? 'directory': null\"\n  [attr.webkitdirectory]=\"options.directory ? 'webkitdirectory': null\"\n  [multiple]=\"options.multiple\" style=\"display: none;\">\n<ng-content></ng-content>",
                host: {
                    '[attr.tabindex]': '"0"',
                    '[attr.role]': '"button"'
                },
                providers: [NzUpdateHostClassService],
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
NzUploadBtnComponent.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: NzUpdateHostClassService },
    { type: ChangeDetectorRef }
];
NzUploadBtnComponent.propDecorators = {
    file: [{ type: ViewChild, args: ['file',] }],
    classes: [{ type: Input }],
    options: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onFileDrop: [{ type: HostListener, args: ['drop', ['$event'],] }, { type: HostListener, args: ['dragover', ['$event'],] }]
};
function NzUploadBtnComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzUploadBtnComponent.prototype.reqs;
    /** @type {?} */
    NzUploadBtnComponent.prototype.inited;
    /** @type {?} */
    NzUploadBtnComponent.prototype.destroy;
    /** @type {?} */
    NzUploadBtnComponent.prototype.file;
    /** @type {?} */
    NzUploadBtnComponent.prototype.classes;
    /** @type {?} */
    NzUploadBtnComponent.prototype.options;
    /** @type {?} */
    NzUploadBtnComponent.prototype.prefixCls;
    /** @type {?} */
    NzUploadBtnComponent.prototype.http;
    /** @type {?} */
    NzUploadBtnComponent.prototype.el;
    /** @type {?} */
    NzUploadBtnComponent.prototype.updateHostClassService;
    /** @type {?} */
    NzUploadBtnComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdXBsb2FkLWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsidXBsb2FkL256LXVwbG9hZC1idG4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBYSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwSCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBY3RGLE1BQU07Ozs7Ozs7SUEwUEosWUFBZ0MsSUFBZ0IsRUFBVSxFQUFjLEVBQVUsc0JBQWdELEVBQVUsRUFBcUI7UUFBakksU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQTBCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7b0JBelB2SCxFQUFFO3NCQUMzQixLQUFLO3VCQUNKLEtBQUs7O3VCQUtBLEVBQUU7eUJBcU9MLFlBQVk7UUFjOUIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztTQUNuRztLQUNGOzs7O0lBalBELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELG1CQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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QkFBc0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN6Qjs7OztJQVNELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2Q7OztZQXhSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLGlCQUFpQjtnQkFDdEMsd1VBQXFEO2dCQUNyRCxJQUFJLEVBQWlCO29CQUNuQixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixhQUFhLEVBQU0sVUFBVTtpQkFDOUI7Z0JBQ0QsU0FBUyxFQUFZLENBQUUsd0JBQXdCLENBQUU7Z0JBQ2pELG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7Ozs7WUE1QlEsVUFBVSx1QkF1UkosUUFBUTtZQW5SckIsVUFBVTtZQVdILHdCQUF3QjtZQWIvQixpQkFBaUI7OzttQkFnQ2hCLFNBQVMsU0FBQyxNQUFNO3NCQUdoQixLQUFLO3NCQUNMLEtBQUs7c0JBR0wsWUFBWSxTQUFDLE9BQU87d0JBUXBCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBRSxRQUFRLENBQUU7eUJBVXBDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBRSxRQUFRLENBQUUsY0FDakMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFFLFFBQVEsQ0FBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOVEVSIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFdmVudCwgSHR0cEV2ZW50VHlwZSwgSHR0cEhlYWRlcnMsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56VXBkYXRlSG9zdENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdXBkYXRlLWhvc3QtY2xhc3Muc2VydmljZSc7XG5cbmltcG9ydCB7IFVwbG9hZEZpbGUsIFVwbG9hZFhIUkFyZ3MsIFppcEJ1dHRvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnW256LXVwbG9hZC1idG5dJyxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotdXBsb2FkLWJ0bi5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3QgICAgICAgICAgICAgICA6IHtcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ1wiMFwiJyxcbiAgICAnW2F0dHIucm9sZV0nICAgIDogJ1wiYnV0dG9uXCInXG4gIH0sXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFsgTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlIF0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56VXBsb2FkQnRuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHJlcXM6IHsgWyBrZXk6IHN0cmluZyBdOiBTdWJzY3JpcHRpb24gfSA9IHt9O1xuICBwcml2YXRlIGluaXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGRlc3Ryb3kgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdmaWxlJykgZmlsZTogRWxlbWVudFJlZjtcblxuICAvLyByZWdpb246IGZpZWxkc1xuICBASW5wdXQoKSBjbGFzc2VzOiB7fSA9IHt9O1xuICBASW5wdXQoKSBvcHRpb25zOiBaaXBCdXR0b25PcHRpb25zO1xuXG4gIC8vIGVuZHJlZ2lvblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAodGhpcy5maWxlLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkuY2xpY2soKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbICckZXZlbnQnIF0pXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsgJyRldmVudCcgXSlcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbICckZXZlbnQnIF0pXG4gIG9uRmlsZURyb3AoZTogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlZCB8fCBlLnR5cGUgPT09ICdkcmFnb3ZlcicpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3RvcnkpIHtcbiAgICAgIHRoaXMudHJhdmVyc2VGaWxlVHJlZShlLmRhdGFUcmFuc2Zlci5pdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlLmRhdGFUcmFuc2Zlci5maWxlcykuZmlsdGVyKFxuICAgICAgICAoZmlsZTogRmlsZSkgPT4gdGhpcy5hdHRyQWNjZXB0KGZpbGUsIHRoaXMub3B0aW9ucy5hY2NlcHQpXG4gICAgICApO1xuICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBvbkNoYW5nZShlOiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGllID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLnVwbG9hZEZpbGVzKGhpZS5maWxlcyk7XG4gICAgaGllLnZhbHVlID0gJyc7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByaXZhdGUgdHJhdmVyc2VGaWxlVHJlZShmaWxlczogYW55KTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGNvbnN0IF90cmF2ZXJzZUZpbGVUcmVlID0gKGl0ZW06IGFueSwgcGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoaXRlbS5pc0ZpbGUpIHtcbiAgICAgICAgaXRlbS5maWxlKChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuYXR0ckFjY2VwdChmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0KSkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlcyhbZmlsZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyUmVhZGVyID0gaXRlbS5jcmVhdGVSZWFkZXIoKTtcblxuICAgICAgICBkaXJSZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVudHJpZUl0ZW0gb2YgZW50cmllcykge1xuICAgICAgICAgICAgX3RyYXZlcnNlRmlsZVRyZWUoZW50cmllSXRlbSwgYCR7cGF0aH0ke2l0ZW0ubmFtZX0vYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgX3RyYXZlcnNlRmlsZVRyZWUoZmlsZS53ZWJraXRHZXRBc0VudHJ5KCksICcnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dHJBY2NlcHQoZmlsZTogRmlsZSwgYWNjZXB0ZWRGaWxlczogc3RyaW5nIHwgc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICBpZiAoZmlsZSAmJiBhY2NlcHRlZEZpbGVzKSB7XG4gICAgICBjb25zdCBhY2NlcHRlZEZpbGVzQXJyYXkgPSBBcnJheS5pc0FycmF5KGFjY2VwdGVkRmlsZXMpID8gYWNjZXB0ZWRGaWxlcyA6IGFjY2VwdGVkRmlsZXMuc3BsaXQoJywnKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gJycgKyBmaWxlLm5hbWU7XG4gICAgICBjb25zdCBtaW1lVHlwZSA9ICcnICsgZmlsZS50eXBlO1xuICAgICAgY29uc3QgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpO1xuXG4gICAgICByZXR1cm4gYWNjZXB0ZWRGaWxlc0FycmF5LnNvbWUodHlwZSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbGlkVHlwZSA9IHR5cGUudHJpbSgpO1xuICAgICAgICBpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbGVOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWxpZFR5cGUudG9Mb3dlckNhc2UoKSwgZmlsZU5hbWUudG9Mb3dlckNhc2UoKS5sZW5ndGggLSB2YWxpZFR5cGUudG9Mb3dlckNhc2UoKS5sZW5ndGgpICE9PSAtMTtcbiAgICAgICAgfSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIGltYWdlLyogbWltZSB0eXBlXG4gICAgICAgICAgcmV0dXJuIGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWltZVR5cGUgPT09IHZhbGlkVHlwZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoVWlkKGZpbGU6IFVwbG9hZEZpbGUpOiBVcGxvYWRGaWxlIHtcbiAgICBpZiAoIWZpbGUudWlkKSB7XG4gICAgICBmaWxlLnVpZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICB1cGxvYWRGaWxlcyhmaWxlTGlzdDogRmlsZUxpc3QgfCBGaWxlW10pOiB2b2lkIHtcbiAgICBsZXQgcG9zdEZpbGVzOiBVcGxvYWRGaWxlW10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmaWxlTGlzdCk7XG4gICAgdGhpcy5vcHRpb25zLmZpbHRlcnMuZm9yRWFjaChmID0+IHBvc3RGaWxlcyA9IGYuZm4ocG9zdEZpbGVzKSk7XG4gICAgcG9zdEZpbGVzLmZvckVhY2goKGZpbGU6IFVwbG9hZEZpbGUpID0+IHtcbiAgICAgIHRoaXMuYXR0YWNoVWlkKGZpbGUpO1xuICAgICAgdGhpcy51cGxvYWQoZmlsZSwgcG9zdEZpbGVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBsb2FkKGZpbGU6IFVwbG9hZEZpbGUsIGZpbGVMaXN0OiBVcGxvYWRGaWxlW10pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5iZWZvcmVVcGxvYWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZmlsZSk7XG4gICAgfVxuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMub3B0aW9ucy5iZWZvcmVVcGxvYWQoZmlsZSwgZmlsZUxpc3QpO1xuICAgIGlmIChiZWZvcmUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICBiZWZvcmUuc3Vic2NyaWJlKChwcm9jZXNzZWRGaWxlOiBVcGxvYWRGaWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEZpbGVUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3NlZEZpbGUpO1xuICAgICAgICBpZiAocHJvY2Vzc2VkRmlsZVR5cGUgPT09ICdbb2JqZWN0IEZpbGVdJyB8fCBwcm9jZXNzZWRGaWxlVHlwZSA9PT0gJ1tvYmplY3QgQmxvYl0nKSB7XG4gICAgICAgICAgdGhpcy5hdHRhY2hVaWQocHJvY2Vzc2VkRmlsZSk7XG4gICAgICAgICAgdGhpcy5wb3N0KHByb2Nlc3NlZEZpbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzZWRGaWxlID09PSAnYm9vbGVhbicgJiYgcHJvY2Vzc2VkRmlsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnBvc3QoZmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYmVmb3JlICE9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChmaWxlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBvc3QoZmlsZTogVXBsb2FkRmlsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlc3Ryb3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHsgdWlkIH0gPSBmaWxlO1xuICAgIGxldCB7IGRhdGEsIGhlYWRlcnMgfSA9IG9wdDtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRhdGEgPSAoZGF0YSBhcyAoZmlsZTogVXBsb2FkRmlsZSkgPT4ge30pKGZpbGUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGhlYWRlcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGhlYWRlcnMgPSAoaGVhZGVycyBhcyAoZmlsZTogVXBsb2FkRmlsZSkgPT4ge30pKGZpbGUpO1xuICAgIH1cbiAgICBjb25zdCBhcmdzOiBVcGxvYWRYSFJBcmdzID0ge1xuICAgICAgYWN0aW9uICAgICAgICAgOiBvcHQuYWN0aW9uLFxuICAgICAgbmFtZSAgICAgICAgICAgOiBvcHQubmFtZSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogb3B0LndpdGhDcmVkZW50aWFscyxcbiAgICAgIG9uUHJvZ3Jlc3MgICAgIDogb3B0Lm9uUHJvZ3Jlc3MgPyBlID0+IHtcbiAgICAgICAgb3B0Lm9uUHJvZ3Jlc3MoZSwgZmlsZSk7XG4gICAgICB9IDogbnVsbCxcbiAgICAgIG9uU3VjY2VzcyAgICAgIDogKHJldCwgeGhyKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYW4odWlkKTtcbiAgICAgICAgb3B0Lm9uU3VjY2VzcyhyZXQsIGZpbGUsIHhocik7XG4gICAgICB9LFxuICAgICAgb25FcnJvciAgICAgICAgOiAoeGhyKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYW4odWlkKTtcbiAgICAgICAgb3B0Lm9uRXJyb3IoeGhyLCBmaWxlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlcSQgPSAob3B0LmN1c3RvbVJlcXVlc3QgfHwgdGhpcy54aHIpLmNhbGwodGhpcywgYXJncyk7XG4gICAgaWYgKCEocmVxJCBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgTXVzdCByZXR1cm4gU3Vic2NyaXB0aW9uIHR5cGUgaW4gJ1tuekN1c3RvbVJlcXVlc3RdJyBwcm9wZXJ0eWApO1xuICAgIH1cbiAgICB0aGlzLnJlcXNbIHVpZCBdID0gcmVxJDtcbiAgICBvcHQub25TdGFydChmaWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgeGhyKGFyZ3M6IFVwbG9hZFhIUkFyZ3MpOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGZvcm1EYXRhLmFwcGVuZChhcmdzLm5hbWUsIGFyZ3MuZmlsZSBhcyBhbnkpO1xuICAgIGlmIChhcmdzLmRhdGEpIHtcbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MuZGF0YSkubWFwKGtleSA9PiB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGFyZ3MuZGF0YVsga2V5IF0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghYXJncy5oZWFkZXJzKSB7XG4gICAgICBhcmdzLmhlYWRlcnMgPSB7fTtcbiAgICB9XG4gICAgaWYgKGFyZ3MuaGVhZGVyc1sgJ1gtUmVxdWVzdGVkLVdpdGgnIF0gIT09IG51bGwpIHtcbiAgICAgIGFyZ3MuaGVhZGVyc1sgJ1gtUmVxdWVzdGVkLVdpdGgnIF0gPSBgWE1MSHR0cFJlcXVlc3RgO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgYXJncy5oZWFkZXJzWyAnWC1SZXF1ZXN0ZWQtV2l0aCcgXTtcbiAgICB9XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KCdQT1NUJywgYXJncy5hY3Rpb24sIGZvcm1EYXRhLCB7XG4gICAgICByZXBvcnRQcm9ncmVzcyA6IHRydWUsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IGFyZ3Mud2l0aENyZWRlbnRpYWxzLFxuICAgICAgaGVhZGVycyAgICAgICAgOiBuZXcgSHR0cEhlYWRlcnMoYXJncy5oZWFkZXJzKVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChyZXEpLnN1YnNjcmliZSgoZXZlbnQ6IEh0dHBFdmVudDx7fT4pID0+IHtcbiAgICAgIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgIGlmIChldmVudC50b3RhbCA+IDApIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgKGV2ZW50IGFzIGFueSkucGVyY2VudCA9IGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsICogMTAwO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3Mub25Qcm9ncmVzcyhldmVudCwgYXJncy5maWxlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgYXJncy5vblN1Y2Nlc3MoZXZlbnQuYm9keSwgYXJncy5maWxlLCBldmVudCk7XG4gICAgICB9XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgdGhpcy5hYm9ydChhcmdzLmZpbGUpO1xuICAgICAgYXJncy5vbkVycm9yKGVyciwgYXJncy5maWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW4odWlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXEkID0gdGhpcy5yZXFzWyB1aWQgXTtcbiAgICBpZiAocmVxJCBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgcmVxJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5yZXFzWyB1aWQgXTtcbiAgfVxuXG4gIGFib3J0KGZpbGU/OiBVcGxvYWRGaWxlKTogdm9pZCB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRoaXMuY2xlYW4oZmlsZSAmJiBmaWxlLnVpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucmVxcykuZm9yRWFjaCgodWlkKSA9PiB0aGlzLmNsZWFuKHVpZCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlZ2lvbjogc3R5bGVzXG4gIHByaXZhdGUgcHJlZml4Q2xzID0gJ2FudC11cGxvYWQnO1xuXG4gIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTWFwID0ge1xuICAgICAgWyB0aGlzLnByZWZpeENscyBdICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1kaXNhYmxlZGAgXTogdGhpcy5vcHRpb25zLmRpc2FibGVkLFxuICAgICAgLi4udGhpcy5jbGFzc2VzXG4gICAgfTtcbiAgICB0aGlzLnVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UudXBkYXRlSG9zdENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY2xhc3NNYXApO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gZW5kcmVnaW9uXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSB1cGRhdGVIb3N0Q2xhc3NTZXJ2aWNlOiBOelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgaWYgKCFodHRwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBmb3VuZCAnSHR0cENsaWVudCcsIFlvdSBjYW4gaW1wb3J0ICdIdHRwQ2xpZW50TW9kdWxlJyBpbiB5b3VyIHJvb3QgbW9kdWxlLmApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbml0ZWQpIHtcbiAgICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kgPSB0cnVlO1xuICAgIHRoaXMuYWJvcnQoKTtcbiAgfVxufVxuIl19