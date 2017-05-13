import {regist} from "../utils/index";
/**
 * Created by Z on 2017-05-13.
 */

export const TAG_DETAIL = Symbol('Detail');

/**
 * Detail
 * @param detail
 * @returns {(target:any, key:string)=>undefined}
 */
export function detail(detail: string): MethodDecorator {
    return function (target: any, key: string) {
        let details: Map<string,string> = target[TAG_DETAIL] || new Map();
        regist(target, key, (router) => {
            router.detail = detail;
        });
        details.set(key, detail) && ( target[TAG_DETAIL] = details);
    }
}
