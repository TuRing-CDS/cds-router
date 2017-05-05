/**
 * Created by Z on 2017-05-05.
 */
/**
 * Controller Symbol
 * @type {symbol}
 */

import * as _ from 'lodash';

const STR_PATH = Symbol('STR_PATH');
/**
 * Routers Symbol
 * @type {symbol}
 */
const STR_ROUTERS = Symbol('STR_ROUTERS');
/**
 * Options Symbol
 * @type {symbol}
 */
const STR_OPTIONS = Symbol('STR_OPTIONS');
/**
 * Middleware Symbol
 * @type {symbol}
 */
const STR_MIDDLEWARE = Symbol('STR_MIDDLEWARE');

const ROUTERS: Map<string,Function> = new Map();

/**
 * Options
 */
export declare class Options {
    isExpose?: Boolean;
}

/**
 * Route
 */
declare class Route {
    method: string;
    path: string;
    handle: Function;
}

const defaultOptions: Options = {
    isExpose: true
};

/**
 * Controller
 * @param path
 * @returns {(ControllerClass:any)}
 */
export function controller(path: string = '/', options: Options = defaultOptions, ...args) {
    return function (ControllerClass) {
        if (_.isFunction(path)) {
            args.unshift(path);
            path = null;
        }
        if (_.isObject(path)) {
            options = path;
            path = null;
        }
        if (_.isFunction(options)) {
            args.unshift(options);
        }
        // Get Parent
        const parent = Object.getPrototypeOf(ControllerClass);
        // Check path
        path = null === path ? ControllerClass.name : path;
        // Join Path
        path = parent[STR_PATH] ? parent[STR_PATH] + path : path;
        // Set Path
        ControllerClass[STR_PATH] = path;
        // Set Options
        ControllerClass[STR_OPTIONS] = options
        // Set Middleware
        ControllerClass[STR_MIDDLEWARE] = (parent[STR_MIDDLEWARE] || []).concat(args);
    }
}

/**
 * Router
 * @param method
 * @param path
 * @param options
 * @param args
 * @returns {(target:any, key:string)=>undefined}
 */
function router(method: string = 'GET', path: string = '', options: Options = defaultOptions, ...args) {
    return function (target: any, key: string) {
        let routers = target[STR_ROUTERS] || [];
        let route: Route = {
            method,
            path,
            handle: target[key]
        };
        target[STR_ROUTERS] = routers.concat(route);
    }
}

/**
 * GET
 * @param path
 * @param options
 * @param args
 */
export const get = (path?: string, options?: Options, ...args) => router('GET', path, options, ...args);
/**
 * POST
 * @param path
 * @param options
 * @param args
 */
export const post = (path?: string, options?: Options, ...args) => router('POST', path, options, ...args);
/**
 * PUT
 * @param path
 * @param options
 * @param args
 */
export const put = (path?: string, options?: Options, ...args) => router('PUT', path, options, ...args);
/**
 * DEL
 * @param path
 * @param options
 * @param args
 */
export const del = (path?: string, options?: Options, ...args) => router('DELETE', path, options, ...args);

/**
 * LoadController
 * @param ControllerClass
 */
export function loadController(ControllerClass) {
    if (ControllerClass instanceof Function && ControllerClass[STR_PATH] && ControllerClass[STR_OPTIONS].isExpose) {
        const controller = new ControllerClass();
        (controller[STR_ROUTERS] || []).forEach((item: Route) => {
            const path = `${item.method} ${ControllerClass[STR_PATH]}${item.path}`;
            ROUTERS.set(path, item.handle.bind(controller))
        });
    }
}

export function invoke(method: string = 'GET', path: string = '/') {
    const uri = `${method} ${path}`;
    if (ROUTERS.has(uri)) {
        return ROUTERS.get(uri)();
    }
}

@controller('/v3/api')
class Demo {

    @get()
    doGet() {
        return 'doGet'
    }

    @post()
    doPost() {
        return 'doPost'
    }
}

loadController(Demo);

console.log(ROUTERS);

console.log(invoke('POST', '/v3/api'));


