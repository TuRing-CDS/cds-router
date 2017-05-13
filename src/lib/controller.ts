/**
 * Created by iZhui on 2017/5/12.
 */

export const TAG_CONTROLLER = Symbol('Controller');

/**
 * Controller
 * @param path
 * @returns {(Controller:Function)=>undefined}
 */
export function controller(path?: string): ClassDecorator {
    return function (Controller: Function) {
        if (!path) {
            path = Controller.name;
        }
        const parent = Object.getPrototypeOf(Controller);
        if (parent[TAG_CONTROLLER]) {
            path = [parent[TAG_CONTROLLER], path].join('');
        }
        Controller[TAG_CONTROLLER] = path;
    }
}