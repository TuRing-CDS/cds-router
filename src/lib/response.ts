/**
 * Created by Z on 2017-05-17.
 */
import {ISchema, toJoi, toSwagger} from "./ischema";
import * as joi from 'joi';
import {registMethod} from "./utils/index";

export const TAG_RESPONSE = Symbol('Response');

const RESPONSES: Map<Function,Map<string,Map<number,ISchema|joi.Schema>>> = new Map();

export const DEFAULT_RESPONSE: joi.Schema = joi.string().default('success');

export function response(code: number, schema?: ISchema|joi.Schema): MethodDecorator {
    return function (target: any, key: string) {
        if (!schema) {
            schema = DEFAULT_RESPONSE;
        }
        if (!schema['isJoi']) {
            schema = toJoi(schema);
        }
        if (!RESPONSES.has(target.constructor)) {
            RESPONSES.set(target.constructor, new Map());
        }
        if (!RESPONSES.get(target.constructor).has(key)) {
            RESPONSES.get(target.constructor).set(key, new Map());
        }
        registMethod(target, key, (router) => {
            if (!router.responses) {
                router.responses = {};
            }
            router.responses[code] = toSwagger(schema);
        });
        RESPONSES.get(target.constructor).get(key).set(code, schema);
        target[TAG_RESPONSE] = target.constructor[TAG_RESPONSE] = RESPONSES.get(target.constructor);
    }
}