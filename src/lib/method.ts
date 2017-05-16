/**
 * Created by Z on 2017-05-16.
 */

export const TAG_METHOD = Symbol('Method');

/**
 * Method
 * @param method
 * @param path
 * @returns {(target:Object, key:string)=>undefined}
 */
export function method(method?: string, path?: string): MethodDecorator {
    return function (target: Object, key: string) {
        let map: Map<string,Map<string,string>> = target[TAG_METHOD] || new Map();
        if (!map.has(path)) {
            map.set(path, new Map());
        }
        map.get(path).set(method, key) && (target[TAG_METHOD] = map);
    }
}


export const get = (path?: string) => method('get', path);
export const put = (path?: string) => method('put', path);
export const del = (path?: string) => method('delete', path);
export const post = (path?: string) => method('post', path);
