/**
 * Created by Z on 2017-05-06.
 */

import {TAG_SCHEMA} from './constant'

/**
 * Schema
 * @param mySchema
 * @returns {(target:any, key:string)=>undefined}
 */
export function schema(mySchema: Object) {
    return function (target: any, key: string) {
        let schemas: Map<string,Object> = target[TAG_SCHEMA] || new Map();
        schemas.set(key, mySchema);
        target[TAG_SCHEMA] = schemas;
    }
}