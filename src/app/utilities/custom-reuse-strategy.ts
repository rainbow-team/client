import {
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
    RouteReuseStrategy
} from '@angular/router';

/**
 * 自定义路由复用策略
 * */
export class CustomReuseStrategy implements RouteReuseStrategy {
    public static handlers: { [key: string]: DetachedRouteHandle } = {};

    /** 删除缓存路由快照的方法 */
    public static deleteRouteSnapshot(path: string): void {
        const name = path.replace(/\//g, '_');
        if (CustomReuseStrategy.handlers[name]) {
            delete CustomReuseStrategy.handlers[name];
        }
    }

    public static deleteAllRouteSnapshot() {
        CustomReuseStrategy.handlers = {};
    }

    /** 从缓存中获取快照，若无则返回nul */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!CustomReuseStrategy.handlers[this.getRouteUrl(route)]) {
            return null;
        }
        return CustomReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /** 若 path 在缓存中有的都认为允许还原路由 */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        let flag = !!CustomReuseStrategy.handlers[this.getRouteUrl(route)];
        return flag;
    }

    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {

        if (route['_routerState'].url == "login") {
            return false;
        }
       return true;


    }

    /** 进入路由触发，判断是否同一路由 */
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
    ): boolean {
        return (
            future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params)
        );
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    store(
        route: ActivatedRouteSnapshot,
        handle: DetachedRouteHandle | null
    ): void {
        CustomReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
    }

    /** 使用route的path作为快照的key */
    getRouteUrl(route: ActivatedRouteSnapshot) {
        const path = route['_routerState'].url.replace(/\//g, '_');
        return path;
    }
}
