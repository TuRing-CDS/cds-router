/**
 * Created by Z on 2017-05-13.
 */

export const TAG_CONTROLLER = Symbol('Controller');

/**
 * Controller
 * @param path
 * @returns {(Controller:any)=>undefined}
 */
export function controller(path?: string): ClassDecorator {
    return function (Controller) {
        const parent = Object.getPrototypeOf(Controller);
        if (!path) {
            path = Controller.name;
        }
        if (parent[TAG_CONTROLLER]) {
            path = parent[TAG_CONTROLLER] + path;
        }
        Controller[TAG_CONTROLLER] = path;
    }
}