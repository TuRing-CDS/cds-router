import {Schema} from "joi";
/**
 * Created by Z on 2017-05-13.
 */

export const TAG_RESPONSE = Symbol('Response');

/**
 * Response
 * @param code
 * @param schema
 * @returns {(target:any, key:string)=>undefined}
 */
export function response(code: Number, schema: Function): MethodDecorator {
    return function (target: any, key: string) {
        let responses: Map<string,Map<Number,Function>> = target[TAG_RESPONSE] || new Map();
        if (!responses.has(key)) {
            responses.set(key, new Map());
        }
        responses.get(key).set(code, schema) && (target[TAG_RESPONSE] = responses);
    }
}