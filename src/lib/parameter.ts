/**
 * Created by Z on 2017-05-17.
 */
import {ISchema, toJoi, toSwagger} from "./ischema";
import * as joi from 'joi';
import {registMethod} from "./utils/index";

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

export function parameter(name: string, schema?: joi.Schema, paramIn?: ENUM_PARAM_IN): MethodDecorator {
    return function (target: any, key: string) {
        if (!paramIn) {
            paramIn = ENUM_PARAM_IN.query;
        }
        if (!PARAMETERS.has(target.constructor)) {
            PARAMETERS.set(target.constructor, new Map());
        }
        if (!PARAMETERS.get(target.constructor).has(key)) {
            PARAMETERS.get(target.constructor).set(key, new Map());
        }
        registMethod(target, key, function fnParameter(router) {
            if (!router.parameters) {
                router.parameters = [];
            }
            router.parameters.push(Object.assign({
                name,
                in: ENUM_PARAM_IN[paramIn],
                description: name
            }, {required: paramIn == ENUM_PARAM_IN.path && true}, toSwagger(schema)));
        });
        PARAMETERS.get(target.constructor).get(key).set(name, {in: paramIn, schema: toJoi(schema)});
        target[TAG_PARAMETER] = target.constructor[TAG_PARAMETER] = PARAMETERS.get(target.constructor);
    }
}