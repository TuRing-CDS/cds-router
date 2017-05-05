/**
 * Created by iZhui on 2017/5/5.
 */

const TAG_ROUTE = Symbol('Route');

import {Options, defaultOptions} from './controller';

declare class Route {
    method: string;
    path: string;
    handle: Function
}

/**
 * Route
 * @param method
 * @param path
 * @param options
 * @param args
 * @returns {(target:any, key:string)=>undefined}
 */
export function route(method?: string, path?: string, options?: Options, ...args) {
    return function (target: any, key: string) {
        if ('function' === typeof path) {
            args.unshift(options);
            path = null;
        }
        if ('object' === typeof path) {
            options = path;
            path = null;
        }
        if ('function' === typeof options) {
            args.unshift(options);
            options = defaultOptions;
        }
        let routes: Route[] = target[TAG_ROUTE] || [];
        routes.push({
            method,
            path,
            handle: target[key]
        });
    }
}

/**
 * Get
 * @param path
 * @param options
 * @param args
 */
export const get = (path?: string, options?: Options, ...args) => route('GET', path, options, ...args);
/**
 * Delete
 * @param path
 * @param options
 * @param args
 */
export const del = (path?: string, options?: Options, ...args) => route('DELETE', path, options, ...args);
/**
 * Post
 * @param path
 * @param options
 * @param args
 */
export const post = (path?: string, options?: Options, ...args) => route('POST', path, options, ...args);
/**
 * Put
 * @param path
 * @param options
 * @param args
 */
export const put = (path?: string, options?: Options, ...args) => route('PUT', path, options, ...args);