import {Param} from "./param";
/**
 * Created by iZhui on 2017/5/12.
 */


export const TAG_METHOD = Symbol('Method');

/**
 * Method
 * @param method
 * @param path
 * @returns {(target:any, key:string)=>undefined}
 */
export function method(method?: string, path?: string): MethodDecorator {
    return function (target: any, key: string) {
        if (!method) {
            method = 'GET';
        }
        if (!path) {
            path = key;
        }
        let methods: Map<string,Map<string,string>> = target[TAG_METHOD] || new Map();
        if (!methods.has(path)) {
            methods.set(path, new Map());
        }
        methods.get(path).set(method, key) && (target[TAG_METHOD] = methods);
    }
}

/**
 * Get
 * @param path
 */
export const get = (path?: string) => method('GET', path);

/**
 * Put
 * @param path
 */
export const put = (path?: string) => method('PUT', path);

/**
 * Delete
 * @param path
 */
export const del = (path?: string) => method('DELETE', path);

/**
 * Post
 * @param path
 */
export const post = (path?: string) => method('POST', path);