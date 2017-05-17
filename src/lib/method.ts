/**
 * Created by Z on 2017-05-16.
 */

export const TAG_METHOD = Symbol('Method');

export interface IMethod {
    key: string;
    handle: Function;
}


/**
 * 说一个坑爹的事儿:
 *  如果是类方法注解,
 *  typescript是通过prototype实现的,
 *  btw,
 *  class User extends BaseController {
 *      @get('/')
 *      index(){
 *
 *      }
 *  }
 *
 *  会造成父级 Controller 注解污染
 */

/**
 * 防止继承污染
 * @type {Map<any, any>}
 */
const METHODS: Map<Function,Map<string,Map<string,IMethod>>> = new Map();

/**
 * Method
 * @param method
 * @param path
 * @returns {(target:Object, key:string)=>undefined}
 */
export function method(method?: string, path?: string): MethodDecorator {
    return function (target: Object, key: string) {
        if (!METHODS.has(target.constructor)) {
            METHODS.set(target.constructor, new Map());
        }
        if (!METHODS.get(target.constructor).has(path)) {
            METHODS.get(target.constructor).set(path, new Map());
        }
        METHODS.get(target.constructor).get(path).set(method, {key, handle: target[key]});
        target[TAG_METHOD] = target.constructor[TAG_METHOD] = METHODS.get(target.constructor);
    }
}


export const get = (path?: string) => method('get', path);
export const put = (path?: string) => method('put', path);
export const del = (path?: string) => method('delete', path);
export const post = (path?: string) => method('post', path);
