/**
 * Created by Z on 2017-05-06.
 */

import {TAG_DESCRIPTION} from './constant'

/**
 * Description
 * @param desc
 * @returns {(target:any, key:string)=>undefined}
 */
export function description(desc: string) {
    return function (target: any, key: string) {
        let descriptions: Map<string,string> = target[TAG_DESCRIPTION] || new Map();
        descriptions.set(key, desc);
        target[TAG_DESCRIPTION] = descriptions;
    }
}