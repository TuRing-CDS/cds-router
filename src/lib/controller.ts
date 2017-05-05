/**
 * Created by iZhui on 2017/5/5.
 */

const TAG_CONTROLLER = Symbol('Controller');
const TAG_MIDDLEWARE = Symbol('Middleware');

export declare class Options {
    isExpose: boolean
}

export const defaultOptions: Options = {
    isExpose: true
};

export function controller(path?: string, options?: Options, ...args) {
    return function (Controller) {
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
        if (null == path) {
            path = '/' + Controller.name;
        }
        const parent = Object.getPrototypeOf(Controller);
        if (parent[TAG_CONTROLLER]) {
            path = parent[TAG_CONTROLLER] + path;
        }
        if(parent[TAG_MIDDLEWARE]){
            args = parent[TAG_MIDDLEWARE].concat(args);
        }
        Controller[TAG_CONTROLLER] = path;
        Controller[TAG_MIDDLEWARE] = args;
    }
}