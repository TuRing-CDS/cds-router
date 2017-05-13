import {validate} from "joi";
import {TAG_DEFINITION} from "./definition";
/**
 * Created by iZhui on 2017/5/13.
 */


export const TAG_RESPONSE = Symbol('Response');

export const TAG_RESPONSE_CHECK = Symbol('Check');

/**
 * Response
 * @param code
 * @param response
 * @returns {(target:any, key:string)=>undefined}
 */
export function response(code: Number, response: any): MethodDecorator {
    if (!response[TAG_DEFINITION]) throw new Error(`response: ${response} not define!`);
    return function (target: any, key: string) {
        const responses: Map<string,Map<Number,Function>> = target[TAG_RESPONSE] || new Map();
        const checks: Map<string,Map<Number,Function>> = target[TAG_RESPONSE_CHECK] || new Map();
        if (!responses.has(key)) {
            responses.set(key, new Map());
        }
        if (!checks.has(key)) {
            checks.set(key, new Map());
        }
        responses.get(key).set(code, response) && ( target[TAG_RESPONSE] = responses);
        checks.get(key).set(code, (input) => {
            let res = new response();
            let schema = {};
            schema = Object.assign(schema, res);
            return validate(input, schema);
        }) && (target[TAG_RESPONSE_CHECK] = checks);
    }
}