/**
 * Created by iZhui on 2017/5/13.
 */
import {registMethod} from "../utils/index";
export const TAG_DESCRIPTION = Symbol('Description');

/**
 * Description
 * @param description
 * @returns {(target:any, key:string)=>undefined}
 */
export function description(description: string): MethodDecorator {
    return function (target: any, key: string) {
        let descriptions: Map<string,string> = target[TAG_DESCRIPTION] || new Map();
        registMethod(target, key, (router) => {
            router.description = description;
        });
        descriptions.set(key, description) && (target[TAG_DESCRIPTION] = descriptions);
    }
}