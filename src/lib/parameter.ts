/**
 * Created by Z on 2017-05-17.
 */
import {ISchema, toJoi} from "./ischema";
import * as joi from 'joi';

export const TAG_PARAMETER = Symbol('Parameter');

const PARAMETERS: Map<Function,Map<string,Map<string,IParameter>>> = new Map();

export interface IParameter {
    in: ENUM_PARAM_IN;
    schema: joi.Schema|ISchema;
}

export enum ENUM_PARAM_IN{
    query,
    body,
    header,
    path
}

export function parameter(name: string, schema?: ISchema|joi.Schema, paramIn?: ENUM_PARAM_IN): MethodDecorator {
    return function (target: any, key: string) {
        if (!paramIn) {
            paramIn = ENUM_PARAM_IN.query;
        }
        if (!schema['isJoi']) {
            schema = toJoi(schema);
        }
        if (!PARAMETERS.has(target.constructor)) {
            PARAMETERS.set(target.constructor, new Map());
        }
        if (!PARAMETERS.get(target.constructor).has(key)) {
            PARAMETERS.get(target.constructor).set(key, new Map());
        }
        PARAMETERS.get(target.constructor).get(key).set(name, {in: paramIn, schema});
        target[TAG_PARAMETER] = target.constructor[TAG_PARAMETER] = PARAMETERS.get(target.constructor);
    }
}