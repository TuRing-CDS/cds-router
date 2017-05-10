/**
 * Created by Z on 2017-05-08.
 */

import {TAG_ROUTER} from "./constant";
import {Router} from "./interface";

/**
 * Method
 * @param path
 */
export function method(method?: string, path?: string) {
    return function (target: any, key: string) {
        if (!method) {
            method = 'GET';
        }
        if (!path) {
            path = key;
        }
        let routers: Router[] = target[TAG_ROUTER] || [];
        routers.push({
            method,
            path,
            key,
            handle: target[key],
        });
        target[TAG_ROUTER] = routers;
    }
}

/**
 * GET
 * @param path
 */
export const get = (path?: string) => method('GET', path);
/**
 * PUT
 * @param path
 */
export const put = (path?: string) => method('PUT', path);
/**
 * POST
 * @param path
 */
export const post = (path?: string) => method('POST', path);
/**
 * DEL
 * @param path
 */
export const del = (path?: string) => method('DELETE', path);
