import {Schema} from "joi";
import {regist} from "../utils/index";
import * as joi from "joi";
/**
 * Created by Z on 2017-05-13.
 */

export const TAG_PARAM = Symbol('Param');

export const TAG_PARAM_CHECK = Symbol('ParamCheck');

export enum ENUM_PARAM_IN{
    body,
    path,
    query,
    header
}

/**
 * Param
 * @param name
 * @param schema
 * @returns {(target:any, key:string)=>undefined}
 */
export function parameter(name: string, paramIn: ENUM_PARAM_IN, schema: Schema, description?: string): MethodDecorator {
    return function (target: any, key: string) {
        let params: Map<string,Map<string,Schema>> = target[TAG_PARAM] || new Map();
        if (!params.has(key)) {
            params.set(key, new Map());
        }
        regist(target, key, (router) => {
            if (!router.parameters) {
                router.parameters = [];
            }
            router.parameters.map((x) => {
                x.name
            }).indexOf(name) == -1 && router.parameters.push(Object.assign({
                in: ENUM_PARAM_IN[paramIn],
                description,
                name
            }, schema));
            // router.check = (input) => {
            //     let params = target[TAG_PARAM].get(key);
            //     let keys = [...params.keys];
            //     let schema = {};
            //     keys.forEach((key) => {
            //         schema[key] = params.get(key)
            //     });
            //     return joi.validate(input, joi.object(schema));
            // }
        });
        params.get(key).set(name, schema) && (target[TAG_PARAM] = params);
        target[TAG_PARAM_CHECK] = (input) => {
            let schema = {};
            for (let [k, v] of target[TAG_PARAM_CHECK].get(key)) {
                schema[k] = v;
            }
            return joi.validate(input, schema);
        }
    }
}