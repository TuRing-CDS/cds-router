/**
 * Created by Z on 2017-05-06.
 */

import {Options, Router} from './interface'
import {DEFAULT_OPTIONS, TAG_MIDDLEWARE, TAG_OPTIONS, TAG_ROUTER} from './constant'

/**
 * Method
 * @param method
 * @param path
 * @param options
 * @param args
 * @returns {(target:any, key:string)=>undefined}
 */
export function methods(method?: string, path?: string, options?: Options, ...args) {
    return function (target: any, key: string) {
        let middles = target[TAG_MIDDLEWARE] || [];
        let routers: Router[] = target[TAG_ROUTER] || [];
        if (!method) {
            method = 'GET';
        }
        if (!path) {
            path = '';
        }
        if (!options) {
            options = DEFAULT_OPTIONS;
        }
        middles = middles.concat(args);
        routers.push({
            method,
            path,
            key,
            handle: target[key]
        });
        target[TAG_MIDDLEWARE] = middles;
        target[TAG_OPTIONS] = options;
        target[TAG_ROUTER] = routers;
    }
}

/**
 * GET
 * @param path
 * @param options
 * @param args
 */
export const get = (path?: string, options?: Options, ...args) => methods('GET', path, options, ...args);
/**
 * POST
 * @param path
 * @param options
 * @param args
 */
export const post = (path?: string, options?: Options, ...args) => methods('POST', path, options, ...args);
/**
 * PUT
 * @param path
 * @param options
 * @param args
 */
export const put = (path?: string, options?: Options, ...args) => methods('PUT', path, options, ...args);
/**
 * DELETE
 * @param path
 * @param options
 * @param args
 */
export const del = (path?: string, options?: Options, ...args) => methods('DELETE', path, options, ...args);