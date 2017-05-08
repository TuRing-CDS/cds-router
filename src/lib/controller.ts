/**
 * Created by Z on 2017-05-08.
 */

import {TAG_CONTROLLER, TAG_METHOD_MIDDLE} from "./constant";

/**
 * Controller
 * @param path
 * @returns {(Controller:any)=>undefined}
 */
export function controller(path?: string) {
    return function (Controller) {
        if (!path) {
            path = Controller.name;
        }
        const parent = Object.getPrototypeOf(Controller);
        if (parent[TAG_CONTROLLER]) {
            path = parent[TAG_CONTROLLER] + path;
        }
        Controller[TAG_CONTROLLER] = path;
    }
}