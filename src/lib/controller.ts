/**
 * Created by Z on 2017-05-06.
 */

import {TAG_CONTROLLER, DEFAULT_OPTIONS, TAG_MIDDLEWARE, TAG_OPTIONS} from './constant';
import {Options} from './interface';

/**
 * Controller
 * @param path
 * @param options
 * @param args
 * @returns {(ControllerClass:any)=>undefined}
 */
export function controller(path?: string, options?: Options, ...args) {
    return function (ControllerClass) {
        const parent = Object.getPrototypeOf(ControllerClass);
        let middles = [];
        if (!path) {
            path = '/' + ControllerClass.name;
        }
        if (!options) {
            options = DEFAULT_OPTIONS;
        }
        if (parent[TAG_CONTROLLER]) {
            path = parent[TAG_CONTROLLER] + path;
        }
        if (parent[TAG_MIDDLEWARE]) {
            middles = parent[TAG_MIDDLEWARE];
        }
        if (parent[TAG_OPTIONS]) {
            options = Object.assign(options, parent[TAG_OPTIONS]);
        }
        ControllerClass[TAG_CONTROLLER] = path;
        ControllerClass[TAG_MIDDLEWARE] = middles.concat(args);
        ControllerClass[TAG_OPTIONS] = options;
    }
}