/**
 * Created by iZhui on 2017/5/12.
 */

import * as joi from 'joi';
import {Schema} from "joi";
import {registMethod, registMiddleware} from "../utils/index";

/**
 * ENUM_PARAM_IN
 */
export enum ENUM_PARAM_IN{
    path,
    header,
    body,
    query
}

/**
 * Param
 */
export interface Param {
    in: ENUM_PARAM_IN;
    description?: string;
    schema: Schema;
}

/**
 * Tag Param
 * @type {symbol}
 */
export const TAG_PARAM = Symbol('Param');

export const TAG_CHECK = Symbol('Check');

/**
 * Default Param
 * @type {{in: ENUM_PARAM_IN; schema: "joi".StringSchema}}
 */
export const DEFAULT_PARAM: Param = {
    in: ENUM_PARAM_IN.query,
    schema: joi.string()
};

/**
 * Param
 * @param name
 * @param param
 * @returns {(target:any, key:string)=>undefined}
 */
export function param(name?: string, param?: Param): MethodDecorator {
    return function (target: any, key: string) {
        if (!name) {
            name = key;
        }
        if (!param) {
            param = DEFAULT_PARAM;
        }
        const params: Map<string,Map<string,Param>> = target[TAG_PARAM] || new Map();
        const checks: Map<string,Function> = target[TAG_CHECK] || new Map();
        if (!params.has(key)) {
            params.set(key, new Map());
        }
        if (!checks.has(key)) {
            checks.set(key, (input) => {
                let p = target[TAG_PARAM].get(key);
                let schema = {path: {}, headers: {}, body: {}, query: {}};
                for (let [k, v] of p) {
                    schema[ENUM_PARAM_IN[v.in]][k] = v.schema;
                }
                return joi.validate(input, schema);
            }) && (target[TAG_CHECK] = checks);
            registMethod(target, key, (router) => {
                let parameters = router.parameters || [];
                parameters.push(Object.assign({
                    in: ENUM_PARAM_IN[param.in],
                    name
                }, {})) && (router.parameters = parameters);
            });
            registMiddleware(target, key, async(ctx, next) => {
                const {error, value} = target[TAG_CHECK].get(key)({
                    path: ctx.params,
                    body: ctx.req.body,
                    query: ctx.query
                });
                if (error) return next(error);
                ctx.req.body = value.body;
                ctx.query = value.query;
                ctx.params = value.path;
                return next();
            });
        }

        params.get(key).set(name, param) && (target[TAG_PARAM] = params);
    }
}